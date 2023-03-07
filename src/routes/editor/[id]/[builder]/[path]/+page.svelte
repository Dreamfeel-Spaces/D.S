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
		spaceCommercePrice
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
				(editor) => {
					editor.getWrapper;
				}
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

		// editor.Commands.add('manual-save', {
		// 	run: (editor: any) => {
		// 		editor.Modal.setTitle('Components JSON')
		// 			.setContent(
		// 				`<textarea style="width:100%; height: 250px;">
		// 		${JSON.stringify(editor.getComponents())}
		// 	  </textarea>`
		// 			)
		// 			.open();
		// 	}
		// });

		editor.Commands.add('manual-save', {
			run: (editor: any) => handleSave()
		});
	});

	let saving = false;

	async function handleSave() {
		let html = editor?.getHtml();
		let css = editor?.getCss();
		let js = editor?.getJs();

		console.log(editor?.getSelected());

		saving = true;
		try {
			const res = await axios.post(
				`/editor/${$page.params.id}/${$page.params.builder}/${$page.params.path}/server`,
				{ html, css, js }
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
		<!-- <form action="?/savePageData" method="post">
			<div class="api-container text-left px-4">
				{console.log(editor?.getHtml())}
				<input value={editor?.getHtml()} name="html" type="hidden" />
				<input value={editor?.getCss()} name="css" type="hidden" />
				<input value={editor?.getJs()} name="js" type="hidden" />
				<div class="mb-9 text-2xl ">Spaces api</div>
				<label for="table">Select collection</label>
				<Select
					size="sm"
					id="table"
					name="table"
					required
					bind:value={table}
					bind:selected={table}
					placeholder="Select table"
					items={data.tables.map((table) => {
						return {
							name: table.name,
							value: table.id
						};
					})}
					class="mt-3 bg-inherit"
				/>
				<div class="mt-3">
					<div class="mb-3 flex">
						<Radio value="list" on:change={(e) => (isList = e.target.value)} name="list">List</Radio
						>
						<Radio
							class="ml-3"
							value="detail"
							on:change={(e) => (isList = e.target.value)}
							name="list">Detail</Radio
						>
					</div>
					{#if isList === 'list'}
						<Checkbox bind:checked={paginate} bind:value={paginate}
							><span class="text-gray-600">Paginate</span></Checkbox
						>
						<Checkbox class="bg-inherit" bind:checked={sort} bind:value={sort}
							><span class="text-gray-600">Sort</span></Checkbox
						>
					{/if}
				</div>
				{#if paginate}
					<div class="my-2">
						<div>
							<label for="">Limit per page</label>
							<Input class="bg-inherit" size="sm" required placeholder="10" />
						</div>
					</div>
				{/if}
				{#if sort}
					<div class="flex mt-3 gap-3">
						<div class="w-full">
							<label for="">Sort</label>
							<Select
								required
								size="sm"
								class="bg-inherit"
								id="sort"
								name="sort"
								bind:value={sortField}
								placeholder="Select"
								items={data.tables.map((table) => {
									return {
										name: table.name,
										id: table.id
									};
								})}
							/>
						</div>

						<div class="w-full">
							<div>
								<label for="">Order by</label>
								<Select
									id="sort_by"
									size="sm"
									required
									class="bg-inherit"
									name="sort_by"
									bind:value={sortOpion}
									placeholder="Sort by"
									items={[
										{
											name: 'Ascending',
											value: 'asc'
										},
										{
											name: 'Descending',
											value: 'desc'
										}
									]}
								/>
							</div>
						</div>
					</div>
				{/if}
				<div class="my-4" />
				{#if saving}
					<Spinner />
				{:else}
					<Button on:click={handleSave} class="mt-3 w-full">Apply</Button>
				{/if}
			</div>
		</form> -->
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
