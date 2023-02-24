import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ params, url }: RequestEvent) {
	const tableName = params.table;

	const take = url.searchParams.get('take');
	const skip = url.searchParams.get('skip');

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName
		}
	});

	if (!table) throw error(404, 'Table not found');

	const count = await prisma.row.count({
		where: {
			spaceTableId: table.id
		}
	});

	let rows;

	if (take || skip)
		rows = await prisma.row.findMany({
			where: { spaceTableId: table.id },
			take: Number(take),
			skip: Number(skip),
			include: {
				tableData: true
			}
		});
	else
		rows = await prisma.row.findMany({
			where: { spaceTableId: table.id },
			include: {
				tableData: true
			}
		});

	const formattedRows = rows.map((row) => {
		row = { ...row };
		let tabledata = [...row.tableData];
		delete (row as any)['tableData'];
		return {
			...row,
			...{
				...tabledata.reduce((prev, curr) => {
					return { ...prev, [curr.column]: curr.data };
				}, {})
			}
		};
	});

	const formattedResponse = {
		count,
		take,
		skip,
		data: formattedRows
	};
	return new Response(JSON.stringify(formattedResponse));
}

export async function POST({ request, params }: RequestEvent) {
	const tableName = params.table;
	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName
		},
		include: {
			columns: true
		}
	});
	if (!table) throw error(404, 'Table not found');
	const rawData = await request.json();
	const cleanData =
		table.columns
			.filter((col) => Boolean(col.name))
			.map((column) => {
				//@ts-ignore
				return {
					field: column.name,
					data: (rawData as any)[column?.name as any],
					rel: String(rawData['rel']),
					type: String(column.type),
					multiple: Boolean(column.multiple),
					required: Boolean(column.required)
				};
			}) ?? [];

	const row = await prisma.row.create({
		data: {
			spaceTableId: table.id
		}
	});

	if (!row) throw error(500, 'An internal error occured');

	let all = [];
	for (let fieldData of cleanData) {
		const saved = await prisma.tableData.create({
			data: {
				rowId: row.id,
				column: String(fieldData.field),
				data: fieldData.data,
				rel: fieldData.rel,
				type: fieldData.type,
				multiple: fieldData.multiple,
				required: fieldData.required
			}
		});
		all.push(saved);
	}

	return new Response(
		JSON.stringify({
			...row,
			...{ ...all.reduce((prev, curr) => ({ ...prev, [curr.column]: curr.data }), {}) }
		})
	);
}
