<script lang="ts">
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownItem,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	export let data;
	import { page } from '$app/stores';

	let spaceId = $page.params.space;
	let tableId = $page.params.table;

	let activeSpace = data?.myapps?.find(({ appId }: any) => appId === spaceId);
	let pathname = $page.url.pathname;
</script>

<div class="flex mb-20">
	<div  class="hidden md:block lg:block">
		<Sidebar>
			<SidebarWrapper>
				<SidebarGroup style="max-height:84vh; overflow:auto">
					<SidebarItem
						rel="external"
						active={!Boolean(tableId) && !pathname.includes('/authentication')}
						href={`/base/${spaceId}`}
						label="Overview"
					>
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
					<SidebarItem
						rel="external"
						href={`/base/${spaceId}/authentication`}
						label={`Authentication`}
						active={pathname.includes('/authentication')}
					>
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
					{#each activeSpace?.tables ?? [] as table}
						<SidebarDropdownWrapper isOpen={tableId === table.name} label={table.name}>
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
							{#if activeSpace?.apiChannel}
								<SidebarDropdownItem
									rel="external"
									href={`/base/${spaceId}/${table.name}/api`}
									active={tableId === table.name && /\/api/.test(pathname)}
									label={`Endpoints`}
								/>
							{/if}
							<SidebarDropdownItem
								rel="external"
								href={`/base/${spaceId}/${table.name}`}
								active={tableId === table.name && !/\/api/.test(pathname)}
								label={`Schema`}
							/>
						</SidebarDropdownWrapper>
					{/each}
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</div>
	<div  class="flex-1">
		<slot />
	</div>
	<div
		class="w-48 mt-20 ml-2  border mr-4  hidden md:flex lg:flex rounded align-middle justify-center h-72"
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
		</div>
	</div>
</div>
