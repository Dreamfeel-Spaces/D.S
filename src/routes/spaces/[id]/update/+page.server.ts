//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';

export const actions = {
	async default({ request, locals, params }) {
		const session = await locals.getSession();
		if (!session) throw error(403, 'You must be signed in to create an app');
		const data = await request.formData();

		const spaceId = params.id;

		let space = await prisma.space.findFirst({
			where: { appId: spaceId },
			include: { users: true }
		});

		if (!space) throw error(404, 'Space not found');

		let user = await prisma.user.findFirst({
			where: {
				email: session.user.email
			}
		});

		function isAdmin() {
			if (user?.id !== space.userId) return true;
			return space.users.find((admin) => admin.userId === user.id);
		}

		if (!isAdmin()) throw error(403, 'You are unauthorized to perfom this action');

		const appId = String(data.get('appId'));
		const name = String(data.get('name'));
		const icon = String(data.get('icon'));

		const userId = user.id;

		const updatedSpace = await prisma.space.update({
			where: { id: space.id },
			data: {
				...space,
				appId,
				name,
				icon,
				userId
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
				userId: user?.id,
				spaceId
			}
		});

		const form = { success: true, data: updatedSpace };

		return form;
	}
};
