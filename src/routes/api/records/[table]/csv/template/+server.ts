//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from '../$types';

export async function GET({ params, url }: RequestEvent) {
	const tableName = params.table;

	const take = url.searchParams.get('take');
	const skip = url.searchParams.get('skip');

	const excludeFields = url.searchParams.get('exclude-fields');

	let table;
	if (take && skip)
		table = await prisma.spaceTable.findFirst({
			where: {
				name: tableName
			},
			include: {
				columns: true
			}
		});
	else
		table = await prisma.spaceTable.findFirst({
			where: {
				name: tableName
			},
			include: {
				columns: true
			}
		});

	const excluded: string[] = JSON.parse(excludeFields ?? '[]');

	const headerArray =
		table?.columns.filter((col) => !excluded.includes(col.fieldName)).map((col) => col.fieldName) ??
		[];
	const headers = headerArray.reduce((prev, curr, index) => {
		if (index === headerArray.length) {
			return (
				prev +
				`${curr}
			`
			);
		}
		return prev + `${curr},`;
	}, '');

	const csv = headers;

	return new Response(JSON.stringify(csv));
}
