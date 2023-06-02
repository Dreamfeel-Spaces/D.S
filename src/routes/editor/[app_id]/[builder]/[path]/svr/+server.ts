import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

//31/5/2023

export async function PATCH({ request, params }: RequestEvent) {
	const pageId = params.path;
	const data = await request.json();

	let page = await prisma.page.findFirst({
		where: {
			id: pageId
		}
	});

	if (page) {
		page = await prisma.page.update({
			where: {
				id: pageId
			},
			data: {
				pageData: JSON.stringify(data)
			}
		});
	}

	return new Response(JSON.stringify(page));
}

export async function GET({ params }: RequestEvent) {
	const page = await prisma.page.findFirst({
		where: {
			id: params.path
		}
	});

	// console.log(page?.pageData);

	const data = JSON.parse(page?.pageData ?? 'null')?.data ?? {
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
	};

	return new Response(JSON.stringify(data));
}
