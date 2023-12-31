import type { Editor } from 'grapesjs';
import type grapesjs from 'grapesjs';

export function addGpanels(editor: grapesjs.Editor) {
	// editor.Panels.addPanel({
	// 	id: 'panel-top',
	// 	el: '.panel__top'
	// });
}

export function gPanels(editor: grapesjs.Editor) {
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
						id: 'show-blocks',
						active: true,
						command: 'show-blocks',
						togglable: true,
						label: `<svg
						class="dark:text-gray-100"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 96 960 960"
						width="24"
					>
						<path
							d="M666 616 440 390l226-226 226 226-226 226Zm-546-80V216h320v320H120Zm400 400V616h320v320H520Zm-400 0V616h320v320H120Zm80-480h160V296H200v160Zm467 48 113-113-113-113-113 113 113 113Zm-67 352h160V696H600v160Zm-400 0h160V696H200v160Zm160-400Zm194-65ZM360 696Zm240 0Z"
						/>
					</svg>`
					},
					{
						id: 'show-layers',
						command: 'show-layers',
						// Once activated disable the possibility to turn it off
						togglable: false,
						label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 926 120 646l50-37 310 241 310-241 50 37-360 280Zm0-152L120 494l360-280 360 280-360 280Zm0-301Zm0 225 262-204-262-204-262 204 262 204Z"/></svg>`
					},
					{
						id: 'show-assets',
						command: 'show-assets',
						// Once activated disable the possibility to turn it off
						togglable: false,
						label: `<button class="material-symbols-outlined "> upload </button>`
					},
					{
						id: 'show-components',
						command: 'show-custom-components',
						// Once activated disable the possibility to turn it off
						togglable: false,
						label: `<button class="material-symbols-outlined "> dashboard </button>`
					},
					{
						id: 'show-share',
						command: 'share',
						// Once activated disable the possibility to turn it off
						label: `<button class="material-symbols-outlined "> share </button>`
					}
				]
			},
			{
				id: 'panel-devices',
				el: '.panel__devices',
				buttons: [
				
					{
						id: 'device-desktop',
						command: 'set-device-desktop',
						active: true,
						label: `<svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="24"><path d="M70 936q-12.75 0-21.375-8.675Q40 918.649 40 905.825 40 893 48.625 884.5T70 876h820q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 936H70Zm70-120q-24 0-42-18t-18-42V276q0-24 18-42t42-18h680q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680V276H140v480Zm0 0V276v480Z"/></svg>`
					},
					{
						id: 'device-tablet',
						command: 'set-device-tablet',
						label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480.175 941q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM180 1016q-24.75 0-42.375-17.625T120 956V196q0-24.75 17.625-42.375T180 136h600q24.75 0 42.375 17.625T840 196v760q0 24.75-17.625 42.375T780 1016H180Zm0-150v90h600v-90H180Zm0-60h600V286H180v520Zm0-580h600v-30H180v30Zm0 0v-30 30Zm0 640v90-90Z"/></svg>`
					},
					{
						id: 'device-mobile',
						command: 'set-device-mobile',
						label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M260 1016q-24 0-42-18t-18-42V196q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 18H260Zm0-90v30h440v-30H260Zm0-60h440V286H260v580Zm0-640h440v-30H260v30Zm0 0v-30 30Zm0 700v30-30Z"/></svg>`
					}
				]
			}
		]
	};
}

export function updateNewEditorPanelsConfig(editor: Editor) {
	editor.Panels.addPanel({
		id: 'panel-top',
		el: '.panel__top'
	});
	editor.Panels.addPanel({
		id: 'panel-left',
		el: '.panel__left'
	});

	editor.Panels.addPanel({
		id: 'panel-pages',
		el: '.panel-pages'
	});

	// editor.Panels.addPanel({
	// 	id: 'panel-right',
	// 	el: '.panel__right'
	// });

	editor.Panels.addPanel({
		id: 'basic-actions',
		el: '#basic-actions',
		buttons: [
			{
				id: 'go-home',
				attributes: {
					title: 'Open projects and templates'
				},
				command: 'go-home',
				label: `<svg
				fill="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				/>
			</svg>`
			},
			{
				id: 'visibility',
				active: true,
				command: 'sw-visibility',
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M120 935v-60h60v60h-60Zm0-165v-60h60v60h-60Zm0-165v-60h60v60h-60Zm0-165v-60h60v60h-60Zm0-165v-60h60v60h-60Zm165 660v-60h60v60h-60Zm0-330v-60h60v60h-60Zm0-330v-60h60v60h-60Zm165 660v-60h60v60h-60Zm0-165v-60h60v60h-60Zm0-165v-60h60v60h-60Zm0-166v-60h60v60h-60Zm0-164v-60h60v60h-60Zm165 660v-60h60v60h-60Zm0-330v-60h60v60h-60Zm0-330v-60h60v60h-60Zm165 660v-60h60v60h-60Zm0-165v-60h60v60h-60Zm0-165v-60h60v60h-60Zm0-165v-60h60v60h-60Zm0-165v-60h60v60h-60Z"/></svg>`
			},
			{
				id: 'toggle-preview',
				command: 'preview',
				togglable: false,
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M180 936q-24.75 0-42.375-17.625T120 876V276q0-24.75 17.625-42.375T180 216h600q24.75 0 42.375 17.625T840 276v600q0 24.75-17.625 42.375T780 936H180Zm0-60h600V356H180v520Zm300.041-105Q400 771 337 727.849q-63-43.152-92-112Q274 547 336.959 504t143-43Q560 461 623 504.151q63 43.152 92 112Q686 685 623.041 728t-143 43ZM480 721q57 0 104.949-27.825T660 616q-27.102-49.35-75.051-77.175Q537 511 480 511t-104.949 27.825Q327.102 566.65 300 616q27.102 49.35 75.051 77.175Q423 721 480 721Zm0-105Zm.118 50Q501 666 515.5 651.382q14.5-14.617 14.5-35.5Q530 595 515.382 580.5q-14.617-14.5-35.5-14.5Q459 566 444.5 580.618q-14.5 14.617-14.5 35.5Q430 637 444.618 651.5q14.617 14.5 35.5 14.5Z"/></svg>`
			},
			{
				id: 'toggle-fullscreen',
				command: 'fullscreen',
				togglable: false,
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M200 856V663h60v133h133v60H200Zm0-367V296h193v60H260v133h-60Zm367 367v-60h133V663h60v193H567Zm133-367V356H567v-60h193v193h-60Z"/></svg>`
			},

			{
				id: 'export',
				command: 'export-template',
				context: 'export-template',
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M320 814 80 574l242-242 43 43-199 199 197 197-43 43Zm318 2-43-43 199-199-197-197 43-43 240 240-242 242Z"/></svg>`
			},
			{
				id: 'show-json',
				context: 'show-json',
				command: 'show-json',
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M570 896v-60h120q21 0 35.5-14.375T740 786V686q0-37 22.5-66t57.5-40v-8q-35-10-57.5-39.5T740 466V366q0-21.25-14.375-35.625T690 316H570v-60h120q46 0 78 32.083 32 32.084 32 77.917v100q0 21.25 14.375 35.625T850 516h30v120h-30q-21.25 0-35.625 14.375T800 686v100q0 45.833-32.083 77.917Q735.833 896 690 896H570Zm-300 0q-46 0-78-32.083-32-32.084-32-77.917V686q0-21.25-14.375-35.625T110 636H80V516h30q21.25 0 35.625-14.375T160 466V366q0-45.833 32.083-77.917Q224.167 256 270 256h120v60H270q-21 0-35.5 14.375T220 366v100q0 37-22.5 66.5T140 572v8q35 11 57.5 40t22.5 66v100q0 21.25 14.375 35.625T270 836h120v60H270Z"/></svg>`
			},
			{
				id: 'undo',
				command: 'undo',
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M280 856v-60h289q70 0 120.5-46.5T740 634q0-69-50.5-115.5T569 472H274l114 114-42 42-186-186 186-186 42 42-114 114h294q95 0 163.5 64T800 634q0 94-68.5 158T568 856H280Z"/></svg>`
			},
			{
				id: 'redo',
				command: 'redo',
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M392 856q-95 0-163.5-64T160 634q0-94 68.5-158T392 412h294L572 298l42-42 186 186-186 186-42-42 114-114H391q-70 0-120.5 46.5T220 634q0 69 50.5 115.5T391 796h289v60H392Z"/></svg>`
			},
			{
				id: 'clear',
				command: 'canvas-clear',
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m507 532-77-76 24-56h-79L271 296h529v100H565l-58 136Zm299 468L457 650l-88 206H260l120-282L56 250l42-42 750 750-42 42Z"/></svg>`
			}
		]
	});

	editor.Panels.addPanel({
		id: 'left-controls',
		el: '.panel-controls',
		buttons: [
			{
				id: 'pages',
				togglable: true,
				active: true,
				attributes: {
					title: 'Open projects and templates'
				},
				command: 'do-pages',
				label: navigator.onLine
					? `<button class="material-symbols-outlined dark:hover:underline"> description </button>`
					: 'P'
			},
			{
				id: 'traits',
				togglable: true,
				active: true,
				attributes: {
					title: 'Open traits'
				},
				command: 'do-traits',
				label: navigator.onLine
					? `<button class="material-symbols-outlined dark:hover:underline"> tune </button>`
					: 'T'
			},
			{
				id: 'panel-classy',
				attributes: {
					title: 'Update traits and attributes'
				},
				command: 'do-selectors',
				label: navigator.onLine
					? `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m255-917 43-43 347.686 347.686Q669-589 669-555.374q0 33.627-23 56.374L468-321q-23 23-54 23t-54-23L182-499q-23-22.774-23-56.439 0-33.666 23-56.44L371-801 255-917Zm159 159L215-559h398L414-758Zm337.788 477Q722-281 701-302.15 680-323.3 680-353q0-17.348 8-37.174T710-431q8-13 19.5-28t22.5-28q11 13 22.5 28t19.5 28q14 21 22 40.826T824-353q0 29.7-21.212 50.85-21.213 21.15-51 21.15ZM80 1v-121h800V1H80Z"/></svg>`
					: 'W'
			},
			{
				id: 'panel-add-page',
				attributes: {
					title: 'Open projects and templates'
				},
				command: 'do-pages-form',
				label: navigator.onLine
					? `<button class="material-symbols-outlined "> note_add </button>`
					: '+'
			}

			// {
			// 	id: 'do-hehe',
			// 	attributes: {
			// 		title: 'Open projects and templates'
			// 	},
			// 	command: 'do-styles',
			// 	label: navigator.onLine
			// 		? `<button class="material-symbols-outlined "> margin </button>`
			// 		: 'S'
			// },
			// {
			// 	id: 'assets',
			// 	attributes: {
			// 		title: 'Open projects and templates'
			// 	},
			// 	command: 'do-commerce',
			// 	label: navigator.onLine
			// 		? `<button class="material-symbols-outlined "> shopping_cart </button>`
			// 		: 'C'
			// },
			// {
			// 	id: 'db',
			// 	attributes: {
			// 		title: 'Open projects and templates'
			// 	},
			// 	command: 'do-database',
			// 	label: navigator.onLine
			// 		? `<button class="material-symbols-outlined "> database </button>`
			// 		: 'D'
			// }
			// {
			// 	id: 'vcs',
			// 	attributes: {
			// 		title: 'Open projects and templates'
			// 	},
			// 	command: 'do-vcs',
			// 	label: navigator.onLine
			// 		? `<button class="material-symbols-outlined "> alt_route </button>`
			// 		: 'V'
			// }
			// {
			// 	id: 'ii8',
			// 	attributes: {
			// 		title: 'Open projects and templates'
			// 	},
			// 	command: 'do-ii8',
			// 	label: navigator.onLine
			// 		? `<button class="material-symbols-outlined "> translate </button>`
			// 		: '+'
			// }
		]
	});
}

// <span class="material-symbols-outlined"> post_add </span>
