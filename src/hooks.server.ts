// @ts-nocheck
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { Adapter } from '@auth/core/adapters';

import jwt from 'jsonwebtoken';

import { GITHUB_ID, GITHUB_SECRET, NEXTAUTH_URL } from '$env/static/private';
import { prisma } from './lib/db/prisma';
import { sequence } from '@sveltejs/kit/hooks';
import { error, type Handle, type HandleFetch, type HandleServerError } from '@sveltejs/kit';
import { Pages } from '$lib/plugins/pages/Pages';
import { errorCatch, isReservedRoute } from '$lib/util/slugit';
import { Token } from '$lib/token/Token';
import { dev } from '$app/environment';

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
	}
});

export const withSpaceRouter = async ({ event, resolve }: Handle) => {
	const pathname = event.url.pathname;

	const isReserved = isReservedRoute(pathname);

	const pageManager = new Pages({ url: event.url });

	if (isReserved && !pageManager.isValidSubdomain) return resolve(event);

	if (pageManager.isValidSubdomain) {
		const [html, htmlError] = await pageManager.renderPage({
			renderSubdomainApp: true,
			subdomain: pageManager.sbd
		});
		if (htmlError) throw htmlError;
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
	console.log(error);
	return { message: 'Error' };
};

export const spaceAuth: Handle = async ({ event, resolve }) => {
	if (/^\/api\/examples/.test(event.url.pathname)) return resolve(event);
	if (/^\/api?/.test(event.url.pathname)) return resolve(event);
	const { cookies } = event;

	async function getSpaceSession() {
		try {
			const sessionToken = cookies.get(`${event.params.id}-accessToken`);
			const decoded = jwt.decode(sessionToken);
			return { user: decoded };
		} catch (e) {
			return null;
		}
	}
	event.locals.getSpaceSession = getSpaceSession;
	event.locals.spaceSession = await getSpaceSession();
	return resolve(event);
};

export const apiAuth: Handle = async ({ event, resolve }) => {
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

	try {
		const [session, sessionError] = await errorCatch(token.decodeUserToken(authorization, space));
		if (sessionError) throw sessionError;
		event.locals.space = space;
		event.locals.session = { ...session, api: true };
		return resolve(event);
	} catch (e) {
		throw e;
	}
};

export const handle = sequence(apiAuth, authHandle, spaceAuth, withSpaceRouter);

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
