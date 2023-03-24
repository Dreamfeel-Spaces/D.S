import { JSDOM } from 'jsdom';
import { prisma } from '$lib/db/prisma';
export async function transformHtmlString(
	html: string,
	css: string = '',
	spaceId: string = '',
	sbd: boolean = false
) {
	const htmlAndCss = `
    <!doctype html>
    <html>
        <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script src="https://cdn.tailwindcss.com"></script>
              <title>SPACES DEMO</title>
        </head>
        <style>${css} </style>
        ${html}
    </html>
`;
	const dom = new JSDOM(htmlAndCss, { runScripts: 'dangerously' });

	const document = dom.window.document;
	const withAPIs = document.querySelectorAll('[data-table]');

	const anchors = document.querySelectorAll('a');
	anchors.forEach((a) => {
		if (!a.href.startsWith('https') || !a.href.startsWith('http')) {
			if (a.href.startsWith('?')) a.href = a.href.split('?').filter(Boolean).join('');
			if (a.href.startsWith('/')) a.href = a.href.split('/').filter(Boolean).join('/');
			a.setAttribute('href', `${sbd ? '' : `/${spaceId}`}/${a.href ? a.href : '#'}`);
		}
	});

	for (let apiComponent of withAPIs) {
		console.log(apiComponent.getAttributeNames(), 'names');
		const space = apiComponent.getAttribute('data-api-type');
		apiComponent.innerHTML = `<p>${space}</p>`;
	}

	return dom.serialize();
}
