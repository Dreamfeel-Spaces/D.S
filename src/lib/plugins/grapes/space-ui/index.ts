import axios from 'axios';

export function spaceCommerceItem(editor: any) {
	editor.DomComponents.addType('Commerce-item', {
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
				traits: {
					title: 'text',
					description: 'text',
					['data-space']: 'text',
					['data-table']: 'text'
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
	editor.DomComponents.addType('Commerce-list', {
		isComponent: (el: any) => {
			if (el?.attributes) {
				const attr = el.attributes['data-type'];
				if (!attr) return false;
				return el.attributes['data-type'].value === 'space-commerce-list';
			}

			return false;
		},
		model: {
			defaults: {
				tagName: 'div',
				script,
				traits: [
					'title',
					'description',
					'data-space',
					{ type: 'select', options: tables.map((table) => table.name), name: 'data-collection' }
				]
			},
			async init() {
				// console.log('cvhbjnkml');
			}
		},
		view: {
			async onRender({ el, model }: any) {
				{
					[1, 2, 3, 4, 5].forEach((e) => {
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
						el.appendChild(newItem);
					});
				}
			}
		}
	});
}

export function spaceCommercePrice(editor: any) {
	editor.DomComponents.addType('Commerce-product-price', {
		isComponent: (el: any) => {
			if (el?.attributes) {
				const attr = el.attributes['data-type'];
				if (!attr) return false;
				return el.attributes['data-type'].value === 'space-commerce-price';
			}

			return false;
		},
		model: {
			defaults: {
				tagName: 'div',
				attributes: {
					title: 'text',
					description: 'text',
					['data-space']: 'text',
					['data-table']: 'text'
				}
			}
		}
	});
}
