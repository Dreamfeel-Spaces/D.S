import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function GET({ params }: RequestEvent) {
	const appId = params.draftId;

	const space = await prisma.space.findUnique({
		where: {
			appId
		}
	});

	const isExist = Boolean(space);

	return new Response(JSON.stringify(isExist));
}
