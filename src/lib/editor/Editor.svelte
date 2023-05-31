<script lang="ts">
	import grapesjs from 'grapesjs';
	import { page } from '$app/stores';
	import 'grapesjs/dist/css/grapes.min.css';
	import appcSS from '../../app.css?inline';
	import {
		Button,
		DarkMode,
		Drawer,
		Heading,
		Input,
		P,
		Radio,
		Toggle,
		Modal,
		Spinner,
		Avatar
	} from 'flowbite-svelte';
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
	import { gDevices } from '$lib/plugins/util/devices';
	//@ts-ignore
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';

	let selectedPage = $page.data.pages[0] ?? {};

	let projectEndpoint = `${$page.url.origin}/editor/${$page.params.app_id}/${$page.params.builder}/${selectedPage.id}/svr`;

	let theme = 'light';

	let editor: grapesjs.Editor;

	let mountingEditor = true;

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
			traitManager: {
				appendTo: '#panel-left'
			},
			selectorManager: {
				appendTo: '.selector-container'
			},
			layerManager: {
				appendTo: '.layers-container'
			},

			blockManager: {
				appendTo: '#blocks',
				blocks: []
			},
			deviceManager: gDevices()
			// storageManager: {
			// 	type: 'remote',
			// 	stepsBeforeSave: 1,
			// 	options: {
			// 		remote: {
			// 			// urlLoad: projectEndpoint,
			// 			urlStore: projectEndpoint,
			// 			// The `remote` storage uses the POST method when stores data but
			// 			// the json-server API requires PATCH.
			// 			fetchOptions: (opts: any) => (opts.method === 'POST' ? { method: 'PATCH' } : {}),
			// 			// As the API stores projects in this format `{id: 1, data: projectData }`,
			// 			// we have to properly update the body before the store and extract the
			// 			// project data from the response result.
			// 			onStore: (data) => ({ id: selectedPage.id, data }),
			// 			// onLoad: (result) => {
			// 			// 	console.log(result.data);
			// 			// 	return result.data;
			// 			// }
			// 		}
			// 	}
			// }
		});

		updateNewEditorPanelsConfig(editor);
		addGCommands(editor);

		editor.onReady(() => {
			mountingEditor = false;
		});

		// editor.on('component:add', (component) => {
		// 	editor.runCommand('do-traits', { component });
		// });

		// editor.on('component:selected', (component) => {
		// 	console.log('Selected');
		// 	editor.runCommand('do-traits', { component });
		// });
	}

	let pages = {};

	onMount(init);
	onDestroy(() => (editor ? editor.destroy() : () => {}));

	useEffect(
		() => {
			console.log(projectEndpoint);
		},
		() => [projectEndpoint]
	);

	useEffect(
		() => {
			if (selectedPage?.html) {
				try {
					const data = JSON.parse(
						selectedPage?.html ?? '{"data":{"assets":[], "styles":[], "pages":[]}}'
					)?.data;
					// editor.loadProjectData(data);
				} catch (e) {
					console.log(e);
				}
			}
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

	let openPages = { [($page.data.pages[0] ?? {}).id]: $page.data.pages[0] ?? {} };
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<Modal permanent class="w-full">
	<div class="flex justify-center">
		<Spinner />
	</div>
	<div class="text-center dark:text-white text-lg">Loading editor...</div>
</Modal>

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
				<div class="flex items-center">
					<Avatar size="xs" class="mx-3" />
				</div>
			</div>
		</div>
		<div class=" gap-2 panel">
			{#if !mountingEditor}
				<ul class="flex flex- w-sc max-w-screen-2xl py-1 overflow-auto -mb-px">
					{#each Object.keys(openPages).map((page) => openPages[page]) as page}
						<li class="mr-2">
							<button
								on:click={() => {
									selectedPage = page;
								}}
								class="inline-block  {selectedPage.id === page.id
									? 'bg-green-800 text-white'
									: 'bg-gray-300'} whitespace-nowrap pt-1 px-2 text-xs border-b-2 dark:text-black border-transparent rounded-t-lg"
							>
								<!-- • -->
								{page.name}
								<span style="font-size: 12px;" class="material-symbols-outlined  text-xs">
									close
								</span></button
							>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<div class="flex-1 innitial editor-row h-full flex dark:bg-black bg-gray-100 ">
		<div
			id="panel-left"
			class=" border-t flex innitial  border-gray-400 dark:bg-black panel__left  w-72 max-w-72 p-2 bg-gray-100 min-h-[100%] h-screen"
		>
			<div class="flex-1 left-switcher  flex h-full pb-2 innitial">
				<div class="innitial border border-gray-200 h-full panel-controls flex flex-col" />
				<div class="h-full flex-1">
					<div class="pages-container innitial">
						<div
							class="text-left  flex justify-between text-xs mb-3  p-3 border-b border-gray-100  font-bold"
						>
							<p>Pages</p>
							<div class="panel-add-page innitial" />
						</div>
						{#if !mountingEditor}
							<ul
								class="innitial dark:text-gray-50 bg-white  overflow-auto  border-gray-200  dark:bg-black dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
							>
								{#each $page.data.ui.pages as page}
									<li
										class="cursor-pointer {page.id === selectedPage.id
											? 'bg-gray-700'
											: ' '} hover:bg-gray-600 text-xs"
									>
										<button
											on:click={() => {
												openPages = { ...openPages, [page.id]: page };
												selectedPage = page;
												hidden2 = true;
											}}
											class="p-2 flex justify-between"
										>
											{page.name}
										</button>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
					<div style="display: none;" class="traits-and-selectors-container">
						<div
							class="text-left  flex justify-between text-xs mb-3  p-3 border-b border-gray-100  font-bold"
						>
							<p>Selectors</p>
							<div class=" innitial" />
						</div>
						<div class="traits-container   innitial" />
						<div class="selector-container innitial" />
					</div>
					<div style="display: none;" class="pages-form innitial  ">
						<div
							class="text-left  flex justify-between text-xs mb-3  p-3 border-b border-gray-100  font-bold"
						>
							<p>Create Page</p>
							<div class=" innitial" />
						</div>
						{#if mountingEditor}
							<form use:enhance method="post" class="spacing-y-6 p-1" action="?/createPage">
								<Input size="sm" required name="name" placeholder="Name" />
								<Input size="sm" name="icon" class="my-3" placeholder="Icon" />
								<Input size="sm" required name="path" class="my-3" placeholder="Path" />
								<Toggle>Layout</Toggle>
								<Button size="xs" type="submit" class="w-full mt-3">Save</Button>
							</form>
						{/if}
					</div>
					<div style="display: none;" class="commerce-assist innitial ">
						<div
							class="text-left  flex justify-between text-xs mb-3  p-3 border-b border-gray-100  font-bold"
						>
							<p>Ecommerce</p>
							<div class=" innitial" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="editor-container" class="flex-1 innitial p-2 bg-gray-100">
			{#if mountingEditor}
				<p class="text-center text-3xl">Hello world!</p>
			{/if}
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

<Drawer class="dark:bg-black" transitionType="fly" {transitionParams} bind:hidden={hidden2}>
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
				class="w-full dark:text-gray-50 bg-white border   dark:bg-black divide-y dark:divide-gray-600"
			>
				{#each $page.data.ui.pages as page}
					<li
						class="cursor-pointer {page.id === selectedPage.id
							? 'bg-gray-700'
							: ' '} hover:dark:bg-gray-600 text-xs"
					>
						{#if page.layout}
							<div class="flex justify-end">
								<small class="text-xs  m-1 rounded-xl p-1 bg-red-500">Layout</small>
							</div>
						{/if}
						<button
							on:click={() => {
								openPages = { ...openPages, [page.id]: page };
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
	{:else}{/if}
</Drawer>

<style>
	.innitial {
		position: initial;
	}
	#editor-container {
		border: 0px solid #444;
		position: innitial;
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
	#basic-actions,
	.selector-container {
		position: initial;
	}

	::-webkit-scrollbar {
		width: 3px;
		height: 4px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
