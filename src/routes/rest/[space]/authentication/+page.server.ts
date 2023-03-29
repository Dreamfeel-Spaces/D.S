import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const spaceId = params.space;
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
	
	return { permissions, space };
}
