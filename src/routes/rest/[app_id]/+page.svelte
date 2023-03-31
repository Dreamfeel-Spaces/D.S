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

	import { goto } from '$app/navigation';
	import { apiHelperModal } from '$lib/wsstore';
</script>

<svelte:head>
	<title>
		{spaceName} - Collections
	</title>
</svelte:head>

<div>
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
				<Card padding="sm" size="xl">
					<b class="text-2xl">{table.name}</b>
					<div class="my-3 flex">{table.rows?.length} Items</div>

					<div class="flex">
						<a class="flex-1" href={`/rest/${space.appId}/${table.name}`}
							><Button gradient color="pinkToOrange" pill size="xs">Schema</Button></a
						>
						<div class="flex justify-end">
							<a href={`/rest/${space.appId}/${table.name}/endpoints`}
								><Button gradient pill size="xs">REST API</Button></a
							>
							<a class="ml-3" href={`/dashboards/${space.appId}/${table.name}/overview`}>
								<Button gradient pill size="xs">Dashboards</Button>
							</a>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
