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
		CloseButton,
		Spinner,
		Radio,
		Textarea
	} from 'flowbite-svelte';
	import { columnTypes } from '$lib/coltypes/columnTypes';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import axios from 'axios';
	import { apiHelperModal } from '$lib/wsstore';
	const tableName = $page.params.table;
	const spaceName = $page.params.space;
	let spaceId = $page.params.space;
	let table = $page.params.table;

	export let data: PageData;
	export let form: any;
	let displayName: string = data.table?.displayName ?? '';

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
	let columns: any[] = data.columns.length ? data.columns : [{ ...col }];
	function addColumn() {
		columns = [...columns, { ...col }];
	}
	function removeColumn(index: number) {
		let all = [...columns];
		all.splice(index, 1);
		columns = [...all];
	}

	let deleting: any = false;

	async function handleDeleteColumn(id: string, index: number) {
		deleting = index;
		const response = await axios.delete(
			`/base/${$page.params.space}/${$page.params.table}/schema/col/${id}`
		);
		if (response.data) {
			let allCols = [...columns];
			allCols.splice(index, 1);
			columns = [...allCols];
			deleting = false;
			return;
		}
		deleting = false;
	}
	let whoAmi = 'manual_all';
</script>

<div class="py-2 bg-gray-50 dark:bg-gray-900">
	<div class="flex my-2">
		<div class=" flex-1 text-xl px-6 ">
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
		<Button
			on:click={() => apiHelperModal.set({ open: true })}
			size="xs"
			pill
			gradient
			color="pinkToOrange">Generate schema</Button
		>
		<div class="px-9 text-end text-lg">
			<a
				class="bg-blue-700 px-3  text-white rounded-3xl py-2 text-xs"
				href={`/base/${spaceName}/${tableName}/schema/preview`}>Preview</a
			>
		</div>
	</div>

	<div class="mt-4 px-6" />
</div>

<div class=" overflow-auto pb-12 dark:bg-gray-900 bg-gray-50">
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

	{#if whoAmi === 'manual_all'}
		<div class="grid gap-4 px-6   mb-6 mt-6 ">
			{#each columns as column, index}
				<Card size="xl">
					{#if !column.id}
						<div class="text-right">
							<Button class="mb-3" size="xs" pill gradient color="red">Not saved</Button>
						</div>
					{:else}
						<div class="text-right">
							<Button class="mb-3" size="xs" pill gradient color="green">Saved</Button>
						</div>
					{/if}
					<div class="flex justify-between">
						<div class=" text-xl">
							Col {index + 1}
							{#if column.id}
								<span> - ({column.name})</span>
							{/if}
						</div>
						<div>
							{#if deleting === index}
								<Spinner />
							{:else}
								<CloseButton
									on:click={() => {
										if (column.id) handleDeleteColumn(column.id, index);
										else removeColumn(index);
									}}
								/>
							{/if}
						</div>
					</div>
					<div class="mb-9 mt-5 container  ">
						<div class="mb-4 ">
							<label for="type">Type</label>
							<Select
								autofocus
								placeholder="Choose column type"
								name="type"
								bind:value={column.type}
								items={[...columnTypes]}
							/>
						</div>
						{#if column.type === 'datetime'}
							<div class="mb-4 ">
								<label for="type">Format</label>
								<Select
									autofocus
									placeholder="Choose format"
									name="type"
									bind:value={column.dateTimeDefault}
									items={[
										{
											name: 'Date Created',
											value: 'created'
										},
										{
											name: 'Date Updated',
											value: 'updated'
										},
										{
											name: 'Custom',
											value: 'custom'
										},
										{
											name: 'Date only',
											value: 'date_only'
										},
										{
											name: 'Time only',
											value: 'time_only'
										}
									]}
								/>
							</div>
						{/if}
						{#if column.type === 'rel'}
							<div class="mb-4 ">
								<label for="table">Table</label>
								<Select
									placeholder="Choose table"
									name="table"
									bind:value={column.rel}
									items={[...data.tables]}
								/>
								<div class="mt-4">
									<label for="multiple">Multiple Values</label>
									<Checkbox bind:checked={column.multiple} id="multiple" />
								</div>
							</div>
						{/if}
						<div class="mb-4 ">
							<label for="type">Name</label>
							<Input required bind:value={column.name} placeholder="Name" class="w-full" />
							{#if column.name && columns.filter((c) => c.name === column.name).length > 1}
								<div class="text-red-800">
									<small>Duplicate column name</small>
								</div>
							{/if}
						</div>
						<div class="mb-4 ">
							<label for="multiple">Required</label>
							<Checkbox bind:checked={column.required} id="multiple" />
						</div>
						{#if column.type === 'toggle'}
							<div class="mb-4 ">
								<label for="multiple">Default on</label>
								<Checkbox bind:checked={column.defaultOn} id="multiple" />
							</div>
						{/if}
						{#if column.type === 'string' || column.type === 'number' || column.type === 'password'}
							<div class="mb-4  ">
								<label for="type">Validation Regex pattern (optional)</label>
								<Input
									required
									bind:value={column.regex}
									placeholder="Regex pattern"
									type="text"
									class="w-full"
								/>
							</div>
						{/if}
						{#if column.type === 'select'}
							<div class="mb-4  ">
								<div class="my-2 text-lg">Add options</div>
								{#each column.options as _option, idx}
									<div class="grid mt-4  grid-cols-2 gap-2">
										<div>
											<label for="type">Label</label>
											<Input
												required
												bind:value={_option.label}
												placeholder="Label"
												type="text"
												class="w-full"
											/>
										</div>
										<div>
											<label for="type">Value</label>
											<Input
												required
												bind:value={_option.value}
												placeholder="Value"
												type="text"
												class="w-full"
											/>
										</div>
									</div>
									<Button
										on:click={() => {
											let options = [...columns[index].options];
											options.splice(idx, 1);
											columns[index].options = [...options];
										}}
										class="mt-2">Remove option</Button
									>
								{/each}
								<div class="flex justify-between">
									<Button
										on:click={() => {
											columns[index] = {
												...columns[index],
												options: [...columns[index].options, { ...option }]
											};
										}}
										class="mt-2">Add option</Button
									>
									<div />
								</div>
							</div>
						{/if}
					</div>
				</Card>
			{/each}
			<Card size="xl">
				<button class="h-full text-7xl" on:click={addColumn}>
					<div class="text-center">
						<p>+</p>
						<small class="text-lg">Add column</small>
					</div>
				</button>
			</Card>
		</div>
	{:else}
		<div class="mt-6 px-6">
			<Alert accent class="mb-4 text-red-800 dark:text-red-600 dark:bg-red-200 bg-red-200 "
				>This is a pro feature. You may need to upgrade to pro so as to generate schemas.
				<br />
				<Button size="xs" color="red" class="text-xs">Upgrade</Button>
			</Alert>

			<Textarea
				rows={9}
				required
				placeholder="Describe the API schema you want. Can be simple promps, i.e 'School API', to a detailed description of each table"
			/>
		</div>
	{/if}

	<div class="px-6 mt-6">
		<form method="POST">
			<div class="mb-4  ">
				<label for="displayName " class="text-3xl  text-gray-500">Display name</label>
				<Select
					placeholder="Choose column type"
					name="displayName"
					class="mt-4"
					id="displayName"
					bind:value={displayName}
					items={columns.map((c) => {
						return { name: c.name, value: c.name };
					})}
				/>
			</div>
			<input id="columns" name="columns" value={JSON.stringify(columns)} type="hidden" />
			<Button disabled={whoAmi === 'generate_add'} type="submit" class="mt-3 w-full"
				>Save columns</Button
			>
		</form>
	</div>
</div>
