<script lang="ts">
	// @ts-nocheck
	import 'grapesjs/dist/css/grapes.min.css';
	import grapesjs from 'grapesjs';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import axios from 'axios';

	import { Select, Button, Input, Checkbox, Radio } from 'flowbite-svelte';

	export let data: PageData;

	// import grapesTailwind from 'grapesjs-tailwind';
	import gjsForms from 'grapesjs-plugin-forms';
	import gjsTabs from 'grapesjs-tabs';
	import gjsTailwind from '$lib/plugins/grapes/tailwind';
	import gjsCKEditor from 'grapesjs-plugin-ckeditor';
	// import gjsProject from 'grapesjs-project-manager';

	let editor: any;
	let paginate: Boolean = false;
	let sort: Boolean = false;
	let table: string = '';
	let sortField = '';
	let sortOpion = '';
	let isList = 'list';

	const spaceId = $page.params["app_id"];

	onMount(() => {
		editor = grapesjs.init({
			container: '#gjs',
			fromElement: true,
			height: '559px',
			width: 'auto',
			layerManager: {
				appendTo: '.layers-container'
			},
			panels: {
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
								togglable: false
							},
							{
								id: 'show-traits',
								active: true,
								className: 'fa fa-certificate',
								command: 'show-traits',
								togglable: false
							},
							{
								id: 'show-style',
								active: true,
								className: 'fa fa-paint-brush',
								command: 'show-styles',
								togglable: false
							},
							{
								id: 'show-api',
								active: true,
								className: 'fa fa-certificate',
								command: 'show-api',
								togglable: false
							},
							{
								id: 'show-blocks',
								active: true,
								className: 'fa fa-plus-square',
								command: 'show-blocks',
								togglable: false
							},
							{
								id: 'open-templates',
								className: 'fa fa-folder-o',
								attributes: {
									title: 'Open projects and templates'
								},
								command: 'open-templates' //Open modal
							},
							{
								id: 'open-pages',
								className: 'fa fa-file-o',
								attributes: {
									title: 'Take Screenshot'
								},
								command: 'open-settings',
								togglable: false
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
			},
			selectorManager: {
				appendTo: '.styles-container'
			},
			styleManager: {
				appendTo: '.styles-container',
				sectors: [
					{
						name: 'Dimension',
						open: false,
						// Use built-in properties
						buildProps: ['width', 'min-height', 'padding'],
						// Use `properties` to define/override single property
						properties: [
							{
								// Type of the input,
								// options: integer | radio | select | color | slider | file | composite | stack
								type: 'integer',
								name: 'The width', // Label for the property
								property: 'width', // CSS property (if buildProps contains it will be extended)
								units: ['px', '%'], // Units, available only for 'integer' types
								defaults: 'auto', // Default value
								min: 0 // Min value, available only for 'integer' types
							}
						]
					},
					{
						name: 'Extra',
						open: false,
						buildProps: ['background-color', 'box-shadow', 'custom-prop'],
						properties: [
							{
								id: 'custom-prop',
								name: 'Custom Label',
								property: 'font-size',
								type: 'select',
								defaults: '32px',
								// List of options, available only for 'select' and 'radio'  types
								options: [
									{ value: '12px', name: 'Tiny' },
									{ value: '18px', name: 'Medium' },
									{ value: '32px', name: 'Big' }
								]
							}
						]
					}
				]
			},
			traitManager: {
				appendTo: '.traits-container'
			},
			deviceManager: {
				devices: [
					{
						name: 'Desktop',
						width: '' // default size
					},
					{
						name: 'Mobile',
						width: '320px', // this value will be used on canvas width
						widthMedia: '480px' // this value will be used in CSS @media
					}
				]
			},
			storageManager: {
				type: 'local',
				autosave: true,
				autoload: true,
				stepsBeforeSave: 1,
				options: {
					local: {
						key: 'gjsProject' + $page.params.builder
					}
				}
			},
			plugins: [
				(editor) => gjsTailwind(editor),
				(editor) => gjsForms(editor),
				(editor) => gjsTabs(editor)
				// (editor) => gjsCKEditor(editor)
				// (editor) => gjsProject(editor)
			],
			blockManager: {
				appendTo: '#blocks',
				blocks: []
			},
			pageManager: true
		});

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
					command(editor) {
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
				}
			]
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

		// setInterval(() => handleSave(), 10000);
	});

	async function handleSave() {
		let html = editor?.getHtml();
		let css = editor?.getCss();
		const instance = axios.create({
			baseUrl: '/'
		});
	}

	async function appendAPI(e) {
		e?.preventDefault();
		const component = editor?.editor?.getSelected();
		// Get all attributes

		// Add attributes
		component?.addAttributes({
			['__data__api']: spaceId,
			['__data__table']: table,
			['__api__type']: isList
		});
		const attrs = component?.getAttributes();
		await instance.patch(`/api/editor/${$page.params.builder}`, { html, css });
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
		<form on:submit={appendAPI}>
			<div class="api-container text-left px-4">
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
				<Button type="submit" class="mt-3 w-full">Apply</Button>
			</div>
		</form>

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
	
</style>
