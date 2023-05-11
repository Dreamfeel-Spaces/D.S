import { prisma } from '$lib/db/prisma.js';

export async function load({ params }) {
	const template = await prisma.space.findUnique({
		where: {
            id:params.id
		}
	});

	return { template };
}
