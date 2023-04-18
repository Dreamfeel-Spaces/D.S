// @ts-nocheck
import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ locals, params }) {
	const session = await locals.getSession();
	const spaceSession = await locals.getSpaceSession();
	const spaceId = params['app_id'];
	let space = await prisma.space.findFirst({
		where: { appId: spaceId },
		include: { users: true, apiKeys: true }
	});

	if (!space) throw error(404, 'Page not found');

	return { space };
}

export const actions: Actions = {
	async default({ params, locals, request }) {
		const session = await locals.getSession();
		const spaceSession = await locals.getSpaceSession();

		const spaceId = params['app_id'];

		let space = await prisma.space.findFirst({
			where: { appId: spaceId },
			include: { users: true, apiKeys: true }
		});

		if (!space) throw error(404, 'Space not found');

		if (spaceSession) {
			const user = spaceSession.user;

			const token = new Token();
			const unencryptedToken = await token.randomToken();
			const formatted = `Basic ${space.appId}#${unencryptedToken}`;

			const encrypted = await token.encryptSync(formatted);

			const data = await request.formData();
			const name = String(data.get('name'));

			const apiKey = await prisma.spaceAPIKeys.create({
				data: {
					spaceId: space.id,
					key: encrypted,
					name: name
				}
			});

			const keyOwner = await prisma.adminKeys.create({
				data: {
					adminId: user?.id,
					spaceAPIKeysId: apiKey.id
				}
			});

			return { success: true, data: { ...apiKey, token: formatted } };
		}

		const token = new Token();
		const unencryptedToken = await token.randomToken();
		const formatted = `Basic ${space.appId}#${unencryptedToken}`;

		const encrypted = await token.encryptSync(formatted);

		const data = await request.formData();
		const name = String(data.get('name'));

		const apiKey = await prisma.spaceAPIKeys.create({
			data: {
				spaceId: space.id,
				// userId: user.id,
				key: encrypted,
				name: name
			}
		});

		return { success: true, data: { ...apiKey, token: formatted } };
	}
};
