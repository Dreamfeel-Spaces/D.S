import { redirect } from "@sveltejs/kit";

export async function load({ locals, params }: any) {
	let space: any = locals.space;
	
	// @ts-ignore
	let spaceSession = locals.spaceSession;

	let user: any = spaceSession?.user;

	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	if (!user?.id) throw redirect(302, `/a/${space.appId}/accounts`)
	return { space, spaceSession };
}
