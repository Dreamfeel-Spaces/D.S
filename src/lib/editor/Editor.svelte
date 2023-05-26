<script lang="ts">
	import grapesjs from 'grapesjs';
	import { page } from '$app/stores';
	import 'grapesjs/dist/css/grapes.min.css';
	import appcSS from '../../app.css?inline';
	import { Button, DarkMode, Drawer, Heading, Input, P, Radio, Toggle } from 'flowbite-svelte';
	import gBasic from 'grapesjs-blocks-basic';
	import { onDestroy, onMount } from 'svelte';
	import { gStyles } from '$lib/plugins/util/styles';
	import gjsTailwind from '$lib/plugins/grapes/tailwind';
	import { addGCommands } from '$lib/plugins/util/commands';
	import { gSpaceApIList } from '$lib/plugins/grapes/space-ui/spaceApiList';
	import { spaceTailwind } from '$lib/plugins/grapes/space-ui/SpaceTailwind';
	import { gPanels, updateNewEditorPanelsConfig } from '$lib/plugins/util/panels';
	import { spacePages } from '$lib/plugins/grapes/space-ui/templates/pages/spacePagesPlugin';
	import { useEffect } from '$lib/wsstore/hooks';
	import { sineIn } from 'svelte/easing';

	let theme = 'light';

	let editor: grapesjs.Editor;

	function init() {
		editor = grapesjs.init({
			container: '#editor-container',
			fromElement: true,
			plugins: [
				spacePages,
				gBasic,
				spaceTailwind,
				(editor) =>
					gSpaceApIList(editor, {
						tables: $page.data.tables,
						pages: $page.data.pages,
						pageId: $page.params.path,
						space: $page.data.space,
						headless: false
					}),
				(editor) =>
					gjsTailwind(editor, {
						theme,
						updateTheme() {
							if (theme === 'light') theme = 'dark';
							else if (theme === 'dark') theme = 'light';
							return theme;
						}
					})
			],
			panels: gPanels(editor),
			styleManager: gStyles(),
			canvasCss: appcSS,
			selectorManager: {
				appendTo: '.styles-container'
			},
			layerManager: {
				appendTo: '.layers-container'
			},
			traitManager: {
				appendTo: '.traits-container'
			},
			blockManager: {
				appendTo: '#blocks',
				blocks: []
			}
		});

		updateNewEditorPanelsConfig(editor);
		addGCommands(editor);

		editor.Commands.add('open-pages', {
			run: () => {
				hidden2 = false;
			}
		});
	}

	let selectedPage = $page.data.pages[0] ?? {};

	onMount(init);
	onDestroy(() => (editor ? editor.destroy() : () => {}));

	useEffect(
		() => {
			const ui = JSON.parse(selectedPage?.html ?? "{uiDef:'{assets:''}'}").uiDef;
			editor.loadProjectData(ui);
		},
		() => [selectedPage.id]
	);

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let hidden2 = true;
	let pageModalRadio = 'pages';
</script>

<section
	class="max-h-screen dark:bg-black dark:text-slate-200 min-h-screen overflow-hidden flex flex-col "
>
	<div id="panel-top" class="p-1 flex flex-col panel__top w-full">
		<div class="flex justify-between">
			<div id="basic-actions" class="  border-gray-100 rounded-xl  panel__basic-actions" />
			<div id="panel-devices" class="flex  px-auto justify-center items-center panel__devices " />
			<div class="flex justify-between">
				<div id="panel-switcher" class="panel__switcher" />
				<DarkMode on:click={() => editor.runCommand('toggle-theme')} />
			</div>
		</div>
		<div class=" gap-2 panel-pages">
			<ul class="flex flex-wrap w-full overflow-auto -mb-px">
				{#each $page.data.pages as page}
					<li class="mr-2">
						<button
							on:click={() => {
								selectedPage = page;
							}}
							class="inline-block  {selectedPage.id === page.id
								? 'bg-green-800 text-white'
								: 'bg-gray-300'}  px-2 text-xs border-b-2 dark:text-black border-transparent rounded-t-lg"
							>{page.name}</button
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="flex-1 editor-row h-full flex dark:bg-black bg-gray-100 ">
		<div
			id="panel-left"
			class=" border-t  border-gray-400 dark:bg-black panel__left w-64 max-w-64 p-2 bg-gray-100 min-h-[100%] h-screen"
		>
			<div class="traits-container" />
		</div>
		<div id="editor-container" class="flex-1 p-2 bg-gray-100 min-h-[100%] h-screen">
			<p class="text-center text-3xl">Hello world!</p>
		</div>
		<div
			id="panel-right"
			class="w-72 border-t  border-gray-400 dark:bg-black panel__right p-2 max-w-72 bg-gray-100 min-h-[100%] overflow-auto h-screen"
		>
			<div class="layers-container overflow-auto" />
			<div class="styles-container" />
			<div class="blocks-container">
				<div id="blocks" />
			</div>
		</div>
	</div>
</section>

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
				{#each $page.data.ui.pages as page}
					<li
						class="cursor-pointer {page.id === selectedPage.id
							? 'bg-gray-700'
							: ' '} hover:dark:bg-gray-600"
					>
						{#if page.layout}
							<div class="flex justify-end">
								<small class="text-xs  m-1 rounded-xl p-1 bg-red-500">Layout</small>
							</div>
						{/if}
						<button
							on:click={() => {
								selectedPage = page;
								hidden2 = true;
							}}
							class="p-2 flex"
						>
							<P class="flex-1 font-bold">{page.name} <br /></P>
							<P>{page.path}</P>
						</button>
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

<style>
	#editor-container {
		border: 0px solid #444;
	}
	#panel-right {
		position: initial;
	}
	#panel-left {
		position: initial;
	}
	#panel-top {
		position: initial;
		justify-content: center;
	}

	#panel-devices,
	#panel-switcher,
	#basic-actions {
		position: initial;
	}
</style>
