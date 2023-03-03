import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const tableName = params.table;
	const spaceId = params.space;

	const space = await prisma.space.findUnique({
		where: {
			appId: String(spaceId)
		}
	});

	if (!space) throw error(404, 'Space not found');

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName,
			tableSpace: String(space?.id)
		},
		include: {
			columns: true
		}
	});

	return { table };
}
