// @ts-nocheck
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { Adapter } from '@auth/core/adapters';
import jwt from 'jsonwebtoken';
import {
	GITHUB_ID,
	GITHUB_SECRET,
	NEXTAUTH_URL,
	EMAIL_FROM,
	EMAIL_SERVER,
	GOOGLE_ID,
	GOOGLE_SECRET
} from '$env/static/private';
import { prisma } from './lib/db/prisma';
import { sequence } from '@sveltejs/kit/hooks';
import { error, redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { Pages } from '$lib/plugins/pages/Pages';
import { errorCatch, isReservedRoute } from '$lib/util/slugit';
import { Token } from '$lib/token/Token';
import { dev } from '$app/environment';
import { Space } from '$lib/djs/Space';
import { Email } from '@auth/core/providers/email';
import Google from '@auth/core/providers/google';

export const withPrisma = ({ event, resolve }: Handle) => {
	event.locals.db = prisma;
	return resolve(event);
};

export const authHandle = SvelteKitAuth({
	adapter: PrismaAdapter(prisma) as Adapter<boolean>,
	session: {
		strategy: 'database',
		generateSessionToken() {
			return crypto.randomUUID();
		}
	},
	providers: [
		GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		}),
		Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET }),
		Email({
			server: EMAIL_SERVER,
			from: "Dreamfeel"
		})
	],
	jwt: {
		maxAge: 60 * 60 * 24 * 30,
		async encode() {},
		async decode() {}
	},
	cookies: {
		sessionToken: {
			name: `${!dev ? '__Secure-' : ''}next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: 'lax' as any,
				path: '/',
				domain: NEXTAUTH_URL.replace('http://', '').replace('https://', ''),
				secure: !dev
			}
		}
	},
	theme: {
		brandColor: '', // Hex color code
		logo: 'https://dreamfeel.me/_app/immutable/assets/beta-logo-9e1f695c.png'
	}
});

export const withSpaceRouter = async ({ event, resolve }: Handle) => {
	const pathname = event.url.pathname;

	const isReserved = isReservedRoute(pathname);

	const pageManager = new Pages({ url: event.url });

	if (pageManager.sbd === 'pay' || pageManager.sbd === 'pos' || pageManager.sbd === 'cdn')
		return resolve(event);
	if (isReserved && !pageManager.isValidSubdomain) return resolve(event);

	if (event.request.method === 'POST') {
		await event.request.formData();
		throw redirect(301, `${event.request.action}`);

		//
	}

	if (pageManager.isValidSubdomain) {
		const [html, htmlError] = await pageManager.renderPage({
			renderSubdomainApp: true,
			subdomain: pageManager.sbd
		});
		if (htmlError) throw error(500, 'An internal server error occured');
		let response = new Response(html);
		response.headers.set('content-type', 'text/html');
		return response;
	}
	const [html, htmlError] = await pageManager.renderPage({});
	if (htmlError) throw htmlError;
	let response = new Response(html);
	response.headers.set('content-type', 'text/html');
	return response;
};

export const errorHandle: HandleServerError = ({ error }) => {
	// console.log(error);
	return { message: 'Error' };
};

export const spaceAuth: Handle = async ({ event, resolve }) => {
	if (/^\/api\/editor/.test(event.url.pathname)) return resolve(event);
	if (/^\/api\/examples/.test(event.url.pathname)) return resolve(event);
	if (/^\/api?/.test(event.url.pathname)) return resolve(event);
	const { cookies } = event;

	async function getSpaceSession() {
		try {
			const sessionToken = cookies.get(`${event.params['app_id']}-accessToken`);
			const decoded = jwt.decode(sessionToken);
			const user = await prisma.spaceUser.findUnique({
				where: {
					id: decoded?.id
				},
				include: {
					UserRoles: true
				}
			});
			return { user };
		} catch (e) {
			return null;
		}
	}
	event.locals.getSpaceSession = getSpaceSession;
	// event.locals.spaceSession = await getSpaceSession();
	return resolve(event);
};

export const apiAuth: Handle = async ({ event, resolve }) => {
	if (/^\/api\/editor/.test(event.url.pathname)) return resolve(event);
	if (/^\/api\/examples/.test(event.url.pathname)) return resolve(event);
	if (!/^\/api?/.test(event.url.pathname)) return resolve(event);

	const {
		request: { headers },
		locals
	} = event;
	const apiKey = headers.get('x-api-key');
	const authorization = String(headers.get('Authorization'));

	const token = new Token();
	const logger = new Error();
	const [space, spaceError] = await token.verifyApiKey(apiKey, event);

	if (!space) throw error(404, 'Space not found!');

	const record = await prisma.aPICounter.create({
		data: {
			spaceId: space.id,
			pathname: event.url.pathname,
			method: event.request.method?.toUpperCase()
		}
	});

	try {
		const [session, sessionError] = await errorCatch(token.decodeUserToken(authorization, space));
		if (sessionError) throw sessionError;
		event.locals.space = space;
		event.locals.session = { ...session, api: true };
		return resolve(event);
	} catch (e) {
		console.log(e);
		throw e;
	}
};
export const activeUser: Handle = async ({ event, resolve }) => {
	const { locals } = event;
	const session = await locals.getSession();
	if (session || dev) {
		const user = await prisma.user.findUnique({
			where: {
				email: String(session?.user?.email)
			}
		});
		event.locals.user = user;
		return resolve(event);
	}
	return resolve(event);
};

export const spaceIdHandle: Handle = async ({ event, resolve }) => {
	const start = performance.now();

	const { params, cookies, url } = event;
	const appId = params['app_id'];

	let space = null;

	const sessionToken: string = cookies.get(`${appId}-accessToken`);

	if (appId) {
		let decoded = null;
		if (sessionToken) {
			decoded = jwt.decode(sessionToken);
		}
		const isRest = /^\/rest\/(.+)/.test(url.pathname);
		const isAppAdmin = /^\/a\/(.+)/.test(url.pathname);
		const isDashboards = /^\/dashboards\/(.+)/.test(url.pathname);
		const isEditor = /^\/editor\/(.+)/.test(url.pathname);

		const withRelations = [isRest, isAppAdmin, isDashboards, isEditor];
		const hasReleations = withRelations.filter(Boolean);

		if (hasReleations[0]) {
			if (isRest) {
				space = await Space.withRestMetaData(appId, decoded?.id);
			}
			if (isAppAdmin) {
				space = await Space.withAppDetailData(appId, decoded?.id);
			}
			if (isDashboards) {
				if (params.table) {
					space = await Space.withDashboardOverviewMetaData(appId, decoded?.id);
				} else space = await Space.withDashboardData(appId, decoded?.id);
			}
			if (isEditor) {
				space = await Space.withUIData(appId, decoded?.id);
			}
		} else {
			space = await Space.findOneById(appId, decoded?.id);
		}

		event.locals.space = space;
		try {
			event.locals.spaceSession = {
				user: {
					...space.users[0],
					role: space.roles.find((role) => role.id === space?.users[0]?.userRolesId)
				}
			};
		} catch (error) {}
	}

	const end = performance.now();

	console.log(end - start, event.url.pathname);

	return resolve(event);
};

export const handle = sequence(
	withPrisma,
	apiAuth,
	authHandle,
	spaceAuth,
	withSpaceRouter,
	activeUser,
	spaceIdHandle
);

// import EmailProvider from "next-auth/providers/email";
// ...
// providers: [
//   EmailProvider({+-
//     server: {
//       host: process.env.EMAIL_SERVER_HOST,
//       port: process.env.EMAIL_SERVER_PORT,
//       auth: {
//         user: process.env.EMAIL_SERVER_USER,
//         pass: process.env.EMAIL_SERVER_PASSWORD
//       }
//     },
//     from: process.env.EMAIL_FROM
//   }),
// ],
