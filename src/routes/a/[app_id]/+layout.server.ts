import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';
//@ts-ignore
import type { LayoutServerLoadEvent } from './$types';

export async function load({locals }: LayoutServerLoadEvent) {
	// @ts-ignore
	let space: any = locals.space;
	let user: any = space.users[0];
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);
	let spaceSession = { user };


	if (!space) {
		throw error(404, 'Page not found');
	}

	let onboarding = space.onboarding[0];

	if (!onboarding) {
		onboarding = await prisma.onboarding.create({
			data: {
				spaceId: space.id
			}
		});
		throw redirect(302, `/a/${space.appId}/welcome`);
	}

	const tables = space.tables;

	const roles = space.roles;

	return { space: { ...space, onboarding: [onboarding], tables }, spaceSession, roles };
}
