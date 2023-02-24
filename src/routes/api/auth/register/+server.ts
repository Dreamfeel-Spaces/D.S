import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function POST({ request: { headers, json } }: RequestEvent) {
	const apiKey = headers.get('x-api-key');

	if (!apiKey) throw error(403, 'Api key / authorization token required');

	try {
		const data = await json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}

	const spaceId = (apiKey?.split('--') ?? [])[1];

	let space = await prisma.space.findUnique({
		where: { id: spaceId },
		include: { apiKeys: true }
	});

	const token = new Token();
	const verifiedToken = await token.findAndVerifyKey(space?.apiKeys, String(apiKey));

	if (!verifiedToken) throw error(403, 'Unable to verify api keys');

	const response = new Response(JSON.stringify("data"));
	response.headers.append('Access-Control-Allow-Origin', '*');
	return response;
}
