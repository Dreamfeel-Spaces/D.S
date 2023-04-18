import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent, Actions } from './$types';
import { prisma } from '$lib/db/prisma';
import { convertToSlug } from '$lib/util/slugit';

export async function load({ locals }: RequestEvent) {
	//@ts-ignore
	const space = locals.space;
	//@ts-ignore
	let user: any = locals.spaceSession?.user;
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	if (!user?.id) throw redirect(302, `/a/${space.appId}/accounts`);

	return { user };
}

export const actions: Actions = {
	async create({ request, params, locals }) {
		const data = await request.formData();
		const name = convertToSlug(String(data.get('name')));
		const description = String(data.get('description'));
		const isSuperUser = 'true' === String(data.get('isSuperUser'));
		const updateRoleId = String(data.get('id'));

		const appId = params['app_id'];

		// @ts-ignore
		const space = locals.space;

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
	},
	async update({ request, params, locals }) {
		const data = await request.formData();
		const name = convertToSlug(String(data.get('name')));
		const description = String(data.get('description'));
		const isSuperUser = 'true' === String(data.get('isSuperUser'));
		const updateRoleId = String(data.get('id'));

		const appId = params['app_id'];

		// @ts-ignore
		const space = locals.space;

		if (!space) throw error(404, 'Could not find this space');

		if (isSuperUser) {
			const role = await prisma.userRoles.update({
				where: { id: updateRoleId },
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
	},
	async delete({request, params, locals}){

	}
};
