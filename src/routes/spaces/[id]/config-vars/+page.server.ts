import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	async default({ request, params, locals }) {
		const spaceId = params.id;
		const space = await prisma.space.findFirst({
			where: { id: spaceId }
		});
		if (!space) throw error(404, 'Space not found');

		const data = await request.formData();

		let variables = String(data.get('variables') ?? '[]');

		let saved = [];

		const session = await locals.getSession();

		const user = await prisma.user.findUnique({
			where: {
				email: String(session?.user?.email)
			}
		});

		if (!user) throw error(403, 'Login required ');

		for (let keyVal of JSON.parse(variables)) {
			const configVar = await prisma.configVars.create({
				data: {
					key: String(keyVal.key),
					value: String(keyVal.value),
					spaceId: String(space?.id),
					userId: String(user?.id)
				}
			});
		}

		return { success: true };
	}
};
