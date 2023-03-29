//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export const actions = {
	async default({ params, request, locals }) {
		const spaceId = params["app_id"];
		const tableId = params.table;

		const session = await locals.getSession();

		const space = await prisma.space.findUnique({
			where: { appId: spaceId },
			include: { users: true }
		});

		const table = await prisma.spaceTable.findFirst({
			where: { name: tableId, appId: space.id },
			include: {
				rows: {
					include: {
						tableData: true
					}
				},
				columns: true
			}
		});

		const data = await request.formData();

		let fields = [];

		let columns = String(data.get('columns') ?? '[]');
		let displayName = data.get('displayName');

		for (let column of JSON.parse(columns)) {
			const col = await prisma.column.create({
				data: {
					regex: column.regex,
					name: column.name,
					type: column.type,
					rel: column.rel,
					multiple: Boolean(column.multiple),
					spaceTableId: table.id,
					defaultOn: Boolean(column.defaultOn),
					dateTimeDefault: column.dateTimeDefault
				}
			});

			if (column.type === 'select') {
				for (let option of column.options) {
					const opt = await prisma.columnSelectOptions.create({
						data: {
							columnId: String(col.id),
							label: String(option.label),
							value: String(option.value)
						}
					});
				}
			}

			fields.push(col);
		}

		const updatedTable = await prisma.spaceTable.update({
			where: { id: table.id },
			data: {
				displayName: String(displayName)
			}
		});

		return { success: true, data: { fields, table: updatedTable } };
	}
};

export async function load({ params }: RequestEvent) {
	const spaceId = params["app_id"];
	const tableName = params.table;

	const space = await prisma.space.findUnique({
		where: {
			appId: spaceId
		}
	});

	const table = await prisma.spaceTable.findFirst({
		where: { appId: space?.id, name: tableName },
		include: {
			columns: true
		}
	});

	return {
		columns: table?.columns ?? []
	};
}
