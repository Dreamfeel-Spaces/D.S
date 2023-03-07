// @ts-nocheck

import { prisma } from '$lib/db/prisma';

export async function load() {
	const posts = await prisma.blogContent.findMany({
		where: {
			published: false
		}
	});

	return { posts };
}
