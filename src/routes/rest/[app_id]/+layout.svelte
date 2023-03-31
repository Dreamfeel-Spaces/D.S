<!-- <script lang="ts">
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
		Alert,
		Button
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import SpaceNav from '../../../lib/components/SpaceNav.svelte';
	import SelectOption from './quick-setup/SelectOption.svelte';
	import Request from './[table]/endpoints/Request.svelte';
	import { apiHelperModal } from '$lib/wsstore';

	let spaceId = $page.params["app_id"];
	let tableId = $page.params.table;

	let space = $page.data.space;



	let whoAmi = 'clone_api';
</script>

<div>
	<SpaceNav />
</div>



<div class="flex dark:bg-gray-900 pb-1">
	<div class="hidden pt-20 md:block  overflow-auto lg:block">
		<Sidebar>
			<SidebarWrapper class="min-h-108 max-h-108   overflow-auto">
				<SidebarGroup>
					<SidebarItem
						
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
					{#each $page.data?.tables ?? [] as table}
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
									
									href={`/base/${spaceId}/${table.name}/api`}
									active={tableId === table.name && /\/api/.test(pathname)}
									label={`Endpoints`}
								/>
							{/if}
							<SidebarDropdownItem
								
								href={`/base/${spaceId}/${table.name}`}
								active={tableId === table.name &&
									!/\/api/.test(pathname) &&
									Boolean(table.name) &&
									!/\/permissions/.test(pathname)}
								label={`Schema`}
							/>
							<SidebarDropdownItem
								
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
				<a class="hover:underline text-blue" href={`/${$page.params["app_id"]}`}>Update rules</a>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" href={`/base/${$page.params["app_id"]}`}>Dashboards</a>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" href={`/spaces/${$page.params["app_id"]}`}>Admin</a>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" href={`/editor/${$page.params["app_id"]}`}>UI Builder</a>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" href={`/${$page.params["app_id"]}`}>Website</a>
			</div>
		</div>
	</div>
</div> -->
<script>
	import {
		DarkMode,
		Button,
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
	import SpaceNav from '$lib/components/SpaceNav.svelte';
	const space = $page.data.space;
	const spaceSession = $page.data.spaceSession;
	const user = spaceSession?.user;
	const pathname = $page.url.pathname;
	let whoAmi = 'clone_api';
	import { apiHelperModal } from '$lib/wsstore';
	import SelectOption from './quick-setup/SelectOption.svelte';
	let setup = (space?.apiSetup ?? [])[0];
	import Request from './[table]/endpoints/Request.svelte';
	import SpaceSearch from './SpaceSearch.svelte';
</script>

<SpaceNav modalOnly={true} />

<!--<div class="dark:bg-gray-900  min-h-112 pb-64 pt-20">
	<div class="flex dark:bg-gray-900 ">
		{#if !/\/accounts/.test($page.url.pathname) && !/\/welcome/.test($page.url.pathname)}
			<div class="hidden md:block lg:block pt-6">
				<Sidebar>
					<SidebarWrapper class="max-h max-h-100 h-100 fixed w-64 ml-4 overflow-auto">
						<SidebarGroup>
							<SidebarItem href={`/rest/${$page.params["app_id"]}`}  label="Collections" />
							<SidebarItem href={`/dashboards/${$page.params["app_id"]}`} label="Dashboard" />
							<SidebarItem href={`/editor/${$page.params["app_id"]}`} label="UI" />
							<SidebarItem href={`/spaces/${$page.params["app_id"]}`} label="Config" />
						</SidebarGroup>
					</SidebarWrapper>
				</Sidebar>
			</div>
		{/if}
		<div class="flex-1  ">
			<slot />
		</div>
	</div>
</div>
 -->

<Modal
	permanent
	open={(setup?.qsWidgetOpen && setup?.complete) || $apiHelperModal.open}
	class="w-full"
>
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
			<Button disabled class="mt-3">Generate</Button>
		{/if}
		{#if whoAmi === 'upload_existing'}
			<Alert accent class="mb-2"
				>This schema generator is only available for PRO users . You will need to upgrade your
				account to use this feature</Alert
			>
			<Dropzone />
			<Button disabled class="mt-3">Import</Button>
		{/if}
		{#if whoAmi === 'clone_api'}
			<Request clone method="get" url="" />
		{/if}
	</div>
	<SelectOption ctx="setup" />
</Modal>

<div class="flex flex-row min-h-screen dark:bg-gray-900 bg-gray-100 text-gray-800">
	<aside
		class="sidebar min-w-48 dark:text-gray-900 w-64  max-h-screen overflow-auto md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-gray-900 bg-gray-50"
	>
		<div class="sidebar-header flex items-center   ml-7 py-4">
			<div class="inline-flex">
				<a href={`/a/${space.appId}`} class="inline-flex flex-row items-center">
					<span class="leading-10 dark:text-gray-100 text-2xl font-bold ml-1 uppercase"
						>{space.name}</span
					>
					<span class="text-xs dark:text-gray-300 mt-2 ml-2">Rest API</span>
				</a>
			</div>
		</div>
		<div class="sidebar-content px-4 py-6">
			<ul class="flex flex-col w-full">
				<li class="my-px">
					<a
						href={`/rest/${space.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-900 dark:text-gray-300 dark:bg-gray-900 bg-gray-100"
					>
						<span class="flex items-center justify-center text-lg text-gray-400">
							<svg
								fill="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
								class="h-6 w-6"
							>
								<path
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
						</span>
						<span class="ml-3">Home</span>
					</a>
				</li>
				<li class="my-px">
					<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase">API</span>
				</li>
				<SidebarDropdownWrapper label={'Models'}>
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

					{#each $page.data?.tables ?? [] as table}
						<SidebarDropdownItem href={`/rest/${space.appId}/${table.name}/`} label={table.name} />
					{/each}
				</SidebarDropdownWrapper>
				<SidebarDropdownWrapper label={'Permissions'}>
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

					{#each $page.data?.tables ?? [] as table}
						<SidebarDropdownItem
							href={`/rest/${space.appId}/${table.name}/permissions`}
							label={table.name}
						/>
					{/each}
				</SidebarDropdownWrapper>
				<SidebarDropdownWrapper label={'Actions'}>
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

					{#each $page.data?.tables ?? [] as table}
						<SidebarDropdownItem
							href={`/rest/${space.appId}/${table.name}/actions`}
							label={table.name}
						/>
					{/each}
				</SidebarDropdownWrapper>
				<SidebarDropdownWrapper label={'Integrations'}>
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

					<SidebarDropdownItem label={`Schema`} />
					<SidebarDropdownItem label={`Permissions`} />
				</SidebarDropdownWrapper>
				<SidebarItem
					href={`/rest/${space.appId}/authentication/token-options`}
					label={'Token Options'}
				>
					<span slot="icon" class="flex items-center justify-center text-lg dark:text-gray-400">
						<svg
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class="h-6 w-6"
						>
							<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					</span>
				</SidebarItem>
				<li class="my-px">
					<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase"
						>Rest Endpoints</span
					>
				</li>

				<li class="my-px">
					<a
						href={`/rest/${space.appId}/authentication`}
						class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-300 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg dark:text-gray-400">
							<svg
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
								class="h-6 w-6"
							>
								<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</span>
						<span class="ml-3">Authentication</span>
					</a>
				</li>
				{#each $page.data?.tables ?? [] as table}
					<li class="my-px">
						<a
							href={`/rest/${space.appId}/${table.name}/endpoints/`}
							class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-100 hover:text-gray-700"
						>
							<span class="flex items-center justify-center text-lg dark:text-gray-400">
								<svg
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 96 960 960"
									width="24"
									><path
										d="M480 681 375 576l105-105 105 105-105 105Zm-85-294-83-83 168-168 168 168-83 83-85-85-85 85ZM208 744 40 576l168-168 83 83-85 85 85 85-83 83Zm544 0-83-83 85-85-85-85 83-83 168 168-168 168Zm-272 272L312 848l83-83 85 85 85-85 83 83-168 168Z"
									/></svg
								>
							</span>
							<span class="ml-3">{table?.name}</span>
						</a>
					</li>
				{/each}
				<li class="my-px">
					{#if user}
						<form method="post" action={`/a/${space.appId}/accounts?/signout`}>
							<button
								type="submit"
								class="flex w-full flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-100 hover:text-gray-700"
							>
								<span class="flex items-center justify-center text-lg text-red-400">
									<svg
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
										class="h-6 w-6"
									>
										<path
											d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
										/>
									</svg>
								</span>
								<span class="ml-3 dark:text-gray-300 text-gray-800"
									>{user ? 'Sign out' : 'Sign in'}</span
								>
							</button>
						</form>
					{:else}
						<a
							href="#"
							class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-100 hover:text-gray-700"
						>
							<span class="flex items-center justify-center text-lg text-red-400">
								<svg
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
									class="h-6 w-6"
								>
									<path
										d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<span class="ml-3">{user ? 'Sign out' : 'Sign in'}</span>
						</a>
					{/if}
				</li>
			</ul>
		</div>
	</aside>
	<main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
		<header class="header dark:bg-gray-800 bg-white shadow py-4 px-4">
			<div class="header-content flex items-center flex-row">
				<SpaceSearch />
				<div class="flex ml-auto">
					<div class="pt-1">
						<Button pill class="mr-4" size="xs" color="green">Live demo</Button>
					</div>
					<div class="mr-3">
						<DarkMode />
					</div>
					{#if user}
						<a href={`/a/${space?.appId}/accounts`} class="flex flex-row items-center">
							<img
								alt="User profile"
								src="https://pbs.twimg.com/profile_images/378800000298815220/b567757616f720812125bfbac395ff54_normal.png"
								class="h-10 w-10 bg-gray-200 border rounded-full"
							/>
							<span class="flex flex-col ml-2">
								<span
									class=" overflow-hidden dark:text-gray-100 w-20 font-semibold tracking-wide leading-none"
									>{user?.name}</span
								>
								<span class="truncate w-20 text-gray-500 text-xs leading-none mt-1"
									>{user?.role?.name}</span
								>
							</span>
						</a>
					{/if}
				</div>
			</div>
		</header>
		<div class="main-content dark:bg-gray-700  max-h-105 flex flex-col flex-grow p-1">
			<div class="flex flex-col  dark:bg-gray-700 overflow-auto flex-grow  bg-white rounded ">
				<slot />
			</div>
		</div>
	</main>
</div>
