import { prisma } from '$lib/db/prisma.js';

export async function load({ locals }) {
	const apps = await prisma.space.findMany({});
	return { apps, templates: [] };
}
