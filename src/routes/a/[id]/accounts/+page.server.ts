import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import jwt from 'jsonwebtoken';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params, cookies }: RequestEvent) {
	const spaceId = params.id;
	const cookie = cookies.get(`${spaceId}-accessToken`);

	const decoded = jwt.decode(cookie ?? '');

	if (!decoded) return { spaceSession: null };

	return { spaceSession: { user: decoded } };
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

		if (spaceId === 'demo') {
			if (username === 'admin@company.mail' && password === 'testPass123') {
				const admin = await prisma.spaceUser.findFirst({
					where: {
						username,
						spaceId: space?.id
					}
				});

				if (admin) {
					const token = new Token();
					const sessionToken = await token.createUserToken(admin);
					const session = await prisma.spaceSession.create({
						data: {
							adminId: admin.id,
							sessionToken,
							spaceId: String(space?.id)
						}
					});

					cookies.set(`${spaceId}-accessToken`, sessionToken, { path: '/' });
					throw redirect(302, `/a/${spaceId}`);
				} else throw error(404, 'User not found');
			} else {
				throw error(403, 'Incorrect credentials provided');
			}
		}
		const user = space.users.find((u) => u.username === username);

		if (!user) return {};

		const token = new Token();
		const sessionToken = await token.createUserToken(user);
		await prisma.spaceSession.create({
			data: {
				adminId: user?.id,
				sessionToken,
				spaceId: String(space?.id)
			}
		});

		cookies.set(`${spaceId}-accessToken`, sessionToken, { path: '/' });
		throw redirect(302, `/a/${spaceId}`);
	},
	async signout({ cookies, params }) {
		const spaceId = params.id;
		const cookie = cookies.delete(`${spaceId}-accessToken`);
		return { signoutSuccess: true };
	}
};
