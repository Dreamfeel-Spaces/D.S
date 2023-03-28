//@ts-nocheck
import loadBlocks from './blocks';
import loadCommands from './commands';
import en from './locale/en';
import type grapesjs from 'grapesjs';

export default function gjsTailwind(editor: grapesjs.Editor, opts = {}) {
	const options = {
		...{
			i18n: {},
			// default options
			tailwindPlayCdn: 'https://cdn.tailwindcss.com',
			plugins: [],
			config: {},
			// cover: `img.object-cover { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; }`,
			changeThemeText: 'Change Theme'
		},
		...opts
	};

	// Add blocks
	loadBlocks(editor, options);
	// Add commands
	loadCommands(editor, options);
	// Load i18n files
	editor.I18n &&
		editor.I18n.addMessages({
			en,
			...options.i18n
		});

	editor.Commands.add('toggle-theme', {
		run: () => {
			const theme = options.updateTheme();
			editor.Canvas.getBody().className = theme;
			console.log('options', theme);
		}
	});

	const appendTailwindCss = async (frame) => {
		const iframe = frame.view.getEl();

		if (!iframe) return;

		// checks iframe is ready before loading Tailwind CSS - issue with firefox
		const f = setInterval(() => {
			const doc = iframe.contentDocument;
			if (doc) {
				if (doc?.readyState === 'complete') {
					doc.body.className = options.theme;
					clearInterval(f);
				}
			}
		}, 1000);
	};

	editor.Canvas.getModel()['on']('change:frames', (m, frames) => {
		frames.forEach((frame) => frame.once('loaded', () => appendTailwindCss(frame)));
	});
}
