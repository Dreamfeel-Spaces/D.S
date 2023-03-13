import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { error } from '@sveltejs/kit';

import { AUTH_SECRET } from '$env/static/private';

export const actions = {
	async default({ request, locals, params }: any) {
		const session = await locals.getSession();

		if (!session) throw error(403, 'Authentication required');

		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email
			}
		});

		const spaceId = params.space;
		const space = await prisma.space.findFirst({
			where: { id: spaceId },
			include: {
				users: true
			}
		});

		function isAdmin() {
			if (user?.id !== space?.userId) return true;
			return space?.users.find((admin) => admin.id === user?.id);
		}

		if (!isAdmin()) throw error(403, 'You are unauthorized to view this page');

		// const token = new Token('reversible');
		// const key = await token.create('token-bodge', space?.secret ?? AUTH_SECRET);

		// const apiKey = await prisma.spaceAPIKeys.create({
		// 	data: { key, spaceId: String(spaceId), userId: String(user?.id) }
		// });

		return { success: true, data: apiKey };
	}
};
