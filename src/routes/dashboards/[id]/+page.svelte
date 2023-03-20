<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
	const spaceId = $page.params.id;
	import { Breadcrumb, BreadcrumbItem, Card, Button } from 'flowbite-svelte';
	import Map from './Map.svelte';
	import Chart from './Chart.svelte';
	import WidgetDrawer from '../WidgetDrawer.svelte';
</script>

<div class="my-3 flex justify-between">
	<Breadcrumb>
		<BreadcrumbItem>Home</BreadcrumbItem>
		<BreadcrumbItem>Dashboards</BreadcrumbItem>
		<BreadcrumbItem>
			{data?.space?.name ?? 'Unknown space'}
		</BreadcrumbItem>
		<BreadcrumbItem>Overview</BreadcrumbItem>
	</Breadcrumb>
	<WidgetDrawer/>
</div>

<div class="max-h-99 overflow-auto px-6">
	<div class="mt-4">
		<Chart />
	</div>

	<div class="my-3">
		<Map />
	</div>

	<div class="grid lg:grid-cols-2  overflow-auto gap-4 ">
		{#each data?.space?.tables ?? [] as table}
			<Card size="lg">
				<b>{table.name}</b>
				<div class="my-3 text-3xl"><span class="text-sm">Count: </span> {table.rows?.length}</div>
				<div class="flex justify-between">
					<a
						rel="external"
						class="hover:underline"
						href={`/dashboards/${spaceId}/${table.name}/overview`}>Overview</a
					>
					<a
						rel="external"
						class="hover:underline"
						href={`/dashboards/${spaceId}/${table.name}/create`}>Add {table.name}</a
					>
					<a rel="external" class="hover:underline" href={`/dashboards/${spaceId}/${table.name}`}
						>View table</a
					>
				</div>
			</Card>
		{/each}
	</div>
</div>
