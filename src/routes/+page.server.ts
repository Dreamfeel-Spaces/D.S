import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function load({locals}: RequestEvent) {
	const miniApps = await prisma.space.findMany({
		where: {
			miniAppChannel: true
		}
	});

	return { apps: miniApps };
}
