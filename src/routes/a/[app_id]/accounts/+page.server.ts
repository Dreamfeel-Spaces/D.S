import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import jwt from 'jsonwebtoken';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params, cookies, locals }: RequestEvent) {
	
	//@ts-ignore
	const spaceSession = locals.spaceSession;
	return { spaceSession };
}

export const actions: Actions = {
	async signin({ request, params, cookies }) {
		const spaceId = params['app_id'];

		const data = await request.formData();
		const username = String(data.get('username'));
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

		if (!user) return { error: true, data: { msg: 'User account does not exist' } };

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
		const spaceId = params['app_id'];
		cookies.delete(`${spaceId}-accessToken`, {
			path: '/'
		});
		return { signoutSuccess: true };
	},
	async updatePassword({ cookies, params, request, locals, url }) {
		//@ts-ignore
		const user = locals.user;
		const data = await request.formData();
		const password = String(data.get('password'));
		const token = new Token();
		const encryptedPassword = await token.encryptSync(password);

		const space = await prisma.space.findUnique({
			where: {
				appId: params['app_id']
			}
		});

		const sessionToken: any = cookies.get(`${space?.appId}-accessToken`);

		const tokenUser: any = jwt.decode(sessionToken);

		const _user = await prisma.spaceUser.findFirst({
			where: {
				id: tokenUser?.id
			}
		});

		if (!_user) {
			throw error(401);
		}

		const spaceUser = await prisma.spaceUser.update({
			where: {
				id: _user.id
			},
			data: {
				password: encryptedPassword,
				defaultPasswordUpdated: true
			}
		});

		const newSessionToken = await token.createUserToken(spaceUser);

		await prisma.spaceSession.create({
			data: {
				userId: user?.id,
				sessionToken: newSessionToken,
				spaceId: String(space?.id)
			}
		});

		cookies.set(`${space?.appId}-accessToken`, newSessionToken, { path: '/' });

		const next = url.searchParams.get('next');
		if (next) throw redirect(302, next);
	}
};
