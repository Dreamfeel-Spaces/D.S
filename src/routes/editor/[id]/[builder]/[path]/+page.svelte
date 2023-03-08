<script lang="ts">
	// @ts-nocheck
	import 'grapesjs/dist/css/grapes.min.css';
	import grapesjs from 'grapesjs';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import axios from 'axios';

	import { Select, Button, Input, Checkbox, Radio, Progressbar, Spinner } from 'flowbite-svelte';

	export let data: PageData;

	// import grapesTailwind from 'grapesjs-tailwind';
	import gjsForms from 'grapesjs-plugin-forms';
	import gjsTabs from 'grapesjs-tabs';
	import gjsTailwind from '$lib/plugins/grapes/tailwind';
	import {
		spaceCommerceItem,
		spaceCommerceList,
		spaceCommercePrice,
		spaceTestPlugin
	} from '$lib/plugins/grapes/space-ui';
	import { addGpanels, gPanels } from '$lib/plugins/util/panels';
	import { addGCommands } from '$lib/plugins/util/commands';
	import { gStyles } from '$lib/plugins/util/styles';
	import { gDevices } from '$lib/plugins/util/devices';
	import { gStorage } from '$lib/plugins/util/storage';
	import gBasic from 'grapesjs-blocks-basic';
	// import gjsProject from 'grapesjs-project-manager';

	let editor: grapesjs.Editor;
	let paginate: Boolean = false;
	let sort: Boolean = false;
	let table: string = '';
	let sortField = '';
	let sortOpion = '';
	let isList = 'list';

	const spaceId = $page.params.id;

	onMount(() => {
		editor = grapesjs.init({
			container: '#gjs',
			fromElement: true,
			height: '559px',
			width: 'auto',
			plugins: [
				(editor) => gjsTailwind(editor),
				(editor) => gjsForms(editor),
				(editor) => gjsTabs(editor),
				(editor) => gBasic(editor),
				(editor) => spaceCommerceItem(editor),
				(editor) => spaceCommerceList(editor, data?.tables),
				spaceCommercePrice,
				(editor) => spaceTestPlugin(editor, data?.tables, data?.rows)
			],
			layerManager: {
				appendTo: '.layers-container'
			},
			panels: gPanels(),
			selectorManager: {
				appendTo: '.styles-container'
			},
			styleManager: gStyles(),
			traitManager: {
				appendTo: '.traits-container'
			},
			deviceManager: gDevices(),
			storageManager: gStorage('gjsPageDraft' + $page.params.builder + $page.params.path),
			blockManager: {
				appendTo: '#blocks',
				blocks: []
			}
		});

		addGpanels(editor);
		addGCommands(editor);

		editor.Commands.add('manual-save', {
			run: (editor: any) => handleSave()
		});

		editor.Commands.add('canvas-clear', {
			// run: editor=>editor.
		});
	});

	let saving = false;

	async function handleSave() {
		let html = editor?.getHtml();
		let css = editor?.getCss();
		let js = editor?.getJs();

		const uiDef = editor.getProjectData();

		saving = true;
		try {
			const res = await axios.post(
				`/editor/${$page.params.id}/${$page.params.builder}/${$page.params.path}/server`,
				{ html, css, js, uiDef }
			);
			saving = false;
		} catch (e) {
			saving = false;
			console.error(e);
		}
	}
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</svelte:head>

<div class="panel__top">
	<div class="panel__basic-actions" />
	<div class="panel__devices" />
	<div class="panel__switcher" />
</div>
<div class="editor-row">
	<div class="editor-canvas">
		<div id="gjs" />
	</div>
	<div class="panel__right ">
		<div class="traits-container" />
		<div class="layers-container" />
		<div class="styles-container" />

		<div class="blocks-container">
			<div id="blocks" />
		</div>
	</div>
</div>

<style>
	#gjs {
		border: 3px solid #444;
	}
	.panel__top {
		padding: 0;
		width: 100%;
		display: flex;
		position: initial;
		justify-content: center;
		justify-content: space-between;
	}

	.panel__basic-actions {
		position: initial;
	}
	.editor-row {
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
		flex-wrap: nowrap;
		height: 300px;
	}

	.editor-canvas {
		flex-grow: 1;
	}

	.panel__right {
		flex-basis: 350px;
		position: relative;
		overflow-y: auto;
		min-height: 559px;
	}
	.panel__switcher {
		position: initial;
	}

	.panel__devices {
		position: initial;
	}
	.panel__previews {
		position: initial;
	}
</style>
