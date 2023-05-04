<script>
	import { DarkMode, Button, SidebarDropdownItem, SidebarDropdownWrapper } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import SpaceNav from '$lib/components/SpaceNav.svelte';
	import SpaceSearch from '../../rest/[app_id]/SpaceSearch.svelte';
	let space = $page.data.space;
	let spaceSession = $page.data.spaceSession;
	let user = spaceSession?.user;
</script>

<SpaceNav modalOnly={true} />

<div class="flex flex-row min-h-screen dark:bg-gray-900 bg-gray-100 text-gray-800">
	<aside
		class="sidebar min-w-72 dark:text-gray-900 w-72  max-h-screen overflow-auto md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-gray-900 bg-gray-50"
	>
		<div class="sidebar-header flex items-center   ml-7 py-4">
			<div class="inline-flex">
				<a href={`/a/${space.appId}`} class="inline-flex flex-row items-center">
					<span class="leading-10 dark:text-gray-100 text-2xl font-bold ml-1 uppercase"
						>{space.name}</span
					>
					<span class="text-xs dark:text-gray-300 ml-2 mt-2">Dash</span>
				</a>
			</div>
		</div>
		<div class="sidebar-content px-4 py-6">
			<ul class="flex flex-col w-full">
				<li class="my-px">
					<a
						href={`/dashboards/${space.appId}`}
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
						>Collections</span
					>
				</li>
				<SidebarDropdownWrapper isOpen={/\/users/.test($page.url.pathname)} label={'Users'}>
					<svelte:fragment slot="icon">
						<svg
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 96 960 960"
							width="24"
							><path
								d="M0 816v-53q0-38.567 41.5-62.784Q83 676 150.376 676q12.165 0 23.395.5Q185 677 196 678.652q-8 17.348-12 35.165T180 751v65H0Zm240 0v-65q0-32 17.5-58.5T307 646q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.861-3.5-37.431Q773 696 765 678.727q11-1.727 22.171-2.227 11.172-.5 22.829-.5 67.5 0 108.75 23.768T960 763v53H780Zm-480-60h360v-6q0-37-50.5-60.5T480 666q-79 0-129.5 23.5T300 751v5ZM149.567 646Q121 646 100.5 625.438 80 604.875 80 576q0-29 20.562-49.5Q121.125 506 150 506q29 0 49.5 20.5t20.5 49.933Q220 605 199.5 625.5T149.567 646Zm660 0Q781 646 760.5 625.438 740 604.875 740 576q0-29 20.562-49.5Q781.125 506 810 506q29 0 49.5 20.5t20.5 49.933Q880 605 859.5 625.5T809.567 646ZM480 576q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600 456q0 50-34.5 85T480 576Zm.351-60Q506 516 523 498.649t17-43Q540 430 522.851 413t-42.5-17Q455 396 437.5 413.149t-17.5 42.5Q420 481 437.351 498.5t43 17.5ZM480 756Zm0-300Z"
							/></svg
						>
					</svelte:fragment>
					<SidebarDropdownItem
						active={/\/users\/overview/.test($page.url.pathname)}
						href={`/dashboards/${space.appId}/users/overview`}
						label={`Overview`}
					/>
					<SidebarDropdownItem
						active={/\/users\/add/.test($page.url.pathname)}
						href={`/dashboards/${space.appId}/users/add`}
						label={`Add`}
					/>
					<SidebarDropdownItem
						active={/\/users\/table/.test($page.url.pathname)}
						label={` Table`}
						href={`/dashboards/${space.appId}/users/table`}
					/>
					<SidebarDropdownItem
						active={/\/users\/sessions/.test($page.url.pathname)}
						href={`/dashboards/${space.appId}/users/sessions`}
						label={`Sessions`}
					/>
					<SidebarDropdownItem
						active={/\/users\/geo/.test($page.url.pathname)}
						href={`/dashboards/${space.appId}/users/geo`}
						label={`Geo`}
					/>
					<SidebarDropdownItem
						active={/\/users\/import/.test($page.url.pathname)}
						href={`/dashboards/${space.appId}/users/import`}
						label={`Import`}
					/>
					<SidebarDropdownItem
						active={/\/users\/export/.test($page.url.pathname)}
						href={`/dashboards/${space.appId}/users/export`}
						label={`Export `}
					/>
				</SidebarDropdownWrapper>

				{#each $page.data?.tables ?? [] as table}
					<SidebarDropdownWrapper open={$page.params.table === table.name} label={table.name}>
						<svelte:fragment slot="icon">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M140 896q-23 0-41.5-18.5T80 836V316q0-23 18.5-41.5T140 256h281l60 60h339q23 0 41.5 18.5T880 376H455l-60-60H140v520l102-400h698L833 850q-6 24-22 35t-41 11H140Zm63-60h572l84-340H287l-84 340Zm0 0 84-340-84 340Zm-63-460v-60 60Z"
								/></svg
							>
						</svelte:fragment>
						<SidebarDropdownItem
							active={/\/overview/.test($page.url.pathname) && table.name === $page.params.table}
							href={`/dashboards/${space.appId}/${table.name}/overview`}
							label={`Overview`}
						/>
						<SidebarDropdownItem
							active={/\/create/.test($page.url.pathname) && table.name === $page.params.table}
							href={`/dashboards/${space.appId}/${table.name}/create`}
							label={`Add ${table.name}`}
						/>
						<SidebarDropdownItem
							active={/^\/dashboards\/([^/]+)\/([^/]+)$/.test($page.url.pathname) &&
								table.name === $page.params.table}
							href={`/dashboards/${space.appId}/${table.name}`}
							label={`${table.name} Table`}
						/>
						<SidebarDropdownItem
							active={/\/import/.test($page.url.pathname) && table.name === $page.params.table}
							href={`/dashboards/${space.appId}/${table.name}/import`}
							label={`Import ${table.name}`}
						/>
						<SidebarDropdownItem
							active={/\/export/.test($page.url.pathname) && table.name === $page.params.table}
							href={`/dashboards/${space.appId}/${table.name}/export`}
							label={`Export ${table.name}`}
						/>
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
		<a class="w-full" rel="external" href="/early-access">
			<div class="bg-indigo-900 w-full text-center py-1 lg:px-4">
				<div
					class="p-1 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
					role="alert"
				>
					<span class="flex rounded-full bg-indigo-500 uppercase px-2 text-xs font-bold mr-3"
						>Alpha preview</span
					>
					<span class=" mr-2 text-left text-xs flex-auto"
						>Join the waitlist to be among the first to enjoy the limited possibilities of Spaces.</span
					>
					<svg
						class="fill-current opacity-75 h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						><path
							d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
						/></svg
					>
				</div>
			</div>
		</a>

		<header class="header dark:bg-gray-800 bg-white shadow py-1 px-4">
			<div class="header-content flex items-center flex-row">
				<SpaceSearch />
				<div class="flex ml-auto">
					{#if space.appId === 'demo' || space.appId === 'ecommerce'}
						<div class="pt-1">
							<Button pill class="mr-4" size="xs" color="green">Official demo</Button>
						</div>
					{/if}
					<div class="ml-1">
						<Button
							outline
							size="xs"
							rel="noreferrer"
							target="_blank"
							href="/{$page.data.space.appId}"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="18"
								fill="currentColor"
								viewBox="0 96 960 960"
								width="18"
								><path
									d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h279v60H180v600h600V597h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60V319L382 717Z"
								/></svg
							></Button
						>
					</div>
					<div class="mx-3">
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
			<div
				class="flex flex-col w w-3/6 max-w-6xl dark:bg-gray-700 overflow-auto flex-grow  bg-white rounded "
			>
				<slot />
			</div>
		</div>
	</main>
</div>
