<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	import {
		Input,
		NumberInput,
		Button,
		Select,
		Alert,
		Checkbox,
		Breadcrumb,
		Label,
		BreadcrumbItem,
		Card
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import DateTimeInput from '$lib/components/DateTimeInput.svelte';
	export let data: PageData;
	export let form: any;
	let selectedOptions: any = {};
</script>

<section class="container">
	<div class="dark:bg-gray-900 p-6 rounded-xl min-h-full">
		<div class="flex my-3">
			<div class=" flex-1 text-xl px-6 text-gray-500">
				<span class="mr-2">
					{$page.params['app_id']}
				</span>
				/<b class="text-3xl text-gray-500 mx-2">{$page.params['table']}</b>
			</div>
			<div class="px-9 text-end text-lg">
				<Button
					pill
					gradient
					color="pinkToOrange"
					size="xs"
					href={`/dashboards/${$page.params['app_id']}/${$page.params.table}`}
					>{$page.params['table']}(s) table</Button
				>
			</div>
		</div>

		{#if form?.success}
			<div class="px-6 mb-6">
				<Alert>
					<p>Item has been saved</p>
					<a
						href={`/dashboards/${$page.data.space?.appId}/${$page.params['table']}/${form.data.id}`}
						>View details</a
					>
				</Alert>
			</div>
		{/if}

		<form method="POST">
			{#each data.table?.columns ?? [] as column}
				<div class="mb-6 px-6">
					{#if column.type !== 'toggle'}
						<Label class="mb-4" for={column.name}>{column.name}</Label>
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
			{#if data?.table?.columns?.length}
				<div class="px-6 mb-20  lg:48">
					<Button type="submit" class="w-full">Submit</Button>
				</div>
			{:else}
				<div class="mb-20 px-6 mt-9  lg:48">
					<div>
						<Alert>
							<b> No schema found </b>
							<div class="mt-6">
								<a href={`/rest/${$page.params['app_id']}/${$page.params['table']}/schema/create`}
									>Add schema</a
								>
							</div>
						</Alert>
					</div>
				</div>
			{/if}
		</form>
	</div>
</section>
