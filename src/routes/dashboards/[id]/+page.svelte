<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
	const spaceId = $page.params.id;
	import { Breadcrumb, BreadcrumbItem, Card, Alert } from 'flowbite-svelte';
</script>

<div class="my-3 text-xl px-6 text-gray-500">
	<b class="text-3xl text-gray-500 ml-2">{spaceId}</b>
</div>

<div class="my-3">
	<Breadcrumb>
		<BreadcrumbItem>Home</BreadcrumbItem>
		<BreadcrumbItem>Dashboards</BreadcrumbItem>
		<BreadcrumbItem>
			{data?.space?.name ?? 'Unknown space'}
		</BreadcrumbItem>
		<BreadcrumbItem>Overview</BreadcrumbItem>
	</Breadcrumb>
</div>

{#if !data?.space?.tables?.length}
	<div class="px-6">
		<Alert>
			<b>Configuration error</b>
			<p class="my-4">No collections have been added</p>
			<a class="hover:underline" href={`/base/${spaceId}/table/create`}>Add collections</a>
		</Alert>
	</div>
{/if}
<div class="grid lg:grid-cols-2 gap-4 px-6 ">
	{#each data?.space?.tables ?? [] as table}
		<Card size="lg">
			<b>{table.name}</b>
			<div class="my-3 text-3xl">{table.rows?.length} Items</div>
			<div class="flex justify-between">
				<a rel="external" href={`/dashboards/${spaceId}/${table.name}/overview`}>Overview</a>
				<a rel="external" href={`/dashboards/${spaceId}/${table.name}/create`}>Add</a>
				<a rel="external" href={`/dashboards/${spaceId}/${table.name}`}>Table</a>
			</div>
		</Card>
	{/each}
</div>
