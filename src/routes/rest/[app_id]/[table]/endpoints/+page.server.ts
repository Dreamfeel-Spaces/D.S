import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const tableName = params.table;
	const spaceId = params['app_id'];
	const space = await prisma.space.findUnique({
		where: {
			appId: String(spaceId)
		}
	});
	const permissions = await prisma.permission.findMany({
		where: {
			spaceId: String(space?.id)
		}
	});
	let table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName,
			appId: space?.id
		},
		include: {
			columns: true
		}
	});
	return {
		table,
		permissions,
		space
	};
}
