import { prisma } from '$lib/db/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageLoadEvent } from './$types';

export const actions: Actions = {
	async stepZero({ params, request }) {
		const appId = params['app_id'];
		const space = await prisma.space.findUnique({
			where: {
				appId
			},
			include: {
				apiSetup: true
			}
		});

		let setup = space?.apiSetup[0];

		const data = await request.formData();

		if (setup) {
			await prisma?.apiSetup?.update({
				where: {
					id: setup.id
				},
				data: {
					step: 1,
					stepOne: String(data.get('whoAmi'))
				}
			});
		}
	},
	async stepThree({ params, request }) {
		const appId = params['app_id'];
		const space = await prisma.space.findUnique({
			where: {
				appId
			},
			include: {
				apiSetup: true
			}
		});

		let setup = space?.apiSetup[0];

		const data = await request.formData();

		if (setup) {
			await prisma?.apiSetup?.update({
				where: {
					id: setup.id
				},
				data: {
					step: 2,
					stepOne: String(data.get('whoAmi')),
					complete: true
				}
			});

			throw redirect(302, `/rest/${space?.appId}/`);
		}
	}
};

export async function load({ params }: PageLoadEvent) {
	const appId = params['app_id'];
	const space = await prisma.space.findFirst({
		where: {
			appId
		},
		include: {
			apiSetup: true
		}
	});

	if (!space) throw error(404, 'Space not found');

	let onboarding = space.apiSetup[0];

	if (onboarding?.complete) throw redirect(302, `/rest/${appId}/`);

	return { setup: onboarding };
}
