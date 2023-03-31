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
	let setup = space?.apiSetup ?? [];
</script>

<SpaceNav modalOnly={true} />

{#if !Boolean($page.params.path)}
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
						<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase"
							>UI Groups</span
						>
					</li>
					{#each $page.data?.space?.spaceUis ?? [] as ui}
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
										d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
									/><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
									/></svg
								>
							</svelte:fragment>
							{#each ui.spaceUIVersion as uiV}
								<SidebarDropdownItem
									href={`/editor/${space.appId}/${uiV.id}`}
									label={`Version - ${uiV.version}`}
								/>
							{/each}
						</SidebarDropdownWrapper>
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
					<!-- <SpaceSearch /> -->
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
{:else}
	<slot />
{/if}
