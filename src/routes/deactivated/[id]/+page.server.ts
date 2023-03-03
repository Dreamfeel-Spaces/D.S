import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const space = await prisma.space.findUnique({
		where: {
			id: String(params.id)
		}
	});

	if (!space?.deactivated) throw error(403, "Space hasn't been deactivated");

	return { space };
}

export const actions: Actions = {
	async default({ params }) {
		const spa = await prisma.space.update({
			//@ts-ignore
			where: { id: params.id },
			data: {
				deactivated: false
			}
		});
		if (spa) {
			return { success: true, data: spa };
		}
	}
};
