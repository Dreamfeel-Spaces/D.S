<script lang="ts">
	import { page } from '$app/stores';
	import {
		Card,
		BreadcrumbItem,
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

{#if !uis.length}
	<div class="container">
		<Card size="xl" class="w-full min-h-108 flex self-center">
			<div class="my-9 text-center">
				<div>No UIS have been added</div>
				<div class="mt-9 ">
					<a class="hover:underline" href={`/editor/${$page.params['app_id']}/create`}>
						<Button>Add UI Group</Button></a
					>
				</div>
			</div>
		</Card>
	</div>
{/if}

{#if form?.defaultUiSuccess}
	<div class="my-6 px-6">
		<Alert>UI version has been updated!</Alert>
	</div>
{/if}

<div class="grid gap-2 lg:grid-cols-2  overflow-auto ">
	{#each uis as ui}
		<Card size="xl">
			<div class="flex">
				<b class="text-2xl flex-1">{ui?.name}</b>
				<div class=" flex justify-between">
					{#if ui?.spaceUIVersion.find((item) => item.id === data?.space?.uiVid)}
						<div>
							<Button class="mr-3" gradient size="xs" color="green" pill>Published</Button>
						</div>
					{/if}
					<div>
						<Button
							size="xs"
							outline
							href={`/editor/${$page.data.space.appId}/versions/${ui.id}/create`}
						>
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="18"
								viewBox="0 96 960 960"
								width="18"><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z" /></svg
							>
							<span class="ml-2"> Version </span>
						</Button>
					</div>
				</div>
			</div>
			<p class="my-1">{ui?.spaceUIVersion?.length ?? 0} Versions</p>

			<Accordion class="mt-1">
				<AccordionItem>
					<svelte:fragment slot="header">Versions</svelte:fragment>
					<List position="inside">
						<Listgroup>
							{#each ui.spaceUIVersion as version}
								<ListgroupItem
									size="xl"
									href={`/editor/${$page.params['app_id']}/${version.id}/${
										version.pages.find((page) => page.path === '/')?.id ?? version.pages[0]?.id
									}`}
								>
									<div class="flex justify-between ">
										<div class="flex" style="align-items:center">
											<a rel="external" href={`/editor/${$page.params['app_id']}/${version.id}`}
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
											<a href={`/editor/${$page.params['app_id']}/${version.id}/settings`}>
												<Button pill outline gradient size="xs">Settings</Button>
											</a>
											<a
												rel="external"
												href={`/editor/${$page.params['app_id']}/${version.id}/${
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
