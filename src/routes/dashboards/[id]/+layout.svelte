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
	import SpaceNav from '../../base/[space]/SpaceNav.svelte';

	let spaceId = $page.params.id;
	let tableId = $page.params.table;

	let activeSpace = data?.myapps?.find(({ appId }: any) => appId === spaceId);
	let pathname = $page.url.pathname;
</script>

<div class="dark:bg-gray-900">
	<SpaceNav />

	<div class="flex pt-20">
		<div class="hidden md:block lg:block">
			<Sidebar>
				<SidebarWrapper>
					<SidebarGroup style="min-height:85vh; max-height:85vh; overflow:auto">
						<SidebarItem
							rel="external"
							active={!Boolean(tableId) && !/\/users/.test(pathname)}
							href={`/dashboards/${spaceId}`}
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
						<SidebarDropdownWrapper isOpen={/\/users/.test(pathname)} label={'Users'}>
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
								rel="external"
								href={`/dashboards/${spaceId}/users/overview`}
								label="Overview"
								active={/\/users/.test(pathname) && /\overview/.test(pathname)}
							/>
							<SidebarDropdownItem
								rel="external"
								href={`/dashboards/${spaceId}/users/add`}
								label="Add"
								active={/\/users/.test(pathname) && /\add/.test(pathname)}
							/>
							<!-- <SidebarDropdownItem
							rel="external"
							href={`/dashboards/${spaceId}/users/roles`}
							label="Roles"
							active={/\/users/.test(pathname) && /\/roles/.test(pathname)}
						/> -->
							<SidebarDropdownItem
								rel="external"
								href={`/dashboards/${spaceId}/users/geo`}
								active={/\/users/.test(pathname) && /\/geo/.test(pathname)}
								label="Geo"
							/>
							<SidebarDropdownItem
								rel="external"
								href={`/dashboards/${spaceId}/users/table`}
								active={/\/users/.test(pathname) && /\/table/.test(pathname)}
								label="Users"
							/>
							<SidebarDropdownItem
								rel="external"
								href={`/dashboards/${spaceId}/users/permissions`}
								label="Permissions"
								active={/\/users/.test(pathname) && /\/permissions/.test(pathname)}
							/>
						</SidebarDropdownWrapper>
						{#each activeSpace?.dashboards ?? [] as table}
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
											d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
										/></svg
									>
								</svelte:fragment>
								<SidebarDropdownItem
									rel="external"
									active={tableId === table.name && /\/overview/.test(pathname)}
									href={`/dashboards/${spaceId}/${table.name}/overview`}
									label="Overview"
								/>

								<SidebarDropdownItem
									rel="external"
									href={`/dashboards/${spaceId}/${table.name}/permissions`}
									active={tableId === table.name &&
										tableId === table.name &&
										!/\/overview/.test(pathname) &&
										!/\/create/.test(pathname) &&
										/\/permissions/.test(pathname)}
									label={`Permissions`}
								/>
							</SidebarDropdownWrapper>
						{/each}
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
											d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
										/></svg
									>
								</svelte:fragment>
								<SidebarDropdownItem
									rel="external"
									active={tableId === table.name && /\/overview/.test(pathname)}
									href={`/dashboards/${spaceId}/${table.name}/overview`}
									label="Overview"
								/>
								<SidebarDropdownItem
									rel="external"
									active={tableId === table.name && /\/create/.test(pathname)}
									href={`/dashboards/${spaceId}/${table.name}/create`}
									label="Add"
								/>
								<SidebarDropdownItem
									rel="external"
									href={`/dashboards/${spaceId}/${table.name}`}
									active={tableId === table.name &&
										tableId === table.name &&
										!/\/overview/.test(pathname) &&
										!/\/create/.test(pathname) &&
										!/\/permissions/.test(pathname)}
									label={`${table.name}(s)`}
								/>
								<SidebarDropdownItem
									rel="external"
									href={`/dashboards/${spaceId}/${table.name}/permissions`}
									active={tableId === table.name &&
										tableId === table.name &&
										!/\/overview/.test(pathname) &&
										!/\/create/.test(pathname) &&
										/\/permissions/.test(pathname)}
									label={`Permissions`}
								/>
							</SidebarDropdownWrapper>
						{/each}
					</SidebarGroup>
				</SidebarWrapper>
			</Sidebar>
		</div>
		<div class="flex-1 dark:bg-gray-900 bg-gray-200">
			<slot />
		</div>
		<div class="w-36  ml-2  pl-4 mr-20  hidden md:block lg:block rounded align-middle  h-72">
			<!-- <div class="text-right text-sm">
			{data.spaceSession?.user?.username}
			<form method="post" action={`/a/${$page.params.id}/accounts?/signout`}>
				<button>Signout</button>
			</form>
		</div> -->
			<div class="text-gray-50">
				<div class="mt-20">
					<a class="hover:underline text-blue" href={`/base/${$page.params.id}`}>Collections API</a>
				</div>
				<div class="mt-6">
					<a class="hover:underline text-blue" href={`/dashboards/${$page.params.id}`}>Dashboard</a>
				</div>
				<div class="mt-6">
					<a class="hover:underline text-blue" href={`/editor/${$page.params.id}`}>UI Builder</a>
				</div>
				<div class="mt-6">
					<a rel="external" class="hover:underline text-blue" href={`/${$page.params.id}`}
						>Website</a
					>
				</div>
			</div>
		</div>
	</div>
</div>
