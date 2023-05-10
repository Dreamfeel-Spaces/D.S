import type grapesjs from 'grapesjs';
import landingPage from './data.ts/landingPage';

export function spacePages(editor: grapesjs.Editor) {
	let dawn = landingPage();

	editor.BlockManager.add('Api list component', {
		label: 'Dawn',
		content: dawn,
		category: 'Pages'
	});
}
