<script lang="ts">
	import {
		Input,
		Select,
		Button,
		Checkbox,
		Breadcrumb,
		BreadcrumbItem,
		Alert,
		Card,
		CloseButton
	} from 'flowbite-svelte';
	import { columnTypes } from '$lib/coltypes/columnTypes';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	const tableName = $page.params.table;
	const spaceName = $page.params["app_id"];
	let spaceId = $page.params["app_id"];
	let table = $page.params.table;

	export let data: PageData;
	export let form: any;
	let displayName: string;

	const option = {
		label: '',
		value: ''
	};

	const col = {
		type: '',
		name: '',
		regex: '',
		rel: '',
		multiple: false,
		required: true,
		defaultOn: false,
		options: [{ ...option }],
		dateTimeDefault: 'custom'
	};
	let columns: any[] = data.columns;
	function addColumn() {
		columns = [...columns, { ...col }];
	}
	function removeColumn(index: number) {
		let all = [...columns];
		all.splice(index, 1);
		columns = [...all];
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
		<a
			class="bg-blue-700 px-3  text-white rounded-3xl py-2 text-xs"
			href={`/base/${spaceName}/${tableName}`}>Schema</a
		>
	</div>
</div>

<div class="mt-3 px-6">
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

{#if form?.success}
	<div class="mt-3 px-6">
		<Alert>
			<div class="my-3 "><b>Schema saved</b></div>
			<div class="mb-3">
				<a class="hover:underline" href={`/base/${spaceId}/${table}`}>View schema</a>
			</div>
			<a class="hover:underline" href={`/base/${spaceId}/${table}/api`}>Configure Rest API</a>
		</Alert>
	</div>
{/if}

<div class="grid gap-4 px-6  my-6 ">
	<Card size="xl">
		{#each columns as column, index}
			<p>{index + 1}: <span><b> {column.name}</b></span> {column.type}</p>
		{/each}
	</Card>
	<a class="w-full" href={`/base/${$page.params["app_id"]}/${$page.params.table}`}>
		<Button class="w-full"  >Update schema</Button>
	</a>
</div>
