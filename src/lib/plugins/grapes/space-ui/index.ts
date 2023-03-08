//@ts-nocheck

export function spaceCommerceItem(editor: any) {
	editor.DomComponents.addType('api-item-component', {
		isComponent: (el: any) => {
			if (el?.attributes) {
				const attr = el.attributes['data-type'];
				if (!attr) return false;
				return el.attributes['data-type'].value === 'space-commerce-item';
			}

			return false;
		},
		model: {
			defaults: {
				tagName: 'div',
				type: 'placeholder',
				traits: {
					title: 'text',
					type: 'sele'
				}
			}
		}
	});
}

const script = function () {
	//@ts-ignore
	this.addEventListener('click', console.log);
	// console.log(this);
};

export function spaceCommerceList(editor: any, tables: any[]) {
	// editor.DomComponents.addType('Commerce-list', {
	// 	isComponent: (el: any) => {
	// 		if (el?.attributes) {
	// 			const attr = el.attributes['data-type'];
	// 			if (!attr) return false;
	// 			return el.attributes['data-type'].value === 'space-commerce-list';
	// 		}
	// 		return false;
	// 	},
	// 	model: {
	// 		defaults: {
	// 			tagName: 'div',
	// 			script,
	// 			traits: [
	// 				'title',
	// 				'description',
	// 				'data-space',
	// 				{ type: 'select', options: tables.map((table) => table.name), name: 'data-collection' }
	// 			]
	// 		},
	// 		async init() {
	// 			// console.log('cvhbjnkml');
	// 		}
	// 	},
	// 	view: {
	// 		async onRender({ el, model }: any) {
	// 			{
	// 				[1, 2, 3, 4, 5].forEach((e) => {
	// 					let newItem = document.createElement('div');
	// 					newItem.setAttribute('data-type', 'space-commerce-item');
	// 					newItem.className = 'lg:w-1/4 md:w-1/2 p-4 w-full';
	// 					newItem.innerHTML = `
	// 					<a class="block relative h-48 rounded overflow-hidden"
	// 						><img
	// 							alt="ecommerce"
	// 							class="object-cover object-center w-full h-full block"
	// 							src="http://localhost:5173/src/assets/hero.png"
	// 					/></a>
	// 					<div class="mt-4">
	// 						<h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
	// 						<h2 class="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
	// 						<p data-type="space-commerce-price" class="mt-1">$16.00</p>
	// 					</div>
	// 				 `;
	// 					el.appendChild(newItem);
	// 				});
	// 			}
	// 		}
	// 	}
	// });
}

export function spaceCommercePrice(editor: any) {
	// editor.DomComponents.addType('Commerce-product-price', {
	// 	isComponent: (el: any) => {
	// 		if (el?.attributes) {
	// 			const attr = el.attributes['data-type'];
	// 			if (!attr) return false;
	// 			return el.attributes['data-type'].value === 'space-commerce-price';
	// 		}
	// 		return false;
	// 	},
	// 	model: {
	// 		defaults: {
	// 			tagName: 'div',
	// 			attributes: {
	// 				title: 'text',
	// 				description: 'text',
	// 				['data-space']: 'text',
	// 				['data-table']: 'text'
	// 			}
	// 		}
	// 	}
	// });
}

export const spaceTestPlugin = (editor: any, tables = [], rows = []) => {
	editor.DomComponents.addType('api-list-component', {
		model: {
			defaults: {
				tagName: 'div',
				tables,
				'data-collection': '',
				showRows: [],
				'data-display-as': 'list',
				'num-cols': '',
				'params-name': '',
				traits: [
					{ type: 'select', options: tables.map((table) => table.name), name: 'data-collection' },
					{
						type: 'select',
						options: ['list', 'grid', 'table', 'detail', 'form', 'carousel'],
						name: 'display-as'
					},
					{ name: 'num-cols', type: 'text' },
					{ name: 'params-name', type: 'text' }
				]
			},
			init() {
				this.listenTo(this, 'change:data-collection', () => {
					const component = this;
				});

				console.log('Local hook: model.init', this.attributes.testprop);
				this.listenTo(this, 'change:data-collection', this.handleCollectionChange);

				this.listenTo(this, 'change:showRows', this.handleRowsUpdate);
				this.listenTo(this, 'change:data-display-as', this.handleDataDisplay);
				this.listenTo(this.components()?.at(0), 'change', (v) => {
					const { $el, model } = this;
					const child = v.toHTML();

					let firstComponent = this.components()?.at(0);

					this.components().forEach((s, i) => {
						console.log(firstComponent.getAttributes());
						console.log(firstComponent.getClasses());
						if (i > 1) s?.destroy();
					});

					console.log('oiugyf');
					const collections = this.get('collections');
					// this.append(child);
				});
				// Here we can listen global hooks with editor.on('...')
			},
			handleChildTypeChange() {},
			handleRowsUpdate() {
				const el = this.getEl();
				const showRows = this.get('showRows');
				// $el.clear();
				const components = this.get('components');
				if (components) {
					components.each((child) => child.remove());
				}
				for (let i = 0; i < showRows.length; i++) {
					const row = showRows[i];
					if (i === 0) {
						this.append(`<div data-gjs-type="api-item-component"  > 
					${Object.keys(row).map((r) => {
						return `<p  data-with-field-${r}  > <b>${r}</b>: ${row[r]} </p>`;
					})}
					<hr/>
					</div>`);
					} else {
						this.append(`<div>
					${Object.keys(row).map((r) => {
						return `<p  data-with-field-${r}  > <b>${r}</b>: ${row[r]} </p>`;
					})}
					<hr/>
					</div>`);
					}
				}
			},
			handleDataDisplay() {
				const components = this.get('components');
				if (components) {
					components.each((child) => child.remove());
				}
				// components.removeAll();
				console.log('This is some bullshit');
			},
			handleCollectionChange() {
				const collection = this.get('data-collection');

				console.log(collection);
			},
			updated(property, value, prevValue) {
				if (Object.keys(value) && Boolean(value)) {
					if (value['data-collection'] !== prevValue['data-collection']) {
						const collectionName = value['data-collection'];
						this.set('data-collection', collectionName);
						const table = tables.find((table) => table.name === collectionName);
						const colRows = rows[table.id];
						this.set('showRows', colRows);
					}
					if (value['display-as'] !== prevValue['display-as']) {
						console.log('value', value['display-as']);
						const displayType = value['display-as'];
						this.set('data-display-as', displayType);
					}
				}
			},
			removed() {
				console.log('Local hook: model.removed');
			},
			handlePropChange() {
				let prop = this.get('testprop');
				// Here inside view it is getting the old value. of "testprop" i.e '12345' but not
				//the new value
				//which is being fetched from server in the init() of model.
				let comp1 =
					'<div>' +
					'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" />' +
					'<span title="foo">' +
					prop +
					'</span>' +
					'</div>';

				const component = this.append(comp1);
				return component;
			}
		},
		view: {
			init() {
				console.log('Local hook: view.init');
			}
		}
	});

	// A block for the custom component
	editor.BlockManager.add('api-grid-component', {
		label: 'Api List Component',
		content: `<div  data-gjs-type="api-list-component"></div>`
	});
};
