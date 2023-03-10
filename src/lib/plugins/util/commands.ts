// @ts-nocheck
export function addGCommands(editor: any) {
	editor.Commands.add('show-layers', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.layers-container');
		},

		// 0722920411

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});
	editor.Commands.add('show-styles', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getStyleEl(row) {
			return row.querySelector('.styles-container');
		},

		run(editor, sender) {
			const smEl = this.getStyleEl(this.getRowEl(editor));
			smEl.style.display = '';
		},
		stop(editor, sender) {
			const smEl = this.getStyleEl(this.getRowEl(editor));
			smEl.style.display = 'none';
		}
	});
	editor.Commands.add('show-blocks', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getStyleEl(row) {
			return row.querySelector('.blocks-container');
		},

		run(editor, sender) {
			const smEl = this.getStyleEl(this.getRowEl(editor));
			smEl.style.display = '';
		},
		stop(editor, sender) {
			const smEl = this.getStyleEl(this.getRowEl(editor));
			smEl.style.display = 'none';
		}
	});

	editor.Commands.add('show-api', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getStyleEl(row) {
			return row.querySelector('.api-container');
		},

		run(editor, sender) {
			const smEl = this.getStyleEl(this.getRowEl(editor));
			smEl.style.display = '';
		},
		stop(editor, sender) {
			const smEl = this.getStyleEl(this.getRowEl(editor));
			smEl.style.display = 'none';
		}
	});

	editor.Commands.add('show-traits', {
		getTraitsEl(editor) {
			const row = editor.getContainer().closest('.editor-row');
			return row.querySelector('.traits-container');
		},
		run(editor, sender) {
			this.getTraitsEl(editor).style.display = '';
		},
		stop(editor, sender) {
			this.getTraitsEl(editor).style.display = 'none';
		}
	});
	editor.Commands.add('set-device-desktop', {
		run: (editor) => editor.setDevice('Desktop')
	});
	editor.Commands.add('set-device-mobile', {
		run: (editor) => editor.setDevice('Mobile')
	});

	editor.Commands.add('undo', {
		run: (editor: any) => editor.UndoManager.undo(1),
		enable: (editor: any) => editor.UndoManager.canUndo()
	});

	editor.Commands.add('redo', {
		run: (editor: any) => editor.UndoManager.redo(1),
		enable: (editor: any) => editor.UndoManager.canRedo()
	});

	editor.Commands.add('canvas-clear', {
		run: (editor: any) => {
			editor.DomComponents.clear();
			editor.CssComposer.clear();
			editor.setComponents('');
			editor.setStyle('');
		}
	});
}
