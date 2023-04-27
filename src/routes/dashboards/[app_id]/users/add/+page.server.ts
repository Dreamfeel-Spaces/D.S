import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
import singupSpaceUser from '../../../../../lib/email/signupSpaceUser';
import emailHandler from '$lib/email/Email';

export async function load({ params, locals }: RequestEvent) {
	const spaceId = params['app_id'];

	//@ts-ignore
	console.log(locals.spaceSession);

	const space = await prisma.space.findUnique({
		where: {
			appId: spaceId
		},
		include: {
			roles: true
		}
	});

	return {
		space,
		roles:
			space?.roles?.map((role) => ({
				name: role.name,
				value: role.id
			})) ?? []
	};
}

export const actions: Actions = {
	async default({ request, params }) {
		const spaceId = params['app_id'];

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
				userRolesId: role,
				username,
				password
			}
		});

		const htmlEmail = singupSpaceUser({
			userName: name,
			userEmail: username,
			userPass: 'testPass123',
			ownerName: '',
			appName: space.name ?? 'Unknown app'
		});

		await emailHandler({
			firstName: name,
			lastName: '',
			email: username,
			message: htmlEmail,
			subject: `Welcome to ${space?.name}`
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
