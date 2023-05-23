<script lang="ts">
	//@ts-nocheck
	export let data;

	import logo from '../../../assets/logo.png';
	import { Checkbox, Button, Input, NumberInput, Select, Alert } from 'flowbite-svelte';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import DateTimeInput from '$lib/components/DateTimeInput.svelte';

	let selectedOptions: any = {};
	let form = data.form;
</script>

<div class="bg-gray-900 min-h-screen">
	<nav
		class="border-gray- bg-gray-900 text-white  border-gray-200 dark:border-gray-600 dark:bg-gray-  dark:bg-gray-800 dark:border-gray- "
	>
		<div class="max-w-screen-xl flex flex-wrap py-6 items-center justify-center mx-auto p-4">
			<span class="flex justify-center">
				<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
					>feel Forms</span
				>
			</span>
		</div>
	</nav>
	{#if data.isFilled}
		<div class="u py-6 lg:px-96 px-4">
			<Alert accent
				>Thanks, you have already filled this form. <a
					class="hover:underline"
					href="/forms/id/responses">View your responses</a
				></Alert
			>
		</div>
	{/if}
	<section class="bg-gray-800 rounded-lg  lg:mx-96 min h-100 min-h-112">
		<div class=" overflow-auto  pt-6">
			<section class="mx-2   pt-4">
				<div class=" px-4 mx-auto max-w-screen-xl  lg:py-2 ">
					<div class="text-center">
						<p
							class="mb-8 text-2xl font-normal text-gray-300 lg:text-3xl sm:px-16 xl:px-48 dark:text-gray-300"
						>
							{data?.share?.title}
						</p>
						<div
							class="flex flex-col  text-gray-300  lg:mb-9 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
						>
							{data?.share?.description}
						</div>
					</div>
				</div>
			</section>

			<form class="lg:px-11 px-6  mb-14" method="post">
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
	</section>
	<div class="relative text-center mt-20 pb-12 bg-gray-3 00">
		<div class="flex justify-center w-full ">
			<img loading="lazy" width={112} src={logo} alt="" />
		</div>
		<p class="text-gray-400">Powered by Dreamfeel Spaces</p>
	</div>
</div>
