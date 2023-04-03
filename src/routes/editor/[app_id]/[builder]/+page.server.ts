import { prisma } from '$lib/db/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const spaceId = params["app_id"];
	const versionId = params.builder;

	const space = await prisma.space.findUnique({
		where: {
			appId: spaceId
		}
	});

	if (!space) throw error(404, 'Space not found.');

	const ui = await prisma.spaceUIVersion.findUnique({
		where: {
			id: versionId
		},
		include: {
			pages: {
				include: {
					components: true
				}
			}
		}
	});

	if (!ui) {
		throw error(404, 'Pages not found.');
	}

	if (!ui?.pages?.length) {
		const indexPage = await prisma.page.create({
			data: {
				name: 'Index',
				path: '/',
				spaceUIVersionId: String(ui.id)
			}
		});
		throw redirect(302, `/editor/${params["app_id"]}/${params.builder}/${indexPage.id}`)
	}

	const index= ui.pages.find((page) => page.path === '/')?.id ?? ui.pages[0]?.id
	throw redirect(302, `/editor/${params["app_id"]}/${params.builder}/${index}`)

	// const tables = await prisma.spaceTable.findMany({
	// 	where: {
	// 		spaceId: space.id
	// 	},
	// 	include: {
	// 		columns: true,
	// 		rows: true
	// 	}
	// });

	return { space, ui };
}

export const actions: Actions = {
	async createPage({ params, request }) {
		const version = params.builder;
		const uiVersion = await prisma.spaceUIVersion.findUnique({
			where: { id: version }
		});
		const data = await request.formData();
		const name = String(data.get('name'));
		const icon = String(data.get('icon'));
		const path = String(data.get('path'));
		const page = await prisma.page.create({
			data: {
				spaceUIVersionId: String(uiVersion?.id),
				name,
				icon,
				path
			}
		});
		return { createPageSuccess: true, data: page };
	},
	async deletePage({ request }) {
		const data = await request.formData();
		const pageId = String(data.get('page'));
		const notConfirmed = JSON.parse(String(data.get('confirmed') ?? 'true'));
		if (notConfirmed) {
			return { confirmPageDelete: true, page: pageId };
		}
		const page = await prisma.page.delete({
			where: { id: pageId }
		});
		return { deletePageSuccess: true, data: page };
	},
	async updatePage({ request, params }) {
		const version = params.builder;
		const data = await request.formData();
		const name = String(data.get('name'));
		const pageId = String(data.get('pageId'));
		const icon = String(data.get('icon'));
		const path = String(data.get('path'));
		const page = await prisma.page.update({
			where: { id: pageId },
			data: {
				spaceUIVersionId: version,
				name,
				icon,
				path
			}
		});
		return { createPageSuccess: true, data: page };
	},
	async createComponent({ request }) {
		const data = await request.formData();
		const name = String(data.get('name'));
		const pageId = String(data.get('page'));
		const icon = String(data.get('icon'));
		const type = String(data.get('type'));
		const variant = String(data.get('variant'));
		const component = await prisma.component.create({
			data: {
				pageId,
				name,
				icon,
				type,
				variant
			}
		});
		return { createComponentSuccess: true, data: component };
	},
	async deleteComponent({ request }) {
		const data = await request.formData();
		const componentId = String(data.get('component'));
		const notConfirmed = JSON.parse(String(data.get('confirmed') ?? 'true'));
		// if (notConfirmed) {
		// 	return { confirmComponentDelete: true, component: componentId };
		// }
		const page = await prisma.component.delete({
			where: { id: componentId }
		});
		return { deleteComponentSuccess: true, data: page };
	},
	async updateComponent({ request }) {
		const data = await request.formData();
		const name = String(data.get('name'));
		const componentId = String(data.get('componentId'));
		const icon = String(data.get('icon'));
		const type = String(data.get('type'));
		const component = await prisma.component.update({
			where: { id: componentId },
			data: {
				name,
				icon,
				type
			}
		});
		return { updateComponentSuccess: true, data: component };
	}
};