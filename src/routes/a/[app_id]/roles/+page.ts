import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ locals }: RequestEvent) {
	const space = locals.space;
	//@ts-ignore

	let user: any = locals.spaceSession?.user;
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	if (!user?.id) throw redirect(302, `/a/${space.appId}/accounts`);

	return { user };
}
