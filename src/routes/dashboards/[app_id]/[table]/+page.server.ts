import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
export async function load({ params, locals }: RequestEvent) {
	// @ts-ignore
	const space = locals.space;

	if (!space) throw error(404, 'Space not found');
	const table = space.tables.find((table: any) => table.name === params.table);

	if (!table) throw error(404, 'Table not found');

	const formattedRows = (table ?? { rows: [] })?.rows.map((row: { tableData: any[] }) => {
		return {
			...row,
			...{
				...row.tableData.reduce((prev: any, curr: { column: any; data: any }) => {
					return { ...prev, [curr.column]: curr.data };
				}, {})
			}
		};
	});
	return {
		rows: formattedRows,
		columns: table?.columns.map((col: { name: any }) => col.name).filter(Boolean),
		space: table?.app?.id
	};
}
