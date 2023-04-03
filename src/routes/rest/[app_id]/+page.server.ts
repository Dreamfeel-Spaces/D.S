import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params, cookies, locals }: RequestEvent) {
	//@ts-ignore
	const space = locals.space;

	let user: any = space.users[0];
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);


	let spaceSession = { user };

	let apiSetup = space.apiSetup[0];

	if (!apiSetup?.complete) {
		throw redirect(302, `/rest/${space?.appId}/quick-setup`);
	}

	const tables = space.tables ?? [];

	return { tables, space };
}
