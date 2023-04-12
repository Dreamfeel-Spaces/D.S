import { prisma } from '$lib/db/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ cookies, params, locals }: RequestEvent) {
	// @ts-ignore
	let space: any = locals.space;

	if (!space) throw error(404, 'Page not found');

	// @ts-ignore
	let spaceSession = locals.spaceSession;

	let user: any = spaceSession?.user;

	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	if (!user?.id) throw redirect(302, `/a/${space.appId}/accounts`);

	const tables = space.tables;

	space = { ...space, tables };

	return { space, spaceSession, tables };
}
