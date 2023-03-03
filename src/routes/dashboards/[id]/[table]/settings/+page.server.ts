import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	async default({ params, locals, request }) {
		const spaceId = params.id;
		const tableId = params.table;

		const session = await locals.getSession();

		if (!session) throw error(403, 'Unauthorized');

		const user = await prisma.user.findUnique({
			where: {
				email: String(session?.user?.email)
			}
		});

		const space = await prisma.space.findUnique({
			where: {
				appId: spaceId
			},
			include: {
				permissions: true
			}
		});

		const table = await prisma.spaceTable.findFirst({
			where: {
				name: tableId,
				tableSpace: space?.id
			}
		});

		const data = await request.formData();

		const requiredPermissions = String(data.get('requiredPermissions'));

		// 0712131104

		// 0110879630

		// 0796097131

		await prisma.spaceTable.update({
			where: { id: table?.id },
			data: {
				requiredPermissions
			}
		});
	}
};

export async function load({ params, locals }: RequestEvent) {
	const spaceId = params.id;
	const tableId = params.table;

	const session = await locals.getSession();

	if (!session) throw error(403, 'Unauthorized');

	const user = await prisma.user.findUnique({
		where: {
			email: String(session?.user?.email)
		}
	});

	const space = await prisma.space.findUnique({
		where: {
			appId: spaceId
		},
		include: {
			permissions: true
		}
	});

	const table = await prisma.spaceTable.findFirst({
		where: {
			name: tableId,
			tableSpace: space?.id
		}
	});

	if (!table) {
		throw error(404, 'Table not found');
	}

	const requiredPermissions = JSON.parse(table?.requiredPermissions ?? '[]');

	return { permissions: space?.permissions ?? [], requiredPermissions };
}
