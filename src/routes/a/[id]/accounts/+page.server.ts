import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import jwt from 'jsonwebtoken';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params, cookies }: RequestEvent) {
	const spaceId = params.id;
	const cookie = cookies.get(`${spaceId}-accessToken`);

	if (cookie) {
		const decoded = jwt.decode(cookie ?? '');

		if (!decoded) return { spaceSession: null };

		return { spaceSession: { user: decoded } };
	}

	return { spaceSession: null };
}

export const actions: Actions = {
	async signin({ request, params, cookies }) {
		const spaceId = params.id;

		const data = await request.formData();
		const username = String(data.get('username')).trim();
		const password = String(data.get('password'));

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			},
			include: {
				users: true
			}
		});

		if (!space) throw error(404, 'Page not found');

		const user = await prisma.spaceUser.findFirst({
			where: {
				spaceId: space.id,
				username
			}
		});

		if (!user) return { error: true };

		const token = new Token();

		const isValidPass = await token.verify(password, String(user.password));

		if (!isValidPass) return { error: true };

		const sessionToken = await token.createUserToken(user);

		await prisma.spaceSession.create({
			data: {
				userId: user?.id,
				sessionToken,
				spaceId: String(space?.id)
			}
		});

		cookies.set(`${spaceId}-accessToken`, sessionToken, { path: '/' });
		throw redirect(302, `/a/${spaceId}`);
	},
	async signout({ cookies, params }) {
		const spaceId = params.id;
		cookies.delete(`${spaceId}-accessToken`, {
			path: '/'
		});
		return { signoutSuccess: true };
	}
};
