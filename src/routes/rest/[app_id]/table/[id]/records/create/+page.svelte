<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	import { Input, NumberInput, Button, Select, Alert, Checkbox } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import DateTimeInput from '$lib/components/DateTimeInput.svelte';
	let space = $page.params["app_id"];
	let table = $page.params["app_id"];
	export let data: PageData;
	export let form: any;
	let selectedOptions: any = {};
</script>

<div class="p-9 text-end text-lg">
	<a href={`/base/${space}/table/${table}/records`}> Back to table</a>
</div>

<div class="text-lg mx-48 text-center mt-9">
	<h1>
		Add {data?.table?.name} record
	</h1>
</div>

{#if form?.success}
	<div class="lg:px-48 px-6 flex justify-center">
		<Alert>
			<p>Item has been saved</p>
			<a href={`/base/${space}/table/${table}/records/${form.data.id}`}>View details</a>
		</Alert>
	</div>
{/if}

<form method="POST">
	{#each data.table?.columns ?? [] as column}
		<div class="mb-6 mx-20">
			{#if column.type !== 'toggle'}
				<label for={column.name}>{column.name}</label>
			{/if}
			{#if column.type === 'string'}
				<Input id={column.name} name={column.name} />
			{/if}
			{#if column.type === 'number'}
				<NumberInput type="number" id={column.name} name={column.name} />
			{/if}

			{#if column.type === 'image'}
				<FileDropzone />
			{/if}
			{#if column.type === 'file'}
				<FileDropzone />
			{/if}
			{#if column.type === 'datetime'}
				<DateTimeInput />
			{/if}
			{#if column.type === 'select'}
				<Select
					name={column.name}
					id={column.name}
					class="mt-2"
					items={column.options.map((option) => ({
						name: option.label,
						value: option.value
					}))}
					bind:value={selectedOptions[column?.name]}
				/>
			{/if}
			{#if column.type === 'toggle'}
				<Checkbox
					id={column.name}
					bind:value={selectedOptions[column.name]}
					bind:checked={selectedOptions[column.name]}
					name={column.name}>{column.name}</Checkbox
				>
			{/if}
			{#if column.type === 'email'}
				<Input type="email" id={column.name} name={column.name} />
			{/if}
			{#if column.type === 'phone'}
				<Input type="number" id={column.name} name={column.name} />
			{/if}
			{#if column.type === 'password'}
				<Input type="password" id={column.name} name={column.name} />
			{/if}

			{#if column.type === 'rel'}
				<Select
					placeholder={`Choose (${column.name})`}
					name={column.name}
					id={column.name}
					class="mt-2"
					items={column.options.map((option) => ({
						name: option.label,
						value: option.value
					}))}
					bind:value={selectedOptions[column?.name]}
				/>
			{/if}
		</div>
	{/each}
	<div class="mx-20 mb-20  lg:48">
		<Button type="submit" class="w-full">Submit</Button>
	</div>
</form>
