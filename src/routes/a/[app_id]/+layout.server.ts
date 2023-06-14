import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';
//@ts-ignore
import type { LayoutServerLoadEvent } from './$types';

export async function load({ locals }: LayoutServerLoadEvent) {
	let space: any = locals.space;
	let user: any = (space?.users ?? [])[0];
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);
	let spaceSession = { user };

	if (!space) {
		throw error(404, 'Page not found');
	}

	

	const tables = space.tables;

	const roles = space.roles;

	return { space: { ...space, tables }, spaceSession, roles };
}
