//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	async default({ params, locals, request }) {
		const spaceId = params["app_id"];
		const tableId = params.table;

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
				appId: space?.id
			}
		});

		const data = await request.formData();

		const roles = await JSON.parse(String(data.get('requiredPermissions') ?? '[]'));

		for (let role of roles) {
			const existingCreate = await prisma.createCollectionPermissions.findFirst({
				where: {
					spaceTableId: table.id,
					userRolesId: role.id
				}
			});
			const existingView = await prisma.collectionViewPermissions.findFirst({
				where: {
					spaceTableId: table.id,
					userRolesId: role.id
				}
			});
			const existingUpdate = await prisma.updateCollectionPermissions.findFirst({
				where: {
					spaceTableId: table.id,
					userRolesId: role.id
				}
			});
			const existingDelete = await prisma.deleteCollectionPermissions.findFirst({
				where: {
					spaceTableId: table.id,
					userRolesId: role.id
				}
			});
			if (role.createChecked) {
				if (!existingCreate) {
					const createPerm = await prisma.createCollectionPermissions.create({
						data: {
							userRolesId: role.id,
							spaceTableId: table.id
						}
					});
				}
			} else {
				if (existingCreate) {
					await prisma.createCollectionPermissions.delete({
						where: {
							id: existingCreate.id
						}
					});
				}
			}
			if (role.readChecked) {
				if (!existingView) {
					await prisma.collectionViewPermissions.create({
						data: {
							spaceTableId: table.id,
							userRolesId: role.id
						}
					});
				}
			} else {
				if (existingView)
					await prisma.collectionViewPermissions.delete({
						where: {
							id: existingView.id
						}
					});
			}
			if (role.updateChecked) {
				if (!existingUpdate) {
					await prisma.updateCollectionPermissions.create({
						data: {
							spaceTableId: table.id,
							userRolesId: role.id
						}
					});
				}
			} else {
				if (existingUpdate)
					await prisma.updateCollectionPermissions.delete({
						where: {
							id: existingUpdate.id
						}
					});
			}

			if (role.deleteChecked) {
				if (!existingDelete) {
					await prisma.deleteCollectionPermissions.create({
						data: {
							spaceTableId: table.id,
							userRolesId: role.id
						}
					});
				}
			} else {
				if (existingDelete)
					await prisma.deleteCollectionPermissions.delete({
						where: {
							id: existingDelete.id
						}
					});
			}
		}
	}
};

export async function load({ params, locals }: RequestEvent) {
	const spaceId = params["app_id"];
	const tableId = params.table;

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
			appId: space?.id
		},
		include: {
			createPermissions: {
				include: {
					userRoles: true
				}
			},
			viewPermissions: {
				include: {
					userRoles: true
				}
			},
			updatePermissions: {
				include: {
					userRoles: true
				}
			},
			deletePermissions: {
				include: {
					userRoles: true
				}
			}
		}
	});

	if (!table) {
		throw error(404, 'Table not found');
	}

	const requiredPermissions = JSON.parse(table?.requiredPermissions ?? '[]');

	return { permissions: space?.permissions ?? [], requiredPermissions, table };
}
