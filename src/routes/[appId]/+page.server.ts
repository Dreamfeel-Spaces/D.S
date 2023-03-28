import type { RequestEvent } from './$types';

import { Pages } from '$lib/plugins/pages/Pages';

export async function load({ params, url }: RequestEvent) {
	const pageManager = new Pages({ appId: params.appId, url });
	const [html, htmlError] = await pageManager.renderPage({});
	if (htmlError) throw htmlError;
	return { html };
}

// export async function PATCH({ params, request }: RequestEvent) {
// 	const data = await request.json();
// 	const id = params.appId;
// 	const existing = await prisma.uiDraft.findFirst({
// 		where: { vId: id }
// 	});

// 	if (existing) {
// 		let updated = await prisma.uiDraft.update({
// 			where: {
// 				id: existing.id
// 			},
// 			data: {
// 				draft: JSON.stringify(data)
// 			}
// 		});

// 		return new Response(JSON.stringify(updated));
// 	}

// 	let created = await prisma.uiDraft.create({
// 		data: {
// 			vId: id,
// 			draft: JSON.stringify(data)
// 		}
// 	});

// 	return new Response(JSON.stringify(created ?? ''));
// }

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
