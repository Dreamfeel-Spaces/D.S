import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';

export async function load({ cookies, params }: any) {
	const appId = params.id;

	let space: any = null;
	let spaceSession: any = null;

	let recentlyOpened: any[] = JSON.parse(cookies.get(`recentlyOpened-${appId}`) ?? '[]');

	if (Boolean(appId)) {
		space = await prisma.space.findUnique({
			where: {
				appId
			},
			include: {
				owner: true,
				apiKeys: true,
				configVars: true,
				users: true,
				permissions: true,
				dashboards: true
			}
		});

		if (!space) throw error(404, 'Page not found');

		const sessionToken: any = cookies.get(`${space.appId}-accessToken`);

		if (!sessionToken) throw redirect(302, `/a/${space.appId}/accounts`);

		const user = jwt.decode(sessionToken);

		spaceSession = { user };
	}

	let isRecent = recentlyOpened.find((item: any) => {
		return item.key === 'Preferences' && item.app === space.appId;
	});

	if (isRecent) {
		recentlyOpened.splice(recentlyOpened.indexOf(isRecent), 1);
		recentlyOpened.unshift(isRecent);
	} else {
		recentlyOpened.unshift({
			key: 'Preferences',
			app: space.appId,
			url: `/spaces/${space.appId}`
		});
	}

	cookies.set(`recentlyOpened-${appId}`, JSON.stringify(recentlyOpened), { path: '/' });

	return { space, spaceSession };
}
