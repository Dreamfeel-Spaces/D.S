<script lang="ts">
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		Modal,
		Textarea,
		Dropzone,
		Radio,
		Alert
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import SpaceNav from './SpaceNav.svelte';
	import SelectOption from './quick-setup/SelectOption.svelte';
	import Request from './[table]/api/Request.svelte';
	import { apiHelperModal } from '$lib/wsstore';

	let spaceId = $page.params.space;
	let tableId = $page.params.table;

	const space = $page.data.space;

	let pathname = $page.url.pathname;

	let setup = space?.apiSetup[0];

	let whoAmi = 'clone_api';
</script>

<div>
	<SpaceNav />
</div>

<Modal permanent open={(setup?.qsWidgetOpen && setup?.complete) || $apiHelperModal.open} class="w-full">
	<div class="flex justify-end">
		<SelectOption ctx={'dismiss'} />
	</div>
	<ul
		class="w-full flex bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
	>
		<li>
			<Radio class="p-3" bind:group={whoAmi} value="describe">Describe API.</Radio>
		</li>
		<li>
			<Radio class="p-3" bind:group={whoAmi} value="upload_existing">Upload existing.</Radio>
		</li>
		<li>
			<Radio class="p-3" bind:group={whoAmi} value="clone_api">Create from existing API.</Radio>
		</li>
	</ul>
	<div class="my-4">
		{#if whoAmi === 'describe'}
			<div class="mb-2">
				<Alert accent
					>This schema generator is only available for PRO users . You will need to upgrade your
					account to use this feature</Alert
				>
			</div>
			<Textarea
				placeholder="Enter a brief description of the api. IE create a schema for a school, or create three tables, or create a table with the following columns..."
				rows={9}
			/>
		{/if}
		{#if whoAmi === 'upload_existing'}
			<Alert accent class="mb-2"
				>This schema generator is only available for PRO users . You will need to upgrade your
				account to use this feature</Alert
			>
			<Dropzone />
		{/if}
		{#if whoAmi === 'clone_api'}
			<Request clone method="get" url="" />
		{/if}
	</div>
	<SelectOption ctx="setup" />
</Modal>

<div class="flex dark:bg-gray-900 pb-1">
	<div class="hidden pt-20 md:block  overflow-auto lg:block">
		<Sidebar>
			<SidebarWrapper class="min-h-108 max-h-108   overflow-auto">
				<SidebarGroup>
					<SidebarItem
						rel="external"
						active={!Boolean(tableId) &&
							!/\/logs/.test(pathname) &&
							!pathname.includes('/authentication')}
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
					{#each space?.tables ?? [] as table}
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
							{#if space?.apiChannel}
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
								active={tableId === table.name &&
									!/\/api/.test(pathname) &&
									Boolean(table.name) &&
									!/\/permissions/.test(pathname)}
								label={`Schema`}
							/>
							<SidebarDropdownItem
								rel="external"
								href={`/base/${spaceId}/${table.name}/permissions`}
								active={tableId === table.name &&
									/\/permissions/.test(pathname) &&
									!/\/api/.test(pathname)}
								label={`Permissions`}
							/>
						</SidebarDropdownWrapper>
					{/each}
					<SidebarItem
						href={`/base/${spaceId}/logs`}
						active={/\/logs/.test(pathname)}
						rel="external"
						label="Logs"
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
									d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
								/></svg
							>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem
						href={`/base/${spaceId}/code-export`}
						active={/\/code-export/.test(pathname)}
						rel="external"
						label="Export code"
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
									d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
								/></svg
							>
						</svelte:fragment>
					</SidebarItem>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</div>
	<div class="flex-1 mt-20 dark:bg-gray-900 bg-gray-200 pb-20 max-h-105 overflow-auto">
		<slot />
	</div>
	<div
		class="w-36  dark:text-gray-50  ml-2  pl-4 mr-20  hidden md:block lg:block rounded align-middle  h-72"
	>
		<div>
			<div class="mt-20">
				<a class="hover:underline text-blue" href={`/docs`}>Collection docs</a>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" href={`/${$page.params.space}`}>Update rules</a>
			</div>
			<div class="mt-6">
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
