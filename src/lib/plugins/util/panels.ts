export function addGpanels(editor: any) {
	editor.Panels.addPanel({
		id: 'panel-top',
		el: '.panel__top'
	});
	editor.Panels.addPanel({
		id: 'basic-actions',
		el: '.panel__basic-actions',
		buttons: [
			{
				id: 'visibility',
				active: true,
				className: 'fa fa-square-o',
				command: 'sw-visibility'
			},
			{
				id: 'export',
				className: 'fa fa-share-square-o',
				command: 'export-template',
				context: 'export-template' // For grouping context of buttons from the same panel
			},
			{
				id: 'show-json',
				className: 'fa fa-code',
				context: 'show-json',
				command(editor: any) {
					editor.Modal.setTitle('Components JSON')
						.setContent(
							`<textarea style="width:100%; height: 250px;">
        ${JSON.stringify(editor.getComponents())}
      </textarea>`
						)
						.open();
				}
			},
			{
				id: 'undo',
				className: 'fa fa-undo',
				command: 'undo'
			},
			{
				id: 'redo',
				className: 'fa fa-repeat',
				command: 'redo'
			},
			{
				id: 'clear',
				className: 'fa fa-close	',
				command: 'canvas-clear'
			},
			{
				id: 'show-api',
				className: 'fa fa-certificate',
				command: 'manual-save',
				label: 'S'
			}
		]
	});
}

export function gPanels() {
	return {
		defaults: [
			{
				id: 'layers',
				el: '.panel__right',
				// Make the panel resizable
				resizable: {
					maxDim: 350,
					minDim: 200,
					tc: 0, // Top handler
					cl: 1, // Left handler
					cr: 0, // Right handler
					bc: 0, // Bottom handler
					// Being a flex child we need to change `flex-basis` property
					// instead of the `width` (default)
					keyWidth: 'flex-basis'
				}
			},
			{
				id: 'panel-switcher',
				el: '.panel__switcher',
				buttons: [
					{
						id: 'show-layers',
						active: true,
						className: 'fa fa-object-group',
						command: 'show-layers',
						// Once activated disable the possibility to turn it off
						togglable: false,
						label: 'L'
					},
					{
						id: 'show-traits',
						active: true,
						className: 'fa fa-certificate',
						command: 'show-traits',
						togglable: false,
						label: 'T'
					},
					{
						id: 'show-style',
						active: true,
						className: 'fa fa-paint-brush',
						command: 'show-styles',
						togglable: false
					},
					{
						id: 'show-blocks',
						active: true,
						className: 'fa fa-plus-square',
						command: 'show-blocks',
						togglable: false,
						label: '+'
					},
					{
						id: 'open-templates',
						className: 'fa fa-folder-o',
						attributes: {
							title: 'Open projects and templates'
						},
						command(editor: any) {
							editor.Modal.setTitle('')
								.setContent(
									`<textarea style="width:100%; height: 250px;">
			${JSON.stringify(editor.getComponents())}
		  </textarea>`
								)
								.open();
						}
					}
				]
			},
			{
				id: 'panel-devices',
				el: '.panel__devices',
				buttons: [
					{
						id: 'device-desktop',
						className: 'fa fa-desktop',
						command: 'set-device-desktop',
						active: true,
						togglable: false
					},
					// {
					// 	id: 'device-tablet',
					// 	className: 'fa fa-tablet',
					// 	command: 'set-device-desktop',
					// 	active: true,
					// 	togglable: false
					// },
					{
						id: 'device-mobile',
						className: 'fa fa-mobile-phone',
						command: 'set-device-mobile',
						togglable: false
					},
					{
						id: 'toggle-fullscreen',
						className: 'fa fa-arrows-alt',
						command: 'fullscreen',
						togglable: false
					},
					{
						id: 'toggle-preview',
						className: 'fa fa-eye',
						command: 'preview',
						togglable: false
					}
				]
			}
		]
	};
}
