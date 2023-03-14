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

		const name = String(data.get('name'));

		const ui = await prisma.spaceUI.create({
			data: { spaceId: String(space.id), name }
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
