// @ts-nocheck

import { prisma } from '$lib/db/prisma';
import { convertToSlug } from '$lib/util/slugit';
import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ url, params }: RequestEvent) {
	let post = await prisma.blogContent.findFirst({
		where: { slug: params.slug }
	});

	if (!post) throw error(404, 'Post not found');
	return { post };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const title = String(data.get('title'));
		const coverImage = String(data.get('coverImage'));
		const content = String(data.get('content'));

		const slug = convertToSlug(title);

		const pSlug = params.slug;

		const post = await prisma.blogContent.findFirst({
			where: {
				slug: pSlug
			}
		});

		if (!post) {
			throw error(404, 'Post not found');
		}

		const pathname = String(url.pathname);
		const param = pathname.split('/blog/')[1].split('/edit')[0];

		const entry = await prisma.blogContent.update({
			data: { title, coverImage, content, slug },
			where: { id: post.id }
		});

		if (entry) throw redirect(302, `/blog/${entry.id}`);
	}
};
