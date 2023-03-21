import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const spaceId = params.id;
}

export const actions: Actions = {
	async default({ request, params, cookies }) {
		const spaceId = params.id;

		const data = await request.formData();
		const username = String(data.get('username'));
		const password = String(data.get('password'));

		if (spaceId === 'demo') {
			if (username === 'admin@company.mail' && password === 'testPass123') {
				const space = await prisma.space.findUnique({
					where: {
						appId: spaceId
					},
					include: {
						users: true
					}
				});

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
							userId: admin.id,
							sessionToken,
							spaceId: String(space?.id)
						}
					});

					cookies.set(`${spaceId}-accessToken`, sessionToken);
					throw redirect(302, `/spaces/${spaceId}`);
				} else throw error(404, 'User not found');
			} else {
				throw error(403, 'Incorrect credentials provided');
			}
		}
	}
};
