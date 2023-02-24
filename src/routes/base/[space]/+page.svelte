<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let data: PageData;

	const { tables = [] } = data;
	const hasTables = Boolean(tables.length);

	const spaceId = $page.params.space;

	import { goto } from '$app/navigation';

	function navigateToTableDetail(table: string) {
		goto(`/base/${spaceId}/table/${table}/records`);
	}
</script>

<div class="flex">
	<div />
</div>

<div class="text-end p-4">
	<a href={`/base/${spaceId}/table/create`}>Create collections</a>
</div>

<div class="mt-9 text-center text-3xl">{data?.space?.name} Collections</div>

{#if !hasTables}
	<div class="mt-9 text-center ">No collections have been added</div>
{/if}

{#if hasTables}
	<div class="mt-9 lg:px-20">
		<Table>
			<TableHead>
				<TableHeadCell>Name</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each data.tables as table, index}
					<TableBodyRow on:click={() => navigateToTableDetail(table.name)}>
						<TableBodyCell>
							{index + 1}: {table.name}
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
{/if}
