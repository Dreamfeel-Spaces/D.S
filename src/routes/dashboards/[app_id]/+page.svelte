<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
	const spaceId = $page.params['app_id'];
	import { Breadcrumb, BreadcrumbItem, Card, Button } from 'flowbite-svelte';
	import Map from './Map.svelte';
	import Chart from './Chart.svelte';
	import WidgetDrawer from '../WidgetDrawer.svelte';
</script>

<section class="container">
	<Card size="xl">
		<div class="my-3 flex justify-end">
			<!-- <Breadcrumb>
				<BreadcrumbItem>Home</BreadcrumbItem>
				<BreadcrumbItem>Dashboards</BreadcrumbItem>
				<BreadcrumbItem>
					{data?.space?.name ?? 'Unknown space'}
				</BreadcrumbItem>
				<BreadcrumbItem>Overview</BreadcrumbItem>
			</Breadcrumb> -->
			<WidgetDrawer tables={data.space.tables} />
		</div>
		<div class=" overflow-auto px-2">
			<!-- <div class="mt-4">
				<Chart />
			</div>
		
			<div class="my-3">
				<Map />
			</div> -->

			<div class="grid lg:grid-cols-3  overflow-auto gap-4 ">
				{#each data?.space?.tables ?? [] as table, index}
					<div
						class={`${
							[
								'bg-red-500',
								'bg-green-500',
								'bg-indigo-500',
								'bg-blue-500',
								'bg-purple-500',
								'bg-gray-600',
								'bg-red-600',
								'bg-blue-600',
								'bg-green-900',
								'bg-green-600'
							][index]
						}  text-white text-right p-2 `}
					>
						<b>{table.name}</b>
						<div class="flex my-2 text-2xl text-left justify-between">
							<div class="my-1 "><span class="text-sm">count: </span> {table.rows?.length}</div>
							<div class="my-1 ">
								<span class="text-sm">new: </span>
								{table.rows?.length}
							</div>
						</div>

						<div class="flex justify-between">
							<a class="hover:underline" href={`/dashboards/${spaceId}/${table.name}/overview`}
								>Overview</a
							>
							<a class="hover:underline" href={`/dashboards/${spaceId}/${table.name}/create`}
								>Add {table.name}</a
							>
							<a class="hover:underline" href={`/dashboards/${spaceId}/${table.name}`}>View table</a
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Card>
</section>
