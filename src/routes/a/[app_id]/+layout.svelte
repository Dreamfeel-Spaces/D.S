<script>
	import { DarkMode, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import SpaceNav from '$lib/components/SpaceNav.svelte';
	import SpaceSearch from '../../rest/[app_id]/SpaceSearch.svelte';
	const space = $page.data.space;
	const spaceSession = $page.data.spaceSession;
	const user = spaceSession?.user;
	const hasUser = Boolean(user?.id)
	const pathname = $page.url.pathname;
</script>

<SpaceNav modalOnly={true} />

<div class="flex flex-row min-h-screen dark:bg-gray-900 bg-gray-100 text-gray-800">
	<aside
		class="sidebar dark:text-gray-900 w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-gray-900 bg-gray-50"
	>
		<div class="sidebar-header flex items-center  ml-7 py-4">
			<div class="inline-flex">
				<a href={`/a/${space.appId}`} class="inline-flex flex-row items-center">
					<span class="leading-10 dark:text-gray-100 text-2xl font-bold ml-1 uppercase"
						>{space.name}</span
					>
				</a>
			</div>
		</div>
		<div class="sidebar-content px-4 py-6">
			<ul class="flex flex-col w-full">
				<li class="my-px">
					<a
						href={`/a/${space?.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-100 dark:bg-gray-900 bg-gray-100"
					>
						<span class="flex items-center justify-center text-lg dark:text-gray-100">
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
					<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase">Space</span>
				</li>
				<li class="my-px">
					<a
						href={`/rest/${space.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 hover:text-gray-700"
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
						<span class="ml-3">Rest API</span>
					</a>
				</li>
				<!-- <li class="my-px">
					<a
						href={`/preferences/${space.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg dark:text-gray-400">
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
				</li> -->
				<li class="my-px">
					<a
						href={`/dashboards/${space.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg dark:text-gray-400">
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
						class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-l">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M70 936q-12.75 0-21.375-8.675Q40 918.649 40 905.825 40 893 48.625 884.5T70 876h820q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 936H70Zm70-120q-24 0-42-18t-18-42V276q0-24 18-42t42-18h680q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680V276H140v480Zm0 0V276v480Z"
								/></svg
							>
						</span>
						<span class="ml-3">User Interfaces</span>
					</a>
				</li>
				<li class="my-px">
					<a
						href={`/a/${space.appId}/roles`}
						class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-l">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M140 976q-24 0-42-18t-18-42V436q0-24 18-42t42-18h237V236q0-24 18-42t42-18h87q24 0 42 18t18 42v140h236q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680V436H584q0 28-18.5 44T519 496h-78q-27 0-45.5-16T377 436H140v480Zm92-107h239v-14q0-18-9-32t-23-19q-32-11-50-14.5t-35-3.5q-19 0-40.5 4.5T265 744q-15 5-24 19t-9 32v14Zm336-67h170v-50H568v50Zm-214-50q22.5 0 38.25-15.75T408 638q0-22.5-15.75-38.25T354 584q-22.5 0-38.25 15.75T300 638q0 22.5 15.75 38.25T354 692Zm214-63h170v-50H568v50ZM437 436h87V236h-87v200Zm43 240Z"
								/></svg
							>
						</span>
						<span class="ml-3">User Roles</span>
					</a>
				</li>

				<li class="my-px">
					<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase"
						>Account</span
					>
				</li>
				<li class="my-px">
					<a
						href={`/a/${space.appId}/accounts`}
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
						<span class="ml-3">Profile</span>
					</a>
				</li>
				<li class="my-px">
					<a
						href="#"
						class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 hover:text-gray-700"
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
						href={`/a/${space.appId}/preferences`}
						class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 hover:text-gray-700"
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
								<path
									d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
								/>
								<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</span>
						<span class="ml-3">Preferences</span>
					</a>
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
					<div class="mr-3">
						<DarkMode />
					</div>
					{#if hasUser}
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
									>{user?.role?.name ?? "Unknown Role"}</span
								>
							</span>
						</a>
					{/if}
				</div>
			</div>
		</header>
		<div class="main-content dark:bg-gray-700  max-h-105 flex flex-col flex-grow p-2">
			<div class="flex flex-col  dark:bg-gray-700 overflow-auto flex-grow  bg-white rounded ">
				<slot />
			</div>
		</div>
		<footer class="footer px-4 py-2">
			<div class="footer-content">
				<p class="text-xs text-gray-600 text-center">© Dreamfeel Spaces. All rights reserved.</p>
			</div>
		</footer>
	</main>
</div>
