import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';

export async function load({ cookies, params }: any) {
	const appId = params.id;

	let recentlyOpened: any[] = JSON.parse(cookies.get(`recentlyOpened-${appId}`) ?? '[]');

	let space: any = null;
	let spaceSession: any = null;

	if (Boolean(appId)) {
		space = await prisma.space.findUnique({
			where: {
				appId
			},
			include: {
				roles: true
			}
		});

		if (!space) throw error(404, 'Page not found');

		const sessionToken: any = cookies.get(`${space.appId}-accessToken`);

		if (!sessionToken) throw redirect(302, `/a/${space.appId}/accounts`);

		const user: any = jwt.decode(sessionToken);
		const _user = await prisma.spaceUser.findUnique({
			where: {
				id: user?.id
			}
		});6
		spaceSession = { user: _user };
	}

	let isRecent = recentlyOpened.find((item: any) => {
		return item.key === 'dashboards' && item.app === space.appId;
	});

	if (isRecent) {
		recentlyOpened.splice(recentlyOpened.indexOf(isRecent), 1);
		recentlyOpened.unshift(isRecent);
	} else {
		recentlyOpened.unshift({
			key: 'Dashboards',
			app: space.appId,
			url: `/dashboards/${space.appId}`
		});
	}

	// cookies.set(`recentlyOpened-${appId}`, JSON.stringify(recentlyOpened), { path: '/' });

	return { space, spaceSession };
}
