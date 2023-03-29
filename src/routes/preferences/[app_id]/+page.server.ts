//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { convertToSlug } from '$lib/util/slugit';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoadEvent, Actions } from './$types';

export const actions: Actions = {
	async updateChannels({ request, params }) {
		const data = await request.formData();

		const appId = params["app_id"];

		const space = await prisma.space.findUnique({
			where: {
				appId: String(appId)
			}
		});

		if (!space) throw error(404, 'Could not find this space');

		const miniAppChannel = String(data.get('customDomainChannel') ?? 'false');
		const apiChannel = String(data.get('apiChannel') ?? 'false');
		const subdomainChannel = String(data.get('subdomainChannel') ?? 'false');
		const customDomainChannel = String(data.get('customDomainChannel') ?? 'false');
		const standaloneMobileChannel = String(data.get('standaloneMobileChannel') ?? 'false');
		const standaloneDesktopChannel = String(data.get('standaloneDesktopChannel') ?? 'false');

		const updatedSpace = await prisma.space.update({
			where: { id: space.id },
			data: {
				miniAppChannel: JSON.parse(miniAppChannel),
				apiChannel: JSON.parse(apiChannel),
				subdomainChannel: JSON.parse(subdomainChannel),
				customDomainChannel: JSON.parse(customDomainChannel),
				standaloneMobileChannel: JSON.parse(standaloneMobileChannel),
				standaloneDesktopChannel: JSON.parse(standaloneDesktopChannel)
			}
		});

		return { apiUpdateSuccess: true, data: updatedSpace };
	},
	async addAdmin({ request, params }) {
		const data = await request.formData();
		const email = String(data.get('email'));
		const name = String(data.get('name'));
		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		});

		const token = new Token();

		if (!user) {
			// send signup email and invite
			const space = await prisma.space.findUnique({
				where: {
					appId: params["app_id"]
				},
				include: {
					users: true
				}
			});
			const admins = space?.users ?? [];

			const existingAdmin = admins.find((admin) => admin.username === email);

			if (existingAdmin) throw error(400, 'Admin already exists in this space');

			const admin = await prisma.spaceUser.create({
				data: {
					username: email,
					password: await token.createAdminPass(),
					role: 'admin',
					spaceId: space.id,
					name
				}
			});
			return { adminSuccess: true, emailSent: true, data: admin };
		} else {
			const spaceId = params["app_id"];

			const space = await prisma.space.findUnique({
				where: {
					appId: spaceId
				},
				include: {
					users: true
				}
			});

			const admins = space?.users ?? [];

			const existingAdmin = admins.find((admin) => admin.username === email);

			if (existingAdmin) throw error(400, 'Admin already exists in this space');

			let adminPassword = token.createAdminPass();

			const admin = await prisma.spaceUser.create({
				data: {
					// userId: String(user.id),
					username: user.email,
					spaceId: space.id,
					password: adminPassword,
					name
				}
			});

			// let info = await gmailTransporter.sendMail({
			// 	from: '"Fred Foo " info@dreamfeel.io', // sender address
			// 	to: user?.email, // list of receivers
			// 	subject: 'Hello ✔. ',
			// 	text: 'Hello world?',
			// 	html: `<p>Default password: <b>${adminPassword}</b>   for space ${space.appId} </p>. Please update.`
			// });

			// console.log('Message sent: %s', info.messageId);

			return { adminSuccess: true, data: admin };
		}
	},
	async addPermissions({ request, params }) {
		const data = await request.formData();
		const spaceId = String(params["app_id"]);
		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});
		const name = String(data.get('name'));
		const description = String(data.get('description'));
		const permission = await prisma.permission.create({
			data: {
				spaceId: String(space?.id),
				name: convertToSlug(name),
				description
			}
		});
		return { permissionSuccess: true, data: permission };
	},
	async addDashboards({ request, params }) {
		const data = await request.formData();
		const spaceId = String(params["app_id"]);
		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});

		const name = String(data.get('name'));

		const existingDashboard = await prisma.dashboard.findFirst({
			where: {
				name: convertToSlug(name),
				spaceId: space.id
			}
		});

		if (existingDashboard) {
			throw error(400, 'Dashboard already exist');
		}

		const description = String(data.get('description'));
		const permission = await prisma.dashboard.create({
			data: {
				spaceId: String(space?.id),
				name: convertToSlug(name),
				description
			}
		});
		return { dashboardSuccess: true, data: permission };
	},
	async deleteSpace({ params, request }) {
		const data = await request.formData();
		const confirmed = String(data.get('confirmedSpaceDeletion') ?? 'false');
		const isConfirmed = JSON.parse(confirmed);
		// if (!isConfirmed) {
		// 	return { requireConfirmation: true, data: params["app_id"] };
		// }
		const spa = await prisma.space.update({
			where: { appId: params["app_id"] },
			data: {
				deactivated: true
			}
		});

		if (spa) {
			throw redirect(302, `/deactivated/${spa?.id}`);
		}
	},
	async deleteApiKey({ request }) {
		const data = await request.formData();
		const id = String(data.get('id'));
		await prisma.spaceAPIKeys.delete({
			where: { id }
		});
		return { deleteApiSuccess: true };
	},
	async updatePassword({ params, request }) {
		const spaceId = params["app_id"];

		const data = await request.formData();

		const password = String(data.get('password'));

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});

		if (!space) {
			throw error(404, 'Space not found');
		}

		const token = new Token();

		await prisma.space.update({
			where: {
				id: space.id
			},
			data: {
				superAdminSecret: await token.encryptSync(password)
			}
		});

		return { passwordUpdate: true };
	}
};

export async function load({ params, cookies, locals }: PageLoadEvent) {
	const spaceId = params["app_id"];
	const space = await prisma.space.findUnique({
		where: { appId: spaceId },
		include: {
			owner: true,
			apiKeys: true,
			configVars: true,
			users: true,
			permissions: true,
			dashboards: true,
			tables: true
		}
	});

	if (!space) throw error(404, 'Space not found');

	const session = await locals.getSession();

	if (session?.user) {
		const user = await prisma.user.findUnique({
			where: {
				email: String(session?.user?.email)
			}
		});

		if (user && user.id === space.userId) {
			return { space, userRole: { superAdmin: true } };
		}
		throw redirect(302, `/a/${space?.appId}/accounts`);
	}

	return { space };
}
