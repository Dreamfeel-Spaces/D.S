//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import type { RequestEvent, Actions } from './$types';

export async function load({}: RequestEvent) {
	const miniApps = await prisma.space.findMany({
		where: {
			miniAppChannel: true
		}
	});

	const posts = await prisma.blogContent.findMany({
		take: 4,
		where: {
			published: true
		}
	});

	return { apps: miniApps, posts };
}

export const actions: Actions = {
	async feedback({ request }) {
		const data = await request.formData();
		const name = String(data.get('name'));
		const email = String(data.get('email'));
		const message = String(data.get('message'));

		const feedback = await prisma.msgFeedback.create({
			data: {
				name,
				email,
				message,
				screenshot: 'none.png'
			}
		});

		return { feedbackSuccess: true, data: feedback };
	}
};
