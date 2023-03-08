<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	const spaceName = $page.params.space;
	import {
		Checkbox,
		Button,
		Card,
		Breadcrumb,
		BreadcrumbItem,
		Accordion,
		AccordionItem
	} from 'flowbite-svelte';

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
	<a class="text-lg" href={`/base/${spaceId}/table/create`}>
		<Button pill color="pinkToOrange" gradient size="xs">Add collections</Button>
	</a>
</div>

{#if !hasTables}
	<div class="mt-20 text-center ">
		<p class="mb-20">No collections have been added</p>
		<a href={`/base/${spaceId}/table/create`}>Create collections</a>
	</div>
{/if}

{#if hasTables}
	<div class="mt-3 px-3 grid grid-cols-2 gap-3 max-h-99 overflow-auto">
		{#each data.tables as table}
			<Card size="xl">
				<b class="text-3xl">{table.name}</b>
				<div class="my-3 flex text-2xl">{table.rows?.length} Items</div>

				<Accordion>
					<AccordionItem>
						<svelte:fragment slot="header">Rules</svelte:fragment>
						<div>
							<div>
								<p>Create</p>
								{#each JSON.parse(table?.requiredPermissions ?? '[]') as permission}
									<div>
										<Checkbox checked={permission.checked}>{permission.name}</Checkbox>
									</div>
								{/each}
							</div>
							<div>
								<p>Read</p>
								{#each JSON.parse(table?.requiredPermissions ?? '[]') as permission}
									<div>
										<Checkbox checked={permission.checked}>{permission.name}</Checkbox>
									</div>
								{/each}
							</div>
							<div>
								<p>Update</p>
								{#each JSON.parse(table?.requiredPermissions ?? '[]') as permission}
									<div>
										<Checkbox checked={permission.checked}>{permission.name}</Checkbox>
									</div>
								{/each}
							</div>
							<div>
								<p>Delete</p>
								{#each JSON.parse(table?.requiredPermissions ?? '[]') as permission}
									<div>
										<Checkbox checked={permission.checked}>{permission.name}</Checkbox>
									</div>
								{/each}
							</div>
						</div>
					</AccordionItem>
				</Accordion>
				<div class="flex mt-6">
					<a rel="external" class="flex-1" href={`/base/${spaceId}/${table.name}`}
						><Button gradient color="pinkToOrange" pill size="xs">Schema</Button></a
					>
					<div class="flex justify-end">
						<a rel="external"  href={`/base/${spaceId}/${table.name}/api`}
							><Button gradient pill size="xs">REST API</Button></a
						>
						<a rel="external" class="ml-3" href={`/dashboards/${spaceId}/${table.name}/overview`}>
							<Button gradient pill size="xs">Dashboards</Button>
						</a>
					</div>
				</div>
			</Card>
		{/each}
	</div>
{/if}
