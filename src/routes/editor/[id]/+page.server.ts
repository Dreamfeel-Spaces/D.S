import { prisma } from '$lib/db/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent, Actions } from './$types';
export async function load({ params }: RequestEvent) {
	const space = await prisma.space.findUnique({
		where: {
			appId: params.id
		},
		include: {
			spaceUis: {
				include: {
					spaceUIVersion: {
						include: {
							pages: true
						}
					}
				}
		},
			onboarding: true
		}
	});

	if (!space?.onboarding[0].complete) {
		throw redirect(302, `/a/${space?.appId}/welcome`);
	}

	return { space };
}

export const actions: Actions = {
	async setDefaultUI({ request, params }) {
		const spaceId = params.id;

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});

		if (!space) throw error(404, 'Space not found');

		const data = await request.formData();

		const id = String(data.get('id'));

		const updated = await prisma.space.update({
			//@ts-ignore
			where: {
				id: space.id
			},
			data: {
				uiVid: id
			}
		});

		return { defaultUiSuccess: true, data: updated };
	}
};
