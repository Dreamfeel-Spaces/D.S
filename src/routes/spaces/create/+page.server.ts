//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { gmailTransporter } from '$lib/mail';
import { Mailer } from '$lib/mail/Mailer';
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

		if (!user) throw error(403, 'Forbidden');

		const userId = user.id;

		const space = await prisma.space.create({
			data: {
				appId: convertToSlug(appId ?? name),
				name,
				icon,
				userId,
				secret: 'fudge'
			}
		});

		const token = new Token();
		const adminPassword = await token.createAdminPass();

		const admin = await prisma.admin.create({
			data: {
				userId,
				spaceId: space.id,
				password: adminPassword,
				role: 'owner',
				username: String(user?.email),
				name: String(user?.name),
				avatar: String(user?.image)
			}
		});

		try {
			// let info = await gmailTransporter.sendMail({
			// 	from: 'odidaprotas@gmail.com', // sender address
			// 	to: user?.email, // list of receivers
			// 	subject: 'Hello ✔. ',
			// 	text: 'Hello world?',
			// 	html: `<p>Default password: <b>${adminPassword}</b>   for space ${space.appId} </p>. Please update.`
			// });
		} catch (e) {
			console.log(e);
		}


		const form = { success: true, data: space };

		return form;
	}
};
