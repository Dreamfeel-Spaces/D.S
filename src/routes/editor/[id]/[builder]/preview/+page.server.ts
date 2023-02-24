import { prisma } from '$lib/db/prisma';
import type { Actions, RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const spaceId = params.id;
	const versionId = params.builder;

	const space = await prisma.space.findUnique({
		where: {
			id: spaceId
		}
	});

	const ui = await prisma.spaceUIVersion.findUnique({
		where: {
			id: versionId
		},
		include: {
			pages: {
				include: {
					components: true
				}
			}
		}
	});

	return { space, ui };
}
