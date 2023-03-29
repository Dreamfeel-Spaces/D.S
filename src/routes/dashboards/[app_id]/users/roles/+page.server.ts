import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const id = params["app_id"];

	const space = await prisma.space.findUnique({
		where: {
			appId: id
		},
		include: { permissions: true }
	});

	if (!space) throw error(404, 'Space not found');

	return { space, roles: space.permissions };
}
