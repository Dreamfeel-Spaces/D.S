<script lang="ts">
	import PageDialog from '$lib/components/PageDialog.svelte';
	import { page } from '$app/stores';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Accordion,
		AccordionItem,
		Input,
		Button
	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div>
	<div class="flex justify-between my-3">
		<Breadcrumb>
			<BreadcrumbItem>Home</BreadcrumbItem>
			<BreadcrumbItem>Dashboards</BreadcrumbItem>
			<BreadcrumbItem>
				{$page.params.id}
			</BreadcrumbItem>
			<!-- <BreadcrumbItem>{$page.params.table}</BreadcrumbItem> -->
			<BreadcrumbItem>UIS</BreadcrumbItem>
		</Breadcrumb>
		<PageDialog />
	</div>
	<hr />
	<Accordion size="xs" class="mt-9 mx-6">
		{#each data?.pages as _page}
			<AccordionItem>
				<slot:fragment slot="header">
					<div>
						{_page.name}
					</div>
					<div class="text-xs">
						{_page.path}
					</div>
				</slot:fragment>
				<form action="">
					<div class="mb-5">
						<label for="name">Name</label>
						<Input class="mt-2" name="name" placeholder="Name" />
					</div>
					<div class="mb-5">
						<label for="name">Icon</label>
						<Input class="mt-2" name="name" placeholder="Name" />
					</div>
					<div class="mb-5">
						<label for="name">Path</label>
						<Input class="mt-2" name="name" placeholder="Name" />
					</div>
					<Button class="w-full mt-3">Save</Button>
					<a rel="external" href={`/editor/${$page.params.id}/${$page.params.builder}/${_page.id}`}>
						<Button class="w-full mt-3">Edit page</Button>
					</a>
				</form>
			</AccordionItem>
		{/each}
	</Accordion>
</div>
