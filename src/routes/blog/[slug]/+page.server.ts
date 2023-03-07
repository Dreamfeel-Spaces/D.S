// @ts-nocheck
import { prisma } from '$lib/db/prisma';
import { error, redirect } from '@sveltejs/kit';

export async function load({ url, params, locals }) {
	const pathname = String(url.pathname);
	const param = params.slug;
	const session = await locals.getSession();
	let post = await prisma.blogContent.findFirst({
		where: { slug: param },
		include: { comments: true }
	});

	let other = await prisma.blogContent.findMany({
		take: 10
	});

	other = [...other].filter(({ id }) => id !== param);

	if (!post) {
		throw redirect(302, '/blog');
	}

	return { post, more: other };
}

/** @type {import('./$types').Actions} */
export const actions = {
	actions: async ({ request }) => {
		const data = await request.formData();
		const id = String(data.get('id'));
		const isDelete = String(data.get('isDelete'));
		if (isDelete === 'false') {
			let post = await prisma.blogContent.findFirst({
				where: { id }
			});

			if (post.published) {
				const entry = await prisma.blogContent.update({
					where: { id },
					data: { published: false }
				});
				return entry;
			} else {
				const entry = await prisma.blogContent.update({
					where: { id },
					data: { published: true }
				});
				return entry;
			}
		} else
			await prisma.blogContent.delete({
				where: { id: id }
			});

		throw redirect(302, '/blog');
	},
	async comment({ request, locals, params }) {
		const data = await request.formData();
		const slug = params.slug;

		const post = await prisma.blogContent.findFirst({
			where: {
				slug
			}
		});

		if (!post) {
			throw error(404, 'Post not found');
		}

		const content = data.get('content');
		const session = await locals.getSession();
		if (!session) {
			throw error(403, 'You must be signed in to add comments');
		}

		const user = await prisma.user.findUnique({
			where: {
				email: session?.user?.email
			}
		});

		const comment = await prisma.comment.create({
			data: {
				content,
				blogContentId: String(post.id),
				authorName: session.user.name,
				authorEmail: session.user.email,
				userId: String(user?.id)
			}
		});
		return { ...comment, success: true };
	}
};
