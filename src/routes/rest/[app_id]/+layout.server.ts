import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function load({ locals }: RequestEvent) {
	// @ts-ignore
	let space: any = locals.space;
	//@ts-ignore
	let user: any = space.users[0];
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);
	let spaceSession = { user };

	if (!user) throw redirect(301, `/a/${space.appId}/accounts`);

	if (!space) {
		throw error(404, 'Page not found');
	}
	const apiSetup = space.apiSetup[0];

	if (!apiSetup) {
		await prisma.apiSetup.create({
			data: {
				spaceId: space.id
			}
		});
		throw redirect(302, `/rest/${space.appId}/quick-setup`);
	}

	const onboarding = await space.onboarding[0];

	if (!onboarding) {
		await prisma.onboarding.create({
			data: {
				spaceId: space.id
			}
		});
		throw redirect(302, `/a/${space.appId}/welcome`);
	}

	const roles = space.roles;
	let tables = space.tables;

	tables = tables.filter((table: any) => Boolean(table));
	space = { ...space, apiSetup: [apiSetup], onboarding: [onboarding], roles, tables };

	return { space, spaceSession, tables };
}
