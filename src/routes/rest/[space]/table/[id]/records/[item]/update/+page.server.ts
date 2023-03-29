import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	async default({ params, request }) {
		const rowId = params.item;

		const row = await prisma.row.findUnique({
			where: {
				id: rowId
			},
			include: {
				tableData: true
			}
		});

		if (!row) throw error(404, 'Record not found');

		const formData = await request.formData();

		const validKeys = row?.tableData.map((dt) => dt.column) ?? [];

		const values = validKeys.map((key) => ({ column: key, value: formData.get(key) }));

		let updates = [];
		for (let data of row.tableData) {
			let newValue = values.find((val) => val.column === data.column);
			const updated = await prisma.tableData.update({
				where: {
					id: data.id
				},
				data: { data: String(newValue?.value) }
			});
			updates.push(updated);
		}

		const formattedResponse = updates.reduce((prev, curr) => {
			return { ...prev, [curr.column]: curr.data };
		}, {});

		return { success: true, data: formattedResponse };
	}
};

export async function load({ params }: RequestEvent) {
	const record = params.item;
	const row = await prisma.row.findUnique({
		where: {
			id: record
		},
		include: {
			tableData: true
		}
	});

	const rowObj = row?.tableData.reduce((prev, curr) => {
		return { ...prev, [curr.column]: curr.data };
	}, {});

	return { item: rowObj };
}
