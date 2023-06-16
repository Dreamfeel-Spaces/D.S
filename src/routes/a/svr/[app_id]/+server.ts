import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { Token } from '$lib/token/Token';

export async function POST({ locals, cookies }) {
	const space = locals.space;
	const session = await locals.getSession();

	let user = await locals.db.spaceUser.findFirst({
		where: {
			spaceId: space.id,
			emailAddress: session?.user?.email
		}
	});

	if (!user) {
		user = await locals.db.spaceUser.findFirst({
			where: {
				spaceId: space.id,
				username: session?.user?.email
			}
		});
	}

	if (!user) throw error(403, 'User account not found');

	const token = new Token();

	const sessionToken = await token.createUserToken(user);

	await prisma.spaceSession.create({
		data: {
			userId: user?.id,
			sessionToken,
			spaceId: String(space?.id)
		}
	});

	cookies.set(`${space.appId}-accessToken`, sessionToken, { path: '/' });

	return new Response();
}
