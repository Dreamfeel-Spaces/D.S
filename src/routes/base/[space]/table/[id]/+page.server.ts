//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const tableId = params.id;
	const spaceId = params.space;

	const space = await prisma.space.findFirst({
		where: { appId: spaceId },
		include: { users: true }
	});

	const table = await prisma.spaceTable.findFirst({
		where: { name: tableId, appId: space.id },
		include: {
			rows: {
				include: {
					tableData: true
				}
			},
			columns: true
		}
	});

	if (table?.spaceId !== space.id) throw error(404, 'Table not found!');

	return { table };
}
