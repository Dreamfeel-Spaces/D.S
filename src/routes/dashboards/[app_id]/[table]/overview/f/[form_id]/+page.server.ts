import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { error } from '@sveltejs/kit';
import { cleanData } from '$lib/util/slugit';

export async function load({ params }: RequestEvent) {
	const formId = params['form_id'];

	let form = await prisma.dashboardForm.findUnique({
		where: {
			id: formId
		},
		include: {
			fields: {
				include: {
					field: true
				}
			},
			table: {
				include: {
					columns: true
				}
			}
		}
	});

	if (!form) throw error(404, 'Report not found');

	const columns = form.fields.map((field) => field.field);

	const spaceId = form.table?.appId;

	const space = await prisma.space.findUnique({
		where: {
			id: String(spaceId)
		}
	});

	const table = form.table;

	if (!table) throw error(404, 'Table not found');

	return {
		form: { ...form, columns },
		space
	};
}
