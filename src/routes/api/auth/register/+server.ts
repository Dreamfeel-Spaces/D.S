import { prisma } from '$lib/db/prisma';
import { Logger } from '$lib/logger/Logger';
import { Token } from '$lib/token/Token';
import { errorCatch } from '$lib/util/slugit';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function POST(event: RequestEvent) {
	const { request, locals } = event;
	const apiKey = request.headers.get('x-api-key');
	if (!apiKey) throw error(403, 'Api key / authorization token required');
	const data = await request.json();
	const token = new Token();
	const logger = new Logger();

	// @ts-ignore
	const space = locals.space;

	const username = data.username || data.email;
	const password = data.password;
	const name = data.name;

	if (!username || !password || !name) {
		await logger.error({});
		throw error(400, 'Username (email), password and name are required');
	}

	const admin = await prisma.admin.create({
		data: {
			spaceId: String(space.id),
			role: 'user',
			username: String(username),
			password: await token.encryptSync(password),
			name: String(name)
		}
	});

	const sessionToken = await token.createUserToken(admin);
	await prisma.spaceSession.create({
		data: {
			adminId: String(admin.id),
			sessionToken,
			spaceId: String(space.id)
		}
	});

	logger.success({});

	return new Response(JSON.stringify({ accessToken: sessionToken }));
}
