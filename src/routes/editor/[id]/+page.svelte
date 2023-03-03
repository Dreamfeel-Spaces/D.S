<script lang="ts">
	import { page } from '$app/stores';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Card,
		Accordion,
		AccordionItem,
		List,
		Listgroup,
		ListgroupItem
	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const uis = data.space?.spaceUis ?? [];
</script>

<div class="my-3 text-xl px-6 text-gray-500">
	<span class="mr-2">
		{$page.params.id}
	</span>
</div>

<div class="flex px-6 my-9">
	<div class="flex-1">
		<Breadcrumb>
			<BreadcrumbItem>Home</BreadcrumbItem>
			<BreadcrumbItem>Editor</BreadcrumbItem>
			<BreadcrumbItem>Item</BreadcrumbItem>
		</Breadcrumb>
	</div>
	<a
		class="btn bg-blue-800 text-lg text-white rounded-3xl px-3 p-1"
		href={`/editor/${$page.params.id}/create`}>Create UI</a
	>
</div>

<div class="my-20 text-center">
	{#if !uis.length}
		<div>No UIS have been added</div>
		<div class="mt-9 ">
			<a class="hover:underline" href={`/editor/${$page.params.id}/create`}>Add UI</a>
		</div>
	{/if}
</div>

<div class="px-6 grid lg:grid-cols-3 gap-2">
	{#each uis as ui}
		<Card>
			<b class="text-lg">{ui?.name}</b>
			<p class="my-3">{ui?.spaceUIVersion?.length ?? 0} Versions</p>
			<div class="mt-3 flex justify-between">
				<a href={`/editor/artik-party/versions/${ui.id}/create`}>New version</a>
				<a class="mx-4" href="/">Set default</a>
				<a href="/">Edit</a>
			</div>
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="header">Versions</svelte:fragment>
					<List>
						<Listgroup>
							{#each ui.spaceUIVersion as version}
								<ListgroupItem href={`/editor/${$page.params.id}/${version.id}`}>
									<a rel="external" href={`/editor/${$page.params.id}/${version.id}`}
										>Version {version.version}</a
									>
								</ListgroupItem>
							{/each}
						</Listgroup>
					</List>
				</AccordionItem>
			</Accordion>
		</Card>
	{/each}
</div>
