import type { Editor } from 'grapesjs';

export function forEach(editor: Editor, { tables }: { tables: any[] }) {
	editor.DomComponents.addType('foreach', {
		model: {
			defaults: {
				tagName: 'div',
				traits: [
					{
						type: 'select',
						options: tables.map(({ name, id }) => ({ name, value: id })),
						name: 'collection'
					}
				]
			},
			init() {
				const traitName = this.getTrait('collection')?.getValue();
				if (traitName) {
					const table = tables.find((table) => table.id === traitName) ?? { rows: [] };
					this.handleUpdateCollection(table);
				}
			},
			updated(property: any) {
				if (property === 'traits') this.updatedTraits();
			},
			updatedTraits() {
				const traitName = this.getTrait('collection')?.getValue();
				const table = tables.find((table) => table.id === traitName) ?? { rows: [] };
				this.handleUpdateCollection(table);
			},
			handleUpdateCollection(table: any) {
				const el = this.getEl();
				const container = el?.querySelector('#list-container');
				container?.childNodes.forEach((n) => n.remove());
				for (let row of table?.rows) {
					const ell = document.createElement('div');
					ell.className = 'text-lg m-3 p-3 border border-emarald-300';
					ell.append('{{row.id}}'.replace('{{row.id}}', row.id));
					container?.appendChild(ell);
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
		<div class="p-2" id="list-container" data-space-util="list" ></div>
		</div>`,
		category: 'Util'
	});
}
let defaultItemContainer = (row: any) => {
	return `<div  class="p-2 m-2 border border-zinc-200" >{{row.id}}</div>`;
};
