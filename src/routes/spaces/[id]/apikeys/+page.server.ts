// @ts-nocheck
import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ locals, params }) {
	const session = await locals.getSession();
	if (!session) throw error(403, 'You must be signed in to view this page');

	const spaceId = params.id;

	let space = await prisma.space.findFirst({
		where: { appId: spaceId },
		include: { admins: true, apiKeys: true }
	});

	if (!space) throw error(404, 'Space not found');

	let user = await prisma.user.findFirst({
		where: {
			email: session.user.email
		}
	});

	function isAdmin() {
		if (user?.id === space?.userId) return true;
		return space?.admins.find((admin) => admin.userId === user?.id);
	}

	if (!isAdmin()) throw error(403, 'You are unauthorized to view this page');

	return { space };
}

export const actions: Actions = {
	async default({ params, locals, request }) {
		const session = await locals.getSession();
		if (!session) throw error(403, 'You must be signed in to view this page');

		const spaceId = params.id;

		let space = await prisma.space.findFirst({
			where: { appId: spaceId },
			include: { admins: true, apiKeys: true }
		});

		if (!space) throw error(404, 'Space not found');

		if (space.apiKeys.length)
			throw error(403, 'API Key already exist. Delete existing key and try again');

		let user = await prisma.user.findFirst({
			where: {
				email: session.user.email
			}
		});

		function isAdmin() {
			if (user?.id === space?.userId) return true;
			return space?.admins.find((admin) => admin.userId === user?.id);
		}

		if (!isAdmin()) throw error(403, 'You are unauthorized to view this page');

		const token = new Token();
		const unencryptedToken = await token.randomToken();
		const formatted = `Basic ${space.appId}#${unencryptedToken}`;

		const encrypted = await token.encryptSync(formatted);

		const data = await request.formData();
		const name = String(data.get('name'));

		const apiKey = await prisma.spaceAPIKeys.create({
			data: {
				spaceId: space.id,
				userId: user.id,
				key: encrypted,
				name: name
			}
		});

		return { success: true, data: { ...apiKey, token: formatted } };
	}
};
