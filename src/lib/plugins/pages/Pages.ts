import { prisma } from '$lib/db/prisma';
import { router, urlPatterns } from '$lib/router';
import { transformRows } from '$lib/rows/transform';
import { error } from '@sveltejs/kit';
import grapesjs from 'grapesjs';
import appCss from '../../../app.css?inline';
import { gSpaceApIList } from '../grapes/space-ui/spaceApiList';
import { JSDOM } from 'jsdom';

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
			},
			include: {
				tables: true
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

		const pageData = JSON.parse(version?.pageData ?? 'null')?.data;

		const grapesEditor = grapesjs.init({
			headless: true,
			plugins: [
				(editor) =>
					gSpaceApIList(editor, {
						tables: space?.tables ?? [],
						pages: [page],
						pageId: page?.id ?? '',
						headless: true,
						space: space
					})
			],
			projectData: pageData
		});

		const pageHTML = grapesEditor.Pages.get(draft.id)?.getMainComponent().toHTML();

		// const pageJS = grapesEditor.Pages.get(draft.id)?.getMainComponent()

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
		<meta property="og:image" content="https://res.cloudinary.com/dreamnerd/image/upload/v1684766083/Screenshot_from_2023-05-22_17-25-47_jfiskv.png">
	  
		<!-- Twitter Meta Tags -->
		<meta name="twitter:card" content="summary_large_image">
		<meta property="twitter:domain" content="blog.dreamfeel.me">
		<meta property="twitter:url" content="${this.url}">
		<meta name="twitter:title" content="${space?.name ?? 'Dreamfeel Space'}">
		<meta name="twitter:description" content="${space?.description ?? 'Dreamfeel Space'}">
		<meta name="twitter:image" content="https://res.cloudinary.com/dreamnerd/image/upload/v1684766083/Screenshot_from_2023-05-22_17-25-47_jfiskv.png">
	  
		<style>
		${appCss}
		</style>
			  
		</head>
		${pageHTML ?? 'Dreamfeel Spaces'}
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
