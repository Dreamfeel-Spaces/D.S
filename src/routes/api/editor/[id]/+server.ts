import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { transformHtmlString } from '$lib/util/transformHtmlString';

import { JSDOM } from 'jsdom';
import grapesjs from 'grapesjs';
import { DOMParser } from 'xmldom';
import { spaceTestPlugin } from '$lib/plugins/grapes/space-ui';

// https://unpkg.com/tailwindcss@2.1.2/dist/tailwind.min.css

export async function GET({ params }: RequestEvent) {
	const parser = new DOMParser();

	const data = await prisma.page.findUnique({
		where: {
			id: params.id
		}
	});

	const uiDraft = data?.html ?? '';

	let parsed = JSON.parse(uiDraft);

	const ui = parsed.uiDef;

	const editor = grapesjs.init({
		headless: true,
		plugins: [(editor) => spaceTestPlugin(editor, [], [])]
	});

	editor.loadProjectData(ui);

	const html = editor.getHtml();

	const dom = new JSDOM(html);

	const document = dom.window.document;

	const tailwind = await fetch('https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css');
	const css = await tailwind.text();

	const style = document.createElement('style');
	style.textContent = css;

	document.head.appendChild(style);

	const serializedDom = dom.serialize();

	const response = new Response(serializedDom);

	response.headers.set('content-type', 'text/html');

	return response;

	// const uiDraft = await prisma.uiDraft.findFirst({
	// 	where: { vId: params.id }
	// });
	// const html = JSON.parse(uiDraft?.draft ?? '{}')?.html;
	// const css = JSON.parse(uiDraft?.draft ?? '{}')?.css;
	// const renderedHTML = await transformHtmlString(html, css);
	// const response = new Response(renderedHTML);
	// response.headers.set('content-type', 'text/html');
	// return response;
}

export async function PATCH({ params, request }: RequestEvent) {
	const data = await request.json();
	const id = params.id;
	const existing = await prisma.uiDraft.findFirst({
		where: { vId: id }
	});

	if (existing) {
		let updated = await prisma.uiDraft.update({
			where: {
				id: existing.id
			},
			data: {
				draft: JSON.stringify(data)
			}
		});

		return new Response(JSON.stringify(updated));
	}

	let created = await prisma.uiDraft.create({
		data: {
			vId: id,
			draft: JSON.stringify(data)
		}
	});

	return new Response(JSON.stringify(created ?? ''));
}

export async function POST({ params, request }: RequestEvent) {
	const data = await request.json();
	console.log(data);
	const id = params.id;
	const existing = await prisma.uiDraft.findFirst({
		where: { vId: id }
	});

	if (existing) {
		prisma.uiDraft.update({
			where: {
				id: existing.id
			},
			data: {
				draft: JSON.stringify(data)
			}
		});

		return new Response();
	}

	return new Response();
}

// const myNewComponentTypes = editor => {
//     editor.DomComponents.addType(/* API for component type definition */);
//   };

//   const editor = grapesjs.init({
//     container : '#gjs',
//     // ...
//     plugins: [ myNewComponentTypes ],
//   });

// editor.DomComponents.addType('my-input-type', {
//     // Make the editor understand when to bind `my-input-type`
//     isComponent: el => el.tagName === 'INPUT',

//     // Model definition
//     model: {
//       // Default properties
//       defaults: {
//         tagName: 'input',
//         draggable: 'form, form *', // Can be dropped only inside `form` elements
//         droppable: false, // Can't drop other elements inside
//         attributes: { // Default attributes
//           type: 'text',
//           name: 'default-name',
//           placeholder: 'Insert text here',
//         },
//         traits: [
//           'name',
//           'placeholder',
//           { type: 'checkbox', name: 'required' },
//         ],
//       }
//     }
//   });

// editor.DomComponents.addType('test-component', {
//     model: {
//       defaults: {
//         testprop: 1,
//       },
//       init() {
//         console.log('Local hook: model.init');
//         this.listenTo(this, 'change:testprop', this.handlePropChange);
//         // Here we can listen global hooks with editor.on('...')
//       },
//       updated(property, value, prevValue) {
//         console.log('Local hook: model.updated',
//           'property', property, 'value', value, 'prevValue', prevValue);x
//       },
//       removed() {
//         console.log('Local hook: model.removed');
//       },
//       handlePropChange() {
//         console.log('The value of testprop', this.get('testprop'));
//       }
//     },
//     view: {
//       init() {
//         console.log('Local hook: view.init');
//       },
//       onRender() {
//         console.log('Local hook: view.onRender');
//       },
//     },
//   });

//   // A block for the custom component
//   editor.BlockManager.add('test-component', {
//     label: 'Test Component',
//     content: '<div data-gjs-type="test-component">Test Component</div>',
//   });

//   // Global hooks
//   editor.on(`component:create`, model => console.log('Global hook: component:create', model.get('type')));
//   editor.on(`component:mount`, model => console.log('Global hook: component:mount', model.get('type')));
//   editor.on(`component:update:testprop`, model => console.log('Global hook: component:update:testprop', model.get('type')));
//   editor.on(`component:remove`, model => console.log('Global hook: component:remove', model.get('type')));
//   #
