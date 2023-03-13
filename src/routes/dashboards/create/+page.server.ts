//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { convertToSlug } from '$lib/util/slugit';
import { error } from '@sveltejs/kit';

export const actions = {
	async default({ request, locals }) {
		const session = await locals.getSession();
		if (!session) throw error(403, { message: 'You must be signed in to create an app' });
		const data = await request.formData();

		const appId = String(data.get('appId'));
		const name = String(data.get('name'));
		const icon = String(data.get('icon'));

		let user = await prisma.user.findFirst({
			where: {
				email: session.user.email
			}
		});

		const userId = user.id;

		// const space = await prisma.space.create({
		// 	data: {
		// 		appId: convertToSlug(appId ?? name),
		// 		name,
		// 		icon,
		// 		userId,
		// 		secret: 'fudge'
		// 	}
		// });

		const form = { success: true, data: space };

		const token = new Token();

		const password = await token.createAdminPass();

		const encrypted = await token.encryptSync(password);

		// const spaceUser = await prisma.spaceUser.create({
		// 	data: {
		// 		spaceId: space.id,
		// 		password: encrypted
		// 	}
		// });
		return form;
	}
};
