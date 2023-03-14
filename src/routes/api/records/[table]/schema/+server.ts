import { prisma } from '$lib/db/prisma';
import { Logger } from '$lib/logger/Logger';
import { Token } from '$lib/token/Token';
import { errorCatch } from '$lib/util/slugit';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';

export async function GET(event: RequestEvent) {
	const { params, request, locals } = event;
	const tableName = params.table;
	const apiKey = request.headers.get('x-api-key');
	const authorization = request.headers.get('authorization');

	if (!apiKey) throw error(403, 'Api key / authorization token required');

	const token = new Token();
	const logger = new Logger(request);

	// @ts-ignore
	const space = locals.space;

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName,
			spaceId: space?.id
		},
		include: {
			columns: true
		}
	});

	const formattedSchema = table?.columns?.map((col) => {
		return { field: col.name, type: col.type };
	});

	return new Response(JSON.stringify(formattedSchema));
}
