import type grapesjs from 'grapesjs';
import { heroOneTw } from '../tailwind/blocks/data/heroOne';

export function spaceTailwind(editor: grapesjs.Editor) {
	editor.DomComponents.addType('tailwind-hero-one', {
		model: {
			defaults: {
                tagName:"section"
            }
		},
		view: {}
	});

    // editor.BlockManager.add('Tailwind Hero 1', {
	// 	label: 'Tailwind hero one',
	// 	content: heroOneTw,
	// 	category: "Tailwind hero"
	// });
}
