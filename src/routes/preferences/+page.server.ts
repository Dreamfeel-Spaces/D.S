//@ts-nocheck
import { prisma } from '$lib/db/prisma';
export async function load({ locals }) {
	const session = await locals.getSession();
	if (session) {
		const user = await prisma.user.findUnique({
			where: {
				email: session?.user?.email
		}
		});
		const apps = await prisma.space.findMany({ where: { userId: user?.id } });

		return { apps: apps.filter((app) => Boolean(app.appId) && app.miniAppChannel) };
	}

	const demo = await prisma.space.findUnique({ where: { appId: 'demo' } });

	return { apps: [demo] };
}
