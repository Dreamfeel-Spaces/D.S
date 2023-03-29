//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { convertToSlug } from '$lib/util/slugit';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	async default({ params, locals, request }) {
		let space = await prisma.space.findFirst({
			where: { appId: String(params["app_id"]) },
			include: { users: true }
		});

		if (!space) throw error(404, 'Space not found');

		const data = await request.formData();

		const name = String(data.get('name')).trim().toLowerCase();

		const existing = await prisma.spaceTable.findFirst({
			where: {
				name,
				appId: space.id
			}
		});

		if (existing) throw error(403, `Table already exists with name ${name}`);

		const table = await prisma.spaceTable.create({
			data: {
				name: convertToSlug(name)
			}
		});

		const updateSpace = await prisma.space.update({
			where: {
				id: space.id
			},
			data: {
				tables: {
					connect: {
						id: table.id
					}
				}
			}
		});

		console.log(updateSpace);

		return { success: true, data: table };
	}
};
