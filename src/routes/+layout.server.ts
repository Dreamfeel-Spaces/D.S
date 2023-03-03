// @ts-nocheck
import { prisma } from '$lib/db/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) {
		const user = await prisma.user.findUnique({
			where: {
				email: session?.user?.email
			}
		});
		const myapps = await prisma.space.findMany({
			where: {
				userId: String(user?.id),
				deactivated: false
			},
			include: {
				tables: true,
				spaceUis: {
					include: {
						spaceUIVersion: true
					}
				},
				dashboards: true
			}
		});
		return {
			session,
			myapps: myapps.filter((app) => Boolean(app.appId))
		};
	}
	return { session, myapps: [] };
};
