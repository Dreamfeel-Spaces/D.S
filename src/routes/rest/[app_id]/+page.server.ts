import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params, cookies, locals }: RequestEvent) {
	//@ts-ignore
	const space = locals.space;


	let apiSetup = await prisma.apiSetup.findFirst({
		where:{
			spaceId:space.id
		}
	})


	if (!apiSetup?.complete) {
		throw redirect(302, `/rest/${space?.appId}/quick-setup`);
	}

	const tables = await prisma.spaceTable.findMany({
		where: {
			appId: String(space?.id)
		},
		include: {
			rows: true
		}
	});

	

	return { tables, space };
}
