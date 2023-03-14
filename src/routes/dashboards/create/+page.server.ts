//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';

export const actions = {
	async default({ request, locals }) {
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

		const form = { success: true, data: space };

		const token = new Token();

		const password = await token.createAdminPass();

		const encrypted = await token.encryptSync(password);

		return form;
	}
};
