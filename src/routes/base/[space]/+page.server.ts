import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const spaceId = params.space;
	const space = await prisma.space.findUnique({
		where: {
			appId: String(spaceId)
		}
	});
	const tables = await prisma.spaceTable.findMany({
		where: {
			tableSpace: String(space?.id)
		},
		include: {
			rows: true
		}
	});

	// console.log(tables);

	return { tables, space };
}
