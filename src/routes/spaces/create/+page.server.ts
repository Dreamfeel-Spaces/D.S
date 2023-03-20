//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { convertToSlug } from '$lib/util/slugit';
import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

import nodemailer from 'nodemailer';
import { GMAIL_PASSWORD, GMAIL_USERNAME } from '$env/static/private';

export async function load({ locals }: RequestEvent) {
	const session = await locals.getSession();

	if (!session) throw redirect(302, `/accounts`);
}

export const actions = {
	async default({ request, locals }) {
		const session = await locals.getSession();
		if (!session) throw error(403, { message: 'You must be signed in to create an app' });
		const data = await request.formData();

		const appId = String(data.get('appId'));
		const name = String(data.get('name'));
		const icon = String(data.get('icon'));

		let user = await prisma.user.findUnique({
			where: {
				email: session.user.email
			}
		});

		if (!user) throw error(403, 'Forbidden');

		const userId = user.id;

		try {
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

			const ownerRole = await prisma.userRoles.create({
				data: {
					name: 'SUPER_USER',
					spaceId: space.id,
					description: `Global rights and permissions`,
					isSuperUser: true
				}
			});

			const admin = await prisma.spaceUser.create({
				data: {
					userId,
					spaceId: space.id,
					password: adminPassword,
					userRolesId: ownerRole.id,
					username: String(user?.email),
					name: String(user?.name),
					avatar: String(user?.image),
					roleId: ownerRole.id
				}
			});

			let transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 465,
				secure: false, // true for 465, false for other ports
				auth: {
					user: GMAIL_USERNAME, // generated ethereal user
					pass: GMAIL_PASSWORD // generated ethereal password
				}
			});

			await transporter.sendMail({
				from: '"Fred Foo 👻" <foo@example.com>', // sender address
				to: `bryodiiidah@gmail.com`, // list of receivers
				subject: 'Hello ✔', // Subject line
				text: 'Hello world?', // plain text body
				html: `Admin username: ${user.email}: Password :${adminPassword}` // html body
			});

			const form = { success: true, data: space };
			return form;
		} catch (e) {
			console.log(e)
			return { error: true };
		}
	}
};
