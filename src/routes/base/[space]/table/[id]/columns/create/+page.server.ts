//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export const actions = {
	async default({ params, request, locals }) {
		const spaceId = params.space;
		const tableId = params.id;

		const space = await prisma.space.findFirst({
			where: { id: spaceId },
			include: { users: true }
		});
		const user = await prisma.user.findUnique({
			where: { email: session.user.email }
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

		if (table?.spaceId !== space?.id) throw error(404, 'Table not found!');

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
	const spaceId = params.space;
	const tableName = params.id;

	const tables = await prisma.spaceTable.findMany({
		where: { appId: spaceId }
	});

	return {
		tables: tables.map((table) => {
			return { name: table.name, value: table.id };
		})
	};
}
