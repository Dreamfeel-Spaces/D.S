<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Breadcrumb,
		BreadcrumbItem,
		Alert,
		Pagination,
		PaginationItem,
		Button
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let space = $page.params["app_id"];
	let table = $page.params.table;
	const spaceName = $page.params["app_id"];
	const tableName = $page.params.table;

	let hasRecords = Boolean(data.rows.length);
	let hasColumns = Boolean(data.columns.length);

	function navigateToTableDetail(item: string) {
		goto(`/dashboards/${space}/${table}/${item}`);
	}
</script>

<div class="flex my-3">
	<div class=" flex-1 text-xl px-6 text-gray-500">
		<span class="mr-2">
			{spaceName}
		</span>
		/<b class="text-3xl text-gray-500 mx-2">{tableName}</b>
	</div>
	<div class="px-9 text-end text-lg">
		{#if data?.columns.length}
			<Button
				pill
				gradient
				size="xs"
				href={`/dashboards/${space}/${table}/overview?tab=charts`}
			>
				Charts</Button
			>
			<Button
				pill
				gradient
				size="xs"
				href={`/dashboards/${space}/${table}/overview`}
			>
				Reports</Button
			>
			<Button
				pill
				gradient
				color="pinkToOrange"
				size="xs"
				href={`/dashboards/${space}/${table}/create`}
			>
				Add {tableName} (s)</Button
			>
		{/if}
	</div>
</div>

<!-- <div class="flex justify-between mt-6">
	<Breadcrumb>
		<BreadcrumbItem>Home</BreadcrumbItem>
		<BreadcrumbItem>Dashboards</BreadcrumbItem>
		<BreadcrumbItem>
			{spaceName}
		</BreadcrumbItem>
		<BreadcrumbItem>{tableName}</BreadcrumbItem>
	</Breadcrumb>
	<div class=" flex justify-end mx-20" />
</div> -->

{#if !hasColumns}
	<div class="mx-6">
		<Alert class=" mt-9">
			<p class="mb-3">
				<b>Configuration error</b>
			</p>
			<p class="mb-6">No columns / fields have been added to this table.</p>
			<a class="mt-4 hover:underline" href={`/base/${space}/${table}/schema/create`}
				>Create columns</a
			>
		</Alert>
	</div>
{/if}

<div class="lg:px-9">
	{#if !hasRecords && hasColumns}
		<Table class="mt-4"
			><TableHead>
				{#each data.columns as column}
					<TableHeadCell>{column}</TableHeadCell>
				{/each}
				<TableHeadCell>
					<span class="sr-only"> Edit </span>
				</TableHeadCell>
			</TableHead></Table
		>
		<div class="my-20 text-center text-lg">No records available for this table</div>
		<div class="text-center">
			<a class="btn p-3 bg-blue-900" href={`/dashboards/${space}/${table}/create`}>
				Add record(s)</a
			>
		</div>
	{/if}

	<div class="max-h-96 overflow-auto">
		{#if hasRecords && hasColumns}
			<Table class="mt-9" striped={true}>
				<TableHead>
					{#each data.columns as column}
						<TableHeadCell>{column}</TableHeadCell>
					{/each}
					<TableHeadCell>
						<span class="sr-only"> Edit </span>
					</TableHeadCell>
				</TableHead>
				<TableBody class="divide-y">
					{#each data.rows as row}
						<TableBodyRow on:click={() => navigateToTableDetail(row.id)}>
							{#each data.columns as column}
								<TableBodyCell>{row[column]}</TableBodyCell>
							{/each}
							<TableBodyCell>
								<a
									href={`/dashboards/${space}/${table}/${row.id}/update`}
									class="font-medium text-blue-600 hover:underline dark:text-blue-500"
								>
									Edit
								</a>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		{/if}
	</div>

	<div class="mt-3">
		<Pagination>
			<PaginationItem active>
				<svelte:fragment slot="default">1</svelte:fragment>
			</PaginationItem>
			<PaginationItem>1</PaginationItem>
			<PaginationItem>1</PaginationItem>
			<PaginationItem>1</PaginationItem>
			<PaginationItem>1</PaginationItem>
			<PaginationItem>1</PaginationItem>
		</Pagination>
	</div>
</div>
