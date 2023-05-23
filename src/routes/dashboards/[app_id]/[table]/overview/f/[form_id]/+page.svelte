<script lang="ts">
	//@ts-nocheck
	export let data;

	import { Checkbox, Button, Input, NumberInput, Select, Alert } from 'flowbite-svelte';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import DateTimeInput from '$lib/components/DateTimeInput.svelte';

	let selectedOptions: any = {};
	let form = data.form;
</script>

{#if data.isFilled}
	<div class="bg-gray-200 pt-6 lg:px-64 px-4">
		<Alert
			>Thanks, you have already filled this form. <a
				class="hover:underline"
				href="/forms/id/responses">View your responses</a
			></Alert
		>
	</div>
{/if}

<div class="bg-gray-200 h-full w-full overflow-auto pt-6">
	<section class="pb-9  mx-2   pt-4">
		<div class=" px-4 mx-auto max-w-screen-xl  lg:py-8 lg:px-12">
			<div class="text-center">
				<p
					class="mb-8 text-4xl font-normal text-gray-300 lg:text-5xl sm:px-16 xl:px-48 dark:text-gray-300"
				>
					{data?.form?.name}
				</p>
				<div
					class="flex flex-col  text-gray-300  lg:mb-9 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
				>
					{data?.form?.description}
				</div>
			</div>
		</div>
	</section>

	<form class="lg:px-64 px-6  mb-14" method="post">
		{#each form.columns ?? [] as column}
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
