//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const exampleId = params["app_id"];
	const example = await prisma.example.findUnique({
		where: { id: exampleId }
	});
	if (!example) throw error(404, 'Example not found');
	return { example };
}
