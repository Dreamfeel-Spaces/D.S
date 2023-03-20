import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { error } from '@sveltejs/kit';
import { convertToSlug } from '$lib/util/slugit';

export async function POST({ request, params }: RequestEvent) {
	const data = await request.json();

	let appId = params.space;

	const space = await prisma.space.findUnique({
		where: {
			appId
		}
	});

	if (!space) throw error(404, 'Space not found');

	const collections = data.collections;

	for (let collection of collections) {
		let existing = await prisma.spaceTable.findFirst({
			where: {
				name: convertToSlug(collection.name),
				appId: space.id
			}
		});

		if (existing) {
			for (let column of collection.columns) {
				await prisma.column.create({
					data: {
						spaceTableId: existing.id,
						name: column.name,
						type: column.type
					}
				});
			}
		} else {
			const table = await prisma.spaceTable.create({
				data: {
					appId: space.id,
					name: convertToSlug(collection.name)
				}
			});

			for (let column of collection.columns) {
				await prisma.column.create({
					data: {
						spaceTableId: table.id,
						name: column.name,
						type: column.type
					}
				});
			}
		}
	}

	return new Response('0000');
}
