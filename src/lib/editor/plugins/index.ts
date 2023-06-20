import type { Editor } from 'grapesjs';

export function forEach(editor: Editor) {
	editor.DomComponents.addType('foreach', {
		model: {
			defaults: {
				tagname: 'div'
			}
		}
	});

	editor?.BlockManager.add('ForEach', {
		label: `For Each`,
		content: `<div  data-gjs-type="for-each" />`,
		category: 'Util'
	});
}
