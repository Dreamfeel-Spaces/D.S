// @ts-nocheck
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { Adapter } from '@auth/core/adapters';

import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { prisma } from './lib/db/prisma';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { Pages } from '$lib/plugins/pages/Pages';

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
	}
});

export const withSpaceRouter = async ({ event, resolve }: Handle) => {
	const pathname = event.url.pathname;

	let isAccounts = /^\/accounts/.test(pathname);
	let isAdmin = /^\/admin/.test(pathname);
	let isApi = /^\/api/.test(pathname);
	let isApps = /^\/apps/.test(pathname);
	let isBase = /^\/base/.test(pathname);
	let isSpaces = /^\/spaces/.test(pathname);
	let isBlog = /^\/blog/.test(pathname);
	let isDashboards = /^\/dashboards/.test(pathname);
	let isDeactivated = /^\/deactivated/.test(pathname);
	let isEditor = /^\/editor/.test(pathname);
	let isExample = /^\/example/.test(pathname);
	let isPdf = /^\/pdf/.test(pathname);
	let isHome = /^\/$/.test(pathname);
	let isAbout = /^\/about/.test(pathname);
	let isDocs = /^\/docs/.test(pathname);

	let reservedRoutes = [
		isAccounts,
		isAdmin,
		isApi,
		isApps,
		isBase,
		isBlog,
		isDashboards,
		isDeactivated,
		isEditor,
		isExample,
		isPdf,
		isSpaces,
		isHome,
		isAbout,
		isBlog,
		isDocs
	];

	const isReserved = reservedRoutes.filter(Boolean).length;

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

export const handle = sequence(authHandle, withSpaceRouter);
