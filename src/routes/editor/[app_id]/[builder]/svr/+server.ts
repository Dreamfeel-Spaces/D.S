import { prisma } from '$lib/db/prisma';
import { gSpaceApIList } from '$lib/plugins/grapes/space-ui/spaceApiList';
import type { RequestEvent } from './$types';
import grapesjs from 'grapesjs';
import appCss from '../../../../../app.css?inline';

//31/5/2023

export async function POST({ request }: RequestEvent) {
	const data = await request.json();
	const page = await prisma.page.create({
		data: {
			name: data.name,
			spaceUIVersionId: data.version,
			path: data.path
		}
	});

	return new Response(JSON.stringify(page));
}
export async function PATCH({ request, params, locals }: RequestEvent) {
	const data = await request.json();
	const pageId = params.builder;

	let page = await prisma.spaceUIVersion.findFirst({
		where: {
			id: pageId
		}
	});

	// console.log('page', page);

	if (page) {
		page = await prisma.spaceUIVersion.update({
			where: {
				id: pageId
			},
			data: {
				pageData: JSON.stringify(data)
			}
		});
	}

	const pageData = JSON.parse(page?.pageData ?? 'null')?.data ?? {
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

	const grapesEditor = grapesjs.init({
		headless: true,
		plugins: [
			(editor) =>
				gSpaceApIList(editor, {
					tables: locals.space?.tables ?? [],
					pages: [page],
					pageId: page?.id ?? '',
					headless: true,
					space: locals.space
				})
		]
	});

	grapesEditor.loadProjectData(pageData);

	const htmlContent = grapesEditor.getHtml();

	const pagePreset = `
	<!doctype html>
	<html  >
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${locals?.space?.name ?? 'Dreamfeel Space'}</title>

	<!-- HTML Meta Tags -->
	
	<meta name="description" content="${locals?.space?.description ?? 'Dreamfeel Space'}">
  
	<!-- Facebook Meta Tags -->
	<meta property="og:type" content="website">
	<meta property="og:title" content="${locals?.space?.name ?? 'Dreamfeel Space'}">
	<meta property="og:description" content="${locals?.space?.description ?? 'Dreamfeel Space'}">
	<meta property="og:image" content="https://res.cloudinary.com/dreamnerd/image/upload/v1684766083/Screenshot_from_2023-05-22_17-25-47_jfiskv.png">
  
	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image">
	<meta property="twitter:domain" content="blog.dreamfeel.me">
	<meta name="twitter:title" content="${locals?.space?.name ?? 'Dreamfeel Space'}">
	<meta name="twitter:description" content="${locals?.space?.description ?? 'Dreamfeel Space'}">
	<meta name="twitter:image" content="https://res.cloudinary.com/dreamnerd/image/upload/v1684766083/Screenshot_from_2023-05-22_17-25-47_jfiskv.png">
  
		  
	</head>
	<style>${appCss} </style>
	${htmlContent}
	</html>
	`;

	return new Response(pagePreset);
}

export async function GET({ params }: RequestEvent) {
	const page = await prisma.spaceUIVersion.findFirst({
		where: {
			id: params.builder
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

export async function DELETE({ params }: RequestEvent) {
	const pageId = params.builder;

	let page = await prisma.spaceUIVersion.update({
		where: {
			id: pageId
		},
		data: {
			deleted: true
		}
	});

	return new Response(page);
}
