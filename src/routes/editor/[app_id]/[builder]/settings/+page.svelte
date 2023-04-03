<script lang="ts">
	// @ts-nocheck
	import PageDialog from '$lib/components/PageDialog.svelte';
	import { page } from '$app/stores';
	import {
		Breadcrumb,
		Toggle,
		Accordion,
		AccordionItem,
		Input,
		Button,
		Card
	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container ">
	<Card class="pb-20" size="xl">
		<div class="flex justify-end my-3">
			<PageDialog />
		</div>
		<hr />
		<Accordion size="xs" class="mt-9 mx-6 mb-80">
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
							<Input class="mt-2" bind:value={_page.name} name="name" placeholder="Name" />
						</div>
						<div class="mb-5">
							<label for="name">Icon</label>
							<Input bind:value={_page.icon} class="mt-2" name="icon" placeholder="Icon" />
						</div>
						<div class="mb-5">
							<label for="name">Path</label>
							<Input class="mt-2" name="path" bind:value={_page.path} placeholder="Path" />
						</div>
						<div class="mb-5">
							<Toggle bind:checked={_page.layout} for="name">Layout</Toggle>
						</div>
						<Button class="w-full mt-3">Save</Button>
						<a
							rel="external"
							href={`/editor/${$page.params['app_id']}/${$page.params.builder}/${_page.id}`}
						>
							<Button class="w-full mt-3">Edit page</Button>
						</a>
					</form>
				</AccordionItem>
			{/each}
		</Accordion>
	</Card>
</div>
