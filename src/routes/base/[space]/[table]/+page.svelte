<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Input, Breadcrumb, BreadcrumbItem, Card, Alert } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const tableName = $page.params.table;
	const spaceName = $page.params.space;
	let columns: any = data?.table?.columns ?? [];
</script>

<div class="my-3 mx-6  flex  text-2xl text-gray-500">
	<p class="mr-2">
		{spaceName}
	</p>
	/
	<b class="text-3xl ml-2">{tableName}</b>
</div>

<div>
	<div class="flex justify-between px-3 mt-6 text-lg my-3">
		<div>
			<Breadcrumb>
				<BreadcrumbItem>Home</BreadcrumbItem>
				<BreadcrumbItem>Api</BreadcrumbItem>
				<BreadcrumbItem>
					{spaceName}
				</BreadcrumbItem>
				<BreadcrumbItem>
					{tableName}
				</BreadcrumbItem>
				<BreadcrumbItem>Schema</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<a href={`/base/${spaceName}/${tableName}/schema/create`}>Add schema</a>
	</div>

	{#if !columns.length}
		<div class="my-6 mx-6">
			<Alert>
				<p><b>Configuration error</b></p>
				<p class="my-3">Missing schema</p>
				<a class="hover:underline" href={`/base/${spaceName}/${tableName}/schema/create`}
					>Add schema</a
				>
			</Alert>
		</div>
	{/if}
	<div class="grid gap-4 px-3 grid-cols-3">
		{#each columns as column}
			<Card>
				<div class="text-2xl  text-gray-500">
					{column.name}
				</div>
				<form class="my-3  rounded " action="">
					<div class="mb-5">
						<label for="name">Name</label>
						<Input id="name" name="name" bind:value={column.name} />
					</div>
					<div class="mb-5">
						<label for="type">Type</label>
						<Input id="type" name="type" bind:value={column.type} />
					</div>
					<div class="flex justify-between">
						<button>Update column</button>
					</div>
				</form>
				<div class=" mb-6">
					<button>Delete {column.name}</button>
					<hr />
				</div>
			</Card>
		{/each}
	</div>
</div>
