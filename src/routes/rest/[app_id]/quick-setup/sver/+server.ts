import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
export async function PUT({ params, request }: RequestEvent) {
	const data = await request.json();

	const appId = params["app_id"];
	const space = await prisma.space.findUnique({
		where: {
			appId
		},
		include: {
			apiSetup: true
		}
	});

	let setup = space?.apiSetup[0];

	if (setup) {
		if (data.ctx === 'skip') {
			await prisma?.apiSetup?.update({
				where: {
					id: setup.id
				},
				data: {
					complete: true,
					stepOne: 'skip',
					stepTwo: 'skip',
					stepThree: 'skip',
					stepFour: 'skip',
					step: 2
				}
			});
		} else if (data.ctx === 'dismiss') {
			await prisma?.apiSetup?.update({
				where: {
					id: setup.id
				},
				data: {
					complete: true,
					qsWidgetOpen: false
				}
			});
		} else
			await prisma?.apiSetup?.update({
				where: {
					id: setup.id
				},
				data: {
					complete: true
				}
			});
	}

	return new Response('hrhr');
}
