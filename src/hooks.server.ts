// @ts-nocheck
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { Adapter } from '@auth/core/adapters';

import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { prisma } from './lib/db/prisma';

export const handle = SvelteKitAuth({
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

export async function jwtHandler({ event, resolve }) {
	const { headers } = event.request;
	const cookies = parse(headers.get('cookie') ?? '');

	if (cookies.AuthorizationToken) {
		const token = cookies.AuthorizationToken.split(' ')[1];
		try {
			const jwtUser = jwt.verify(token, import.meta.env.VITE_JWT_ACCESS_SECRET);
			if (typeof jwtUser === 'string') {
				throw new Error('Something went wrong');
			}

			const user = await db.user.findUnique({
				where: {
					id: jwtUser.id
				}
			});

			if (!user) {
				throw new Error('User not found');
			}

			const sessionUser: SessionUser = {
				id: user.id,
				email: user.email
			};

			event.locals.user = sessionUser;
	} catch (error) {
			console.error(error);
		}
	}
	return await resolve(event)
}

function parse(cookie) {
	return cookie;
}
