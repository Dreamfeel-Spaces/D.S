import { prisma } from '$lib/db/prisma';
import { convertToSlug } from '$lib/util/slugit';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	async default({ locals, request }) {
		const session = await locals.getSession();
		const user = await prisma.user.findUnique({
			where: {
				email: String(session?.user?.email)
			}
		});

		if (!user) throw error(404, 'User not found');

		const data = await request.formData();

		const name = String(data.get('name'));
		const icon = String(data.get('icon'));

		const space = await prisma.space.create({
			data: {
				appId: convertToSlug(name),
				name,
				icon,
				userId: user.id,
				template: true
			}
		});

		const template = await prisma.spaceUI.create({
			data: {
				name,
				template: true,
				spaceId: space.id,
				userId: user.id
			}
		});

		const indexVersion = await prisma.spaceUIVersion.create({
			data: {
				spaceUIId: template.id,
				userId: user.id,
				default: true
			}
		});

		return { success: true, data: indexVersion };
	}
};
