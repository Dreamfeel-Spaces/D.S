import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';
//@ts-ignore
import type { LayoutServerLoadEvent } from './$types';

export async function load({ cookies, params, locals }: LayoutServerLoadEvent) {
	// @ts-ignore
	let space: any = locals.space;
	//@ts-ignore
	const spaceSession = locals.spaceSession;

	if (!space) {
		throw error(404, 'Page not found');
	}

	let onboarding = await prisma.onboarding.findFirst({
		where: {
			spaceId: space.id
		}
	});

	if (!onboarding) {
		onboarding = await prisma.onboarding.create({
			data: {
				spaceId: space.id
			}
		});
		throw redirect(302, `/a/${space.appId}/welcome`);
	}

	const tables = await prisma.spaceTable.findMany({
		where: {
			appId: space.id
		}
	});

	const roles = await prisma.userRoles.findMany({
		where: {
			spaceId: space.id
		}
	});


	return { space: { ...space, onboarding: [onboarding], tables }, spaceSession, roles };
}
