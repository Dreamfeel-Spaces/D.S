//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const tableName = params.table;

	const space = await prisma.space.findUnique({ where: { appId: String(params.id) } });

	if (!space) throw error(404, 'Space not found');

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName,
			tableSpace: space?.id
		},
		include: {
			columns: {
				include: {
					options: true
				}
			}
		}
	});

	if (!table) throw error(404, 'Table not found');

	let cols = table?.columns.filter((col) => Boolean(col.name)) ?? [];

	const relationShips = cols.filter((col) => col.type === 'rel');

	relationShips.forEach(async (rel) => {
		const indexOfRel = cols.indexOf(rel);
		const table = await prisma.spaceTable.findUnique({
			where: {
				id: String(rel.rel)
			},
			include: {
				rows: {
					include: {
						tableData: true
					}
				}
			}
		});
		const formattedRows = table?.rows.map((row) => {
			const formattedData = row.tableData.reduce((prev, curr) => {
				return { ...prev, [curr.column]: curr.data, id: row.id };
			}, {});
			return formattedData;
		});

		const labelAndValues = formattedRows?.map((row) => ({
			label: (row as any)[table?.displayName as any],
			value: (row as any)?.id
		}));
		cols[indexOfRel] = { ...rel, options: labelAndValues as any };
	});

	return { table: { ...table, columns: cols } };
}

export const actions: Actions = {
	async default({ request, locals, params }) {
		const tableName = params.table;
		const space = await prisma.space.findUnique({
			where: {
				appId: params.id
			}
		});
		if (!space) throw error(404, 'Space not found');
		const table = await prisma.spaceTable.findFirst({
			where: {
				name: tableName,
				tableSpace: space.id
			},
			include: {
				columns: true
			}
		});

		if (!table) throw error(404, 'Table not found');

		const cleanColumns = table?.columns.filter((col) => Boolean(col.name)) ?? [];

		const formData = await request.formData();

		const data = cleanColumns.reduce(
			(prev: any, curr: any) => {
				return {
					...prev,
					[curr.name]: formData.get(curr.name),
					type: curr.type,
					multiple: curr.multiple,
					required: curr.required
				};
			},
			{ ...{ rel: String(''), type: String('') } }
		);

		const row = await prisma.row.create({
			data: {
				spaceTableId: String(table?.id)
			}
		});

		let cells = [];

		let keys = Object.keys(data);

		for (let i = 0; i < keys.length; i++) {
			const item = keys[i];
			const cell = await prisma.tableData.create({
				data: {
					rowId: row.id,
					column: item,
					data:
						data.type === 'toggle'
							? JSON.parse(String((data as any)[item] ?? 'false'))
							: String((data as any)[item]),
					rel: data.rel,
					type: data.type,
					multiple: data.multiple,
					required: data.required
				}
			});
			cells.push(cell);
		}

		return { success: true, data: row };
	}
};
