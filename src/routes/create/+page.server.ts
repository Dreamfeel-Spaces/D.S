import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { convertToSlug } from '$lib/util/slugit';
import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ locals }: RequestEvent) {
	//@ts-ignore
	const session = await locals.getSession();
	if (!session?.user) throw redirect(302, '/accounts');

	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email ?? ''
		}
	});
	//@ts-ignore
	if (!user.emailVerified) {
		throw redirect(302, '/verify?next=/create');
	}
}

// export const actions = {
// 	async default({ request, locals, cookies }: RequestEvent) {
// 		// @ts-ignore
// 		const user = await locals.user;
// 		if (!user) throw redirect(302, `/accounts?next=/create`);

// 		const data = await request.formData();

// 		const appId = convertToSlug(String(data.get('appId')));
// 		const name = String(data.get('name'));
// 		const icon = String(data.get('icon'));

// 		const space = await prisma.space.findUnique({
// 			where: {
// 				appId
// 			}
// 		});

// 		if (space) throw error(404, 'Invalid app Id');

// 		const newSpace = await prisma.space.create({
// 			data: {
// 				appId,
// 				name,
// 				icon,
// 				secret: '',
// 				userId: user.id
// 			}
// 		});

// 		const adminRole = await prisma.userRoles.create({
// 			data: {
// 				name: 'super_admin',
// 				description: 'All permissions.',
// 				isSuperUser: true,
// 				spaceId: newSpace.id
// 			}
// 		});

// 		const superAdmin = await prisma.spaceUser.create({
// 			data: {
// 				spaceId: newSpace.id,
// 				username: user.email,
// 				name: user.name,
// 				avatar: user.image,
// 				userId: user.id,
// 				userRolesId: adminRole.id
// 			}
// 		});

// 		const onboarding = await prisma.onboarding.create({
// 			data: {
// 				spaceId: newSpace.id
// 			}
// 		});

// 		const apiSetup = await prisma.apiSetup.create({
// 			data: {
// 				spaceId: newSpace.id
// 			}
// 		});

// 		const token = new Token();
// 		const sessionToken = await token.createUserToken(superAdmin);

// 		const spaceSession = await prisma.spaceSession.create({
// 			data: {
// 				userId: superAdmin.id,
// 				sessionToken,
// 				spaceId: String(newSpace.id)
// 			}
// 		});

// 		cookies.set(`${newSpace.appId}-accessToken`, sessionToken, {
// 			path: '/'
// 		});
// 		throw redirect(302, `/a/${newSpace.appId}`);
// 	}
// };
