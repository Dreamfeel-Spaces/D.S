import { prisma } from '$lib/db/prisma';
import { router, urlPatterns } from '$lib/router';
import { transformRows } from '$lib/rows/transform';
import { error } from '@sveltejs/kit';
import grapesjs from 'grapesjs';
import appCss from '../../../app.css?inline';
import { gSpaceApIList } from '../grapes/space-ui/spaceApiList';
import { JSDOM } from 'jsdom';
import { dev } from '$app/environment';
import { spacePages } from '../grapes/space-ui/templates/pages/spacePagesPlugin';

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

		// if (!draft) return [null, error(404, 'Page not found')];

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
				spacePages,
				(editor) =>
					gSpaceApIList(editor, {
						tables: space?.tables ?? [],
						pages: [page],
						pageId: page?.id ?? '',
						headless: true,
						space: space,
						blocks: []
					})
			],
			projectData: pageData
		});

		let pageHTML;

		if (draft?.id) {
			pageHTML = grapesEditor.Pages.get(draft?.id)?.getMainComponent().toHTML();
		} else {
		}

		let js: string = pageData?.js;

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
			${space === null ? noSpace(space) : pageHTML ?? blankPage}
		</html>
		`;

		const dom = new JSDOM(pagePreset);
		const document = dom.window.document;

		const script = document.createElement('script');

		const bodyId = document.querySelector('body')?.id;

		const regex = /document\.querySelectorAll\(['"]#([^'"]+)['"]\)/g;
		js = js?.replace(regex, "document.querySelectorAll('#" + bodyId + "')") ?? '';

		if (draft?.id) {
			grapesEditor.Pages.select(draft?.id);
			const cheyees = grapesEditor.getJs();
			script.textContent = cheyees;
			document.body.append(script);
		}

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

let blankPage = `
<section class="bg-white dark:bg-black min-h-screen">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
		<div class="flex justify-center"  >
		<img class="h-20"   src="https://dreamfeel.me/_app/immutable/assets/beta-logo-9e1f695c.png"      />
		</div>
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-600 dark:text-red-500">404</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <a href="/" class="inline-flex text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-red-900 my-4">Back to Homepage</a>
        </div>   
    </div>
</section>`;

let noSpace = (space: any) => `
<section class="bg-white dark:bg-black min-h-screen">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
		<div class="flex justify-center"  >
		<a  href="https://dreamfeel.me" >
			<img class="h-20"   src="https://dreamfeel.me/_app/immutable/assets/beta-logo-9e1f695c.png"      />
		</a>
		</div>
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-600 dark:text-red-500">404</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Project missing at this url.</p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that project. You'll find lots to explore on the home page. </p>
            <a href="https://dreamfeel.me/create" class="inline-flex text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-red-900 my-4">Create your app </a>
			</div>   
    </div>
</section>`;
