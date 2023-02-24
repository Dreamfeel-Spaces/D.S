<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	export let data: PageData;
	import {
		Sidebar,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarWrapper,
		Button,
		Select,
		Input
	} from 'flowbite-svelte';
	import ComponentDialog from '$lib/components/ComponentDialog.svelte';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PagePreview from '$lib/components/PagePreview.svelte';
	import { components } from '$lib/coltypes/components';
	const pages = data?.ui?.pages ?? [];
	let pageIndex = 0;
</script>

<div class="mt-3 flex justify-between">
	<p>{pages[pageIndex]?.name}</p>
	<div class="flex justify-end  ">
		<a
			rel="external"
			href="/editor/cled1od8t0001ukr48yfti8im/cleigul0w000duklwnwb845ew/preview"
			class="mr-3 btn bg-blue-600 text-white rounded px-3 flex align-middle">Preview</a
		>
		<div class="mr-3">
			<Select
				bind:value={pageIndex}
				items={pages.map((page, index) => ({
					name: page.name,
					value: index
				}))}
				placeholder="Select page"
			/>
		</div>
		<ComponentDialog pageIndex={pages[pageIndex]?.id} />
		<div class="mx-4">
			<PageDialog />
		</div>
	</div>
</div>

<div class="flex">
	<div style="max-height:88vh; overflow:scroll">
		<Sidebar>
			<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
				<SidebarGroup>
					{#each pages[pageIndex]?.components ?? [] as component}
						<SidebarDropdownWrapper label={component.name ?? ''}>
							<svelte:fragment slot="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
									/></svg
								>
							</svelte:fragment>
							<div>
								<form class="my-4" action="?/updateComponent" method="post">
									<input
										id="componentId"
										bind:value={component.id}
										name="componentId"
										type="hidden"
									/>
									<Select
										name="type"
										id="type"
										bind:value={component.type}
										items={[...components]}
										class="mb-3"
									/>
									<Input
										bind:value={component.name}
										placeholder="Name"
										type="text"
										name="name"
										id="name"
										class="mb-3"
									/>
									<Input
										bind:value={component.icon}
										placeholder="Icon"
										type="text"
										name="icon"
										id="icon"
										class="mb-3"
									/>
									<Button type="submit" class="w-full">Update</Button>
								</form>
								<form action="?/deleteComponent" method="POST">
									<input type="hidden" value={component.id} name="component" id={'component'} />
									<Button class="w-full" type="submit">Remove</Button>
								</form>
							</div>
						</SidebarDropdownWrapper>
					{/each}
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</div>
	<div style="max-height:88vh; overflow:auto" class="flex-1 mt-4 ">
		<PagePreview page={pages[pageIndex]} />
	</div>
</div>
