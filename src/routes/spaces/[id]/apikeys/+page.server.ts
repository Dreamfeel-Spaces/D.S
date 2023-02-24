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
		where: { id: spaceId },
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
	async default({ params, locals }) {
		const session = await locals.getSession();
		if (!session) throw error(403, 'You must be signed in to view this page');

		const spaceId = params.id;

		let space = await prisma.space.findFirst({
			where: { id: spaceId },
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

		const token = new Token();
		const unencryptedToken = await token.randomToken();
		const formatted = `${space.appId}--${space.id}--${unencryptedToken}`;

		const encrypted = await token.encryptSync(formatted);

		const apiKey = await prisma.spaceAPIKeys.create({
			data: {
				spaceId: space.id,
				userId: user.id,
				key: encrypted
			}
		});

		return { success: true, data: { ...apiKey, token: formatted } };
	}
};
