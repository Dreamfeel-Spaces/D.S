<script lang="ts">
	import grapesjs, { ComponentManager, Editor } from 'grapesjs';
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
		Avatar,
		Hr,
		Card
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
	import logo from '$lib/assets/beta-logo.png';
	//@ts-ignore
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { get } from 'svelte/store';
	import axios from 'axios';
	import it from 'grapesjs/locale/it';
	import tr from 'grapesjs/locale/tr';
	import { forEach } from './plugins';
	import Upload from '$lib/plugins/util/Upload.svelte';

	let pageManager: any;

	let projectEndpoint = `${$page.url.origin}/editor/${$page.params.app_id}/${$page.params.builder}/svr`;

	let theme = 'light';

	let editor: Editor | null = null;

	let pages: any[] = [];

	async function init() {
		editor = grapesjs.init({
			container: '#editor-container',
			fromElement: false,
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
					}),
				(editor) => forEach(editor, { tables: $page.data?.tables ??[] })
			],
			panels: gPanels(editor),
			styleManager: gStyles(),
			canvasCss: appcSS,
			traitManager: {
				appendTo: '.traits-container'
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
			deviceManager: gDevices(),
			storageManager: {
				type: 'remote',
				stepsBeforeSave: 1,
				options: {
					remote: {
						urlLoad: projectEndpoint,
						urlStore: projectEndpoint,
						fetchOptions: (opts: any) => (opts.method === 'POST' ? { method: 'PATCH' } : {}),
						onStore: function (data) {
							return {
								id: pageManager?.getSelected()?.getId(),
								data: { ...data, js: editor?.getJs() }
							};
						},
						onLoad: ({ data }) => {
							return data;
						}
					}
				}
			},
			i18n: {
				messages: { it, tr }
			}
		});

		updateNewEditorPanelsConfig(editor);
		addGCommands(editor);

		editor?.Commands.add('go-home', {
			run: () => {
				goto(`/editor/${$page.data.space.appId}`);
			}
		});

		editor.onReady(() => {
			if ($page.data.customBlocks.length) {
				$page.data.customBlocks.forEach((item) => {
					editor?.BlockManager.add(item.id, {
						label: item.name,
						content: item.data,
						category: 'Custom'
					});
				});
			}
			if ($page.data.assets.length) {
				$page.data.assets.forEach((ass, i) => {
					editor?.BlockManager.add(`Asset ${ass.id}`, {
						label: `<img  src="${ass.url}" />`,
						content: `<img  src="${ass.url}" />`,
						category: 'Assets'
					});
				});
			}
		});

		pageManager = editor.Pages;
	}

	onMount(init);
	onDestroy(() => (editor ? editor?.destroy() : () => {}));

	useEffect(
		() => {
			let homePageId = ($page.data.pages[0] ?? {}).id;
			if (homePageId) {
				const page = pageManager?.get(homePageId);
				if (!page) {
					const newPage = pageManager?.add({
						id: homePageId.id,
						styles: `.my-class { color: red }`, // or a JSON of styles
						component: `<div class="my-class">Home</div>` // or a JSON of components
					});

					openPages = { ...openPages, [homePageId]: $page.data.pages[0] };
					pageManager.select(homePageId);
				} else pageManager.select(homePageId);
			}
		},
		() => [pageManager]
	);

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let hidden2 = true;
	let pageModalRadio = 'pages';

	let openPages = { [($page.data.pages[0] ?? {}).id]: $page.data.pages[0] ?? {} };

	let changingPage = false;
	let addingPage = false;
	let newPageData = {};
	let deleting = false;
	let deletingId = '';
	let componentName = '';
	let savingComponent = false;
	let explorerOpen = true;
	let blockyOpen = true;

	function handlePageChange(_page: any) {
		const page = pageManager.get(_page.id);
		if (!page) {
			const newPage = pageManager?.add({
				id: _page.id,
				styles: `.my-class { color: red }`, // or a JSON of styles
				component: `<div class="my-class">${_page.name}</div>` // or a JSON of components
			});

			openPages = { ...openPages, [_page.id]: _page };
			pageManager.select(_page.id);
			return;
		}
		openPages = { ...openPages, [_page.id]: _page };
		pageManager.select(_page.id);
	}

	async function handleAddPage() {
		addingPage = true;
		let url = `${$page.url.origin}/editor/${$page.params.app_id}/${$page.params.builder}/svr`;
		try {
			const response = await axios.post(url, { ...newPageData });
			{
				if (response) {
					addingPage = false;
					const newPage = pageManager?.add({
						id: response.data.id,
						styles: `.my-class { color: red }`, // or a JSON of styles
						component: `<div class="my-class">${response.data.name}</div>` // or a JSON of components
					});
					pages = pageManager.getAll();
					invalidateAll();
				}
			}
		} catch (error) {
			addingPage = false;
		}
	}

	async function handleDeletePage(id: string) {
		deleting = true;
		deletingId = id;
		let url = `${$page.url.origin}/editor/${$page.params.app_id}/${$page.params.builder}/svr`;
		const prompt = confirm('Are you sure you want to delete this page?');
		if (prompt) {
			try {
				const response = await axios.delete(url);
				{
					if (response) {
						deleting = false;
						pageManager.remove(id);
						deletingId = '';
						invalidateAll();
					}
				}
			} catch (error) {
				deleting = false;
				deletingId = '';
			}
		} else {
			deleting = false;
			deletingId = '';
		}
	}

	function handleClosePage(id: string) {
		let all = { ...openPages };
		delete all[id];
		openPages = { ...all };
	}

	async function handleSaveComponentName() {
		let url = `${$page.url.origin}/editor/${$page.params.app_id}/${$page.params.builder}/cmps`;
		try {
			savingComponent = true;
			const response = await axios.post(url, {
				name: componentName
			});
			if (response) {
				setTimeout(() => {
					savingComponent = false;
					invalidateAll();
				}, 1000);
			}
		} catch (error) {
			savingComponent = false;
		}
	}

	function openCustomBlocks(id) {}

	function onclickBlock(block) {
		// const page = editor.
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<Modal bind:open={changingPage} permanent class="w-full">
	<div class="flex justify-center">
		<Spinner />
	</div>
</Modal>

<Modal permanent open={editor === null} class="w-full">
	<div class="flex justify-center mb-3">
		<img loading="lazy" src={logo} width="69" alt="Dreamfeel Logo" />
	</div>
	<div class="flex justify-center">
		<Spinner color="red" />
	</div>
</Modal>

<section
	class="max-h-screen dark:bg-black dark:text-slate-200 min-h-screen overflow-hidden flex flex-col "
>
	<div id="panel-top" class="p-1 flex flex-col panel__top w-full">
		<div class="md:flex justify-between">
			<div id="basic-actions" class="  border-gray-100 rounded-xl  panel__basic-actions" />
			<div id="panel-devices" class="flex  px-auto justify-center items-center panel__devices " />
			<div class="flex justify-between">
				<div id="panel-switcher" class="panel__switcher" />

				<div class="flex items-center">
					<Avatar size="xs" class="mx-3 {editor ? 'block' : 'hidden'}" />
				</div>
			</div>
		</div>
		<div class="flex">
			<div class="w-9  bg-gray-200 mr-2 rounded dark:bg-black text-black dark:text-white ">
				{#if !explorerOpen}
					<!-- <button on:click={() => (explorerOpen = true)} class="innitial"> == </button> -->
				{:else}
					<!-- <button on:click={() => (explorerOpen = false)} class="panel-add-page innitial">
						X
					</button> -->
				{/if}
			</div>

			<div class="flex-1 gap-2 panel">
				{#if editor}
					<ul class="flex flex- w-sc max-w-screen-2xl py-1 overflow-auto -mb-px">
						{#each Object.keys(openPages).map((page) => openPages[page]) as page}
							<li class="mr-2">
								<button
									on:click={() => handlePageChange(page)}
									class="inline-block  {pageManager?.getSelected()?.getId() === page.id
										? 'bg-green-800 text-white dark:text-gray-100'
										: 'bg-gray-300'} whitespace-nowrap pt-1 px-2 text-xs font-extrabold border-b-2 dark:text-black border-transparent rounded-t-lg"
								>
									<!-- • -->
									{page.name}
									<button
										on:click|stopPropagation={() => handleClosePage(page.id)}
										style="font-size: 12px;"
										class="material-symbols-outlined  text-xs"
									>
										close
									</button></button
								>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<!-- <div class="w-9  bg-gray-200 mr-2 rounded dark:bg-black text-black dark:text-white ">
				{#if !blockyOpen}
					<button on:click={() => (blockyOpen = true)}>==</button>
				{:else}
					<button class={blockyOpen ? '' : 'hidden'} on:click={() => (blockyOpen = false)}>X</button
					>
				{/if}
			</div> -->
		</div>
	</div>
	<div class="flex-1 innitial editor-row h-full flex dark:bg-black bg-gray-100 ">
		<div
			id="panel-left"
			class=" border-t w-56 flex innitial  border-gray-400  dark:border-gray-800 dark:bg-black panel__left  w-{explorerOpen
				? 56
				: '12'} max-w-56 p-2 bg-gray-100 min-h-[100%] h-screen"
		>
			<div class="flex-1 left-switcher  flex h-full pb-2 innitial">
				<div
					class="innitial border dark:border-gray-800 rounded-xl border-gray-200 h-full panel-controls flex flex-col"
				/>
				{#if explorerOpen}
					<div class="h-full flex-1">
						<div class="pages-container innitial">
							<div
								class="text-left  flex justify-between text-xs mb-3  p-3 border-b border-gray-100  dark:border-gray-800 font-bold"
							>
								{#if editor}
									<p>Pages</p>
								{/if}
							</div>
							{#if editor}
								<!-- <Pages /> -->
								<ul
									class="innitial dark:text-gray-50 bg-white  overflow-auto  border-gray-200  dark:bg-black dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-600"
								>
									{#each $page.data.pages ?? [] as _page}
										<li
											class="cursor-pointer {_page.id === pageManager?.getSelected()?.getId()
												? 'bg-gray-700'
												: ' '} hover:bg-gray-600 text-xs flex"
										>
											<button
												on:click={() => handlePageChange(_page)}
												class="p-2 flex justify-between flex-1"
											>
												{_page.name}
											</button>
											{#if deleting && deletingId === _page.id}
												<Spinner />
											{:else}
												<button
													class="p-1 m-1 rounded hover:bg-gray-400"
													on:click|stopPropagation={() => handleDeletePage(_page.id)}
													><span class="material-symbols-outlined text-sm"> delete </span></button
												>
											{/if}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
						<div style="display: none;" class="traits-container">
							<div
								class="text-left  flex justify-between text-xs mb-3  p-3 border-b border-gray-100  font-bold"
							>
								<p>Attributes</p>
								<div class="   innitial" />
							</div>
						</div>
						<div style="display: none;" class="selector-container">
							<div
								class="text-left   flex justify-between text-xs mb-3  p-3 border-b border-gray-100  font-bold"
							>
								<p>Tailwind</p>
								<div class=" innitial" />
							</div>
							<div class="selector-container innitial" />
						</div>
						<div style="display: none;" class="styles-container" />
						<div style="display: none;" class="db-helper p-2">
							<div class="text-left">
								<div
									class="text-left  flex justify-between text-xs mb-3  p-3 border-b border-gray-100  font-bold"
								>
									<p>Collections</p>
								</div>
								<ul
									class="innitial dark:text-gray-50 bg-white  overflow-auto  border-gray-200  dark:bg-black dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
								>
									{#if editor}
										{#each $page.data.tables as _page}
											<li
												class="cursor-pointer {_page.id === pageManager?.getSelected()?.getId()
													? 'bg-gray-700'
													: ' '} hover:bg-gray-600 text-xs"
											>
												<button
													on:click={() => handlePageChange(_page)}
													class="p-2 flex justify-between"
												>
													{_page.name}
												</button>
											</li>
										{/each}
									{/if}
								</ul>
							</div>
						</div>
						<div style="display: none;" class="vcs-container">
							<div
								class="text-left  flex justify-between text-xs mb-3  p-3 border-b border-gray-100  font-bold"
							>
								<p>Versions</p>
								<div class=" innitial" />
							</div>
							<div class="grid gap-2 grid-cols-2">
								{#each $page.data.assets as asset}
									<Card>
										<img src={asset.url} alt="" />
									</Card>
								{/each}
							</div>
						</div>
						<div style="display: none;" class="pages-form innitial  ">
							<div
								class="text-left  flex justify-between text-xs mb-3  p-3 border-b border-gray-100  font-bold"
							>
								<p>Create Page</p>
								<div class=" innitial" />
							</div>
							<form method="post" class="spacing-y-6 p-1" on:submit|preventDefault={handleAddPage}>
								<Input
									bind:value={newPageData.name}
									size="sm"
									required
									name="name"
									placeholder="Name"
								/>
								<Input
									bind:value={newPageData.icon}
									size="sm"
									name="icon"
									class="my-3"
									placeholder="Icon"
								/>
								<Input
									bind:value={newPageData.path}
									size="sm"
									required
									name="path"
									class="my-3"
									placeholder="Path"
								/>
								<Toggle bind:value={newPageData.layout}>Layout</Toggle>
								<Button disabled={addingPage} size="xs" type="submit" class="w-full mt-3"
									>{#if addingPage}Saving...{:else} Save {/if}
								</Button>
							</form>
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
				{/if}
			</div>
		</div>
		<div id="editor-container" class="flex-1  dark:bg-black innitial p-2 bg-gray-100" />
		{#if true}
			<div
				id="panel-right"
				class="w-72 dark:border-gray-800 border-t {blockyOpen
					? ''
					: 'hidden'}  border-gray-400  dark:border-gray-800 dark:bg-black panel__right p-2 max-w-72 bg-gray-100 min-h-[100%] overflow-auto h-screen"
			>
				{#if editor}
					<div class="h-9 flex  {blockyOpen ? '' : 'hidden'} justify-between">
						<p>Components</p>
					</div>
				{/if}
				<div class="blocks-container {blockyOpen ? '' : 'hidden'} pb-32">
					<div id="blocks" />
				</div>
				<div style="display: none;" class="assets-container  dark:text-white overflow-auto">
					<Upload bind:editor />

					<div>
						<div class="grid gap-3 grid-cols-2">
							{#each $page.data.assets as asset}
								<Card>
									<img src={asset.url} alt="" />
								</Card>
							{/each}
						</div>
					</div>
				</div>
				<div style="display: none;" class="layers-container overflow-auto" />
				<div style="display: none;" class="  text-left  components-container overflow-auto">
					<form class="space-y-6" on:submit|preventDefault={handleSaveComponentName}>
						<Heading tag="h6">Add component</Heading>
						<div>
							<Input requried placeholder="Component name" bind:value={componentName} name="name" />
						</div>
						<Button disabled={savingComponent} type="submit" class="w-full" color="dark" size="xs"
							>{savingComponent ? 'Saving...' : 'Save'}</Button
						>
					</form>

					<div class="border-t border-gray-400  dark:border-gray-800  my-5 " />
					Your custom Components
					<div class="my-5 grid grid-cols-2 gap-2">
						{#each $page.data.customBlocks as block}
							<button on:click={() => onclickBlock(block)} class="p-2 rounded-xl dark:bg-gray-900">
								<div class="text-xs">
									{block.name}
								</div>
								{@html block.data}
							</button>
						{/each}
					</div>
				</div>
				<div style="display: none;" class="  text-left  share-container overflow-auto">
					<div class="dark-white">Share</div>
					<Input />
				</div>
			</div>
		{/if}
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
						class="cursor-pointer {page.id === ' selectedPage.id'
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
								// selectedPage = page;
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
