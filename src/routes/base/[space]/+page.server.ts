import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const spaceId = params.space;
	const tables = await prisma.spaceTable.findMany({
		where: {
			tableSpace: spaceId
		}
	});

	const space = await prisma.space.findUnique({
		where: {
			id: String(spaceId)
		}
	});
	// console.log(tables);

	return { tables, space };
}
