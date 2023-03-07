import { prisma } from '$lib/db/prisma';
import type { Actions, RequestEvent } from './$types';

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
	}
};

export async function load({ params }: RequestEvent) {
	const version = await prisma.spaceUIVersion.findFirst({
		where: {
			id: params.builder
		},
		include: {
			pages: true
		}
	});

	return { version, pages: version?.pages ?? [] };
}
