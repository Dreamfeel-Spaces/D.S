import { prisma } from '$lib/db/prisma.js';

export async function load({ locals }) {
	const templates = await prisma.space.findMany({
		where: {
			template: true
		}
	});

	return { templates };
}
