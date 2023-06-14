import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { prisma } from '$lib/db/prisma';

export async function PUT({ params, locals }: RequestEvent) {
	//@ts-ignore
	const space = locals.space;

	const templateId = params.id;

	if (templateId === space?.id) {
		throw error(403, 'Cannot install template on same app');
	}

	// space.tempCat

	let tables = await prisma.spaceTable.findMany({
		where: {
			appId: space?.id
		}
	});

	tables = tables.map((table) => {
		delete table['id'];
		delete table['dateCreated'];
		delete table['dateUpdated'];
		delete table['appId'];
		delete table['userId'];
		return table;
	});

	for (let table of tables) {
		await prisma.spaceTable.create({
			data: {
				...table,
				appId: space?.id
			}
		});
	}

	return new Response('yes');
}

async function handleClone() {
	return 'yes';
}
