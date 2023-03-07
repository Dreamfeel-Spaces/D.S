import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from '../$types';

export async function POST({ request, params }: RequestEvent) {
	const pageId = params.path;
	const data = await request.json();

	let page = await prisma.page.update({
		where: {
			id: pageId
		},
		data: {
			html: JSON.stringify(data)
		}
	});

	return new Response(JSON.stringify(page));
}

export async function GET() {
	return new Response('vbk');
}
