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
		TableHeadCell
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	const space = $page.params.space;
	const table = $page.params.id;

	const hasRecords = Boolean(data.rows.length);
	const hasColumns = Boolean(data.columns.length);

	function navigateToTableDetail(item: string) {
		goto(`/base/${space}/table/${table}/records/${item}/`);
	}
</script>

<div class="mt-6 flex justify-end mx-20">
	<a href={`/base/${space}/table/${table}/records/create`}> Add record </a>
</div>

<div class="mt-6 text-center text-lg">
	{table}
</div>

{#if !hasColumns}
	<div class="text-center mt-9">
		<p class="mb-6">No columns / fields have been added to this table.</p>
		<a class="mt-4" href={`/base/${space}/table/${table}/columns/create`}>Create columns</a>
	</div>
{/if}

<div class="lg:px-9">
	{#if !hasRecords && hasColumns}
		<Table class="mt-20"
			><TableHead>
				{#each data.columns as column}
					<TableHeadCell>{column}</TableHeadCell>
				{/each}
				<TableHeadCell>
					<span class="sr-only"> Edit </span>
				</TableHeadCell>
			</TableHead></Table
		>
		<div class="mt-20 text-center text-lg">No records available for this table</div>
	{/if}

	{#if hasRecords && hasColumns}
		<Table class="mt-20" striped={true}>
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
								href={`/base/${space}/table/${table}/records/${row.id}/update`}
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
