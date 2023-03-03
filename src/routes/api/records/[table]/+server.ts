import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import { errorCatch } from '$lib/util/slugit';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ params, url, request }: RequestEvent) {
	const tableName = params.table;

	const apiKey = request.headers.get('x-api-key');
	const authorization = request.headers.get('authorization');

	if (!apiKey) throw error(403, 'Api key / authorization token required');

	const token = new Token();
	let [space, spaceError] = await errorCatch(token.verifyApiKey(apiKey));

	if (spaceError) throw error(403, 'Unable to verify api keys');

	const take = url.searchParams.get('take');
	const skip = url.searchParams.get('skip');

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName,
			tableSpace: space.id
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
	const apiKey = request.headers.get('x-api-key');
	const authorization = request.headers.get('authorization');

	if (!apiKey) throw error(403, 'Api key / authorization token required');

	const token = new Token();
	let [space, spaceError] = await errorCatch(token.verifyApiKey(apiKey));

	if (spaceError) throw error(403, 'Unable to verify api keys');

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
