import { prisma } from '$lib/db/prisma';
import type { Actions, RequestEvent } from './$types';
import { error } from '@sveltejs/kit';

export async function load({ params, cookies }: RequestEvent) {
	const shareId = params["id"];

	const share = await prisma.sQT.findUnique({
		where: {
			id: shareId
		}
	});

	if (!share) throw error(404, 'Form not found');

	let form = await prisma.dashboardForm.findUnique({
		where: {
			id: String(share.dashboardFormId)
		},
		include: {
			fields: {
				include: {
					field: true
				}
			}
		}
	});

	if (!form) throw error(404, 'Form not found');

	const columns = form.fields.map((field) => field.field);

	let formsFilled: any[] = JSON.parse(cookies.get('filled-forms') ?? '[]');

	const isFilled = Boolean(formsFilled.find((f) => f.shareId === shareId));

	return { share, form: { ...form, columns }, isFilled };
}

export const actions: Actions = {
	async default({ params, request, cookies }) {
		const data = await request.formData();
		const shareId = params["id"];

		const share = await prisma.sQT.findUnique({
			where: {
				id: shareId
			}
		});

		if (!share) throw error(404, 'Form not found');

		let form = await prisma.dashboardForm.findUnique({
			where: {
				id: String(share.dashboardFormId)
			},
			include: {
				fields: {
					include: {
						field: true
					}
				},
				table: true
			}
		});

		if (!form) throw error(404, 'Form not found');

		const columns = form?.fields.reduce((prev: any, curr) => {
			return [...prev, curr.field];
		}, []);

		const row = await prisma.row.create({
			data: {
				spaceTableId: String(form.tableId)
			}
		});
		for (let column of columns) {
			let colData = String(data.get(column.name));

			if (colData) {
				const td = await prisma.tableData.create({
					data: {
						rowId: row.id,
						column: column.name,
						data: colData,
						type: column.type,
						rel: column.rel,
						multiple: column.multiple,
						required: column.required
					}
				});
			}
		}

		let formsFilled = JSON.parse(cookies.get('filled-forms') ?? '[]');
		formsFilled.push({ rowId: row.id, shareId: share.id });
		cookies.set('filled-forms', JSON.stringify(formsFilled));
	}
};
