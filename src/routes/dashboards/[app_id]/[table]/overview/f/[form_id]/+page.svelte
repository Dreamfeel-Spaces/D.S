<script lang="ts">
	//@ts-nocheck
	export let data;

	import { Checkbox, Button, Input, NumberInput, Select, Alert } from 'flowbite-svelte';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import DateTimeInput from '$lib/components/DateTimeInput.svelte';

	let selectedOptions: any = {};
	let _form = data.form;
	export let form;
</script>

<div class="dark:bg-gray-900 h-full w-full overflow-auto pt-6">
	<!-- Code block starts -->
	<div
		class="my-6 lg:my-2 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300"
	>
		<div>
			<h4 class="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
				{data?.form?.name}
			</h4>
			<ul
				aria-label="current Status"
				class="flex flex-col md:flex-row items-start md:items-center text-gray-600 dark:text-gray-400 text-sm mt-3"
			>
				<li class="flex items-center mt-4 md:mt-0">
					<span>{data?.form?.description}</span>
				</li>
			</ul>
		</div>
		<div class="mt-6 md:mt-0">
			<button
				on:click={() => history.back()}
				class="mr-3 bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out rounded hover:bg-gray-300 text-indigo-700 dark:hover:bg-gray-600 dark:text-indigo-600 px-5 py-2 text-sm"
				>Back</button
			>
		</div>
	</div>
	{#if form?.success}
		<div class=" px-4">
			<Alert accent dismissable>Data saved</Alert>
		</div>
	{/if}
	<form class="lg:px- dark:text-white px-6  mb-14" method="post">
		{#each _form.columns ?? [] as column}
			<div class="my-6">
				{#if column.type !== 'toggle'}
					<label for={column.name}>{column.name}</label>
				{/if}
				{#if column.type === 'string'}
					<Input id={column.name} name={column.name} />
				{/if}
				{#if column.type === 'number'}
					<NumberInput id={column.name} name={column.name} />
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
		<Button disabled={data.isFilled} type="submit" class="w-full mt-9">Submit</Button>
	</form>
</div>

<div class="relative bg-gray-300">
	<div class="flex justify-center w-full ">
		<!-- <img loading="lazy" width={112} src={logo} alt="" /> -->
	</div>
</div>
