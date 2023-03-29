import { prisma } from '$lib/db/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	async delete({ params }) {
		const id = params.item;
		const data = await prisma.row.delete({
			where: {
				id
			}
		});
		throw redirect(302, `/dashboards/${params["app_id"]}/${params.table}`);
	}
};

export async function load({ params }: RequestEvent) {
	const item = params.item;

	const row = await prisma.row.findFirst({
		where: {
			id: item
		},
		include: {
			tableData: true,
			table: {
				select: {
					displayName: true
				}
			}
		}
	});

	if (!row) throw error(404, 'Record not found');

	const tableData = row.tableData.reduce((prev, curr) => {
		return { ...prev, [curr.column]: curr.data };
	}, {});

	return { item: { ...tableData, _displayName: row.table.displayName } };
}
