import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { convertToSlug } from '$lib/util/slugit';
import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import createSpaceSuccess from '$lib/email/createSpaceSuccess';
import emailHandler from '$lib/email/Email';

export async function POST({ request, locals, cookies }: RequestEvent) {
	//@ts-ignore
	const user = await locals.user;
	if (!user) throw error(403, `Authentication required`);

	const data = await request.json();

	const appId = convertToSlug(String(data['appId']));
	const name = String(data['name']);
	const icon = String(data['icon']);

	const space = await prisma.space.findUnique({
		where: {
			appId
		}
	});

	if (space) throw error(404, 'Invalid app Id');

	const newSpace = await prisma.space.create({
		data: {
			appId,
			name,
			icon,
			secret: '',
			userId: user.id
		}
	});

	const adminRole = await prisma.userRoles.create({
		data: {
			name: 'super_admin',
			description: 'All permissions.',
			isSuperUser: true,
			spaceId: newSpace.id
		}
	});

	const superAdmin = await prisma.spaceUser.create({
		data: {
			spaceId: newSpace.id,
			username: user.email,
			name: user.name,
			avatar: user.image,
			userId: user.id,
			userRolesId: adminRole.id
		}
	});

	const onboarding = await prisma.onboarding.create({
		data: {
			spaceId: newSpace.id
		}
	});

	const apiSetup = await prisma.apiSetup.create({
		data: {
			spaceId: newSpace.id
		}
	});

	const token = new Token();
	const sessionToken = await token.createUserToken(superAdmin);

	const spaceSession = await prisma.spaceSession.create({
		data: {
			userId: superAdmin.id,
			sessionToken,
			spaceId: String(newSpace.id)
		}
	});

	cookies.set(`${newSpace.appId}-accessToken`, sessionToken, {
		path: '/'
	});

	const htmlEmail = createSpaceSuccess(name, appId);

	await emailHandler({
		firstName: name,
		lastName: '',
		email: user?.email,
		message: htmlEmail,
		subject: `${name} is now live on Dreamfeel Spaces`
	});

	const response = new Response(JSON.stringify(space));
	return response;
}
