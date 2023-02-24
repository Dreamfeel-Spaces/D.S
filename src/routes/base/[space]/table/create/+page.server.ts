//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { convertToSlug } from '$lib/util/slugit';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	async default({ params, locals, request }) {
		const session = await locals.getSession();
		if (!session) throw error(403, 'You must be authenticated!');

		const spaceId = params.space;

		let space = await prisma.space.findFirst({
			where: { id: spaceId },
			include: { admins: true }
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

		const data = await request.formData();

		const name = String(data.get('name')).trim().toLowerCase();

		const existing = await prisma.spaceTable.findFirst({
			where: {
				name,
				tableSpace: space.id
			}
		});

		if (existing) throw error(403, `Table already exists with name ${name}`);

		const table = await prisma.spaceTable.create({
			data: {
				name: convertToSlug(name),
				userId: String(user.id),
				tableSpace: String(spaceId)
			}
		});

		return { success: true, data: table };
	}
};
