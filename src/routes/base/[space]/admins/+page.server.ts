// @ts-nocheck
import { prisma } from '$lib/db/prisma';

export async function load({ params }) {
	const spaceId = params.id;
	const admins = await prisma.admin.findMany({
		where: { spaceId }
	});

	return { admins };
}
