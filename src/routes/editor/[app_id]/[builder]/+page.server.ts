import { prisma } from '$lib/db/prisma';
import { transformRows } from '$lib/rows/transform';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ params, locals }: RequestEvent) {
	const spaceId = params['app_id'];
	const versionId = params.builder;

	const space = await prisma.space.findUnique({
		where: {
			appId: spaceId
		},
		include: {
			spaceUis: {
				include: {
					spaceUIVersion: {
						include: {
							pages: true
						}
					}
				}
			}
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
				},
				where: {
					deleted: false
				}
			}
		}
	});

	const tables = await prisma.spaceTable.findMany({
		where: {
			appId: space.id
		},
		include: {
			columns: true,
			rows: {
				include: {
					tableData: true
				}
			}
		}
	});
	const withRows = tables.reduce((prev, curr) => {
		return { ...prev, [curr.id]: transformRows(curr.rows) };
	}, {});

	const page = await prisma.spaceUIVersion.findFirst({
		where: {
			id: params.builder
		}
	});

	let customBlocks = await locals.db.uIComponents.findMany({
		where: {
			spaceId: locals.space.id
		}
	});

	let assets = await locals.db.assets.findMany({
		where: {
			spaceId: locals.space.id
		}
	});

	return {
		space,
		ui,
		tables: tables?.map((tb) => ({ ...tb, rows: transformRows(tb.rows) })) ?? [],
		rows: withRows,
		pages: ui?.pages ?? [],
		projectData: null ?? {
			assets: [],
			styles: [],
			pages: [
				{
					frames: [
						{
							component: {
								type: 'wrapper',
								stylable: [
									'background',
									'background-color',
									'background-image',
									'background-repeat',
									'background-attachment',
									'background-position',
									'background-size'
								],
								attributes: { id: 'ih7d' },
								components: [
									{
										tagName: 'p',
										type: 'text',
										classes: ['text-center', 'text-3xl', 's-7ZH0rBIgMesu'],
										components: [{ type: 'textnode', content: 'Hello world!' }]
									},
									{
										classes: ['flex', 'items-center', 'justify-between', 'w-full'],
										components: [
											{
												classes: [
													'flex',
													'flex-col',
													'lg:flex-row',
													'w-full',
													'items-start',
													'lg:items-center',
													'rounded',
													'bg-white',
													'shadow'
												],
												components: [
													{
														classes: [
															'w-full',
															{ name: 'lg:w-2-3', label: 'lg:w-2/3' },
															'h-64',
															'dark:bg-gray-800'
														]
													},
													{
														classes: [
															'w-full',
															{ name: 'lg:w-1-3', label: 'lg:w-1/3' },
															'h-24',
															'dark:border-gray-700',
															'lg:h-64',
															'border-t',
															'lg:border-t-0',
															'lg:border-r',
															'lg:border-l',
															'lg:rounded-r',
															'dark:bg-gray-700',
															'bg-gray-100'
														]
													}
												]
											}
										]
									}
								]
							}
						}
					],
					id: 'WgVmnFPvY0moeWlm'
				}
			]
		},
		customBlocks,
		assets: assets.filter((v) => Boolean(v.url)),
		versions:space.spaceUis
	};
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
	},
	async savePageData({ request, params }) {
		const pageId = params.path;
		const data = await request.formData();

		const html = data.get('html');
		const css = data.get('css');
		const js = data.get('js');

		await prisma.page.update({
			where: {
				id: pageId
			},
			data: {
				html: JSON.stringify({ html, css, js })
			}
		});

		return { pageSaveSuccess: true };
	}
};
