//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	async default({ request, locals, params }) {
		const data = await request.formData();
		const spaceId = params.id;

		const space = await prisma.space.findUnique({ where: { appId: spaceId } });

		if (!space) throw error(404, 'Space not found');

		const session = await locals.getSession();

		if (!session) throw error(403, 'Session not found');

		const user = await prisma.user.findUnique({
			where: {
				email: session?.user?.email
			}
		});

		if (!user) throw (403, 'Unauthorized');

		const name = String(data.get('name'));

		const ui = await prisma.spaceUI.create({
			data: { spaceId: String(space.id), name, userId: String(user.id) }
		});

		const versionOne = await prisma.spaceUIVersion.create({
			data: {
				spaceUIId: String(ui.id),
				default: true,
				version: 1
			}
		});

		const page = await prisma.page.create({
			data: {
				spaceUIVersionId: versionOne.id,
				name: 'index',
				path: '/'
			}
		});

		return { success: true, data: { ...ui, version: versionOne } };
	}
};
