<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { DarkMode, Button, Modal, Checkbox, Avatar } from 'flowbite-svelte';
	let space = $page.data.space;
	import feelLogo from '$lib/assets/beta-logo.png';
	import SpaceSearch from '../rest/[app_id]/SpaceSearch.svelte';
	let user = null;
</script>

{#if /\/a$/.test($page.url.pathname) || /\/a\/d\//.test($page.url.pathname)}
	<div class="flex flex-row h-screen dark:bg-black bg-gray-100 text-gray-800">
		<aside
			class="sidebar h-screen overflow-auto dark:text-gray-900 w-72  z-30 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-black bg-gray-50"
		>
			<div class="sidebar-header  items-center  py-3">
				<a href="/" rel="external" class="flex justify-center">
					<img width="72" alt="Dreamfeel Spaces Logo" src={feelLogo} />
				</a>
			</div>
			<div class="sidebar-content px-4 py-1">
				<ul class="flex flex-col w-full">
					<li class="my-px">
						<a
							href={`/a/`}
							id="rest_link"
							class="flex flex-row   items-center  h-10 px-3 {/\/a$/.test($page.url.pathname)
								? 'bg-blue-900 text-white'
								: ''} rounded-lg dark:text-gray-100">All</a
						>
					</li>
					{#each $page.data.apps ?? [] as app}
						<li class="my-px">
							<a
								rel="external"
								href={`/a/d/${app.appId}`}
								id="rest_link {app.appId}"
								class="flex flex-row hover:bg-blue-300 hover:text-black items-center  h-10 px-3 {$page
									.params.d === app.appId
									? 'bg-blue-900 text-white'
									: ''} rounded-lg dark:text-gray-100">{app.name}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</aside>
		<main
			class="main flex dark:bg-black flex-col h-full flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in"
		>
			<header class="header dark:bg-black bg-white shadow py-1 px-4">
				<div class="header-content gap-4 flex items-center flex-row">
					<span class="text-lg dark:text-gray-300 mt-2 ml-2">Your Apps</span>

					<SpaceSearch />
					<div class="flex ml-auto">
						{#if space?.appId === 'demo' || space?.appId === 'ecommerce'}
							<div class="pt-1">
								<Button pill class="mr-4" size="xs" color="green">Official demo</Button>
							</div>
						{/if}
						<div class="ml-1">
							<Button outline size="xs" rel="noreferrer" target="_blank" href="/create">
								<svg
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									height="24"
									viewBox="0 96 960 960"
									width="24"
									><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z" /></svg
								></Button
							>
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
			<div
				class="main-content flex-1 overflow-hidden dark:bg-gray-700  flex flex-col flex-grow p-2"
			>
				<div
					class="flex flex-col max-w-[100%]  dark:bg-black   p-6 rounded-xl  overflow-auto flex-grow  bg-white  "
				>
					<slot />
				</div>
			</div>
			<footer class="footer dark:bg-black mt-2  px-4 py-2">
				<div class="footer-content">
					<p class="text-xs text-gray-600 dark:text-gray-300 text-center">
						© Dreamfeel Spaces. All rights reserved.
					</p>
				</div>
			</footer>
		</main>
	</div>
{:else}
	<slot />
{/if}
