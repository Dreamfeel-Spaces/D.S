import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import jwt from 'jsonwebtoken';

export async function load({ cookies, params }: any) {
	const appId = params.space;

	let space: any = null;
	let spaceSession: any = null;

	let recentlyOpened: any[] = JSON.parse(cookies.get(`recentlyOpened-${appId}`) ?? '[]');

	if (Boolean(appId)) {
		space = await prisma.space.findUnique({
			where: {
				appId
			},
			include: {
				apiSetup: true,
				onboarding: true,
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

			let isRecent = recentlyOpened.find((item: any) => {
				return item.key === 'onboarding' && item.app === space.appId;
			});

			if (isRecent) {
				recentlyOpened.splice(recentlyOpened.indexOf(isRecent), 1);
				recentlyOpened.unshift(isRecent);
			} else {
				recentlyOpened.unshift({
					key: 'onboarding',
					app: space.appId,
					url: `/a/${space.appId}/welcome`
				});
			}

			cookies.set(`recentlyOpened-${appId}`, JSON.stringify(recentlyOpened), { path: '/' });

			throw redirect(302, `/a/${space.appId}/welcome`);
		}

		if (!space.apiSetup.length) {
			const onboarding = await prisma.apiSetup.create({
				data: {
					spaceId: space.id
				}
			});
			let isRecent = recentlyOpened.find((item: any) => {
				return item.key === 'setup' && item.app === space.appId;
			});

			if (isRecent) {
				recentlyOpened.splice(recentlyOpened.indexOf(isRecent), 1);
				recentlyOpened.unshift(isRecent);
			} else {
				recentlyOpened.unshift({
					key: 'setup',
					app: space.appId,
					url: `/base/${space.appId}`
				});
			}

			cookies.set(`recentlyOpened-${appId}`, JSON.stringify(recentlyOpened), { path: '/' });
			throw redirect(302, `/base/${space.appId}/quick-setup`);
		}

		const sessionToken: any = cookies.get(`${space.appId}-accessToken`);

		if (!sessionToken) throw redirect(302, `/a/${space.appId}/accounts`);

		const user:any = jwt.decode(sessionToken);
		const _user = await prisma.spaceUser.findUnique({
			where: {
				id: user?.id
			}
		});
		spaceSession = { user:_user };
	}

	let isRecent = recentlyOpened.find((item: any) => {
		return item.key === 'APIs' && item.app === space.appId;
	});

	if (isRecent) {
		recentlyOpened.splice(recentlyOpened.indexOf(isRecent), 1);
		recentlyOpened.unshift(isRecent);
	} else {
		recentlyOpened.unshift({
			key: 'APIs',
			app: space.appId,
			url: `/base/${space.appId}`
		});
	}

	cookies.set(`recentlyOpened-${appId}`, JSON.stringify(recentlyOpened), { path: '/' });

	return { space, spaceSession };
}
