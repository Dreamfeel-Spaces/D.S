//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent, Actions } from './$types';

export const actions: Actions = {
	async updateChannels({ request, params }) {
		const data = await request.formData();

		const appId = params.id;

		const space = await prisma.space.findUnique({
			where: {
				id: String(appId)
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
		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		});

		if (!user) {
			// send signup email and invite
			return { adminSuccess: true, emailSent: true };
		} else {
			const spaceId = params.id;

			const space = await prisma.space.findUnique({
				where: {
					id: spaceId
				},
				include: {
					admins: {
						include: {
							user: true
						}
					}
				}
			});

			const admins = space?.admins ?? [];

			const existingAdmin = admins.find((admin) => admin.user.email === email);

			if (existingAdmin) throw error(400, 'Admin already exists in this space');

			const admin = await prisma.admin.create({
				data: {
					userId: user.id,
					spaceId: space.id
				}
			});

			return { adminSuccess: true, data: admin };
		}
	}
};

export async function load({ params }: RequestEvent) {
	const spaceId = params.id;
	const space = await prisma.space.findUnique({
		where: { id: spaceId },
		include: {
			owner: true,
			apiKeys: {
				include: {
					createdBy: true
				}
			},
			configVars: true,
			admins: {
				include: {
					user: true
				}
			}
		}
	});
	return { space };
}
