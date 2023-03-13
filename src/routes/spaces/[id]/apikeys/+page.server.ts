// @ts-nocheck
import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ locals, params }) {
	const session = await locals.getSession();
	const spaceSession = await locals.getSpaceSession();
	const spaceId = params.id;
	let space = await prisma.space.findFirst({
		where: { appId: spaceId },
		include: { users: true, apiKeys: true }
	});

	if (!space) throw error(404, 'Page not found');

	if (spaceSession) {
		const spaceSessionUser = spaceSession.user;
		const admin = space.users.find((admin) => admin.username === spaceSessionUser.username);

		if (admin.role === 'admin' && spaceSessionUser.spaceId === space.id) {
			return { space };
		}

		if (!space) throw error(404, 'Unauthorized');
	}
	if (session) {
		let user = await prisma.user.findFirst({
			where: {
				email: session.user.email
			}
		});

		function isAdmin() {
			if (user?.id === space?.userId) return true;
			return space?.users.find((admin) => admin.userId === user?.id);
		}

		if (!isAdmin()) throw error(403, 'You are unauthorized to view this page');

		return { space };
	} else throw error(403, 'You must be signed in to view this page');
}

export const actions: Actions = {
	async default({ params, locals, request }) {
		const session = await locals.getSession();
		const spaceSession = await locals.getSpaceSession();

		const spaceId = params.id;

		let space = await prisma.space.findFirst({
			where: { appId: spaceId },
			include: { users: true, apiKeys: true }
		});

		if (!space) throw error(404, 'Space not found');

		if (spaceSession) {
			const user = spaceSession.user;
			function isAdmin() {
				if (user?.id === space?.userId) return true;
				return space?.users.find((admin) => admin.id === user?.id);
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

		if (!session) throw error(403, 'You must be signed in to view this page');

		let user = await prisma.user.findFirst({
			where: {
				email: session.user.email
			}
		});

		function isAdmin() {
			if (user?.id === space?.userId) return true;
			return space?.users.find((admin) => admin.userId === user?.id);
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
