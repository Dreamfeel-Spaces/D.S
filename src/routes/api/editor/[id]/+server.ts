import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { JSDOM } from 'jsdom';

export async function GET({ params }: RequestEvent) {
	const uiDraft = await prisma.uiDraft.findFirst({
		where: { vId: params.id }
	});
	const htmlBody = JSON.parse(uiDraft?.draft ?? '{}')?.html;
	console.log(uiDraft);
	const css = JSON.parse(uiDraft?.draft ?? '{}')?.css;
	const html = `
    	<!doctype html>
    	<html>
    		<head>
  				<meta charset="UTF-8">
  				<meta name="viewport" content="width=device-width, initial-scale=1.0">
  				<script src="https://cdn.tailwindcss.com"></script>
			</head>
    		<style>${css}</style>
    		${htmlBody}
    	</html>
    `;

	const dom = new JSDOM(html);

	const document = dom.window.document;
	const withAPIs = document.querySelectorAll('[__data__api]');

	for (let apiComponent of withAPIs) {
		const space = apiComponent.getAttribute('__data__api');
		const table = apiComponent.getAttribute('__data__table');

		const _space = await prisma.space.findUnique({
			where: {
				appId: String(space)
			}
		});

		const spaceTable = await prisma.spaceTable.findFirst({
			where: {
				tableSpace: String(_space?.id),
				id: String(table)
			},
			include: {
				rows: true,
				columns: true
			}
		});

		for (let row of spaceTable?.rows ?? []) {
			if (apiComponent.hasChildNodes()) {
				let child = apiComponent.children[0];
				if (child) {
					child.id = Math.random() + '';
					apiComponent.appendChild(child);
				}
			}
		}
	}

	const serializedHTML = dom.serialize();
	const response = new Response(serializedHTML);
	response.headers.set('content-type', 'text/html');
	return response;
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
