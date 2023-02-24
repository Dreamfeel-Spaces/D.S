import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	async default({ params, locals }) {
		const uiId = params.ui;

		const session = await locals.getSession();

		const user = await prisma.user.findUnique({
			where: {
				email: String(session?.user?.email)
			}
		});

		if (!user) throw error(403, 'Unauthorized');

		const count = await prisma.spaceUIVersion.count({
			where: {
				spaceUIId: uiId
			}
		});

		const uiVersion = await prisma.spaceUIVersion.create({
			data: {
				version: count + 1,
				spaceUIId: String(uiId),
				userId: String(user.id)
			}
		});

		return { success: true, data: uiVersion };
	}
};
