import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from '../$types';
import { transformRows } from '$lib/rows/transform';
import { JSDOM } from 'jsdom';
import { error } from '@sveltejs/kit';
import grapesjs from 'grapesjs';
import { gSpaceApIList } from '$lib/plugins/grapes/space-ui/spaceApiList';

import appCss from '../../../../../../app.css?inline';

interface Component {
	content: string | null;
	classes: string[];
	tagName: string;
	type: string;
	attributes: {
		[key: string]: string;
	};
	components?: Component[];
	id: string;
}

interface Frame {
	component: Component;
}

interface Page {
	frames: Frame[];
}

interface Style {
	selectors: string[];
	style: {
		[key: string]: string;
	};
}

export interface JsonData {
	css: any;
	assets: string[];
	styles: Style[];
	pages: Page[];
}
export async function POST({ request, params }: RequestEvent) {
	const pageId = params.path;
	const data = await request.json();

	let page = await prisma.page.update({
		where: {
			id: pageId
		},
		data: {
			html: JSON.stringify(data)
		}
	});

	return new Response(JSON.stringify(page));
}

export async function GET({ params, url, fetch }: RequestEvent) {
	const page = await prisma.page.findUnique({
		where: {
			id: params.path
		}
	});

	if (!page) {
		throw error(404, 'Page not found');
	}

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

	let tables = await prisma.spaceTable.findMany({
		where: {
			appId: space?.id
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

	tables = tables?.map((tb) => ({ ...tb, rows: transformRows(tb.rows) })) ?? [];

	const ui = JSON.parse(page?.html ?? '');

	const pageData: JsonData = ui.uiDef;

	const grapesEditor = grapesjs.init({
		headless: true,
		plugins: [
			(editor) =>
				gSpaceApIList(editor, {
					tables,
					pages: [page],
					pageId: page.id,
					headless: true,
					space
				})
		]
	});

	grapesEditor.loadProjectData(pageData);

	const htmlContent = grapesEditor.getHtml();
	const css = grapesEditor.getCss();
	const js = grapesEditor.getJs();

	const pagePreset = `
    <!doctype html>
    <html>
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="https://cdn.tailwindcss.com"></script>
	<title>${space?.name ?? 'Dreamfeel Space'}</title>
	</head>
	<style>${appCss} </style>
	${htmlContent}
    </html>
	`;

	const dom = new JSDOM(pagePreset);
	const document = dom.window.document;

	// const apiLists = document.querySelectorAll('[data-api-type=list]');

	// apiLists.forEach((listEl) => {
	// 	const tableName = listEl.getAttribute('data-table');
	// 	const table = tables.find((table) => table.name === tableName);

	// 	const firstChild = listEl.children[0];

	// 	while (listEl.hasChildNodes()) {
	// 		listEl.removeChild(listEl.children[0]);
	// 	}

	// 	table?.rows?.forEach((row: any) => {
	// 		const childClone = firstChild.cloneNode(true);
	// 		for (let descendant of firstChild.children) {
	// 			const cloned = descendant.cloneNode();
	// 			const key = descendant.getAttribute('data-key');
	// 			if (key) {
	// 				const div = document.createElement('div');
	// 				div.textContent = row[key];
	// 				childClone.appendChild(div);
	// 			}
	// 		}
	// 		listEl.appendChild(childClone);
	// 	});
	// });

	const renderedPage = dom.serialize();

	// return new Response(renderedPage);
	const response = new Response(renderedPage, {
		headers: {
			'content-type': 'text/html'
		}
	});
	return response;
}
