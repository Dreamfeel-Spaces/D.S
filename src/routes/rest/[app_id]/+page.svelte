<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	const spaceName = $page.params['app_id'];
	import { Button, Card, Breadcrumb, BreadcrumbItem, Toast } from 'flowbite-svelte';

	export let data: PageData;

	let { tables = [] } = data;
	let hasTables = Boolean(tables.length);

	let spaceId = $page.params['app_id'];

	let space = $page.data.space;

	import { apiHelperModal } from '$lib/wsstore';
	import { getColorCode } from '$lib/util/slugit';
</script>

<svelte:head>
	<title>
		{spaceName} - Collections
	</title>
</svelte:head>

<div class="container">
	<Card class="dark:text-white" size="xl">
		<div class="flex justify-end py-3  pr-4 flex-wrap">
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

		{#if !hasTables}
			<div class="mt-20 text-center ">
				<p class="mb-20 text-3xl dark:text-white">No collections have been added</p>
				<a class="dark:text-white" href={`/rest/${spaceId}/table/create`}>Add collections</a>
			</div>
		{/if}

		{#if hasTables}
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
		{/if}
	</Card>
</div>
