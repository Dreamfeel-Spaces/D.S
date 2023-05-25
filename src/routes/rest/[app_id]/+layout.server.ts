import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

let userTable = {
	label: 'Users',
	name: 'users',
	icon: 'account_circle',
	columns: [
		{
			name: 'username',
			value: '',
			type: 'string'
		},
		{
			name: 'name',
			value: '',
			type: 'string'
		},
		{
			name: 'email',
			value: '',
			type: 'string'
		},
		{
			name: 'phone',
			value: '',
			type: 'string'
		},

		{
			name: 'password',
			value: '',
			type: 'password'
		},
		{
			name: 'avatar',
			value: '',
			type: 'string'
		}
	]
};

export async function load({ locals }: RequestEvent) {
	let space: any = locals.space;
	//@ts-ignore
	let spaceSession: any = locals.spaceSession;
	let user: any = spaceSession?.user;

	//@ts-ignore
	let megaUser = locals.user;

	if (megaUser && !megaUser.emailVerified) {
		throw redirect(302, `/verify?next=/rest/${space?.appId}`);
	}

	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	if (!user?.id) throw redirect(302, `/a/${space.appId}/accounts`);

	if (!space) {
		throw error(404, 'Page not found');
	}

	space = { ...space, tables: [userTable, ...space.tables] };

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
	const tableNames = tables.map((table: { name: any }) => table.name).filter(onlyUnique);
	tables = tableNames.map((name: any) => {
		return tables.find((table: { name: any }) => table.name === name);
	});
	space = { ...space, apiSetup: [apiSetup], onboarding: [onboarding], roles, tables };

	return { space, spaceSession, tables };
}

function onlyUnique(value: any, index: any, array: string | any[]) {
	return array.indexOf(value) === index;
}
