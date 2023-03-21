<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	const spaceName = $page.params.space;
	import { Button, Card, Breadcrumb, BreadcrumbItem, Toast } from 'flowbite-svelte';

	export let data: PageData;

	let { tables = [] } = data;
	let hasTables = Boolean(tables.length);

	let spaceId = $page.params.space;

	import { goto } from '$app/navigation';
	import { apiHelperModal } from '$lib/wsstore';
</script>

<svelte:head>
	<title>
		{spaceName} - Collections
	</title>
</svelte:head>

<div class="dark:bg-gray-900 min-h-112">
	<div class="flex justify-between  pt-4 pr-4 flex-wrap">
		<div class="flex-1 px-6">
			<Breadcrumb>
				<BreadcrumbItem>Home</BreadcrumbItem>
				<BreadcrumbItem>Base</BreadcrumbItem>
				<BreadcrumbItem>
					{spaceName}
				</BreadcrumbItem>
				<BreadcrumbItem>Collections</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<Button
			on:click={() => apiHelperModal.set({ open: true })}
			class="mr-3"
			pill
			color="pinkToOrange"
			gradient
			size="xs">Generate collections</Button
		>
		<a class="text-lg" href={`/base/${spaceId}/table/create`}>
			<Button pill color="pinkToOrange" gradient size="xs">Add collections</Button>
		</a>
	</div>

	{#if !hasTables}
		<div class="mt-20 text-center ">
			<p class="mb-20 text-3xl dark:text-white">No collections have been added</p>
			<a class="dark:text-white" href={`/base/${spaceId}/table/create`}>Add collections</a>
		</div>
	{/if}

	{#if hasTables}
		<div class="mt-3 px-3 grid  gap-3 max-h-99 overflow-auto">
			{#each data.tables as table}
				<Card padding="sm" size="xl">
					<b class="text-xl">{table.name}</b>
					<div class="my-3 flex">{table.rows?.length} Items</div>

					<div class="flex">
						<a rel="external" class="flex-1" href={`/base/${spaceId}/${table.name}`}
							><Button gradient color="pinkToOrange" pill size="xs">Schema</Button></a
						>
						<div class="flex justify-end">
							<a rel="external" href={`/base/${spaceId}/${table.name}/api`}
								><Button gradient pill size="xs">REST API</Button></a
							>
							<a rel="external" class="ml-3" href={`/dashboards/${spaceId}/${table.name}/overview`}>
								<Button gradient pill size="xs">Dashboards</Button>
							</a>
							<a rel="external" class="ml-3" href={`/base/${spaceId}/${table.name}/permissions`}>
								<Button gradient pill size="xs">Permissions</Button>
							</a>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
