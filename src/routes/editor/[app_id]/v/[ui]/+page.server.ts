import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ params, locals }: RequestEvent) {
	const id = params.ui;

	const uiGroup = await prisma.spaceUI.findFirst({
		where: {
			id
		},
		include: {
			spaceUIVersion: {
				include: {
					pages: true
				}
			}
		}
	});

	const space = locals.space;

	if (!uiGroup) throw error(404, 'Page data not found');

	return { ui: uiGroup, space };
}
