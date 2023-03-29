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
			const existingCreate = await prisma.aPICreateCollectionPermissions.findFirst({
				where: {
					spaceTableId: table.id,
					userRolesId: role.id
				}
			});
			const existingView = await prisma.aPIGETCollectionPermissions.findFirst({
				where: {
					spaceTableId: table.id,
					userRolesId: role.id
				}
			});
			const existingUpdate = await prisma.aPIUpdateCollectionPermissions.findFirst({
				where: {
					spaceTableId: table.id,
					userRolesId: role.id
				}
			});
			const existingDelete = await prisma.aPIDeleteCollectionPermissions.findFirst({
				where: {
					spaceTableId: table.id,
					userRolesId: role.id
				}
			});
			if (role.createChecked) {
				if (!existingCreate) {
					const createPerm = await prisma.aPICreateCollectionPermissions.create({
						data: {
							userRolesId: role.id,
							spaceTableId: table.id
						}
					});
				}
			} else {
				if (existingCreate) {
					await prisma.aPICreateCollectionPermissions.delete({
						where: {
							id: existingCreate.id
						}
					});
				}
			}
			if (role.readChecked) {
				if (!existingView) {
					await prisma.aPIGETCollectionPermissions.create({
						data: {
							spaceTableId: table.id,
							userRolesId: role.id
						}
					});
				}
			} else {
				if (existingView)
					await prisma.aPIGETCollectionPermissions.delete({
						where: {
							id: existingView.id
						}
					});
			}
			if (role.updateChecked) {
				if (!existingUpdate) {
					await prisma.aPIUpdateCollectionPermissions.create({
						data: {
							spaceTableId: table.id,
							userRolesId: role.id
						}
					});
				}
			} else {
				if (existingUpdate)
					await prisma.aPIUpdateCollectionPermissions.delete({
						where: {
							id: existingUpdate.id
						}
					});
			}

			if (role.deleteChecked) {
				if (!existingDelete) {
					await prisma.aPIDeleteCollectionPermissions.create({
						data: {
							spaceTableId: table.id,
							userRolesId: role.id
						}
					});
				}
			} else {
				if (existingDelete)
					await prisma.aPIDeleteCollectionPermissions.delete({
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
			aPICreatePermissions: {
				include: {
					userRoles: true
				}
			},
			aPIGETPermissions: {
				include: {
					userRoles: true
				}
			},
			aPIUpdatePermissions: {
				include: {
					userRoles: true
				}
			},
			aPIDeletePermissions: {
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
