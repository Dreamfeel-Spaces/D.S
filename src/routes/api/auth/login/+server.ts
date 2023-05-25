import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { errorCatch } from '$lib/util/slugit';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function POST(event: RequestEvent) {
	const { request, locals } = event;
	const data = await request.json();
	const username = data.username || data.email;
	const password = data.password;

	const apiKey = request.headers.get('x-api-key');

	const token = new Token();

	// @ts-ignore
	const space = locals.space;

	const user = await prisma.user.findUnique({
		where: {
			email: username
		}
	});

	if (user?.id === space.userId) {
		if (await token.verify(password, space.superAdminSecret)) {
			const sessionToken = await token.createUserToken({ ...user, role: 'owner' });
			return new Response(JSON.stringify({ accessToken: sessionToken }));
		} else throw error(403, 'Invalid credentials');
	}

	let admin = await prisma.spaceUser.findFirst({
		where: {
			username,
			spaceId: space.id
		}
	});

	if (!admin) {
		throw error(403, 'Incorrect credentials provided');
	}


	if (await token.verify(password, String(admin?.password))) {
		delete (admin as any)['password'];
		const sessionToken = await token.createUserToken({ admin, role: 'admin' });
		await prisma.spaceSession.create({
			data: {
				sessionToken,
				spaceId: space.id,
				userId: admin?.id
			}
		});
		return new Response(JSON.stringify({ accessToken: sessionToken }));
	} else {
		throw error(403, 'Incorrect credentials provided');
	}
}
