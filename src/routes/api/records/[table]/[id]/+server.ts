import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ params, request }: RequestEvent) {
	const tableName = params.table;
	const recordId = params.id;
	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName
		},
		include: {
			columns: true
		}
	});
	if (!table) throw error(404, 'Table not found');

	const row = await prisma.row.findUnique({
		where: { id: recordId },
		include: { tableData: true }
	});
	if (!row) throw error(404, 'Record not found');

	if (row.spaceTableId !== table.id)
		throw error(403, `Record doesn't belong to ${tableName} table `);

	let formattedResponse = {
		...row,
		...{ ...row.tableData.reduce((prev, curr) => ({ ...prev, [curr.column]: curr.data }), {}) }
	};

	delete (formattedResponse as any)['tableData'];

	return new Response(JSON.stringify(formattedResponse));
}

export async function PUT({ request, params }: RequestEvent) {
	const tableName = params.table;
	const itemId = params.id;

	const formData = await request.json();

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName
		},
		include: {
			columns: true
		}
	});

	if (!table) throw error(404, 'Table not found');

	const cleanColumns = table?.columns.filter((col) => Boolean(col.name)) ?? [];

	const data = cleanColumns.reduce((prev, curr: any) => {
		return { ...prev, [curr.name]: formData[curr.name] };
	}, {});

	const row = await prisma.row.findFirst({
		where: {
			id: itemId
		},
		include: {
			tableData: true
		}
	});

	if (!row) throw error(404, 'Record not found');

	let updates = [];

	for (let existing of row.tableData) {
		const updated = await prisma.tableData.update({
			where: {
				id: existing.id
			},
			data: {
				data: (data as any)[existing.column]
			}
		});
		updates.push(updated);
	}

	let formattedResponse = updates.reduce((prev, curr) => {
		return { ...prev, [curr.column]: curr.data };
	}, {});

	//@ts-ignore
	delete row['tableData'];

	return new Response(JSON.stringify({ ...formattedResponse, ...row }));
}

export async function PATCH({ request, params }: RequestEvent) {
	const tableName = params.table;
	const itemId = params.id;

	const formData = await request.json();

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName
		},
		include: {
			columns: true
		}
	});

	if (!table) throw error(404, 'Table not found');

	const cleanColumns = table?.columns.filter((col) => Boolean(col.name)) ?? [];

	const data = cleanColumns.reduce((prev, curr: any) => {
		return { ...prev, [curr.name]: formData[curr.name] };
	}, {});

	const row = await prisma.row.findFirst({
		where: {
			id: itemId
		},
		include: {
			tableData: true
		}
	});

	if (!row) throw error(404, 'Record not found');

	let updates = [];

	for (let existing of row.tableData) {
		const updated = await prisma.tableData.update({
			where: {
				id: existing.id
			},
			data: {
				data: (data as any)[existing.column]
			}
		});
		updates.push(updated);
	}

	let formattedResponse = updates.reduce((prev, curr) => {
		return { ...prev, [curr.column]: curr.data };
	}, {});

	//@ts-ignore
	delete row['tableData'];

	return new Response(JSON.stringify({ ...formattedResponse, ...row }));
}

export async function DELETE({ params }: RequestEvent) {
	const item = params.id;
	const row = await prisma.row.findUnique({
		where: { id: item }
	});

	if (!row) {
		throw error(404, 'Item not found');
	}

	const deleted = await prisma.row.delete({
		where: { id: item }
	});
	return new Response(JSON.stringify(deleted));
}
