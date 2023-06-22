import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ locals }: RequestEvent) {
	const session = await locals.getSession();
	if (!session) throw error(403, 'Unauthorized');

	if (
		session.user?.email === 'bryodiiidah@gmail.com' ||
		session?.user?.email === 'odidaprotas@gmail.com' ||
		session?.user?.email === 'earlmagga3@gmail.com' ||
		session?.user?.email === 'tonama98@gmail.com' ||
		session?.user?.email === 'bryomajor@gmail.com'
	) {
		const spaces = await prisma.space.count();
		const users = await prisma.user.count();
		const messages = await prisma.msgFeedback.count();

		const activeSpaces = await prisma.space.count({
			where: { deactivated: false }
		});

		const earlyAccess = await prisma.eA.count();

		return { spaces, users, messages, activeSpaces, earlyAccess };
	}
	throw error(403, 'Unauthorized');
}         
