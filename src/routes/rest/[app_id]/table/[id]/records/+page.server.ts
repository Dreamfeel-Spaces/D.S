import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ params, url }: RequestEvent) {
	const spaceId = params["app_id"];
	const tableName = params["app_id"];

	const page = url.searchParams.get('page');
	const take = url.searchParams.get('take');
	const skip = url.searchParams.get('skip');

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName,
			appId: spaceId
		},
		include: {
			columns: true
		}
	});

	if (!table) throw error(404, 'Table not found');

	let rows;

	if (page && take && skip)
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
		return {
			...row,
			...{
				...row.tableData.reduce((prev, curr) => {
					return { ...prev, [curr.column]: curr.data };
				}, {})
			}
		};
	});

	return { rows: formattedRows, columns: table.columns.map((col) => col.name).filter(Boolean) };
}
