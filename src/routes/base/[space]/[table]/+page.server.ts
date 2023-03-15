import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent, Actions } from './$types';

export async function load({ params }: RequestEvent) {
	const tableName = params.table;
	const spaceId = params.space;

	const space = await prisma.space.findUnique({
		where: {
			appId: String(spaceId)
		},
		include: { tables: true }
	});

	if (!space) throw error(404, 'Space not found');

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName,
			appId: String(space?.id)
		},
		include: {
			columns: {
				include: {
					options: true
				}
			}
		}
	});

	return {
		table,
		tables: space.tables.map((table) => {
			return { name: table.name, value: table.id };
		}),
		columns: table?.columns ?? []
	};
}

export const actions: Actions = {
	async default({ params, request, locals }) {
		const spaceId = params.space;
		const tableId = params.table;

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});

		const table = await prisma.spaceTable.findFirst({
			where: { name: tableId, appId: String(space?.id) },
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
			if (!Boolean(column.id)) {
				const col = await prisma.column.create({
					data: {
						regex: column.regex,
						name: column.name,
						type: column.type,
						rel: column.rel,
						multiple: Boolean(column.multiple),
						spaceTableId: String(table?.id),
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
			} else {
				console.log(column.id);
				const col = await prisma.column.update({
					where: { id: column.id },
					data: {
						regex: column.regex,
						name: column.name,
						type: column.type,
						rel: column.rel,
						multiple: Boolean(column.multiple),
						defaultOn: Boolean(column.defaultOn),
						dateTimeDefault: column.dateTimeDefault
					}
				});

				if (column.type === 'select') {
					for (let option of column.options) {
						if (!Boolean(option.id)) {
							const opt = await prisma.columnSelectOptions.create({
								data: {
									columnId: String(col.id),
									label: String(option.label),
									value: String(option.value)
								}
							});
						} else {
							const opt = await prisma.columnSelectOptions.update({
								where: { id: option.id },
								data: {
									label: String(option.label),
									value: String(option.value)
								}
							});
						}
					}
				}

				fields.push(col);
			}
		}

		const updatedTable = await prisma.spaceTable.update({
			where: { id: String(table?.id) },
			data: {
				displayName: String(displayName)
			}
		});

		return { success: true, data: { fields, table: updatedTable } };
	}
};
