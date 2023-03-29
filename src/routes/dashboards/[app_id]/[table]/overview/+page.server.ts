import { prisma } from '$lib/db/prisma';
import { cleanData, convertToSlug } from '$lib/util/slugit';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const tableName = params.table;
	const space = await prisma.space.findUnique({
		where: {
			appId: params["app_id"]
		},
		include: { permissions: true, dashboards: true, tables: true }
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
					filters: true,
					SQT: true
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
					},
					SQT: true
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

	const columns = await prisma.column.findMany({
		where: {
			spaceTableId: table?.id
		}
	});

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
			const charts = JSON.parse(String(rep.charts));
			return { ...rep, columns: cols, rows, charts, fields: rep.fields };
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
		columns: table?.columns ?? [],
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

export const actions: Actions = {
	async addReport({ request, params }) {
		const spaceId = params["app_id"];
		const tableId = params.table;

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});

		if (!space) throw error(404, 'Space not found');

		const table = await prisma.spaceTable.findFirst({
			where: {
				appId: space.id,
				name: tableId
			}
		});

		if (!table) throw error(404, 'Table not found');

		const data = await request.formData();
		const name = String(data.get('name'));
		const description = String(data.get('description'));
		const sort = String(data.get('sort'));
		const sortBy = String(data.get('sort_by'));
		const layout = String(data.get('layout'));
		const orientation = String(data.get('orientation'));

		const charts = String(data.get('charts' ?? '[]'));

		const columnMetaData = JSON.parse(String(data.get('columnMetaData') ?? '[]'));
		const filters = JSON.parse(String(data.get('__report_filters') ?? '[]'));

		let report = await prisma.report.create({
			data: {
				name: convertToSlug(name),
				description,
				//@ts-ignore
				sort,
				sortBy,
				layout,
				orientation,
				tableId: String(table?.id),
				charts
			}
		});

		const fields: any = [];

		filters.forEach(async (filter: any) => {
			await prisma.reportFilter.create({
				data: {
					reportId: report.id,
					compare: filter.compare,
					operand: filter.operand,
					compareColumnId: filter.compareValue,
					compareValue:
						filter.compareValue === '__custom_field' ? filter.customValue : filter.compareValue
				}
			});
		});

		columnMetaData.forEach(async (column: any) => {
			if (column.checked) {
				const col = await prisma.reportField.create({
					data: {
						reportId: report.id,
						columnId: column.id
					}
				});
				fields.push(col);
			}
		});

		return { reportSuccess: true, data: { ...report, fields } };
	},
	async addChart({ request, params }) {
		const spaceId = params["app_id"];
		const tableId = params.table;

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});

		if (!space) throw error(404, 'Space not found');

		const table = await prisma.spaceTable.findFirst({
			where: {
				appId: space.id,
				name: tableId
			}
		});

		if (!table) throw error(404, 'Table not found');

		const data = await request.formData();
		const name = String(data.get('name'));
		const description = String(data.get('description'));
		const type = String(data.get('type'));
		const labelKey = String(data.get('labelKey'));
		const valueKey = String(data.get('valueKey'));

		const columnMetaData = JSON.parse(String(data.get('columnMetaData') ?? '[]'));

		let chart = await prisma.chart.create({
			data: {
				name: convertToSlug(name),
				description,
				type,
				tableId: String(table?.id),
				labelKey,
				valueKey
			}
		});

		const fields: any = [];

		columnMetaData.forEach(async (column: any) => {
			if (column.checked) {
				const col = await prisma.reportField.create({
					data: {
						chartId: chart.id,
						columnId: column.id
					}
				});
				fields.push(col);
			}
		});

		return { chartSuccess: true, data: { ...chart, fields } };
	},
	async addForm({ request, params }) {
		const spaceId = params["app_id"];
		const tableId = params.table;

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});

		if (!space) throw error(404, 'Space not found');

		const table = await prisma.spaceTable.findFirst({
			where: {
				appId: space.id,
				name: tableId
			}
		});

		if (!table) throw error(404, 'Table not found');

		const data = await request.formData();
		const name = String(data.get('name'));
		const description = String(data.get('description'));

		const isUpdate = data.get('isUpdate');

		const isUpdated = isUpdate === 'true';

		const columnMetaData = JSON.parse(String(data.get('columnMetaData') ?? '[]'));

		let form = await prisma.dashboardForm.create({
			data: {
				name: convertToSlug(name),
				description,
				tableId: String(table?.id),
				isUpdate: isUpdated
			}
		});

		const fields: any = [];

		columnMetaData.forEach(async (column: any) => {
			if (column.checked) {
				const col = await prisma.reportField.create({
					data: {
						dashboardFormId: form.id,
						columnId: column.id
					}
				});
				fields.push(col);
			}
		});
		return { formSuccess: true, data: { ...form, fields } };
	},
	async saveMiniform({ request, params }) {
		const data = await request.formData();
		const spaceId = params["app_id"];
		const tableId = params.table;

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			}
		});

		if (!space) throw error(404, 'Space not found');

		const recordId = String(data.get('record-id'));
		const formId = String(data.get('form-id'));

		const form = await prisma.dashboardForm.findUnique({
			where: {
				id: formId
			},
			include: {
				fields: {
					include: {
						field: true
					}
				}
			}
		});

		const columns = form?.fields.reduce((prev: any, curr) => {
			return [...prev, curr.field];
		}, []);

		let updates = [];
		for (let column of columns) {
			let _data = String(data.get(column.name));
			if (form?.isUpdate) {
				const td = await prisma.tableData.findFirst({
					where: {
						rowId: recordId,
						column: column.name,
						type: column.type
					}
				});
				let updated = await prisma.tableData.update({
					where: {
						id: String(td?.id)
					},
					data: {
						data: _data
					}
				});
				updates.push(updated);
			} else {
				let row = await prisma.row.create({
					data: {
						spaceTableId: String(form?.tableId)
					}
				});

				let created = await prisma.tableData.create({
					data: {
						data: _data,
						column: column.name,
						rowId: row.id,
						type: column.type,
						rel: column.rel,
						multiple: column.multiple,
						required: column.required
					}
				});
				updates.push(created);
			}
		}

		return { miniFormUpdateSuccess: true };
	},
	async deleteChart({ request }) {
		const data = await request.formData();
		const id = String(data.get('id'));
		await prisma.chart.delete({
			where: {
				id
			}
		});
		return { deleteChartSuccess: true };
	},
	async deleteForm({ request }) {
		const data = await request.formData();
		const id = String(data.get('id'));
		await prisma.dashboardForm.delete({
			where: {
				id
			}
		});
		return { deleteFormSuccess: true };
	},
	async deleteReport({ request }) {
		const data = await request.formData();
		const id = String(data.get('id'));
		await prisma.report.delete({
			where: {
				id
			}
		});
		return { deleteSuccess: true };
	},
	async createSharable({ request, params }) {
		const data = await request.formData();

		const itemId = String(data.get('id'));

		const type = String(data.get('type'));
		const via = String(data.get('via'));
		const shareWith = String(data.get('shareWith'));
		const rolesStr = String(data.get('roles') ?? '[]');
		const collection = String(data.get('collection')); //id
		const emailField = String(data.get('field'));
		const report = String(data.get('report'));
		const title = String(data.get('title'));
		const description = String(data.get('description'));
		const coverimage = String(data.get('coverImage'));
		const userListStr = String(data.get('users') ?? '[]');

		const roles = JSON.parse(rolesStr);
		const users = JSON.parse(userListStr);

		switch (type) {
			case 'form': {
				const data = {
					dashboardFormId: itemId,
					via,
					title,
					description,
					shareWith
				};

				const shared = await prisma.sQT.create({
					data: {
						...data
					}
				});

				return { shareFormSuccess: true, data: shared };
			}
			case 'chart': {
				break;
			}
			case 'report': {
				const data = {
					reportId: itemId,
					via,
					title,
					description,
					shareWith
				};

				const shared = await prisma.sQT.create({
					data: {
						...data
					}
				});

				return { shareReportSuccess: true, data: shared };
			}
			default: {
				return { newSharableError: true };
			}
		}
	}
};
