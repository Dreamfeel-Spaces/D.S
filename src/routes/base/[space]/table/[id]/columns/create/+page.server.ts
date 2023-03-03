//@ts-nocheck

import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export const actions = {
	async default({ params, request, locals }) {
		const spaceId = params.space;
		const tableId = params.id;

		const session = await locals.getSession();

		if (!session) throw error(403, 'Authorization failed');
		const space = await prisma.space.findFirst({
			where: { id: spaceId },
			include: { admins: true }
		});
		const user = await prisma.user.findUnique({
			where: { email: session.user.email }
		});

		function isAdmin() {
			if (user?.id === space?.userId) return true;
			return space?.admins.find((admin) => admin.userId === user?.id);
		}

		if (!isAdmin()) throw error(403, 'You are unauthorized to view this page');

		const table = await prisma.spaceTable.findFirst({
			where: { name: tableId, tableSpace: space.id },
			include: {
				rows: {
					include: {
						tableData: true
					}
				},
				columns: true
			}
		});

		if (table?.tableSpace !== space?.id) throw error(404, 'Table not found!');

		const data = await request.formData();

		let fields = [];

		let columns = String(data.get('columns') ?? '[]');
		let displayName = data.get('displayName');

		for (let column of JSON.parse(columns)) {
			const col = await prisma.column.create({
				data: {
					regex: column.regex,
					name: column.name,
					type: column.type,
					rel: column.rel,
					multiple: Boolean(column.multiple),
					spaceTableId: table.id,
					defaultOn: Boolean(column.defaultOn),
					dateTimeDefault: column.dateTimeDefault
				}
			});

			if (column.type === 'select') {
				for (let option of column.options) {
					const opt = await prisma.columnSelectOptions.create({
						data: {
							columnId: String(col.id),
							label: String(option.label),
							value: String(option.value)
						}
					});
				}
			}

			fields.push(col);
		}

		const updatedTable = await prisma.spaceTable.update({
			where: { id: table.id },
			data: {
				displayName: String(displayName)
			}
		});

		console.log(fields);

		return { success: true, data: { fields, table: updatedTable } };
	}
};

export async function load({ params }: RequestEvent) {
	const spaceId = params.space;
	const tableName = params.id;

	const tables = await prisma.spaceTable.findMany({
		where: { tableSpace: spaceId }
	});

	return {
		tables: tables.map((table) => {
			return { name: table.name, value: table.id };
		})
	};
}
