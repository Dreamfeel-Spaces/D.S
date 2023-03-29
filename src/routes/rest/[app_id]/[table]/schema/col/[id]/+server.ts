import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function DELETE({ params }: RequestEvent) {
	const colId = params["app_id"];

	const col = await prisma.column.deleteMany({
		where: {
			id: colId
		}
	});

	return new Response();
}
