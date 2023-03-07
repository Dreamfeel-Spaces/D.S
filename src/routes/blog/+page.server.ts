import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load() {
	const posts = await prisma.blogContent.findMany({ take: 100, where: { published: true } });

	let featured = [...posts].slice(0, 4);
	let morePosts = [...posts].slice(4, 12);
	let restOfPosts = [...posts].slice(13, 100);

	return { posts: featured, more: morePosts, rest: restOfPosts };
}

export const actions: Actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const email = String(data.get('email'));
		try {
			const sub = await prisma.subscription.create({
				data: { email }
			});
			return { ...sub, success: true };
		} catch (e) {
			throw error(403, 'Request failed. You have already subscribed.');
		}
	}
};
