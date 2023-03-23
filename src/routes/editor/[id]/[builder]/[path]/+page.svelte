<script lang="ts">
	// @ts-nocheck
	import { Modal, P, Heading, Select, Button, Label, Card, Spinner } from 'flowbite-svelte';
	import 'grapesjs/dist/css/grapes.min.css';
	import grapesjs from 'grapesjs';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import axios from 'axios';
	import type { PageData } from './$types';

	// import grapesTailwind from 'grapesjs-tailwind';
	import gjsForms from 'grapesjs-plugin-forms';
	import gjsTabs from 'grapesjs-tabs';
	import gjsTailwind from '$lib/plugins/grapes/tailwind';
	import { addGpanels, gPanels } from '$lib/plugins/util/panels';
	import { addGCommands } from '$lib/plugins/util/commands';
	import { gStyles } from '$lib/plugins/util/styles';
	import { gDevices } from '$lib/plugins/util/devices';
	import { gStorage } from '$lib/plugins/util/storage';
	import gBasic from 'grapesjs-blocks-basic';
	import { browser } from '$app/environment';
	import { gSpaceApIList } from '$lib/plugins/grapes/space-ui/spaceApiList';
	import Code from '../../../../Code.svelte';
	import Tutorial from './Tutorial.svelte';

	export let data: PageData;

	let editor: grapesjs.Editor;
	const spaceId = $page.params.id;
	const pageId = $page.params.path;

	let pageModalOpen = false;
	let jsonModalOpen = false;
	let jsonModalContent = '';
	let saving = false;

	onMount(() => {
		if (browser) {
			editor = grapesjs.init({
				container: '#gjs',
				fromElement: true,
				height: '618px',
				width: 'auto',
				plugins: [
					// (editor) => gjsForms(editor),
					// (editor) => gjsTabs(editor),
					(editor) => gBasic(editor),
					(editor) => gSpaceApIList(editor, { tables: data.tables, pages: data.pages, pageId }),
					(editor) => gjsTailwind(editor)
				],
				layerManager: {
					appendTo: '.layers-container'
				},
				panels: gPanels(editor),
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

			editor.Commands.add('open-pages', {
				run: () => {
					pageModalOpen = true;
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

			editor.Commands.add('show-json', {
				run: () => {
					jsonModalContent = JSON.stringify(editor?.getComponents(), null, '\t');
					jsonModalOpen = true;
				}
			});
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

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

			if (res) saving = false;
		} catch (e) {
			saving = false;
			console.error(e);
		}
	}

	let spaceUis = data.space.spaceUis;
	let uiId = '';
	let selectedUIId = $page.params.builder;
	let selectedUi = selectedUIId;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</svelte:head>

{#if saving}
	<Modal bind:open={saving} permanent class="w-full">
		<Spinner /> Saving...
	</Modal>
{/if}

<Tutorial />

<Modal class="w-full" bind:open={pageModalOpen}>
	<Heading tag="h5">{$page.data.space.name}</Heading>
	<Heading tag="h6">Pages manager</Heading>

	<ul
		class="w-full dark:text-gray-50 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
	>
		{#each data.ui.pages as page}
			<li class="cursor-pointer">
				<a rel="external" href={`/editor/${spaceId}/${data.ui.id}/${page.id}`} class="p-2 flex">
					<P class="flex-1 font-bold">{page.name}</P>
					<P>{page.path}</P>
				</a>
			</li>
		{/each}
	</ul>

	<div class="mt-4">
		<Button>Publish</Button>
	</div>
</Modal>

<Modal bind:open={jsonModalOpen} class="w-full">
	<div slot="header">
		<Heading tag="h5">Components JSON</Heading>
	</div>
	<Card size="xl">
		<Code language="javascript" code={jsonModalContent} />
	</Card>
	<div slot="footer">
		<Button on:click={() => navigator.clipboard.writeText(jsonModalContent)} size="xs">Copy</Button>
	</div>
</Modal>

<div class="dark:bg-gray-900 ">
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
		min-height: 618px;
	}
	.panel__switcher {
		position: initial;
	}

	.panel__devices {
		position: initial;
	}
</style>
