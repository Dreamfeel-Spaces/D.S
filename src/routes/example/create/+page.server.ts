//@ts-nocheck

import { prisma } from '$lib/db/prisma';

export const actions = {
	async default({ request, locals }) {
		const data = await request.formData();
		const session = await locals.getSession();
		const property = String(data.get('property'));
		const example = await prisma.example.create({ data: { property } });
		return { success: true, data: example };
	}
};
