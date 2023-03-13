//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const tableId = params.id;
	const spaceId = params.space;

	const session = await locals.getSession();

	if (!session) throw error(403, 'Authorization failed');

	const space = await prisma.space.findFirst({
		where: { appId: spaceId },
		include: { users: true }
	});
	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	});

	function isAdmin() {
		if (user?.id === space?.userId) return true;
		return space?.users.find((admin) => admin.userId === user?.id);
	}

	if (!isAdmin()) throw error(403, 'You are unauthorized to view this page');

	const table = await prisma.spaceTable.findFirst({
		where: { name: tableId, tableSpace: space.id },
		include: {
			rows: {
				include: {
					tableData: true
				}
			},
			columns: true
		}
	});

	console.log(table?.tableSpace, space.id);

	if (table?.tableSpace !== space.id) throw error(404, 'Table not found!');

	return { table };
}
