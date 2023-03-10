// @ts-nocheck
import { Logger } from '$lib/logger/Logger';
import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent) {
	let space = event.locals.space;

	const logger = new Logger();

	delete (space ?? {})['secret'];
	delete (space ?? {})['apiKeys'];

	const response = new Response(JSON.stringify(space));
	response.headers.append('Access-Control-Allow-Origin', '*');
	logger.success(event);
	return response;
}
