// @ts-nocheck
import { prisma } from '$lib/db/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email
		}
	});
	const myapps = await prisma.space.findMany({
		where: {
			userId: String(user?.id)
		},
		include: {
			tables: true,
			spaceUis: {
				include: {
					spaceUIVersion: true
				}
			}
		}
	});
	return {
		session,
		myapps
	};
};
