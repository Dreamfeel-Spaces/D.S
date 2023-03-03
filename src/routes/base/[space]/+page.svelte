<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	const spaceName = $page.params.space;
	import { Table, TableBody, Card, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	export let data: PageData;

	let { tables = [] } = data;
	let hasTables = Boolean(tables.length);

	let spaceId = $page.params.space;

	import { goto } from '$app/navigation';

	function navigateToTableDetail(table: string) {
		goto(`/base/${spaceId}/${table}`);
	}
</script>

<svelte:head>
	<title>
		{spaceName} - Collections
	</title>
</svelte:head>

<div class="my-3 mx-6  flex justify-between text-3xl text-gray-500">
	<p>
		{spaceName}
	</p>
	<a class="text-lg" href={`/base/${spaceId}/table/create`}>Add collections</a>
</div>

<div class="flex justify-between mt-4 pr-4 flex-wrap">
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
</div>

{#if !hasTables}
	<div class="mt-20 text-center ">
		<p class="mb-20">No collections have been added</p>
		<a href={`/base/${spaceId}/table/create`}>Create collections</a>
	</div>
{/if}

{#if hasTables}
	<div class="mt-3 px-3">
		{#each data.tables as table}
			<Card size="xl">
				<b class="text-3xl" >{table.name}</b>
				<div class="my-3 text-2xl">{table.rows?.length} Items</div>
				<div class="flex justify-between">
					<a rel="external" href={`/dashboards/${spaceId}/${table.name}/overview`}>Overview</a>
					<a rel="external" href={`/dashboards/${spaceId}/${table.name}/create`}>Add</a>
					<a rel="external" href={`/dashboards/${spaceId}/${table.name}`}>Table</a>
				</div>
			</Card>
		{/each}
	</div>
{/if}
