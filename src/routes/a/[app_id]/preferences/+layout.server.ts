import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';

export async function load({ cookies, params, locals }: any) {
	// @ts-ignore
	let space: any = locals.space;
	//@ts-ignore
	const spaceSession = locals.spaceSession;

	if (!space) {
		throw error(404, 'Page not found');
	}

	if (!spaceSession?.user) throw redirect(302, `/a/${space.appId}/accounts`);

	let owner;

	if (space.userId)
		owner = await prisma.user.findUnique({
			where: {
				id: space.userId
			}
		});

	const apiKeys = await prisma.spaceAPIKeys.findMany({
		where: {
			spaceId: space.id
		}
	});

	const users = await prisma.spaceUser.findMany({
		where: {
			spaceId: space.id
		}
	});

	// if (Boolean(appId)) {
	// 	space = await prisma.space.findUnique({
	// 		where: {
	// 			appId
	// 		},
	// 		include: {
	// 			owner: true,
	// 			apiKeys: true,
	// 			configVars: true,
	// 			users: true,
	// 			permissions: true,
	// 			dashboards: true
	// 		}
	// 	});

	return { space: { ...space, owner, apiKeys, users }, spaceSession };
}
