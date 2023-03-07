import { prisma } from '$lib/db/prisma';
import type { Actions, RequestEvent } from './$types';

export async function load({ params, locals }: RequestEvent) {
	const spaceId = params.id;
	const space = await prisma.space.findUnique({
		where: {
			appId: spaceId
		},
		include: {
			permissions: true
		}
	});

	return { permissions: space?.permissions ?? [] };
}
