<script lang="ts">
	import {
		Input,
		Select,
		Button,
		Checkbox,
		Alert,
		Card,
		CloseButton,
		Spinner,
		Textarea,
		Label
	} from 'flowbite-svelte';
	import { columnTypes } from '$lib/coltypes/columnTypes';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import axios from 'axios';
	let spaceId = $page.params['app_id'];
	let table = $page.data.table;
	import { fade, scale } from 'svelte/transition';

	table ??= {};

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
			`/rest/${$page.params['app_id']}/${$page.params.table}/schema/col/${id}`
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

	import { useEffect } from '$lib/wsstore/hooks';
	import { browser } from '$app/environment';
	import Ac from '$lib/components/AC.svelte';
	import { tableIcon } from '$lib/wsstore';
	import { onMount, onDestroy } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	onDestroy(() => {
		tableIcon.set('folder_open');
	});

	function scrolltoId() {
		var access = document.getElementById('top');
		access?.scrollIntoView({ behavior: 'smooth' });
	}

	useEffect(
		() => {
			if ($page.data.table.icon) tableIcon.set($page.data.table.icon);
		},
		() => [$page.data.table.icon]
	);

	useEffect(
		() => {
			columns = data.columns.length ? data.columns : [{ ...col }];
			table = $page.data.table;
			scrolltoId();
		},
		() => [$page.params.table]
	);

	useEffect(
		() => {
			if (form?.data) {
				invalidateAll();
			}
		},
		() => [form?.data]
	);

	let schemaListType = 'list';

	onMount(invalidateAll);
</script>

<div class=" overflow-auto pb-12 dark:bg-black min-h-full bg-gray-50">
	{#if form?.success}
		<div class="mt-3 px-6">
			<Alert>
				<div class="my-3 "><b>Schema saved</b></div>
				<div class="mb-3">
					<a class="hover:underline" href={`/rest/${spaceId}/${table?.name}`}>View schema</a>
				</div>
				<a class="hover:underline" href={`/rest/${spaceId}/${table?.name}/api`}
					>Configure Rest API</a
				>
			</Alert>
		</div>
	{/if}

	<div class="px-6 my-6 space-y-6" id="top">
		<p class="text-3xl dark:text-gray-200">Table Details</p>

		<Label>
			Name
			<Input name="name" placeholder="Table name" bind:value={table.label} />
		</Label>
		<!-- <Label>
			Id variant
			<Select />
		</Label> -->
		<div>
			<Label>
				Icon
				<Ac />
			</Label>
		</div>
	</div>

	{#if whoAmi === 'manual_all'}
		<div class="mx-6 flex">
			<p class="text-3xl flex-1 dark:text-gray-200  mb-3">Schema</p>
			<button on:click={() => (schemaListType = schemaListType === 'list' ? 'columns' : 'list')}>
				<span class="material-symbols-outlined dark:text-gray-200 ">
					{#if schemaListType === 'columns'} table_rows {:else} grid_view{/if}
				</span>
			</button>
		</div>
		{#if schemaListType === 'list'}
			<div class="mx-6">
				<div class="relative overflow-x-auto">
					<table
						in:scale
						out:fade
						class="w-full rounded-md text-sm text-left text-gray-500 dark:text-gray-400"
					>
						<thead
							class="text-xs rounded-t-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="px-1 py-3" />
								<th scope="col" class="px-6 py-3"> Name </th>
								<th scope="col" class="px-6 py-3"> Type </th>
								<th scope="col" class="px-6 py-3"> Required </th>
								<th scope="col" class="px-6 py-3" />
								<th scope="col" class="px-6 py-3" />
							</tr>
						</thead>
						<tbody>
							{#if columns.length}
								{#each columns as column, index}
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<td class="flex justify-center pt-2 items-center">
											<button on:click={() => removeColumn(index)}>
												<span class="material-symbols-outlined"> delete </span>
											</button>
										</td>
										<td
											class="px-1 max-w-xs  w-48 py-1 text-gray-900 whitespace-nowrap dark:text-white"
										>
											<Input bind:value={column.name} placeholder="Field name" size="sm" />
										</td>
										<td class="px-1 py-1">
											<Select
												size="sm"
												autofocus
												placeholder="Choose column type"
												name="type"
												bind:value={column.type}
												items={[...columnTypes]}
											/>
										</td>
										<td class="px-1 flex justify-center items-center py-1"> <Checkbox /> </td>
										<td class="px-1 py-1">
											{#if column.type === 'toggle'}
												<div>
													<Checkbox size="xs" bind:checked={column.defaultOn} id="multiple" />
												</div>
											{/if}
											{#if column.type === 'string' || column.type === 'number' || column.type === 'password'}
												<div class="mb-1 w-48 ">
													<Input
														size="sm"
														required
														bind:value={column.regex}
														placeholder="Regex pattern"
														type="text"
														class="w-full"
													/>
												</div>
											{/if}
											{#if column.type === 'select'}
												<div class="mb-1  ">
													<div class="my-2 text-lg">Add options</div>
													{#each column.options as _option, idx}
														<div class="grid mt-4  grid-cols-2 gap-2">
															<div>
																<label for="type">Label</label>
																<Input
																	size="sm"
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
																	size="sm"
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
										</td>
										<td>
											<div>
												{#if !column.id}
													<div class="text-right">
														<Button size="xs" pill gradient color="red">Not saved</Button>
													</div>
												{:else}
													<div class="text-right">
														<Button size="xs" pill gradient color="green">Saved</Button>
													</div>
												{/if}
											</div>
										</td>
									</tr>
								{/each}
							{/if}
							<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<td colspan="6" class="px-6   py-4">
									<div class="flex justify-end">
										<Button on:click={addColumn}>Add column</Button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		{/if}
		{#if schemaListType === 'columns'}
			<div class="grid gap-4 px-6 lg:grid-cols-3 md:grid-cols-2    my-2 ">
				{#each columns as column, index}
					<div in:scale out:fade>
						<Card>
							<div class="flex justify-between">
								<div>
									Col {index + 1}
									{#if column.id}
										<span> - ({column.name})</span>
									{/if}
								</div>
								<div class="flex">
									<div>
										{#if !column.id}
											<div class="text-right">
												<Button class="mb-2" size="xs" pill gradient color="red">Not saved</Button>
											</div>
										{:else}
											<div class="text-right">
												<Button class="mb-2" size="xs" pill gradient color="green">Saved</Button>
											</div>
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
							</div>
							<div class="mb-3 mt-2 container  ">
								<div class="mb-2 ">
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
					</div>
				{/each}
				<div class="h-full" in:scale out:fade>
					<Card size="xl">
						<button class="h-full text-7xl" on:click={addColumn}>
							<div class="text-center">
								<p>+</p>
								<small class="text-lg">Add column</small>
							</div>
						</button>
					</Card>
				</div>
			</div>
		{/if}
	{:else}
		<div class="mt-6 px-6">
			<Textarea
				rows={9}
				required
				placeholder="Describe the API schema you want. Can be simple promps, i.e 'School API', to a detailed description of each table"
			/>
		</div>
	{/if}

	<div class="px-6 mt-6">
		<form action="?/update" method="POST">
			<div class="mb-4  ">
				<label for="displayName " class="text-3xl  text-gray-500">Metadata</label>
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
			<Textarea name="description" bind:Value={table.description} />
			<input type="hidden" name={'icon'} bind:value={$tableIcon} />
			<input type="hidden" name={'name'} bind:value={table.label} />
			<input id="columns" name="columns" value={JSON.stringify(columns)} type="hidden" />
			<Button disabled={whoAmi === 'generate_add'} type="submit" class="mt-3 w-full"
				>Save columns</Button
			>
		</form>

		<form action="?/delete" method="post">
			<Button color="red" type="submit" class="mt-3 w-full">Delete</Button>
		</form>
	</div>
</div>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>
