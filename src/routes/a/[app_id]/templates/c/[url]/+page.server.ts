import { prisma } from '$lib/db/prisma';

export async function load({ params }) {
	const templates = await prisma.space.findMany({
		where: {
			template: true,
			tempCat: params.url
		}
	});

	return { templates };
}
