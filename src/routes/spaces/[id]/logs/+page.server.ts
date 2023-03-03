import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const spaceId = params.id;
	const space = prisma.space.findUnique({
		where: {
			appId: spaceId
		},
		include: {
			logs: true
		}
	});

	if (!space) throw error(404, 'Space not found');

	return { space };
}
