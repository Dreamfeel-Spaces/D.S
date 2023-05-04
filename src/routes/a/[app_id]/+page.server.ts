import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import type { PageServerLoadEvent, Actions } from './$types';

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
	}
};

export async function load({ locals }: PageServerLoadEvent) {
	//@ts-ignore
	const space = locals.space;
	//@ts-ignore
	let user: any = locals.spaceSession?.user;
	//@ts-ignore
	let megaUser = locals.user;

	if (megaUser && !megaUser.emailVerified) {
		throw redirect(302, `/verify?next=/a/${space?.appId}`);
	}

	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	const onboarding = space.onboarding[0];

	if (!user?.id) throw redirect(302, `/a/${space.appId}/accounts`);

	if (!onboarding?.complete) {
		throw redirect(302, `/a/${space?.appId}/welcome`);
	}

	let userCount = await prisma.spaceUser?.count({
		where: {
			spaceId: space.id
		}
	});

	return { userCount };
}
