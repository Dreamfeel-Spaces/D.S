import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { error } from '@sveltejs/kit';

export async function load({ params }: RequestEvent) {
	// let spaceId = par

	const space = await prisma.space.findUnique({
		where: {
			appId: 'demo'
		}
	});

	if (!space) throw error(404, 'Space not found');

	return { space };
}
