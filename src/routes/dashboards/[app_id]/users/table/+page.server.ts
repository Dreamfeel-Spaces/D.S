import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const space = await prisma.space.findUnique({
		where: {
			appId: params["app_id"]
		},
		include: {
			users: true
		}
	});

	if (!space) throw error(404, 'Space not found');

	return {
		space,
		admins: space?.users?.map((adm) => {
			const date = new Date(adm.dateCreated);
			const dateStr = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
			let status = adm.status === 'pending-confirmation' ? 'Unverified' : 'Verified';
			return { ...adm, dateCreated: dateStr, status };
		})
	};
}
