import type grapesjs from 'grapesjs';

export function addGpanels(editor: grapesjs.Editor) {
	editor.Panels.addPanel({
		id: 'panel-top',
		el: '.panel__top'
	});
	editor.Panels.addPanel({
		id: 'basic-actions',
		el: '.panel__basic-actions',
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
				id: 'show-api',
				command: 'manual-save',
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M840 373v503q0 24-18 42t-42 18H180q-24 0-42-18t-18-42V276q0-24 18-42t42-18h503l157 157Zm-60 27L656 276H180v600h600V400ZM479.765 811Q523 811 553.5 780.735q30.5-30.264 30.5-73.5Q584 664 553.735 633.5q-30.264-30.5-73.5-30.5Q437 603 406.5 633.265q-30.5 30.264-30.5 73.5Q376 750 406.265 780.5q30.264 30.5 73.5 30.5ZM233 472h358V329H233v143Zm-53-72v476-600 124Z"/></svg>`
			},
			{
				id: 'open-pages',
				attributes: {
					title: 'Open projects and templates'
				},
				command: 'open-pages',
				label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 896q-48-38-104-59t-116-21q-42 0-82.5 11T100 858q-21 11-40.5-1T40 822V340q0-11 5.5-21T62 304q46-24 96-36t102-12q58 0 113.5 15T480 316v506q51-33 107-49.5T700 756q36 0 78.5 7t81.5 29V287q9.886 3.75 19.443 7.875Q889 299 898 304q10 6 16 15.677 6 9.678 6 20.323v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700 816q-60 0-116 21t-104 59Zm60-167V376l260-260v387L540 729Zm-120 63V353q-34-19-79-28t-81-9q-47 0-87.5 10T100 351.533V792q35-17 75.5-26.5t85-9.5q44.5 0 84.5 9.5t75 26.5Zm0 0V353v439Z"/></svg>`
			},
			{
				id: 'open-actions',
				attributes: {
					title: 'Open projects and templates'
				},
				command: 'open-actions',
				label: `<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				height="24"
				viewBox="0 96 960 960"
				width="24"
				><path
					d="m393 891 279-335H492l36-286-253 366h154l-36 255Zm-73 85 40-280H160l360-520h80l-40 320h240L400 976h-80Zm153-395Z"
				/></svg
			>`
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
						id: 'show-layers',
						active: true,
						command: 'show-layers',
						// Once activated disable the possibility to turn it off
						togglable: false,
						label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 926 120 646l50-37 310 241 310-241 50 37-360 280Zm0-152L120 494l360-280 360 280-360 280Zm0-301Zm0 225 262-204-262-204-262 204 262 204Z"/></svg>`
					},
					{
						id: 'show-traits',
						active: true,
						command: 'show-traits',
						togglable: false,
						label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m388 976-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185 576q0-9 .5-20.5T188 535L80 456l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669 346l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592 850l-20 126H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410 576q0-29 20.5-49.5T480 506q29 0 49.5 20.5T550 576q0 29-20.5 49.5T480 646Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715 576q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538 348l-14-112h-88l-14 112q-34 7-63.5 24T306 414l-106-46-40 72 94 69q-4 17-6.5 33.5T245 576q0 17 2.5 33.5T254 643l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z"/></svg>`
					},
					{
						id: 'show-style',
						active: true,
						command: 'show-styles',
						togglable: false,
						label: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M437 976q-24 0-42-17.625T377 916V716H220q-24 0-42-18t-18-42V353q0-55 39.656-96T295 216h505v440q0 24-18 42t-42 18H583v200q0 24.75-18 42.375T523 976h-86ZM220 502h520V276h-56v171h-60V276h-71v85h-60v-85H295q-32 0-53.5 23T220 353v149Zm0 154h520v-94H220v94Zm0-94v94-94Z"/></svg>`
					},
					{
						id: 'show-blocks',
						active: true,
						command: 'show-blocks',
						togglable: false,
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
					}
				]
			},
			{
				id: 'panel-devices',
				el: '.panel__devices',
				buttons: [
					{
						id: 'toggle-theme',
						attributes: {
							title: 'Open projects and templates'
						},
						command: 'toggle-theme',
						label: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`
					},
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
