import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function POST({ request }: RequestEvent) {
	return new Response('{ success: true }');
}

export async function PUT({ request, locals }: RequestEvent) {
	const space = await locals.space;

	const data = await request.json();

	const template = data['template'];

	const category = data['category'];

	const updatedSpace = await prisma.space.update({
		//@ts-ignore
		where: {
			id: space.id
		},
		data: {
			template,
			tempCat: category
		}
	});

	return new Response(JSON.stringify(updatedSpace));
}
