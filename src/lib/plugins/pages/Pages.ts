import { prisma } from '$lib/db/prisma';
import { router, urlPatterns } from '$lib/router';
import { transformRows } from '$lib/rows/transform';
import { transformHtmlString } from '$lib/util/transformHtmlString';
import { error } from '@sveltejs/kit';
import grapesjs from 'grapesjs';
import appCss from '../../../app.css?inline';
import type { JsonData } from '../../../routes/editor/[app_id]/[builder]/[path]/server/+server';
import { gSpaceApIList } from '../grapes/space-ui/spaceApiList';
import { JSDOM } from 'jsdom';
import type { getLogger } from 'nodemailer/lib/shared';

export class Pages {
	private subdomain: string;
	private url: any = '  ';
	private appId: any;

	constructor({ url, params = {}, appId = '' }: any) {
		this.subdomain = (url.toJSON()?.split('.')[0] ?? '')?.split('//')[1];
		this.appId = appId;
		this.url = url;
	}

	get sbd() {
		return this.subdomain;
	}

	get isValidSubdomain() {
		return (
			this.subdomain &&
			this.subdomain !== this.url?.toJSON() &&
			this.url?.toJSON().includes('.') &&
			this.subdomain !== 'upgraded-journey' &&
			this.subdomain !== 'dreamfeel' &&
			this.subdomain !== 'beta' &&
			this.subdomain !== 'app'
		);
	}

	async renderPage({ renderSubdomainApp = false, subdomain = '' }) {
		const tempId = this.url.pathname.split('/')[1];

		const space = await prisma.space.findUnique({
			where: {
				appId: renderSubdomainApp ? this.subdomain : tempId
			}
		});

		if (!space) return [null, error(404, 'Page not found')];
		const version = await prisma.spaceUIVersion.findFirst({
			where: { id: String(space?.uiVid) },
			include: {
				pages: true
			}
		});

		const [draft, params] = router({
			routes: urlPatterns(
				(version?.pages ?? []).map((page) => {
					return {
						...page,
						path: `/${renderSubdomainApp ? this.subdomain : tempId}${
							page.path?.startsWith('/') ? page.path : `/${page.path}`
						}`
					};
				})
			),
			pathname: this.url.pathname,
			subdomain: this.isValidSubdomain ? this.subdomain : ''
		});

		if (!draft) return [null, error(404, 'Page not found')];

		const page = JSON.parse(draft?.html ?? '{}');

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

		const ui = page?.html ?? '';

		const pageData: JsonData = page.uiDef;

		const grapesEditor = grapesjs.init({
			headless: true,
			plugins: [
				(editor) =>
					gSpaceApIList(editor, {
						tables,
						pages: [draft],
						pageId: draft.id,
						headless: true,
						space: space
					})
			]
		});

		grapesEditor.loadProjectData(pageData);

		const htmlContent = grapesEditor.getHtml();
		const css = grapesEditor.getCss();
		const js = grapesEditor.getJs();

		const pagePreset = `
		<!doctype html>
		<html  >
		<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${space?.name ?? 'Dreamfeel Space'}</title>

		<!-- HTML Meta Tags -->
		
		<meta name="description" content="${space?.description ?? 'Dreamfeel Space'}">
	  
		<!-- Facebook Meta Tags -->
		<meta property="og:url" content="${this.url}"}>
		<meta property="og:type" content="website">
		<meta property="og:title" content="${space?.name ?? 'Dreamfeel Space'}">
		<meta property="og:description" content="${space?.description ?? 'Dreamfeel Space'}">
		<meta property="og:image" content="https://res.cloudinary.com/dreamnerd/image/upload/v1683813200/Screenshot_from_2023-05-11_16-51-40_drnmo8.png">
	  
		<!-- Twitter Meta Tags -->
		<meta name="twitter:card" content="summary_large_image">
		<meta property="twitter:domain" content="blog.dreamfeel.me">
		<meta property="twitter:url" content="${this.url}">
		<meta name="twitter:title" content="${space?.name ?? 'Dreamfeel Space'}">
		<meta name="twitter:description" content="${space?.description ?? 'Dreamfeel Space'}">
		<meta name="twitter:image" content="https://res.cloudinary.com/dreamnerd/image/upload/v1683813200/Screenshot_from_2023-05-11_16-51-40_drnmo8.png">
	  
			  
		</head>
		<style>${appCss} </style>
		${htmlContent}
		</html>
		`;


		const dom = new JSDOM(pagePreset);
		const document = dom.window.document;
		const hyperlinks = document.querySelectorAll('a');
		for (let hyperlink of hyperlinks) {
			const href = hyperlink.href;
			if (!href) hyperlink.href = '#';
			if (href.startsWith('/') && !this.isValidSubdomain) {
				hyperlink.href = `/${space.appId}${hyperlink.href}`;
			}
		}

			const apiList = document.querySelectorAll('[data-type=list]');

			for (let api of apiList) {
				// console.log(api);
			}

			const renderedPage = dom.serialize();
		return [renderedPage, null];
	}

	renderGrapes() {}
}
