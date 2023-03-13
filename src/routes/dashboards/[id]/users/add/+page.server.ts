import { prisma } from '$lib/db/prisma';
import { gmailTransporter } from '$lib/mail';
import { Token } from '$lib/token/Token';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const spaceId = params.id;

	const space = await prisma.space.findUnique({
		where: {
			appId: spaceId
		},
		include: {
			permissions: true
		}
	});

	return {
		space,
		roles: space?.permissions ?? []
	};
}

export const actions: Actions = {
	async default({ request, params }) {
		const spaceId = params.id;

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});

		if (!space) throw error(404, 'Space not found');

		const data = await request.formData();
		const token = new Token();
		let password = await token.createAdminPass();

		const role = String(data.get('role'));
		const username = String(data.get('email'));
		const name = String(data.get('fullname'));

		const user = await prisma.spaceUser.create({
			data: {
				spaceId: space.id,
				name,
				role,
				username,
				password
			}
		});

		// let info = await gmailTransporter.sendMail({
		// 	from: '"Fred Foo " info@dreamfeel.io', // sender address
		// 	to: username, // list of receivers
		// 	subject: 'Hello ✔. ',
		// 	text: 'Hello world?',
		// 	html: `<p>Default password: <b>${password}</b>   for space ${space.appId} </p>. Please update.`
		// });

		// console.log('Message sent: %s', info.messageId);

		return { userCreateSuccess: true, data: user };
	}
};
