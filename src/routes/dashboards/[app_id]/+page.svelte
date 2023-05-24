<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
	const spaceId = $page.params['app_id'];
	import { Breadcrumb, BreadcrumbItem, Card, Button, Heading, Hr } from 'flowbite-svelte';
	import Map from './Map.svelte';
	import WidgetDrawer from '../WidgetDrawer.svelte';
	import { onMount } from 'svelte';
	import { recentlyViewed } from '$lib/wsstore';
	import Chart from '$lib/components/Chart.svelte';
	import Userchart from '../../a/[app_id]/Userchart.svelte';
	import RequestsChart from '../../rest/[app_id]/RequestsChart.svelte';
	onMount(() => {
		recentlyViewed.set({ [$page.url.pathname]: $page, ...$recentlyViewed });
	});

	function getDarkColor() {
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += Math.floor(Math.random() * 10);
		}
		return color;
	}
</script>

<section class="container p-6 dark:bg-gray-800">
	<div>
		<div class="my-1 flex">
			<Heading class="flex-1" tag="h4">Dashboards</Heading>
			<WidgetDrawer tables={data.space.tables} />
		</div>
		<Hr class="my-3" />
		<div class=" overflow-auto px-2">
			<div>
				<div class="grid  gap-6 lg:grid-cols-2 ">
					<div class="relative space-y-4 overflow-x-auto mb-9">
						<Heading tag="h6">Forms</Heading>
						<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead
								class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
							>
								<tr>
									<th scope="col" class="px-6 py-3"> Name </th>
									<th scope="col" class="px-6 py-3" />
								</tr>
							</thead>
							<tbody>
								{#each $page.data.forms as form}
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{form.name}
										</th>
										<td class="px-6 py-4 text-right">
											<a
												href="/dashboards/{$page.params.app_id}/{form.table
													.name}/overview/f/{form.id}">View</a
											></td
										>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<div class="relative space-y-4 overflow-x-auto mb-9">
						<Heading tag="h6">Reports</Heading>
						<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead
								class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
							>
								<tr>
									<th scope="col" class="px-6 py-3"> Name </th>
									<th scope="col" class="px-6 py-3" />
								</tr>
							</thead>
							<tbody>
								{#each $page.data.reports as report}
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{report.name}
										</th>
										<td class="px-6 py-4 text-right">
											<a
												href="/dashboards/{$page.params.app_id}/{report.table
													.name}/overview/r/{report.id}">View</a
											>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

				<div class="grid lg:grid-cols-3  overflow-auto gap-4 ">
					{#each data?.space?.tables ?? [] as table, index}
						<div
							class="text-white rounded p-3 rounded-xl"
							style="background-color: {getDarkColor()};"
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
								<a class="hover:underline" href={`/dashboards/${spaceId}/${table.name}`}
									>View table</a
								>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<Userchart />
	<!-- <RequestsChart /> -->
</section>
