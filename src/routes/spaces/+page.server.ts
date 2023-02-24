//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
export async function load({ locals }) {
	const session = await locals.getSession();
	if (!session) throw error(403, 'Auth failed');
	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email
		}
	});
	const apps = await prisma.space.findMany({ where: { userId: user?.id } });

	return { apps:apps.filter(app=>Boolean(app.appId) && app.miniAppChannel) };
}
