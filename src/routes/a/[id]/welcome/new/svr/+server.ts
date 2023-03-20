import type { RequestEvent } from './$types';
import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';

export async function PUT({ params, request }: RequestEvent) {
	const appId = params.id;
	const data = await request.json();

	const space = await prisma.space.findUnique({
		where: {
			appId
		},
		include: {
			onboarding: true,
			apiSetup: true
		}
	});

	if (!space) throw error(404, 'Space not found');

	const onboarding = space.onboarding[0];

	if (data.ctx === 'blank') {
		await prisma.onboarding.update({
			where: {
				id: onboarding.id
			},
			data: {
				stepTemplate: 'blank'
			}
		});

		return new Response('setup-complete');
	}
	if (data.ctx === 'ecommerce') {
		for (let item of ecommerce) {
			let table = await prisma.spaceTable.create({
				data: {
					name: item.name,
					appId: space.id
				}
			});

			for (let column of item.columns) {
				await prisma.column.create({
					data: {
						name: column.name,
						type: column.type,
						spaceTableId: table.id
					}
				});
			}
		}

		await prisma.onboarding.update({
			where: {
				id: onboarding.id
			},
			data: {
				stepTemplate: 'blank'
			}
		});

		let setup = space.apiSetup[0];

		if (setup) {
			await prisma.apiSetup.update({
				where: {
					id: setup.id
				},
				data: {
					complete: true
				}
			});
		} else {
			await prisma.apiSetup.create({
				data: {
					complete: true
				}
			});
		}

		return new Response('setup-complete');
	}
}

var ecommerce = [
	{
		name: 'Products',
		columns: [
			{ name: 'Name', type: 'string' },
			{ name: 'Price', type: 'number' },
			{ name: 'SKU', type: 'number' }
		]
	}
];
