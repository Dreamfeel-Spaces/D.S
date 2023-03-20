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
		},
		include: {
			apiSetup: true
		}
	});
	const tables = await prisma.spaceTable.findMany({
		where: {
			appId: String(space?.id)
		},
		include: {
			rows: true
		}
	});

	// if (!space?.apiSetup.length) {
	// const onboarding = await prisma.onboarding.create({
	// 	data: {
	// 		spaceId: space.id
	// 	}
	// });
	// 	throw redirect(302, `/base/${space?.appId}/welcome`);
	// }

	// console.log(tables);''=

	if (!space?.apiSetup[0].complete) {
		throw redirect(302, `/base/${space?.appId}/quick-setup`);
	}

	return { tables, space };
}
