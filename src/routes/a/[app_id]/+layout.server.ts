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

	if (!spaceSession?.user) throw redirect(302, `/a/${space.appId}/accounts`);

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

	return { space, spaceSession };
}
