import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ request: { headers } }: RequestEvent) {
	const apiKey = headers.get('x-api-key');
	const authorization = headers.get('authorization');

	if (!apiKey || !authorization) throw error(403, 'Api key / authorization token required');

	const spaceId = (apiKey?.split('--') ?? [])[1];

	let space = await prisma.space.findUnique({
		where: { id: spaceId },
		include: { apiKeys: true }
	});

	const token = new Token();
	const verifiedToken = await token.findAndVerifyKey(space?.apiKeys, String(apiKey));

	if (!verifiedToken) throw error(403, 'Unable to verify api keys');

	delete (space ?? {})['secret'];
	delete (space ?? {})['apiKeys'];

	const response = new Response(JSON.stringify(space));
	response.headers.append('Access-Control-Allow-Origin', '*');
	return response;
}
