import { JSDOM } from 'jsdom';
import { prisma } from '$lib/db/prisma';
export async function transformHtmlString(
	html: string,
	css: string,
	spaceId: string,
	sbd: boolean
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
	const withAPIs = document.querySelectorAll('[data-collection]');

	const anchors = document.querySelectorAll('a');
	anchors.forEach((a) => {
		if (!a.href.startsWith('https') || !a.href.startsWith('http')) {
			if (a.href.startsWith('?')) a.href = a.href.split('?').filter(Boolean).join('');
			if (a.href.startsWith('/')) a.href = a.href.split('/').filter(Boolean).join('/');
			a.setAttribute('href', `${sbd ? '' : `/${spaceId}`}/${a.href ? a.href : '#'}`);
		}
	});

	for (let apiComponent of withAPIs) {
		const space = apiComponent.getAttribute('data-collection');
		const table = apiComponent.getAttribute('data-collection');

		const _space = await prisma.space.findUnique({
			where: {
				appId: 'demo'
			}
		});

		const spaceTable = await prisma.spaceTable.findFirst({
			where: {
				appId: String(_space?.id),
				name: String(table)
			},
			include: {
				rows: true,
				columns: true
			}
		});

		if (apiComponent.hasChildNodes()) {
			let child = apiComponent.children[0];

			for (let row of spaceTable?.rows ?? []) {
				if (child) {
					let newItem = document.createElement('div');
					newItem.setAttribute('data-type', 'space-commerce-item');
					newItem.className = 'lg:w-1/4 md:w-1/2 p-4 w-full';
					newItem.innerHTML = ` 
					<a class="block relative h-48 rounded overflow-hidden"
						><img
							alt="ecommerce"
							class="object-cover object-center w-full h-full block"
							src="http://localhost:5173/src/assets/hero.png"
					/></a>
					<div class="mt-4">
						<h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
						<h2 class="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
						<p data-type="space-commerce-price" class="mt-1">$16.00</p>
					</div>
				 `;
					apiComponent.appendChild(newItem);
				}
			}
			child.remove();
		}
	}

	return dom.serialize();
}




