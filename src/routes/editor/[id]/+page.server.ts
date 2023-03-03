import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
export async function load({ params }: RequestEvent) {
	const space = await prisma.space.findUnique({
		where: {
			appId: params.id
		},
		include: {
			spaceUis: {
				include: {
					spaceUIVersion: true
				}
			}
		}
	});

	return { space };
}
