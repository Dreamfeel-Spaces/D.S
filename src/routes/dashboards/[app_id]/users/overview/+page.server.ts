import { prisma } from '$lib/db/prisma';
import { cleanData, convertToSlug } from '$lib/util/slugit';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const tableName = params['app_id'];
	const space = await prisma.space.findUnique({
		where: {
			appId: params['app_id']
		},
		include: { permissions: true, dashboards: true }
	});

	if (!space) throw error(404, 'Space not found');

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName,
			appId: space.id
		},
		include: {
			columns: true,
			reports: {
				include: {
					fields: {
						include: {
							field: true
						}
					},
					filters: true
				}
			},
			charts: {
				include: {
					fields: {
						include: {
							field: true
						}
					}
				}
			},
			dashboardForms: {
				include: {
					fields: {
						include: {
							field: true
						}
					}
				}
			},
			rows: {
				include: {
					tableData: true
				}
			}
		}
	});

	let dash;

	if (!table) {
		dash = space.dashboards.filter((dashboard) => dashboard.name === tableName);
		if (!dash) throw error(404, 'Dashboard not found');
	}

	const count = await prisma.row.count({
		where: {
			spaceTableId: String(table?.id)
		}
	});

	const columns: any = [
		{
			name: 'name',
			type: 'string'
		},
		{
			name: 'name',
			type: 'string'
		}
		,
		{
			name: 'phone',
			type: 'string'
		}
		,
		{
			name: 'dateCreated',
			type: 'string'
		},
		{
			name: 'updatedAt',
			type: 'string'
		},
		{
			name: 'username',
			type: 'string'
		},
		{
			name: 'status',
			type: 'string'
		},
		{
			name: 'name',
			type: 'string'
		},
		{
			name: 'avatar',
			type: 'string'
		}
	];

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

	const reportColumns =
		table?.reports.map((rep) => {
			let cols = rep.fields.reduce((prev: any, curr) => {
				return [...prev, curr.field];
			}, []);
			let rows = cleanData(rep.filters, rep.fields, formattedRows);
			return { ...rep, columns: cols, rows };
		}) ?? [];

	const chartColumns =
		table?.charts.map((rep) => {
			let cols = rep.fields.reduce((prev: any, curr) => {
				return [...prev, curr.field];
			}, []);
			return { ...rep, columns: cols };
		}) ?? [];

	const formColumns =
		table?.dashboardForms.map((rep) => {
			let cols = rep.fields.reduce((prev: any, curr) => {
				return [...prev, curr.field];
			}, []);
			return { ...rep, columns: cols };
		}) ?? [];

	return {
		count,
		columns,
		permissions: space.permissions,
		reports: reportColumns,
		rows: formattedRows,
		space,
		table,
		charts: chartColumns,
		forms: formColumns,
		dashboard: dash,
		isDashboard: true
	};
}

// export const actions: Actions = {
// 	async addReport({ request, params }) {
// 		const spaceId = params["app_id"];
// 		const tableId = params.table;

// 		const space = await prisma.space.findUnique({
// 			where: {
// 				appId: spaceId
// 			}
// 		});

// 		if (!space) throw error(404, 'Space not found');

// 		const table = await prisma.spaceTable.findFirst({
// 			where: {
// 				spaceId: space.id,
// 				name: tableId
// 			}
// 		});

// 		if (!table) throw error(404, 'Table not found');

// 		const data = await request.formData();
// 		const name = String(data.get('name'));
// 		const description = String(data.get('description'));
// 		const sort = String(data.get('sort'));
// 		const sortBy = String(data.get('sort_by'));
// 		const layout = String(data.get('layout'));
// 		const orientation = String(data.get('orientation'));

// 		const columnMetaData = JSON.parse(String(data.get('columnMetaData') ?? '[]'));
// 		const filters = JSON.parse(String(data.get('__report_filters') ?? '[]'));

// 		let report = await prisma.report.create({
// 			data: {
// 				name: convertToSlug(name),
// 				description,
// 				//@ts-ignore
// 				sort,
// 				sortBy,
// 				layout,
// 				orientation,
// 				tableId: String(table?.id)
// 			}
// 		});

// 		const fields: any = [];

// 		filters.forEach(async (filter: any) => {
// 			await prisma.reportFilter.create({
// 				data: {
// 					reportId: report.id,
// 					compare: filter.compare,
// 					operand: filter.operand,
// 					compareColumnId: filter.compareValue,
// 					compareValue:
// 						filter.compareValue === '__custom_field' ? filter.customValue : filter.compareValue
// 				}
// 			});
// 		});

// 		columnMetaData.forEach(async (column: any) => {
// 			if (column.checked) {
// 				const col = await prisma.reportField.create({
// 					data: {
// 						reportId: report.id,
// 						columnId: column.id
// 					}
// 				});
// 				fields.push(col);
// 			}
// 		});

// 		return { reportSuccess: true, data: { ...report, fields } };
// 	},
// 	async addChart({ request, params }) {
// 		const spaceId = params["app_id"];
// 		const tableId = params.table;

// 		const space = await prisma.space.findUnique({
// 			where: {
// 				appId: spaceId
// 			}
// 		});

// 		if (!space) throw error(404, 'Space not found');

// 		const table = await prisma.spaceTable.findFirst({
// 			where: {
// 				spaceId: space.id,
// 				name: tableId
// 			}
// 		});

// 		if (!table) throw error(404, 'Table not found');

// 		const data = await request.formData();
// 		const name = String(data.get('name'));
// 		const description = String(data.get('description'));
// 		const type = String(data.get('type'));
// 		const labelKey = String(data.get('labelKey'));
// 		const valueKey = String(data.get('valueKey'));

// 		const columnMetaData = JSON.parse(String(data.get('columnMetaData') ?? '[]'));

// 		let chart = await prisma.chart.create({
// 			data: {
// 				name: convertToSlug(name),
// 				description,
// 				type,
// 				tableId: String(table?.id),
// 				labelKey,
// 				valueKey
// 			}
// 		});

// 		const fields: any = [];

// 		columnMetaData.forEach(async (column: any) => {
// 			if (column.checked) {
// 				const col = await prisma.reportField.create({
// 					data: {
// 						chartId: chart.id,
// 						columnId: column.id
// 					}
// 				});
// 				fields.push(col);
// 			}
// 		});

// 		return { chartSuccess: true, data: { ...chart, fields } };
// 	},
// 	async addForm({ request, params }) {
// 		const spaceId = params["app_id"];
// 		const tableId = params.table;

// 		const space = await prisma.space.findUnique({
// 			where: {
// 				appId: spaceId
// 			}
// 		});

// 		if (!space) throw error(404, 'Space not found');

// 		const table = await prisma.spaceTable.findFirst({
// 			where: {
// 				spaceId: space.id,
// 				name: tableId
// 			}
// 		});

// 		if (!table) throw error(404, 'Table not found');

// 		const data = await request.formData();
// 		const name = String(data.get('name'));
// 		const description = String(data.get('description'));

// 		const columnMetaData = JSON.parse(String(data.get('columnMetaData') ?? '[]'));

// 		let form = await prisma.dashboardForm.create({
// 			data: {
// 				name: convertToSlug(name),
// 				description,
// 				tableId: String(table?.id)
// 			}
// 		});

// 		const fields: any = [];

// 		columnMetaData.forEach(async (column: any) => {
// 			if (column.checked) {
// 				const col = await prisma.reportField.create({
// 					data: {
// 						dashboardFormId: form.id,
// 						columnId: column.id
// 					}
// 				});
// 				fields.push(col);
// 			}
// 		});
// 		return { formSuccess: true, data: { ...form, fields } };
// 	},
// 	async saveMiniform({ request, params }) {
// 		const data = await request.formData();
// 		const spaceId = params["app_id"];
// 		const tableId = params.table;

// 		const space = await prisma.space.findUnique({
// 			where: {
// 				appId: spaceId
// 			}
// 		});

// 		if (!space) throw error(404, 'Space not found');

// 		const recordId = String(data.get('record-id'));
// 		const formId = String(data.get('form-id'));

// 		const form = await prisma.dashboardForm.findUnique({
// 			where: {
// 				id: formId
// 			},
// 			include: {
// 				fields: {
// 					include: {
// 						field: true
// 					}
// 				}
// 			}
// 		});

// 		const columns = form?.fields.reduce((prev: any, curr) => {
// 			return [...prev, curr.field];
// 		}, []);

// 		let updates = [];
// 		for (let column of columns) {
// 			let _data = String(data.get(column.name));
// 			const td = await prisma.tableData.findFirst({
// 				where: {
// 					rowId: recordId,
// 					column: column.name,
// 					type: column.type
// 				}
// 			});
// 			let updated = await prisma.tableData.update({
// 				where: {
// 					id: String(td?.id)
// 				},
// 				data: {
// 					data: _data
// 				}
// 			});
// 			updates.push(updated);
// 		}

// 		return { miniFormUpdateSuccess: true };
// 	},
// 	async deleteChart({ request }) {
// 		const data = await request.formData();
// 		const id = String(data.get('id'));
// 		await prisma.chart.delete({
// 			where: {
// 				id
// 			}
// 		});
// 		return { deleteChartSuccess: true };
// 	},
// 	async deleteForm({ request }) {
// 		const data = await request.formData();
// 		const id = String(data.get('id'));
// 		await prisma.dashboardForm.delete({
// 			where: {
// 				id
// 			}
// 		});
// 		return { deleteFormSuccess: true };
// 	},
// 	async deleteReport({ request }) {
// 		const data = await request.formData();
// 		const id = String(data.get('id'));
// 		await prisma.report.delete({
// 			where: {
// 				id
// 			}
// 		});
// 		return { deleteSuccess: true };
// 	}
// };
