export async function load({ locals, params }: any) {
	let space: any = locals.space;
	let user: any = space.users[0];
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);
	let spaceSession = { user };
	return { space, spaceSession };
}
