<script lang="ts">
	import { Input, Select, Button, Checkbox } from 'flowbite-svelte';
	import { columnTypes } from '$lib/coltypes/columnTypes';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	const spaceId = $page.params.space;
	const table = $page.params.id;

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
	let columns: (typeof col)[] = [{ ...col }];
	function addColumn() {
		columns = [...columns, { ...col }];
	}
	function removeColumn(index: number) {
		let all = [...columns];
		all.splice(index, 1);
		columns = [...all];
	}
</script>

<div class="text-center text-lg mt-4">
	<p>Columns</p>
</div>

{#if form?.success}
	<div class="my-3 mx-20 lg:mx-48">Columns saved</div>
	<a href={`/base/${spaceId}/table/${table}/records`}>Go to table</a>
{/if}

{#each columns as column, index}
	<div class="mb-9 mt-5 lg:mx-48">
		<div class="mb-4 mx-20 ">
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
			<div class="mb-4 mx-20 ">
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
			<div class="mb-4 mx-20">
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
		<div class="mb-4 mx-20">
			<label for="type">Name</label>
			<Input required bind:value={column.name} placeholder="Name" class="w-full" />
			{#if column.name && columns.filter((c) => c.name === column.name).length > 1}
				<div class="text-red-800">
					<small>Duplicate column name</small>
				</div>
			{/if}
		</div>
		<div class="mb-4 mx-20">
			<label for="multiple">Required</label>
			<Checkbox bind:checked={column.required} id="multiple" />
		</div>
		{#if column.type === 'toggle'}
			<div class="mb-4 mx-20">
				<label for="multiple">Default on</label>
				<Checkbox bind:checked={column.defaultOn} id="multiple" />
			</div>
		{/if}
		{#if column.type === 'string' || column.type === 'number' || column.type === 'password'}
			<div class="mb-4 mx-20 ">
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
			<div class="mb-4 mx-20 ">
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
		<hr />
		<div class="mt-9 mx-20">
			<Button on:click={() => removeColumn(index)}>Remove column</Button>
		</div>
	</div>
{/each}

<div class="mx-20">
	<form method="POST">
		<div class="mb-4 mx-20 ">
			<Button type="button" class="w-full mb-9" on:click={addColumn}>Add Column</Button>
			<label for="displayName">Display name</label>
			<Select
				placeholder="Choose column type"
				name="displayName"
				id="displayName"
				bind:value={displayName}
				items={columns.map((c) => {
					return { name: c.name, value: c.name };
				})}
			/>
		</div>
		<input id="columns" name="columns" value={JSON.stringify(columns)} type="hidden" />
		<Button type="submit" class="mt-3 w-full">Save columns</Button>
	</form>
</div>
