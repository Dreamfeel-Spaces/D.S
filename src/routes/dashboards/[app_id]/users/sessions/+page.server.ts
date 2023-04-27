import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
export async function load({ locals }: RequestEvent) {
	//@ts-ignore
	const space = locals.space;

	const sessions = await prisma.spaceSession.findMany({
		where: {
			spaceId: space?.id
		},
		include: {
			user: true
		}
	});

	return { sessions };
}
