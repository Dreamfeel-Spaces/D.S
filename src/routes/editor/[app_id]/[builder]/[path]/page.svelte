<script lang="ts">
	// @ts-nocheck
	import {
		Modal,
		P,
		Heading,
		Radio,
		Button,
		Drawer,
		Card,
		Spinner,
		DarkMode,
		Input,
		Toggle
	} from 'flowbite-svelte';
	import 'grapesjs/dist/css/grapes.min.css';
	import grapesjs from 'grapesjs';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import axios from 'axios';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	// import grapesTailwind from 'grapesjs-tailwind';
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

	import appcSS from '../../../../../app.css?inline';

	import { spaceTailwind } from '$lib/plugins/grapes/space-ui/SpaceTailwind';

	export let data: PageData;

	let editor: grapesjs.Editor;
	const spaceId = $page.params['app_id'];
	const pageId = $page.params.path;

	let pageModalOpen = false;
	let jsonModalOpen = false;
	let jsonModalContent = '';
	let saving = false;

	let theme = 'light';

	let loading = false;

	function initEditor() {
		if (browser && !editor) {
			editor = grapesjs.init({
				container: '#gjs',
				fromElement: true,
				height: '618px',
				width: 'auto',
				canvasCss: appcSS,
				optsCss: appcSS,
				plugins: [
					// (editor) => gjsForms(editor),
					// (editor) => gjsTabs(editor),
					spacePages,
					(editor) => gBasic(editor),
					(editor) =>
						gSpaceApIList(editor, {
							tables: data.tables,
							pages: data.pages,
							pageId,
							space: $page.data.space
						}),
					(editor) =>
						gjsTailwind(editor, {
							theme,
							updateTheme() {
								if (theme === 'light') theme = 'dark';
								else if (theme === 'dark') theme = 'light';
								return theme;
							}
						}),
					(editor) => spaceTailwind(editor)
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
				storageManager: gStorage(`gjsProject-${$page.params.path}`),
				blockManager: {
					appendTo: '#blocks',
					blocks: []
				}
			});

			if (editor) {
				loading = false;
			}

			addGpanels(editor);
			addGCommands(editor);

			editor.Commands.add('manual-save', {
				run: (editor: any) => handleSave()
			});

			editor.Commands.add('open-pages', {
				run: () => {
					hidden2 = false;
				}
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
	}

	function init() {
		loading = true;
		setTimeout(initEditor, 4000);
	}

	onMount(init);

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
				`/editor/${$page.params['app_id']}/${$page.params.builder}/${$page.params.path}/server`,
				{ html, CSSCounterStyleRule, js, uiDef }
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
	var selectedUi = selectedUIId;
	let hidden2 = true;
	let actionsHidden = true;
	import { sineIn } from 'svelte/easing';
	import { spacePages } from '$lib/plugins/grapes/space-ui/templates/pages/spacePagesPlugin';
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let pageModalRadio = 'pages';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</svelte:head>

<Modal bind:open={loading} class="w-full">
	<Spinner /> Loading...
</Modal>

{#if saving}
	<Modal bind:open={saving} permanent class="w-full">
		<Spinner /> Saving...
	</Modal>
{/if}

<Tutorial />

<Drawer transitionType="fly" {transitionParams} bind:hidden={actionsHidden}>
	<div class="hidden">
		<DarkMode />
	</div>
	<Heading class="my-4" tag="h6">Actions</Heading>

	<div class="flex mb-4">
		<Radio value="pages" bind:group={pageModalRadio}>All actions</Radio>
		<Radio class="ml-4" value="form" bind:group={pageModalRadio}>Create action</Radio>
	</div>

	<!-- {#if pageModalRadio === 'pages'}
		<div>
			<ul
				class="w-full dark:text-gray-50 bg-white rounded-lg border min-h-96  kjk h-100 border-gray-200  dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
			>
				{#each data.ui.pages as page}
					<li
						class="cursor-pointer {page.id === pageId ? 'bg-gray-700' : ' '} hover:dark:bg-gray-600"
					>
						{#if page.layout}
							<div class="flex justify-end">
								<small class="text-xs  m-1 rounded-xl p-1 bg-red-500">Layout</small>
							</div>
						{/if}
						<a rel="external" href={`/editor/${spaceId}/${data.ui.id}/${page.id}`} class="p-2 flex">
							<P class="flex-1 font-bold">{page.name} <br /></P>
							<P>{page.path}</P>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<form method="post" class="spacing-y-6" action="?/createPage">
			<Input required name="name" placeholder="Name" />
			<Input name="icon" class="my-3" placeholder="Icon" />
			<Input required name="path" class="my-3" placeholder="Path" />
			<Toggle>Layout</Toggle>
			<Button type="submit" class="w-full mt-3">Save</Button>
		</form>
	{/if} -->
</Drawer>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2}>
	<div class="hidden">
		<DarkMode />
	</div>
	<Heading class="my-4" tag="h6">Pages</Heading>

	<div class="flex mb-4">
		<Radio value="pages" bind:group={pageModalRadio}>All pages</Radio>
		<Radio class="ml-4" value="form" bind:group={pageModalRadio}>Create Page</Radio>
	</div>

	{#if pageModalRadio === 'pages'}
		<div>
			<ul
				class="w-full dark:text-gray-50 bg-white rounded-lg border min-h-96  kjk h-100 border-gray-200  dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
			>
				{#each data.ui.pages as page}
					<li
						class="cursor-pointer {page.id === pageId ? 'bg-gray-700' : ' '} hover:dark:bg-gray-600"
					>
						{#if page.layout}
							<div class="flex justify-end">
								<small class="text-xs  m-1 rounded-xl p-1 bg-red-500">Layout</small>
							</div>
						{/if}
						<a rel="external" href={`/editor/${spaceId}/${data.ui.id}/${page.id}`} class="p-2 flex">
							<P class="flex-1 font-bold">{page.name} <br /></P>
							<P>{page.path}</P>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<form method="post" class="spacing-y-6" action="?/createPage">
			<Input required name="name" placeholder="Name" />
			<Input name="icon" class="my-3" placeholder="Icon" />
			<Input required name="path" class="my-3" placeholder="Path" />
			<Toggle>Layout</Toggle>
			<Button type="submit" class="w-full mt-3">Save</Button>
		</form>
	{/if}
</Drawer>

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

<div class="dark:bg-black ">
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
