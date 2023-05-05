<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	const spaceName = $page.params['app_id'];
	import { Button, Card, Breadcrumb, BreadcrumbItem, Toast } from 'flowbite-svelte';
	//@ts-ignore
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

	export let data: PageData;

	let { tables = [] } = data;
	let hasTables = Boolean(tables.length);

	let spaceId = $page.params['app_id'];

	let space = $page.data.space;

	import { apiHelperModal, recentlyViewed } from '$lib/wsstore';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import RequestsChart from './RequestsChart.svelte';

	onMount(() => {
		recentlyViewed.set({ [$page.url.pathname]: $page, ...$recentlyViewed });
	});
</script>

<svelte:head>
	<title>
		{space?.name} - Collections
	</title>
</svelte:head>

<div class="container">
	<Card class="dark:text-white min-h-100" size="xl">
		<div class="flex justify-between mb-2">
			<div />
			<div>
				<div class="flex justify-end py-1  pr-4 flex-wrap">
					<Button
						on:click={() => apiHelperModal.set({ open: true })}
						class="mr-3"
						pill
						color="pinkToOrange"
						gradient
						size="xs">Generate collections</Button
					>
					<a class="text-lg" href={`/rest/${spaceId}/table/create`}>
						<Button pill color="pinkToOrange" gradient size="xs">Add collections</Button>
					</a>
				</div>
			</div>
		</div>
		<RequestsChart />
		<div class="flex text-xl mb-4 mt-9 items-center">Collections</div>
		{#if !hasTables}
			<div class="mt-1 text-center pb-20 ">
				<div class="flex justify-center">
					{#if browser}
						<LottiePlayer
							src="https://assets7.lottiefiles.com/private_files/lf30_gctc76jz.json"
							autoplay={true}
							loop={true}
							renderer="svg"
							background="transparent"
							height={300}
							width={300}
						/>
					{/if}
				</div>

				<p class="mb-5 text-3xl dark:text-white">No collections have been added</p>
				<a class="dark:text-white -20" href={`/rest/${spaceId}/table/create`}>Add collections</a>
			</div>
		{/if}

		{#if hasTables}
			<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
					>
						<tr>
							<th scope="col" class="px-6 py-3"> collection </th>
							<th scope="col" class="px-6 py-3">
								<div class="flex items-center">Count</div>
							</th>
							<th scope="col" class="px-6 py-3">
								<div class="flex items-center">API</div>
							</th>
							<th scope="col" class="px-6 py-3">
								<div class="flex items-center">Permissions</div>
							</th>
							<th scope="col" class="px-6 py-3">
								<div class="flex items-center">Dashboards</div>
							</th>
							<th scope="col" class="px-6 py-3">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{#each data.tables as table}
							<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<th
									scope="row"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{table.name}
								</th>
								<td class="px-9 py-4 flex items-center"> {table.rows?.length ?? 0} </td>
								<td class="px-5 py-4">
									<a href={`/rest/${$page.data.space?.appId}/${table?.name}/endpoints`}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="20"
											fill="currentColor"
											viewBox="0 96 960  960"
											width="20"
											><path
												d="M120 936V636h60v198l558-558H540v-60h300v300h-60V318L222 876h198v60H120Z"
											/></svg
										>
									</a>
								</td>
								<td class="px-12 py-4">
									<a href={`/rest/${$page.data.space?.appId}/${table?.name}/permissions`}>
										<svg
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
											height="20"
											viewBox="0 96 960 960"
											width="20"
											><path
												d="M141 836v-7 7-460 460Zm0 60q-24 0-42-18t-18-42V316q0-24 18-42t42-18h280l60 60h340q24 0 42 18t18 42v195q-14-11-28.5-19.5T821 536V376H141v460h327q4 16 9.143 30.915Q482.286 881.831 490 896H141Zm420 0v-19q0-42 42.5-65T721 789q75 0 117.5 23t42.5 65v19H561Zm160.08-174q-30.08 0-51.58-21.42-21.5-21.421-21.5-51.5 0-30.08 21.42-51.58 21.421-21.5 51.5-21.5 30.08 0 51.58 21.42 21.5 21.421 21.5 51.5 0 30.08-21.42 51.58-21.421 21.5-51.5 21.5Z"
											/></svg
										>
									</a>
								</td>
								<td class="px-14 py-4">
									<a href={`/dashboards/${$page.data.space?.appId}/${table?.name}/overview`}>
										<svg
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
											height="20"
											viewBox="0 96 960 960"
											width="20"
											><path
												d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h279v60H180v600h600V597h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60V319L382 717Z"
											/></svg
										>
									</a>
								</td>
								<td class="px-6 py-4 text-right">
									<a
										href={`/rest/${$page.data.space?.appId}/${table?.name}`}
										class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
		<!-- {#if hasTables}
			<div class=" px-3 grid lg:grid-cols-3 gap-3 overflow-auto">
				{#each data.tables as table}
					<div style="background-color:{getColorCode(table.colorCode)}" class="p-2 rounded ">
						<b class="uppercase">{table.name}</b>
						<div class="my-1 text-3xl  flex">{table.rows?.length ?? 0} Items</div>
						<div class="flex">
							<a class="flex-1" href={`/rest/${space.appId}/${table.name}`}>Schema</a>
							<div class="flex justify-end">
								<a href={`/rest/${space.appId}/${table.name}/endpoints`}>REST API</a>
								<a class="ml-3" href={`/dashboards/${space.appId}/${table.name}/overview`}>
									Dashboards
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if} -->
	</Card>
</div>
