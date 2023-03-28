import { router, urlPatterns } from '$lib/router';
import type grapesjs from 'grapesjs';

export function gSpaceApIList(
	editor: grapesjs.Editor,
	config: { tables: any[]; pages: any[]; pageId: string; headless: boolean }
) {
	let { tables = [], pages = [], pageId, headless = false }: any = config;

	const page: any = pages.find((page: { id: string; path: string }) => page.id === pageId);

	const spaceUrl = urlPatterns([page])[0];

	const params = spaceUrl?.params ?? [];

	tables = [...tables, { name: 'example', columns: [], rows: [] }];

	const tableNames = tables.map((table: any) => table.name);

	const darkModeScript = function () {
		let html = document.querySelector('html');

		(function () {
			const darkMode: string = localStorage.getItem('space-darkmode') ?? 'light';
			if (darkMode === 'dark') {
				const classes = html?.classList.replace('dark', 'light');
				//@ts-ignore
				this.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;
				if (!classes) {
					html?.classList.add('dark');
				} else {
					const classes = html?.classList.replace('light', 'dark');
					//@ts-ignore
					this.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1
					0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
					if (!classes) {
						html?.classList.add('light');
					}
				}
			}
		})();

		// @ts-ignore
		(this as any).onclick = () => {
			const darkMode: string = localStorage.getItem('space-darkmode') ?? 'light';
			let updatedTheme = darkMode === 'dark' ? 'light' : 'dark';

			if (darkMode === 'dark') {
				const classes = html?.classList.replace('dark', 'light');
				//@ts-ignore
				this.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1
				0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
				if (!classes) {
					html?.classList.add('light');
				}
			} else {
				const classes = html?.classList.replace('light', 'dark');
				//@ts-ignore
				this.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1
				0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
				if (!classes) {
					html?.classList.add('dark');
				}
			}
			localStorage.setItem('space-darkmode', updatedTheme);
		};
	};

	const deleteModalScript = function (props: any) {
		console.log(props['data-id']);
		//@ts-ignore
		const el: HTMLElement = this as any as HTMLElement;
		el.onclick = () => {
			let deleteButton = el.querySelector('button');
			if (deleteButton) {
				deleteButton.innerText = 'Please wait...';
				const parent = el.parentElement;
				const dataTable = parent?.getAttribute('data-table');
				const dataIndex = parent?.getAttribute('data-index');

				const rows =
					(props['data-tables'] ?? []).find((tab: any) => tab.name === dataTable)?.rows ?? [];

				const row = rows[dataIndex ?? ''];

				fetch(`/api/records/${dataTable}/${row?.id}`, { method: 'delete' })
					.then((data) => {
						data.json();
						if (deleteButton) deleteButton.innerText = 'Delete now';
					})
					.then(console.log)
					.catch((e) => {
						if (deleteButton) {
							deleteButton.innerText = 'Delete now';
						}
					});
			}
		};
	};

	editor.DomComponents.addType('api-delete-item-confirmation-dialog', {
		model: {
			defaults: {
				tagName: 'div',
				script: deleteModalScript,
				'data-table': 'wiki',
				'data-id': '',
				'data-record-id': '',
				'script-props': ['data-table', 'data-id', 'data-tables'],
				'data-tables': tables
			},
			init() {
				this.handleUpdateDataId();
			},
			handleUpdateDataId() {
				const parent = this.parent();
				const dataIndex = parent?.getAttributes()['data-index'];
				const dataTable = parent?.getAttributes()['data-table'];
				this.setAttributes({ 'data-table': dataTable, 'data-id': dataIndex });
			}
		}
	});

	editor.DomComponents.addType('darkmode', {
		model: {
			defaults: {
				tagname: 'button',
				script: darkModeScript
			}
		}
	});

	editor.DomComponents.addType('space-api-link', {
		model: {
			defaults: {
				tagName: 'a',
				attributes: {
					href: '',
					'data-url-pattern': '',
					'data-href': ''
				},
				traits: ['data-href', 'text']
			},
			init() {
				this.listenTo(this, 'change:attributes:data-href', this.handleUpdateHref);
			},
			handleUpdateHref() {
				const href: string = this.getAttributes()['data-href'];
				const segments = href.split('/').filter(Boolean);
				segments.forEach((segment, ind) => {
					if (segment.startsWith(':')) {
						segment = segment.split(':').filter(Boolean).join('');
						const index = this.parent()?.index() ?? 0;
						const dataTable = this.parent()?.getAttributes()['data-table'];
						const table: any = tables.find((table: any) => table.name === dataTable);
						const rows = table?.rows ?? [];
						const row = rows[index];
						segments[ind] = `${row[segment]}`;
						return;
					}
				});

				let newUrl: string = `/${segments.join('/')}`;

				this
					.replaceWith(`<a class="hover:text-blue-600" data-href="${href}"   href="${newUrl}" data-gjs-type='space-api-link' >
				Link text
			</a>`);
			},
			handleUpdateText() {},
			updated(property: string) {
				if (property === 'traits') {
					const href = this.getTrait('data-href')?.getValue();
					this.setAttributes({ 'data-href': href });
				}
				if (property === 'text') {
				}
			}
		}
	});

	editor.DomComponents.addType('space-login-component', {
		model: {
			defaults: {
				tagName: 'div'
			}
		}
	});

	editor.DomComponents.addType('space-user-component', {
		model: {
			defaults: {
				tagName: 'div'
			},
			init() {}
		}
	});

	editor.DomComponents.addType('api-table-component', {
		model: {
			defaults: {
				attributes: {
					'data-table': ''
				},
				traits: [{ type: 'select', options: tableNames, name: 'data-table' }]
			},
			init() {
				this.listenTo(this, 'change:attributes:data-table', this.handleUpdateDataTable);
			},
			handleUpdateDataTable() {
				const dataTable = this.getAttributes()['data-table'];
				this.replaceWith(
					`<div style='min-height:100px' data-table="${dataTable}" data-gjs-type='api-table-component' ></div>`
				);
			},
			updated(property: string) {
				if (property === 'traits') {
					const table = this.getTrait('data-table')?.getValue();
					if (table) this.setAttributes({ 'data-table': table });
				}
			}
		},
		view: {
			onRender({ el }: { el: HTMLElement }) {
				const dataTable = this.model.getAttributes()['data-table'];
				const table = tables.find((tb: any) => tb.name === dataTable);
				const columns = table?.columns ?? [];
				const rows = table?.rows ?? [];

				const tableEl = document.createElement('table');
				const tHead = document.createElement('thead');

				for (let column of columns) {
					const th = document.createElement('th');
					th.innerText = column.name;
					tHead.appendChild(th);
				}

				tableEl.appendChild(tHead);

				const tbody = document.createElement('tbody');
				for (let row of rows) {
					const rowEl = document.createElement('tr');
					for (let column of columns) {
						const td = document.createElement('td');
						td.innerText = row[column.name];
						rowEl.appendChild(td);
					}
					tbody.appendChild(rowEl);
				}

				tableEl.appendChild(tbody);
				el.appendChild(tableEl);
			}
		}
	});

	editor.DomComponents.addType('api-grid-component', {
		model: {
			defaults: {
				tagName: 'div',
				attributes: {
					'data-table': ''
				},
				traits: [{ type: 'select', options: tableNames, name: 'data-table' }]
			},
			init() {
				this.listenTo(this, 'change:attributes:data-table', this.handleDataTableUpdated);
			},
			handleDataTableUpdated() {
				let tableName = this.getAttributes()['data-table'];

				this.replaceWith(
					`<div style='min-height:100px' data-table=${tableName} data-gjs-type='api-table-component' ></div>`
				);
			},
			updated(property: string) {
				if (property === 'traits') {
					const tableName = this.getTrait('data-table')?.getValue();
					if (tableName) this.setAttributes({ 'data-table': tableName });
				}
			}
		},
		view: {
			onRender({ el }: any) {
				const tableName = this.model.getAttributes()['data-table'];
				const dataTable = tables.find((table: any) => table.name === tableName);
				const rows = dataTable?.rows ?? [];
				const columns = dataTable?.columns ?? [];

				const table = document.createElement('table');
				const tableHead = document.createElement('thead');

				for (let column of columns) {
					const th = document.createElement('th');
					th.innerText = column.name;
					tableHead.appendChild(th);
				}

				table.appendChild(tableHead);

				let tb = document.createElement('tbody');

				for (let row of rows) {
					const tr = document.createElement('tr');
					for (let column of columns) {
						const td = document.createElement('td');
						td.innerText = row[column.name];
						tr.appendChild(td);
					}
					tb.appendChild(tr);
				}

				table.appendChild(tb);

				el.appendChild(table);
			}
		}
	});

	editor.DomComponents.addType('api-button-component', {
		model: {
			defaults: {
				tagName: 'div',
				'data-btn-text': '',
				'data-table': '',
				height: '',
				droppable: false,
				width: '',
				traits: [
					'data-btn-text',
					{
						name: 'type',
						type: 'select',
						options: ['button', 'text', 'hidden', 'submit', 'delete-item', 'add to basket']
					}
				]
			},
			init() {
				this.listenTo(this, 'change:attributes:data-btn-text', this.handleUpdate);
			},
			handleUpdate() {
				const tableName = this.parent()?.getAttributes()['data-table'];
				const rowIndex = this.parent()?.getAttributes()['data-index'];

				const key = this.getAttributes()['data-btn-text'];
				this.replaceWith(
					`<div data-btn-text=${key} data-table="${tableName}" data-index="${rowIndex}"   data-gjs-type="api-button-component" ></div>`
				);
			},
			updated(property: string) {
				if (property === 'traits') {
					try {
						const btnText = this.getTrait('data-btn-text')?.getValue();
						if (btnText) this.setAttributes({ 'data-btn-text': btnText });
					} catch (error) {}
				}
			}
		},
		view: {
			onRender({ el }: any) {
				const btn = document.createElement('button');
				const btnText = this.model.getAttributes()['data-btn-text'];
				const index = this.model.parent()?.index() ?? 0;
				const dataTable = this.model.parent()?.getAttributes()['data-table'];
				const table: any = tables.find((table: any) => table.name === dataTable);
				const rows = table?.rows ?? [];
				const row = rows[index];
				btn.textContent = btnText ?? 'Button';
				el.appendChild(btn);
			}
		}
	});

	editor.DomComponents.addType('api-ecommerce-product-item', {
		model: {
			defaults: {
				droppable: true,
				selectible: false,
				attributes: {
					'data-item': '',
					'data-index': 0,
					'data-table': ''
				},
				tagName: 'div'
			},
			init() {
				this.listenTo(this, 'change:data-index', this.handleUpdate);
				this.listenTo(this, 'change:style', this.handleUpdateChild);
			},
			handleUpdate() {
				// console.log(this.getAttributes());
			},
			handleUpdateChild() {},
			updated(property: any, value: any, prevValue: any) {
				if (property === 'components') {
					let parent = this.parent();
					let parentComponents = parent?.get('components');
					parentComponents?.forEach((comp) => {
						if (comp.cid !== this.cid) {
							let clone = this.clone();
							const existingAttributes = comp.getAttributes();
							clone.setAttributes(existingAttributes);
							comp.replaceWith(clone);
						}
					});
				}
			}
		}
	});

	editor.DomComponents.addType('api-ecommerce-product-listing', {
		model: {
			defaults: {
				droppable: true,
				attributes: {
					'data-table': ''
				},
				tagName: 'div',
				traits: [
					{
						type: 'select',
						options: tableNames,
						name: 'data-table'
					},
					{
						type: 'checkbox',
						name: 'data-paginate'
					}
				]
			},
			init() {
				this.setDefaultContent();
				this.listenTo(this, 'change:attributes:data-table', this.resetComponents);
				this.listenTo(this, 'change:components', this.handlePropChange);
			},
			makeOnlyFirstEditable() {
				const children = this.get('components');
				if (children?.length) {
					children?.forEach((child) => {
						if (child.index() !== 0) {
							child.set('editable', false);
							child.set('selectable', false);
						}
					});
				}
			},
			setDefaultContent() {
				if (!this.components.length)
					for (let i = 0; i < tables.length; i++) {
						const table = tables[i];
						this
							.append(`<div data-index="${i}"  style="min-height:100px; padding:20px;margin:20px"  data-gjs-type="api-ecommerce-product-item">
					        <p>${(table as any).name}</p>
					</div>`);
					}
			},
			updated(property: any, value: any, prevValue: any) {
				if (property === 'traits') {
					try {
						const traits = this.getTrait('data-table');
						const tableName = traits?.getValue();
						if (tableName) this.setAttributes({ 'data-table': tableName });
						const paginatableTraits = this.getTrait('data-paginate')?.getValue();
						// this.setTraits([
						// 	{
						// 		type: 'number',
						// 		name: 'Items per page'
						// 	}
						// ]);
					} catch (error) {}
				}
			},
			resetComponents() {
				this.empty();
				try {
					const tableName = this.getAttributes()['data-table'];
					let table: any = tables.find((tb: any) => tb.name === tableName);
					for (let i = 0; i < table?.rows?.length; i++) {
						const row: any = table.rows[i];
						this
							.append(`<div data-index="${i}" data-table=${tableName} style="min-height:100px;padding:20px;margin:20px"  data-gjs-type="api-ecommerce-product-item">
                            ${Object.keys(row)
															.map((item: any) => {
																return `<div  data-gjs-type="api-text-component"  data-key="${item}" data-table="${tableName}" data-index="${i}" >${row[item]}</div>`;
															})
															.join(' ')}
				        
                        
                            </div>`);
					}
				} catch (error) {}
			},
			handlePropChange() {}
		}
	});

	editor.Components.addType('api-button-component', {
		model: {
			defaults: {
				tagName: 'button'
			}
		}
	});

	editor.DomComponents.addType('api-detail-page-container', {
		model: {
			defaults: {
				droppable: true,
				selectible: false,
				attributes: {
					'data-item': '',
					'data-index': 0,
					'data-table': ''
				},
				tagName: 'div',
				traits: [
					{
						type: 'select',
						options: tableNames,
						name: 'data-table'
					},
					{
						type: 'select',
						name: 'select-by',
						options: ['url-params', 'url-search-params']
					},
					{
						type: 'select',
						name: 'Page parameters',
						options: params
					}
				]
			},
			init() {
				this.listenTo(this, 'change:data-index', this.handleUpdate);
				this.listenTo(this, 'change:attributes:data-table', this.handleUpdateChild);
			},
			handleUpdate() {
				// console.log(this.getAttributes());
			},
			handleUpdateChild() {
				this.get('components')?.forEach((comp) => {
					comp.getAttributes();
					comp.setAttributes({ 'data-table': '', 'data-key': '', 'data-index': 0 });
					comp.addTrait({ name: 'data-key', type: 'string' }, { at: 1 });
				});
			},
			handleUpdateComponents() {},
			updated(property: any, value: any, prevValue: any) {
				if (property === 'traits') {
					const traits = this.getTrait('data-table');
					const tableName = traits?.getValue();
					if (tableName) this.setAttributes({ 'data-table': tableName });
				}
			}
		}
	});

	editor.DomComponents.addType('api-image-component', {
		model: {
			defaults: {
				tagName: 'img',
				'data-src': '',
				'data-table': '',
				height: '',
				droppable: false,
				draggable: 'div, div *',
				width: '',
				src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+',
				traits: ['data-src', 'height', 'width']
			},
			init() {
				this.listenTo(this, 'change:attributes:data-src', this.handleUpdate);
				this.listenTo(this, 'change:attributes:height', this.handleUpdate);
				this.listenTo(this, 'change:attributes:width', this.handleUpdate);
			},
			handleUpdate() {
				const tableName = this.parent()?.getAttributes()['data-table'];
				const rowIndex = this.parent()?.getAttributes()['data-index'];
				const height = this?.getAttributes()['height'];
				const width = this?.getAttributes()['width'];

				const srcset = this.getAttributes()['data-src'];
				const index = this.parent()?.index() ?? 0;
				const dataTable = this.parent()?.getAttributes()['data-table'];
				const table: any = tables.find((table: any) => table.name === dataTable);
				const rows = table?.rows ?? [];
				const row = rows[index];

				console.log(row);

				const key = this.getAttributes()['data-src'];
				this.replaceWith(
					`<img alt="API Image plugin" data-src=${key} src="${
						row[srcset ?? '']
					}" height=${height} width=${width} data-table="${tableName}" data-index="${rowIndex}"   data-gjs-type="api-image-component" loading="lazy" ></img>`
				);
			},
			updated(property: string) {
				if (property === 'traits') {
					try {
						const srcName = this.getTrait('data-src')?.getValue();
						const height = this.getTrait('height')?.getValue();
						const width = this.getTrait('width')?.getValue();
						if (srcName) this.setAttributes({ 'data-src': srcName });
						if (height) this.setAttributes({ height: height });
						if (width) this.setAttributes({ width: width });
					} catch (error) {}
				}
			}
		},
		view: {
			// onRender({ el }: any) {
			// 	const img = document.createElement('img');
			// 	const srcset = this.model.getAttributes()['data-src'];
			// 	const height = this.model.getAttributes()['height'];
			// 	const width = this.model.getAttributes()['width'];
			// 	if (height) img.style.height = height;
			// 	if (width) img.style.width = width;
			// 	const index = this.model.parent()?.index() ?? 0;
			// 	const dataTable = this.model.parent()?.getAttributes()['data-table'];
			// 	const table: any = tables.find((table: any) => table.name === dataTable);
			// 	const rows = table?.rows ?? [];
			// 	const row = rows[index];
			// 	img.srcset = row[srcset ?? ''];
			// 	img.alt = 'API Image plugin';
			// 	el.appendChild(img);
			// }
		}
	});

	editor.DomComponents.addType('api-form-component', {
		model: {
			defaults: {
				attributes: {
					'data-index': 0,
					'data-table': ''
				},
				tagName: 'div',
				traits: [
					{
						type: 'select',
						options: tableNames,
						name: 'data-table'
					}
				]
			},
			init() {
				this.listenTo(this, 'change:attributes:data-table', this.resetComponents);
			},
			updated(property: any, value: any, prevValue: any) {
				if (property === 'traits') {
					try {
						const traits = this.getTrait('data-table');
						const tableName = traits?.getValue();
						if (tableName) this.setAttributes({ 'data-table': tableName });
					} catch (error) {}
				}
			},
			resetComponents() {
				this.empty();
				try {
					const tableName = this.getAttributes()['data-table'];
					let table: any = tables.find((tb: any) => tb.name === tableName);
					for (let i = 0; i < table?.columns?.length; i++) {
						const column: any = table.columns[i];
						this
							.append(`<div data-index="${i}" data-table=${tableName} style="min-height:100px;padding:20px;margin:20px" >
				                <input  data-gjs-type="api-text-component" placeholder=${column.name}  data-table="${tableName}" data-index="${i}" >Text</input>
				        </div>`);
					}
				} catch (error) {}
			}
		}
	});

	editor.DomComponents.addType('api-text-component', {
		model: {
			defaults: {
				attributes: {
					'data-key': '',
					'data-index': 0,
					'data-table': '',
					'data-variant': ''
				},
				tagName: 'div',
				traits: [
					'data-key',
					{
						type: 'select',
						options: ['small', 'p', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1'],
						name: 'variant'
					}
				],
				classes: []
			},
			init() {
				// this.handleUpdate();
				this.listenTo(this, 'change:attributes:data-key', this.handleUpdate);
				this.listenTo(this, 'change:attributes:data-variant', this.handleUpdate);
			},
			handleUpdate() {
				const key = this.getAttributes()['data-key'];
				const tableName = this.parent()?.getAttributes()['data-table'];
				const rowIndex = this.parent()?.getAttributes()['data-index'];
				const variant = this.parent()?.getAttributes()['data-variant'];
				const classes = this.getClasses();
				const dataTable = this.parent()?.getAttributes()['data-table'];
				const table: any = tables.find((table: any) => table.name === dataTable);

				const rows = table?.rows ?? [];
				const row = rows[rowIndex];
				this.replaceWith(
					`<div class="${classes.join(
						' '
					)}" data-key=${key}  data-table="${tableName}" data-index="${rowIndex}"   data-gjs-type="api-text-component" >${
						row[key] ?? 'Add key'
					}</div>`
				);
			},
			updated(property: any, value: any, prevValue: any) {
				if (property === 'traits') {
					try {
						const traits = this.getTrait('data-key');
						const tableName = this.getTrait('data-obj-key')?.getValue() ?? traits?.getValue();
						if (tableName) this.setAttributes({ 'data-key': tableName });
					} catch (error) {}
				}
				if (property === 'classes') {
					this.handleUpdate();
				}
			}
		}
		// view: {
		// 	tagName: 'div',
		// 	onRender({ el }: any) {
		// 		const textDiv = document.createElement('div');
		// 		const key = this.model.getTrait('data-key')?.getValue();
		// 		const index = this.model.parent()?.index() ?? 0;
		// 		const dataTable = this.model.parent()?.getAttributes()['data-table'];
		// 		const table: any = tables.find((table: any) => table.name === dataTable);
		// 		const rows = table?.rows ?? [];
		// 		const row = rows[index];
		// 		textDiv.innerText = row[key ?? ''] ?? 'Api text component';
		// 		el.appendChild(textDiv);
		// 	}
		// }
	});

	editor.DomComponents.addType('api-item-component', {
		model: {
			defaults: {
				droppable: true,
				selectible: false,
				attributes: {
					'data-item': '',
					'data-index': 0,
					'data-table': ''
				},
				tagName: 'div'
			},
			init() {
				this.listenTo(this, 'change:data-index', this.handleUpdate);
				this.listenTo(this, 'change:dimension', this.handleUpdateChild);
			},
			handleUpdate() {
				// console.log(this.getAttributes());
			},
			handleUpdateChild() {
				console.log('yaay');
			},
			handleClassUpdates() {
				let parent = this.parent();
				const classes = this.getClasses();
				let parentComponents = parent?.get('components');
				parentComponents?.forEach((comp) => {
					if (comp.cid !== this.cid) {
						let clone = this.clone();
						const existingAttributes = comp.getAttributes();
						clone.setAttributes(existingAttributes);
						clone.setClass(classes.join(' '));
						comp.replaceWith(clone);
					}
				});
			},
			handleComponentsUpdates() {
				let parent = this.parent();
				let parentComponents = parent?.get('components');
				parentComponents?.forEach((comp) => {
					if (comp.cid !== this.cid) {
						let clone = this.clone();
						const existingAttributes = comp.getAttributes();
						clone.setAttributes(existingAttributes);
						comp.replaceWith(clone);
					}
				});
			},
			updated(property: any, value: any, prevValue: any) {
				if (property === 'classes') {
					this.handleClassUpdates();
				}

				if (property === 'components') {
					this.handleComponentsUpdates();
				}
			}
		}
	});

	editor.DomComponents.addType('api-list-component', {
		model: {
			defaults: {
				droppable: true,
				attributes: {
					'data-table': '',
					'data-api-type': 'list'
				},
				tagName: 'div',
				traits: [
					{
						type: 'select',
						options: tableNames,
						name: 'data-table'
					},
					{
						type: 'checkbox',
						name: 'data-paginate'
					}
				]
			},
			init() {
				this.setDefaultContent();
				this.listenTo(this, 'change:attributes:data-table', this.resetComponents);
				this.listenTo(this, 'change:components', this.handlePropChange);
			},
			makeOnlyFirstEditable() {
				const children = this.get('components');
				if (children?.length) {
					children?.forEach((child) => {
						if (child.index() !== 0) {
							child.set('editable', false);
							child.set('selectable', false);
						}
					});
				}
			},
			setDefaultContent() {
				if (headless) {
					try {
						const tableName = this.getAttributes()['data-table'];
						let table: any = tables.find((tb: any) => tb.name === tableName);
						for (let i = 0; i < table?.rows?.length; i++) {
							const row: any = table.rows[i];
							const el = this.getEl();
							this.append(
								`<div data-index="${i}" data-table=${tableName} style="min-height:100px;padding:20px;margin:20px"  data-gjs-type="api-item-component">
								${Object.keys(row)
									.map((item: any) => {
										return `<div  data-gjs-type="api-text-component"  data-key="${item}" data-table="${tableName}" data-index="${i}" >${row[item]}</div>`;
									})
									.join(' ')}
							
							
								</div>`
							);
						}
					} catch (error) {}
				}
				// 	}
			},
			updated(property: any, value: any, prevValue: any) {
				if (property === 'traits') {
					try {
						const traits = this.getTrait('data-table');
						const tableName = traits?.getValue();
						if (tableName) this.setAttributes({ 'data-table': tableName });
					} catch (error) {}
				}
			},
			resetComponents() {
				this.empty();
				try {
					const tableName = this.getAttributes()['data-table'];
					let table: any = tables.find((tb: any) => tb.name === tableName);
					for (let i = 0; i < table?.rows?.length; i++) {
						const row: any = table.rows[i];
						const el = this.getEl();
						this.append(
							`<div data-index="${i}" data-table=${tableName} style="min-height:100px;padding:20px;margin:20px"  data-gjs-type="api-item-component">
                            ${Object.keys(row)
															.map((item: any) => {
																return `<div  data-gjs-type="api-text-component"  data-key="${item}" data-table="${tableName}" data-index="${i}" >${row[item]}</div>`;
															})
															.join(' ')}
				        
                        
                            </div>`
						);
					}
				} catch (error) {}
			},
			handlePropChange() {}
		}
	});

	editor.BlockManager.add('Api list component', {
		label: 'API List',
		content: `<div data-api-type='list' class="text-black dark:bg-black dark:text-white" style="min-height:144px" data-gjs-type="api-list-component">
		<p>Update collection information in traits</p>
		</div>`,
		category: 'Space API'
	});

	editor.BlockManager.add('Api text component', {
		label: 'API Text',
		content: `<div class="dark:text-white text-gray-900"  data-gjs-type="api-text-component">Enter text/change data-key trait</div>`,
		category: 'Space API'
	});
	editor.BlockManager.add('Api form component', {
		label: 'API Form',
		content: `<div class="h-20"  data-gjs-type="api-form-component"></div>`,
		category: 'Space API'
	});

	editor.BlockManager.add('Api image component', {
		label: 'API Image',
		content: `<img src="" data-src="" data-gjs-type="api-image-component"  alt="API IMage component" ></img>`,
		category: 'Space API'
	});

	editor.BlockManager.add('API Item Detail Page', {
		label: 'API Item Detail Page Container',
		content: `<div style="min-height:100vh"  data-gjs-type="api-detail-page-container">
		<p>Select the collection, and params in the trait manager</p>
		</div>`,
		category: 'Space API'
	});

	editor.BlockManager.add('API Ecommerce listing', {
		label: 'API Ecommerce Listing',
		content: `<div  data-gjs-type="api-ecommerce-product-listing"></div>`,
		category: 'Space API'
	});

	editor.BlockManager.add('API Button component', {
		label: 'API Button Listing',
		content: `<div  data-gjs-type="api-button-component"></div>`,
		category: 'Space API'
	});

	editor.BlockManager.add('API Grid Component', {
		label: 'Grid',
		content: "<div style='min-height:100px' data-gjs-type='api-grid-component' ></div>",
		category: 'Space API'
	});

	editor.BlockManager.add('API Table Component', {
		label: 'API Table',
		content: "<div style='min-height:100px' data-gjs-type='api-table-component' ></div>",
		category: 'Space API'
	});

	editor.BlockManager.add('Space login', {
		label: 'Space login',
		content: "<div style='min-height:100px' data-gjs-type='space-login-component' ></div>",
		category: 'Space API'
	});

	editor.BlockManager.add('Space user component', {
		label: 'Space user component',
		content: "<div style='min-height:100px' data-gjs-type='space-user-component' ></div>",
		category: 'Space API'
	});

	editor.BlockManager.add('Space Link', {
		label: 'API Link',
		content: `<a class="hover:text-blue-600" href="" data-gjs-type='space-api-link' >
			Link text
		</a>`,
		category: 'Space API'
	});

	editor.BlockManager.add('Darkmode', {
		label: 'Darkmode',
		content: `<button  data-gjs-type="darkmode"  >
		<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg></button>`
	});

	editor.BlockManager.add('api-delete-item-confirmation-dialog', {
		label: 'Item Delete Confirmation Modal',
		content: `<section data-gjs-type="api-delete-item-confirmation-dialog"
		 class="text-gray-600 body-font relative"
		 >
		 <button>Delete item</button>
		 <div class="absolute inset-0 hidden h-108 w-full bg-gray-100">
		 </div>
		 <div class="container px-5 hidden  py-24 mx-auto ">
		 <div class="lg:w-1/3 hidden md:w-1/2 bg-white rounded-xl p-8  flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
		 <form style="margin: 0;">
		 <h2  class="text-gray-900 text-lg mb-1 font-medium title-font">Delete </h2><p class="leading-relaxed mb-5 text-gray-600">Delete this record.</p><div class="relative mb-4">
		 
		 </div><div class="relative mb-4">
		 
		 </div><button type="submit" class="text-white rounded-xl bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600  text-lg">Delete item</button><p class="text-xs text-gray-500 mt-3">This action is irreversible.</p></form></div></div></section>`
	});
}
