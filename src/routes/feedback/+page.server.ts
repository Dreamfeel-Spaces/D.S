import { prisma } from '$lib/db/prisma';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	async default({ request }) {
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

		throw redirect(302, '/');
	}
};
