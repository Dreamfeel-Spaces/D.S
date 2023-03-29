//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';

export const actions = {
	async default({ request, locals, params }) {
		const session = await locals.getSession();

		const spaceId = params.id;

		let space = await prisma.space.findFirst({
			where: { appId: spaceId },
			include: { users: true }
		});

		if (!space) throw error(404, 'Space not found');

		const appId = String(data.get('appId'));
		const name = String(data.get('name'));
		const icon = String(data.get('icon'));


		const updatedSpace = await prisma.space.update({
			where: { id: space.id },
			data: {
				...space,
				appId,
				name,
				icon,
			}
		});

		const updatedFields = Object.keys(updatedSpace)
			.map((fieldName) => {
				if (updatedSpace[fieldName] !== space[fieldName]) return fieldName;
				return null;
			})
			.filter(Boolean);

		const updatedFieldsStr = updatedFields.reduce((prev, curr) => prev?.concat(`${curr},`), '');

		await prisma.spaceUpdate.create({
			data: {
				fields: updatedFieldsStr,
				spaceId
			}
		});

		const form = { success: true, data: updatedSpace };

		return form;
	}
};
