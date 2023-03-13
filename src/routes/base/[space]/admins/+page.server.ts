// @ts-nocheck
import { prisma } from '$lib/db/prisma';

export async function load({ params }) {
	const spaceId = params.id;
	const admins = await prisma.spaceUser.findMany({
		where: { spaceId }
	});

	return { admins };
}
