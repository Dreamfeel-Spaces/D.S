//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from '../$types';

export async function POST({ request }: RequestEvent) {
	const data = request.json();
}

export async function GET({ params, url, request }: RequestEvent) {
	const tableName = params.table;

	const take = url.searchParams.get('take');
	const skip = url.searchParams.get('skip');

	const apiKey = request.headers.get('x-api-key');
	const authorization = request.headers.get('authorization');

	if (!apiKey) throw error(403, 'Api key / authorization token required');

	const token = new Token();
	let [space, spaceError] = await errorCatch(token.verifyApiKey(apiKey));

	if (spaceError) throw error(403, 'Unable to verify api keys');

	const excludeFields = url.searchParams.get('exclude-fields');

	let table;
	if (take && skip)
		table = await prisma.spaceTable.findFirst({
			where: {
				name: tableName,
				tableSpace: space.id
			},
			include: {
				columns: true,
				rows: {
					take: Number(take),
					skip: Number(skip),
					include: {
						tableData: true
					}
				}
			}
		});
	else
		table = await prisma.spaceTable.findFirst({
			where: {
				name: tableName,
				tableSpace: space.id
			},
			include: {
				columns: true,
				rows: {
					include: { tableData: true }
				}
			}
		});

	const excluded: string[] = JSON.parse(excludeFields ?? '[]');

	const headerArray =
		table?.columns.filter((col) => !excluded.includes(col.fieldName)).map((col) => col.fieldName) ??
		[];
	const headers = headerArray.reduce((prev, curr, index) => {
		if (index === headerArray.length) {
			return (
				prev +
				`${curr}
			`
			);
		}
		return prev + `${curr},`;
	}, '');

	const rows = table?.rows.map((row) => {
		return {
			...row,
			...row.tableData.reduce((p, c) => ({ ...p, [c.column]: c.data }), {})
		};
	});

	const formattedRows = rows?.map((row: any) => {
		return headerArray?.map((header, index) => {
			if (index === headerArray.length)
				return `${row[header]}
			`;
			return row[header];
		});
	});

	const csv = headers + formattedRows;

	return new Response(JSON.stringify(csv));
}
