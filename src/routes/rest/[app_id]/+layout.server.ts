import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';
import type { RequestEvent } from './$types';

export async function load({ cookies, params, locals }: RequestEvent) {
	// @ts-ignore
	let space: any = locals.space;
	//@ts-ignore
	const spaceSession = locals.spaceSession;

	if (!space) {
		throw error(404, 'Page not found');
	}

	if (!spaceSession?.user) throw redirect(302, `/a/${space.appId}/accounts`);

	const apiSetup = await prisma.apiSetup.findFirst({
		where: {
			spaceId: space.id
		}
	});

	if (!apiSetup) {
		await prisma.apiSetup.create({
			data: {
				spaceId: space.id
			}
		});
		throw redirect(302, `/rest/${space.appId}/quick-setup`);
	}

	const onboarding = await prisma.onboarding.findFirst({
		where: {
			spaceId: space.id
		}
	});

	if (!onboarding) {
		await prisma.onboarding.create({
			data: {
				spaceId: space.id
			}
		});
		throw redirect(302, `/a/${space.appId}/welcome`);
	}

	const roles = await prisma.userRoles.findMany({
		where: {
			spaceId: space.id
		}
	});

	let tables = await prisma.spaceTable.findMany({
		where: {
			appId: space.id
		},
		include: {
			columns: true
		}
	});

	tables = tables.filter((table) => Boolean(table));
	space = { ...space, apiSetup: [apiSetup], onboarding: [onboarding], roles, tables };

	return { space, spaceSession, tables };
}
