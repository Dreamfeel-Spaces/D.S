import type { Editor } from 'grapesjs';

export function forEach(editor: Editor) {
	editor.DomComponents.addType('foreach', {
		model: {
			defaults: {
				tagName: 'div',
				traits: [
					{ type: 'select', options: ['Collection', 'Range'], name: 'Type' }
					// { type: 'checkbox', name: 'H' }
				]
			},
			init() {},
			updated(property: any) {
				if (property === 'Collection') {
					this.setTraits([{ name: 'Collection name', options: ["Test 1", "Test 2"], type: 'select' }]);
				}
			}
		}
	});

	editor?.BlockManager.add('ForEach', {
		label: `For Each`,
		content: `<div class="h-20" data-gjs-type="foreach" />`,
		category: 'Util'
	});
}
