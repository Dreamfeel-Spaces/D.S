import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { error } from '@sveltejs/kit';
import { cleanData } from '$lib/util/slugit';

export async function load({ params }: RequestEvent) {
	const reportId = params['report_id'];

	let report = await prisma.report.findUnique({
		where: {
			id: reportId
		},
		include: {
			fields: {
				include: {
					field: true
				}
			},
			table: {
				include: {
					rows: {
						include: {
							tableData: true
						}
					}
				}
			},
			filters: true
		}
	});

	if (!report) throw error(404, 'Report not found');

	const columns = report.fields.map((field) => field.field);

	const spaceId = report.table?.appId;

	const space = await prisma.space.findUnique({
		where: {
			id: String(spaceId)
		}
	});

	const table = report.table;

	if (!table) throw error(404, 'Table not found');

	const formattedRows = (table ?? { rows: [] })?.rows.map((row) => {
		return {
			...row,
			...{
				...row.tableData.reduce((prev, curr) => {
					return { ...prev, [curr.column]: curr.data, id: row.id, name: curr.data };
				}, {})
			}
		};
	});

	let rows = cleanData(report.filters, report.fields, formattedRows);

	return {
		report: { ...report, columns, rows, charts: JSON.parse(String(report.charts ?? [])) },
		space
	};
}
