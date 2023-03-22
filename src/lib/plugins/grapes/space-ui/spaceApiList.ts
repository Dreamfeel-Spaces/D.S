import type grapesjs from 'grapesjs';

export function gSpaceApIList(editor: grapesjs.Editor, config: { tables: [] }) {
	const { tables = [] } = config;

	const tableNames = tables.map((table: any) => table.name);

	editor.Components.addType('api-detail-component', {
		model: {
			defaults: {
				'data-table': '',
				tagName: 'div'
			}
		}
	});

	editor.DomComponents.addType('api-image-component', {
		model: {
			defaults: {
				tagName: 'img',
				src: '',
				'data-src': ''
			},
			init() {
				this.listenTo(this, 'change:attributes:data-src', this.handleUpdate);
			},
			handleUpdate() {}
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
							.append(`<div data-index="${i}" data-table=${tableName} style="min-height:100px;padding:20px;margin:20px"  data-gjs-type="api-item-component">
				                <input  data-gjs-type="api-text-component" placeholder=${column.name}  data-table="${tableName}" data-index="${i}" >Text</input>
				        </div>`);
					}
				} catch (error) {}
			}
		}
	});

	editor.DomComponents.addType('api-table-component', {
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
					for (let i = 0; i < table?.rows?.length; i++) {
						const row: any = table.rows[i];
						this
							.append(`<div data-index="${i}" data-table=${tableName} style="min-height:100px;padding:20px;margin:20px"  data-gjs-type="api-item-component">
				                <div  data-gjs-type="api-text-component"  data-table="${tableName}" data-index="${i}" >Text</div>
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
					'data-table': ''
				},
				tagName: 'div',
				traits: ['data-key']
			},
			init() {
				this.listenTo(this, 'change:attributes:data-key', this.handleUpdate);
			},
			handleUpdate() {
				const key = this.getAttributes()['data-key'];
				const tableName = this.getAttributes()['data-table'];
				const rowIndex = this.getAttributes()['data-index'];

				const table: any = tables.find((table: any) => table.name === tableName);

				const rows = table?.rows ?? [];
				const row = rows[rowIndex];

				const textContent = row[key];
				this.replaceWith(
					`<div data-key=${key}  data-table="${tableName}" data-index="${rowIndex}"   data-gjs-type="api-text-component" >${textContent}</div>`
				);
				// const parent = this.parent();
				// const grandy = parent?.parent();
				// grandy?.components().forEach((cmp: any, ind: number) => {
				// 	const clonedComponent = parent?.toHTML();
				// 	cmp.remove();
				// 	grandy?.append(String(clonedComponent));
				// });
			},
			updated(property: any, value: any, prevValue: any) {
				if (property === 'traits') {
					try {
						const traits = this.getTrait('data-key');
						const tableName = traits?.getValue();
						if (tableName) this.setAttributes({ 'data-key': tableName });
					} catch (error) {}
				}
			}
		}
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
				this.listenTo(this, 'change:style', this.handleUpdateChild);
			},
			handleUpdate() {
				// console.log(this.getAttributes());
			},
			handleUpdateChild() {
				console.log('Yaaay');
			},
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

	editor.DomComponents.addType('api-list-component', {
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
							.append(`<div data-index="${i}"  style="min-height:100px; padding:20px;margin:20px"  data-gjs-type="api-item-component">
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
							.append(`<div data-index="${i}" data-table=${tableName} style="min-height:100px;padding:20px;margin:20px"  data-gjs-type="api-item-component">
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

	editor.BlockManager.add('Api list component', {
		label: 'API List',
		content: `<div  data-gjs-type="api-list-component"></div>`
	});

	editor.BlockManager.add('Api text component', {
		label: 'API Text',
		content: `<div  data-gjs-type="api-text-component"></div>`
	});

	editor.BlockManager.add('Api table component', {
		label: 'API Table',
		content: `<div  data-gjs-type="api-table-component"></div>`
	});
	editor.BlockManager.add('Api form component', {
		label: 'API Form',
		content: `<div  data-gjs-type="api-form-component"></div>`
	});

	editor.BlockManager.add('Api image compontn', {
		label: 'API Image',
		content: `<img src="" data-src=" data=gjs-type="api-image-component" />`
	});

	editor.BlockManager.add('API Detail component', {
		label: 'API Detail',
		content: `<div  data-gjs-type="api-detail-component"></div>`
	});
}
