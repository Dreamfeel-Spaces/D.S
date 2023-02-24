import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from '../$types';

export async function GET({ params }: RequestEvent) {
	const tableName = params.table;
	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableName
		},
		include: {
			columns: true
		}
	});

	const formattedSchema = table?.columns?.map((col) => {
		return { field: col.fieldName, type: col.fiedType };
	});

    return new Response(JSON.stringify(formattedSchema))
}
