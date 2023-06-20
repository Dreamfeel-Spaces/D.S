import { goto } from '$app/navigation';
import { page } from '$app/stores';

// @ts-nocheck
export function addGCommands(editor: any) {
	editor.Commands.add('open-pages', {
		run: () => {
			hidden2 = false;
		}
	});

	editor.DeviceManager.add({
		id: 'tablet2',
		name: 'Tablet 2',
		width: '800px', // This width will be applied on the canvas frame
		widthMedia: '810px', // This width that will be used for the CSS media
		height: '600px' // Height will be applied on the canvas frame
	});

	editor.Commands.add('set-device-tablet', {
		run: () => {
			editor.DeviceManager.select('tablet2');
		}
	});

	editor.Commands.add('do-pages', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.pages-container');
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});

	editor.Commands.add('do-styles', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.styles-container');
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});

	editor.Commands.add('do-traits', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.traits-and-selectors-container');
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});
	editor.Commands.add('do-database', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.db-helper');
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});
	editor.Commands.add('do-vcs', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.vcs-container');
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});
	editor.Commands.add('do-pages-form', {
		getRowEl(editor) {
			console.log('hhh');
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.pages-form');
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});
	editor.Commands.add('do-commerce', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.commerce-assist');
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});

	editor.Commands.add('share', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.share-container');
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});
	editor.Commands.add('show-layers', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.layers-container');
		},

		run(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor, sender) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});
	editor.Commands.add('show-custom-components', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row) {
			return row.querySelector('.components-container');
		},

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

	editor.Commands.add('show-assets', {
		getRowEl(editor) {
			return editor.getContainer().closest('.editor-row');
		},
		getStyleEl(row) {
			return row.querySelector('.assets-container');
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

	// editor.Commands.add('show-traits', {
	// 	getTraitsEl(editor) {
	// 		const row = editor.getContainer().closest('.editor-row');
	// 		return row.querySelector('.traits-container');
	// 	},
	// 	run(editor, sender) {
	// 		this.getTraitsEl(editor).style.display = '';
	// 	},
	// 	stop(editor, sender) {
	// 		this.getTraitsEl(editor).style.display = 'none';
	// 	}
	// });
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

	editor.Commands.add('manual-save', {
		run: (editor: any) => handleSave()
	});

	editor.Commands.add('open-actions', {
		run: () => {
			actionsHidden = false;
		}
	});

	editor.Commands.add('go-home', {
		run: () => {
			goto(`/editor/${$page.data.space.appId}`);
		}
	});
}
