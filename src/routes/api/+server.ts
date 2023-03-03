import { prisma } from '$lib/db/prisma';
import { Logger } from '$lib/logger/Logger';
import { Token } from '$lib/token/Token';
import { errorCatch } from '$lib/util/slugit';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ request: { headers }, locals }: RequestEvent) {
	const apiKey = headers.get('x-api-key');
	const authorization = String(headers.get('Authorization'));

	if (!apiKey || !authorization) throw error(403, 'Api key / authorization token required');

	const token = new Token();
	const logger = new Logger();

	let [space, spaceError] = await errorCatch(token.verifyApiKey(apiKey));

	const [apiSession, apiSessionError] = await errorCatch(
		token.decodeUserToken(authorization, space)
	);

	if (apiSessionError) {
		await logger.error({});
	}

	if (spaceError) {
		await logger.error({});
		throw error(403, 'Unable to verify api keys');
	}

	delete (space ?? {})['secret'];
	delete (space ?? {})['apiKeys'];

	const response = new Response(JSON.stringify(space));
	response.headers.append('Access-Control-Allow-Origin', '*');
	logger.success({});
	return response;
}
