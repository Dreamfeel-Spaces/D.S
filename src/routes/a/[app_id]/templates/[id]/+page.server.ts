import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function load({ params }:RequestEvent) {
	const template = await prisma.space.findUnique({
		where: {
            id:params.id
		}
	});

	return { template };
}
