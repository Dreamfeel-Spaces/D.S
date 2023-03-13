import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params, cookies }: RequestEvent) {
	const spaceId = params.space;

	const cookie = cookies.get(`${spaceId}-accessToken`);

	if (!cookie) throw redirect(302, `/a/${spaceId}/accounts`);

	const space = await prisma.space.findUnique({
		where: {
			appId: String(spaceId)
		}
	});
	const tables = await prisma.spaceTable.findMany({
		where: {
			tableSpace: String(space?.id)
		},
		include: {
			rows: true
		}
	});

	// console.log(tables);

	return { tables, space };
}
