import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const spaceId = params["app_id"];
	const space = await prisma.space.findUnique({
		where: {
			appId: spaceId
		},
		include: {
			logs: {
				take: 30
			}
		}
	});

	if (!space) throw error(404, 'Space not found');

	return { space, logs: space.logs };
}
