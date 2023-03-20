import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';

export async function load({ cookies, params }: any) {
	const appId = params.id;

	let space: any = null;
	let spaceSession: any = null;

	if (Boolean(appId)) {
		space = await prisma.space.findUnique({
			where: {
				appId
			},
			include: {
				onboarding: true
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

		if (!sessionToken) throw redirect(302, `/a/${space.appId}/accounts`);

		const user = jwt.decode(sessionToken);

		spaceSession = { user };
	}

	return { space, spaceSession };
}
