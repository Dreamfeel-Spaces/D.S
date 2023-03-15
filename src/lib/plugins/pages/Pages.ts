import { prisma } from '$lib/db/prisma';
import { router, urlPatterns } from '$lib/router';
import { transformHtmlString } from '$lib/util/transformHtmlString';
import { error } from '@sveltejs/kit';

export class Pages {
	private subdomain: string;
	private url: any;
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
			this.subdomain !== 'upgraded-journey' && this.subdomain !== "dreamfeel"
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

		const html = JSON.parse(draft ?? '{}')?.html;
		const css = JSON.parse(draft ?? '{}')?.css;
		const uiDef = JSON.parse(draft ?? '{}')?.css;
		const renderedHTML = await transformHtmlString(html, css, tempId, renderSubdomainApp);

		return [renderedHTML, null];
	}

	renderGrapes() {}
}
