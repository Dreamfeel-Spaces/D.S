import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import type { PageServerLoadEvent, Actions } from './$types';
import { convertToSlug } from '$lib/util/slugit';

export const actions: Actions = {
	async updateChannels({ request, params }) {
		const data = await request.formData();

		const appId = params['app_id'];

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
			// @ts-ignore
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
	async createRole({ request, params }) {
		const data = await request.formData();
		const name = convertToSlug(String(data.get('name')));
		const description = String(data.get('description'));
		const isSuperUser = 'true' === String(data.get('isSuperUser'));

		const appId = params['app_id'];

		const space = await prisma.space.findUnique({
			where: {
				appId: String(appId)
			}
		});

		if (!space) throw error(404, 'Could not find this space');

		if (isSuperUser) {
			const role = await prisma.userRoles.create({
				data: {
					name,
					description,
					isSuperUser,
					spaceId: space.id
				}
			});

			return { roleSuccess: true, data: role };
		} else {
			const role = await prisma.userRoles.create({
				data: {
					name,
					description,
					spaceId: space.id
				}
			});

			return { roleSuccess: true, data: role };
		}
	}
};

export async function load({ cookies, params, locals }: PageServerLoadEvent) {
	//@ts-ignore
	const space = locals.space;
	//@ts-ignore
	const spaceSession = locals.spaceSession;

	const onboarding = await prisma.onboarding.findFirst({
		where: {
			spaceId: space.id
		}
	});

	if (!spaceSession?.user) throw redirect(302, `/a/${space.appId}/accounts`);

	if (!onboarding?.complete) {
		throw redirect(302, `/a/${space?.appId}/welcome`);
	}
}
