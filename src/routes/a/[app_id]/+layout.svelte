<script>
	import { DarkMode } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const space = $page.data.space;
	const pathname = $page.url.pathname;
</script>

<!-- <SpaceNav />

<div class="dark:bg-gray-900  min-h-112 pb-64 pt-20">
	<div class="flex dark:bg-gray-900 ">
		{#if !/\/accounts/.test($page.url.pathname) && !/\/welcome/.test($page.url.pathname)}
			<div class="hidden md:block lg:block pt-6">
				<Sidebar>
					<SidebarWrapper class="max-h max-h-100 h-100 fixed w-64 ml-4 overflow-auto">
						<SidebarGroup>
							<SidebarItem href={`/rest/${$page.params["app_id"]}`} rel="external" label="Collections" />
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

<!-- component -->
<div class="flex flex-row min-h-screen dark:bg-gray-900 bg-gray-100 text-gray-800">
	<aside
		class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-gray-800 bg-indigo-500"
	>
		<div class="sidebar-header flex items-center justify-center py-4">
			<div class="inline-flex">
				<a href={`/a/${space.appId}`} class="inline-flex flex-row items-center">
					<span class="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase"
						>{space.name}</span
					>
				</a>
			</div>
		</div>
		<div class="sidebar-content px-4 py-6">
			<ul class="flex flex-col w-full">
				<li class="my-px">
					<a
						href="#"
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 dark:bg-gray-900 bg-gray-100"
					>
						<span class="flex items-center justify-center text-lg text-gray-400">
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
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
						</span>
						<span class="ml-3">Home</span>
					</a>
				</li>
				<li class="my-px">
					<span class="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">Project</span>
				</li>
				<li class="my-px">
					<a
						rel="external"
						href={`/rest/${space.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg text-gray-400">
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
						<span class="ml-3">Rest API</span>
					</a>
				</li>
				<li class="my-px">
					<a
						rel="external"
						href={`/preferences/${space.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg text-gray-400">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M120 936v-60h92V216h390v45h147v261h-60V321h-87v272h-60V276H272v600h206v60H120Zm575 40-5-48q-20-6-41-17.5T615 885l-42 20-35-54 38-30q-5-23-5-41.5t5-41.5l-38-30 35-55 42 20q13-12 34-24t41-18l5-49h60l6 49q20 6 41 18t34 24l42-20 35 55-38 30q5 23 5 41.5t-5 41.5l38 30-35 54-42-20q-13 14-34 25.5T761 928l-6 48h-60Zm30-95q44 0 73-29t29-73q0-44-29-73t-73-29q-44 0-73 29t-29 73q0 44 29 73t73 29ZM451 616q-17 0-28.5-11.5T411 576q0-17 11.5-28.5T451 536q17 0 28.5 11.5T491 576q0 17-11.5 28.5T451 616ZM272 876V276v600Z"
								/></svg
							>
						</span>
						<span class="ml-3">Preferences</span>
					</a>
				</li>
				<li class="my-px">
					<a
						href={`/dashboards/${space.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg text-gray-400">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h270V276H180v600Zm330 0h270V575H510v301Zm0-361h270V276H510v239Z"
								/></svg
							>
						</span>
						<span class="ml-3">Dashboards</span>
						<!-- <span
							class="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
							>1k</span
						> -->
					</a>
				</li>
				<li class="my-px">
					<a
						href={`/editor/${space.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-l">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h461V673H140v163Zm521 0h159V450H661v386ZM140 613h461V450H140v163Z"
								/></svg
							>
						</span>
						<span class="ml-3">User Interfaces</span>
					</a>
				</li>
				<li class="my-px">
					<span class="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">Account</span>
				</li>
				<li class="my-px">
					<a
						href="#"
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg text-gray-400">
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
						<span class="ml-3">Profile</span>
					</a>
				</li>
				<li class="my-px">
					<a
						href="#"
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg text-gray-400">
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
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
						</span>
						<span class="ml-3">Notifications</span>
						<span
							class="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
							>1</span
						>
					</a>
				</li>
				<li class="my-px">
					<a
						href="#"
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg text-gray-400">
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
									d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
								/>
								<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</span>
						<span class="ml-3">Settings</span>
					</a>
				</li>
				<li class="my-px">
					<a
						href="#"
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
						<span class="ml-3">Logout</span>
					</a>
				</li>
			</ul>
		</div>
	</aside>
	<main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
		<header class="header dark:bg-gray-800 bg-white shadow py-4 px-4">
			<div class="header-content flex items-center flex-row">
				<form action="#">
					<div class="hidden md:flex relative">
						<div
							class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
						>
							<svg
								class="h-6 w-6"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>

						<input
							id="search"
							type="text"
							name="search"
							class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
							placeholder="Search..."
						/>
					</div>
					<div class="flex md:hidden">
						<a href="#" class="flex items-center justify-center h-10 w-10 border-transparent">
							<svg
								class="h-6 w-6 text-gray-500"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</a>
					</div>
				</form>
				<div class="flex ml-auto">
					<div class="mr-3">
						<DarkMode />
					</div>
					<a href="" class="flex flex-row items-center">
						<img
							src="https://pbs.twimg.com/profile_images/378800000298815220/b567757616f720812125bfbac395ff54_normal.png"
							class="h-10 w-10 bg-gray-200 border rounded-full"
						/>
						<span class="flex flex-col ml-2">
							<span class=" dark:text-gray-100 w-20 font-semibold tracking-wide leading-none"
								>John Doe</span
							>
							<span class="truncate w-20 text-gray-500 text-xs leading-none mt-1">Manager</span>
						</span>
					</a>
				</div>
			</div>
		</header>
		<div class="main-content dark:bg-gray-700  max-h-105 flex flex-col flex-grow p-4">
			{#if !/\/welcome/.test(pathname) && !/\/accounts/.test(pathname)}
				<h1 class="font-bold dark:text-gray-100 text-2xl text-gray-700">Home</h1>
			{/if}
			<div class="flex flex-col  dark:bg-gray-700 overflow-auto flex-grow  bg-white rounded mt-4">
				<slot />
			</div>
		</div>
		<footer class="footer px-4 py-2">
			<div class="footer-content">
				<p class="text-xs text-gray-600 text-center">
					© {space.name}. All rights reserved.
				</p>
			</div>
		</footer>
	</main>
</div>
