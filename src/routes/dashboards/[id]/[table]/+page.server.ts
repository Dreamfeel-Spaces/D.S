import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
export async function load({ params }: RequestEvent) {
	const tabName = params.table;
	const space = await prisma.space.findUnique({
		where: {
			appId: params.id
		}
	});

	if (!space) throw error(404, 'Space not found');
	const table = await prisma.spaceTable.findFirst({
		where: { name: tabName, tableSpace: space.id },
		include: {
			columns: true,
			rows: {
				include: {
					tableData: true
				}
			},
			space: true
		}
	});

	if (!table) throw error(404, 'Table not found');

	const formattedRows = (table ?? { rows: [] })?.rows.map((row) => {
		return {
			...row,
			...{
				...row.tableData.reduce((prev, curr) => {
					return { ...prev, [curr.column]: curr.data };
				}, {})
			}
		};
	});
	return {
		rows: formattedRows,
		columns: table?.columns.map((col) => col.name).filter(Boolean),
		space: table?.space?.id
	};
}
