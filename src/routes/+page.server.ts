//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import type { RequestEvent, Actions } from './$types';

export async function load({}: RequestEvent) {
	
	const posts = await prisma.blogContent.findMany({
		take: 4,
		where: {
			published: true
		}
	});

	return {  posts };
}

