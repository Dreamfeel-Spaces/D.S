import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function POST({ request }: RequestEvent) {
	return new Response('{ success: true }');
}

export async function PUT({ request, locals }: RequestEvent) {
	const space = await locals.space;

	const data = await request.json();

	const template = data['template']

	console.log(template, data);

	const updatedSpace = await prisma.space.update({
		where: {
			id: space.id
		},
		data: {
			template
		}
	});

	return new Response(JSON.stringify(updatedSpace));
}
