import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

//31/5/2023

export async function PATCH({ request, params }: RequestEvent) {
	const pageId = params.path;
	const data = await request.json();

	let page = await prisma.page.findFirst({
		where: {
			id: pageId
		}
	});

	if (page) {
		page = await prisma.page.update({
			where: {
				id: pageId
			},
			data: {
				html: JSON.stringify(data)
			}
		});
	}

	return new Response(JSON.stringify(page));
}

export async function GET({ params }: RequestEvent) {
	const page = await prisma.page.findFirst({
		where: {
			id: params.path
		}
	});

	const data = JSON.parse(page?.html ?? '{"data":{"assets":[], "styles":[], "pages":[]}}');
	return new Response(JSON.stringify(data));
}
