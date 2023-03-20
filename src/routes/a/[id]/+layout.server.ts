import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';
import type { LayoutServerLoadEvent } from './$types';

export async function load({ cookies, params }: LayoutServerLoadEvent) {
	const appId = params.id;

	let space: any = null;
	let spaceSession: any = null;

	const recentlyOpened = cookies.get(`recentlyOpened-${appId}`) ?? '[]';

	if (Boolean(appId)) {
		space = await prisma.space.findUnique({
			where: {
				appId
			},
			include: {
				onboarding: true,
				tables: true,
				roles: true
			}
		});

		if (!space) throw error(404, 'Page not found');

		if (!space.onboarding.length) {
			const onboarding = await prisma.onboarding.create({
				data: {
					spaceId: space.id
				}
			});
			throw redirect(302, `/a/${space.appId}/welcome`);
		}

		const sessionToken: any = cookies.get(`${space.appId}-accessToken`);

		if (!sessionToken) return { space, spaceSession };

		const user = jwt.decode(sessionToken);

		spaceSession = { user };
	}

	return { space, spaceSession, recentlyOpened };
}
