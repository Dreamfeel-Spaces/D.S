import { prisma } from '$lib/db/prisma';
import type { RequestEvent, Actions } from './$types';
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

export const actions: Actions = {
	async default({ params, request, cookies }) {
		const data = await request.formData();
		const shareId = params['form_id'];

		let form = await prisma.dashboardForm.findUnique({
			where: {
				id: shareId
			},
			include: {
				fields: {
					include: {
						field: true
					}
				},
				table: true
			}
		});

		if (!form) throw error(404, 'Form not found');

		const columns = form?.fields.reduce((prev: any, curr) => {
			return [...prev, curr.field];
		}, []);

		const row = await prisma.row.create({
			data: {
				spaceTableId: String(form.tableId)
			}
		});
		for (let column of columns) {
			let colData = String(data.get(column.name));

			if (colData) {
				const td = await prisma.tableData.create({
					data: {
						rowId: row.id,
						column: column.name,
						data: colData,
						type: column.type,
						rel: column.rel,
						multiple: column.multiple,
						required: column.required
					}
				});
			}
		}

		return { success: true };
	}
};
