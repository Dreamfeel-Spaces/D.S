<script lang="ts">
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownItem,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	export let data;
	import { page } from '$app/stores';
	import SpaceNav from '../../base/[space]/SpaceNav.svelte';

	let spaceId = $page.params.id;
	const uiId = $page.params.builder;

	let activeSpace = data?.myapps?.find(({ appId }: any) => appId === spaceId);

	let url = $page.url.pathname;

	let isPreview = /\/preview/.test(url) || (Boolean(uiId) && !/\/settings/.test(url));
</script>

{#if isPreview}
	<slot />
{/if}

<div>
	<SpaceNav />
</div>

{#if !isPreview}
	<div class="flex  dark:bg-gray-800">
		<div class=" hidden lg:flex  overflow-y-auto">
			<Sidebar>
				<SidebarWrapper>
					<SidebarGroup class="max-h-99" style="min-height:88vh;  overflow:auto">
						<SidebarItem href="/editor" label="Overview">
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
										d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
									/><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
									/></svg
								>
							</svelte:fragment>
						</SidebarItem>
						<SidebarDropdownItem label="Create UI" href={`/editor/${spaceId}/create`} />

						{#each activeSpace?.spaceUis ?? [] as ui}
							<SidebarDropdownWrapper label={ui.name}>
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
								<SidebarDropdownItem
									label="Add new version"
									href={`/editor/${spaceId}/versions/${ui.id}/create`}
								/>
								{#each ui.spaceUIVersion as version}
									<SidebarDropdownItem
										rel="external"
										label={`Version: ${version.version}`}
										href={`/editor/${spaceId}/${version.id}`}
									/>
								{/each}
							</SidebarDropdownWrapper>
						{/each}
					</SidebarGroup>
				</SidebarWrapper>
			</Sidebar>
		</div>
		<div class="flex-1 dark:bg-gray-900">
			<slot />
		</div>
		<div
			class="w-48  ml-2  pl-4 mr-20  dark:text-white hidden md:block lg:block rounded align-middle  h-72"
		>
			<div>
				<div class="mt-20">
					<a class="hover:underline text-blue" href={`/base/${$page.params.space}`}>Dashboards</a>
				</div>
				<div class="mt-6">
					<a class="hover:underline text-blue" href={`/spaces/${$page.params.space}`}>Admin</a>
				</div>
				<div class="mt-6">
					<a class="hover:underline text-blue" href={`/editor/${$page.params.space}`}>UI Builder</a>
				</div>
				<div class="mt-6">
					<a class="hover:underline text-blue" href={`/${$page.params.space}`}>Website</a>
				</div>
			</div>
		</div>
	</div>
{/if}
