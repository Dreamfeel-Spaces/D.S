<script lang="ts">
	import { page } from '$app/stores';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Card,
		Accordion,
		AccordionItem,
		List,
		Listgroup,
		ListgroupItem,
		Button,
		Alert
	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const uis = data.space?.spaceUis ?? [];
	export let form: any;
</script>

<div class="mt-3 text-xl px-6 flex justify-between text-gray-500">
	<Breadcrumb>
		<BreadcrumbItem>Home</BreadcrumbItem>
		<BreadcrumbItem>Editor</BreadcrumbItem>
		<BreadcrumbItem>Item</BreadcrumbItem>
	</Breadcrumb>
	<a href={`/editor/${$page.params.id}/create`}><Button pill gradient size="xs">Create new Ui</Button></a>
</div>

{#if !uis.length}
	<div class="my-9 text-center">
		<div>No UIS have been added</div>
		<div class="mt-9 ">
			<a class="hover:underline" href={`/editor/${$page.params.id}/create`}>
				<Button>Add UI Group</Button></a
			>
		</div>
	</div>
{/if}

{#if form?.defaultUiSuccess}
	<div class="my-6 px-6">
		<Alert>UI version has been updated!</Alert>
	</div>
{/if}

<div class="px-6 grid gap-2 max-h-99 mt-9 overflow-auto ">
	{#each uis as ui}
		<Card size="xl">
			<div class="flex">
				<b class="text-lg flex-1">{ui?.name}</b>
				{#if ui?.spaceUIVersion.find((item) => item.id === data?.space?.uiVid)}
					<Button gradient size="xs" color="green" pill>Published</Button>
				{/if}
			</div>
			<p class="my-3">{ui?.spaceUIVersion?.length ?? 0} Versions</p>
			<div class="mt-3 flex justify-between">
				<a href={`/editor/artik-party/versions/${ui.id}/create`}>New version</a>
				<a href="/">Edit</a>
			</div>
			<Accordion class="mt-3">
				<AccordionItem>
					<svelte:fragment slot="header">Versions</svelte:fragment>
					<List  position="inside" >
						<Listgroup>
							{#each ui.spaceUIVersion as version}
								<ListgroupItem
									size="xl"
									href={`/editor/${$page.params.id}/${version.id}/${
										version.pages.find((page) => page.path === '/')?.id ?? version.pages[0]?.id
									}`}
								>
									<div class="flex justify-between ">
										<div class="flex" style="align-items:center">
											<a rel="external" href={`/editor/${$page.params.id}/${version.id}`}
												>Version {version.version}</a
											>
										</div>
										<form action="?/setDefaultUI" method="post">
											<input id="id" value={version.id} name="id" type="hidden" />
											<Button
												pill
												type="submit"
												gradient
												color={data?.space?.uiVid === version.id ? 'green' : 'blue'}
												outline={data?.space?.uiVid !== version.id}
												size="xs"
												>{data?.space?.uiVid === version.id ? 'Published' : `Publish`}</Button
											>
											<a href={`/editor/${$page.params.id}/${version.id}/settings`}>
												<Button pill outline gradient size="xs">Settings</Button>
											</a>
											<a
												rel="external"
												href={`/editor/${$page.params.id}/${version.id}/${
													version.pages.find((page) => page.path === '/')?.id ??
													version.pages[0]?.id
												}`}
											>
												<Button pill outline gradient size="xs">Open in builder</Button>
											</a>
										</form>
									</div>
								</ListgroupItem>
							{/each}
						</Listgroup>
					</List>
				</AccordionItem>
			</Accordion>
		</Card>
	{/each}
</div>
