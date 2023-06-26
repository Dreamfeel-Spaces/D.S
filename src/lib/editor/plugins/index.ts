import type { Editor } from 'grapesjs';

export function forEach(editor: Editor) {
	editor.DomComponents.addType('foreach', {
		model: {
			defaults: {
				tagName: 'div',
				traits: [
					{
						type: 'select',
						options: [
							{ name: 'Collection', value: 'collection' },
							{ name: 'Range', value: 'range' }
						],
						name: 'type'
					}
				]
			},
			init() {},
			updated(property: any) {
				if (property === 'traits') this.updatedTraits();
			},
			updatedTraits() {
				const traitName = this.getTrait('type').getValue();
				if (traitName === 'collection') {
					alert(traitName);
					this.setTraits([
						// {
						// 	type: 'select',
						// 	options: [
						// 		{ name: 'Collection', value: 'collection' },
						// 		{ name: 'Range', value: 'range' }
						// 	],
						// 	name: 'type'
						// },
						{
							type: 'select',
							options: [
								{ name: 'Collection', value: 'collection' },
								{ name: 'Range', value: 'range' }
							],
							name: 'collection'
						},
						{
							type: 'number',
							name: 'limit'
						}
					]);
				}
			}
		}
	});

	editor?.BlockManager.add('foreach', {
		label: `<div  class="flex justify-center items-center "  >Each</div>`,
		content: `<div class="px-3 py-6 space-y-3 dark:bg-black dark:text-white text-black bg-white" data-gjs-type="foreach" >
		<h5  class="text-2xl" >Each</h5>
		<p>
		Update config in traits
		</p>
		<div class="p-2" data-space-util="list" ></div>
		</div>`,
		category: 'Util'
	});
}
