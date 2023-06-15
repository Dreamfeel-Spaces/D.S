<script>
	import {
		DarkMode,
		Button,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		Hr
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import SpaceNav from '$lib/components/SpaceNav.svelte';
	import SpaceSearch from '../../rest/[app_id]/SpaceSearch.svelte';
	let space = $page.data.space;
	let spaceSession = $page.data.spaceSession;
	let user = spaceSession?.user;
	const hasUser = Boolean(user?.id);
</script>

<SpaceNav modalOnly={true} />

<div class="flex flex-row h-screen dark:bg-black bg-gray-100 text-gray-800">
	<aside
		class="sidebar m h-full border-r  border-gray-800  hide-print dark:text-gray-900 w- w-60   overflow-auto md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-black bg-gray-50"
	>
		<div class="sidebar-header border-b  border-gray-800 gap-3  flex justify-center pt-1    py-1">
			<div class="flex  ">
				{#if space?.icon}
					<img width="36" alt="Space icon" src={space?.icon} />
				{/if}
				<a href={`/dashboards/${space.appId}`} class="inline-flex flex-row items-center">
					<span class="leading-10 dark:text-gray-100 text-xl font-bold ml-1 uppercase"
						>{space.name}</span
					>
					{#if space.appId === 'demo' || space.appId === 'ecommerce'}
						<div class="pt-1 ml-1 text-blue-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								height="20"
								viewBox="0 -960 960 960"
								width="20"
								><path
									d="m346-60-76-130-151-31 17-147-96-112 96-111-17-147 151-31 76-131 134 62 134-62 77 131 150 31-17 147 96 111-96 112 17 147-150 31-77 130-134-62-134 62Zm27-79 107-45 110 45 67-100 117-30-12-119 81-92-81-94 12-119-117-28-69-100-108 45-110-45-67 100-117 28 12 119-81 94 81 92-12 121 117 28 70 100Zm107-341Zm-43 133 227-225-45-41-182 180-95-99-46 45 141 140Z"
								/></svg
							>
						</div>
					{/if}
				</a>
			</div>
		</div>
		<div class="sidebar-content px-4 py-6">
			<ul class="flex flex-col w-full">
				<li class="my-px">
					<a
						href={`/dashboards/${$page.params.app_id}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-900 dark:text-gray-300 dark:bg-black bg-gray-100"
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
						href={`/dashboards/${$page.params.app_id}/users/overview`}
						label={`Overview`}
					/>
					<SidebarDropdownItem
						active={/\/users\/add/.test($page.url.pathname)}
						href={`/dashboards/${$page.params.app_id}/users/add`}
						label={`Add`}
					/>
					<SidebarDropdownItem
						active={/\/users\/table/.test($page.url.pathname)}
						label={` Table`}
						href={`/dashboards/${$page.params.app_id}/users/table`}
					/>
					<SidebarDropdownItem
						active={/\/users\/sessions/.test($page.url.pathname)}
						href={`/dashboards/${$page.params.app_id}/users/sessions`}
						label={`Sessions`}
					/>
					<SidebarDropdownItem
						active={/\/users\/geo/.test($page.url.pathname)}
						href={`/dashboards/${$page.params.app_id}/users/geo`}
						label={`Geo`}
					/>
					<SidebarDropdownItem
						active={/\/users\/import/.test($page.url.pathname)}
						href={`/dashboards/${$page.params.app_id}/users/import`}
						label={`Import`}
					/>
					<SidebarDropdownItem
						active={/\/users\/export/.test($page.url.pathname)}
						href={`/dashboards/${$page.params.app_id}/users/export`}
						label={`Export `}
					/>
				</SidebarDropdownWrapper>

				{#each $page.data?.tables ?? [] as table}
					<SidebarDropdownWrapper
						isOpen={$page.params.table === table.name}
						label={table.label ?? table?.name}
					>
						<svelte:fragment slot="icon">
							<span class="material-symbols-outlined">
								{table.icon}
							</span>
						</svelte:fragment>
						<SidebarDropdownItem
							active={/\/overview/.test($page.url.pathname) && table.name === $page.params.table}
							href={`/dashboards/${$page.params.app_id}/${table.name}/overview`}
							label={`Overview`}
						/>
						<SidebarDropdownItem
							active={/\/create/.test($page.url.pathname) && table.name === $page.params.table}
							href={`/dashboards/${$page.params.app_id}/${table.name}/create`}
							label={`Add ${table.name}`}
						/>
						<SidebarDropdownItem
							active={/^\/dashboards\/([^/]+)\/([^/]+)$/.test($page.url.pathname) &&
								table.name === $page.params.table}
							href={`/dashboards/${$page.params.app_id}/${table.name}`}
							label={`${table.name} Table`}
						/>
						<SidebarDropdownItem
							active={/\/import/.test($page.url.pathname) && table.name === $page.params.table}
							href={`/dashboards/${$page.params.app_id}/${table.name}/import`}
							label={`Import ${table.name}`}
						/>
						<SidebarDropdownItem
							active={/\/export/.test($page.url.pathname) && table.name === $page.params.table}
							href={`/dashboards/${$page.params.app_id}/${table.name}/export`}
							label={`Export ${table.name}`}
						/>
					</SidebarDropdownWrapper>
				{/each}

				<!-- <li class="my-px">
					{#if user}
						<form method="post" action={`/a/${$page.params.app_id}/accounts?/signout`}>
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
				</li> -->
			</ul>
		</div>
	</aside>
	<main
		class="main h-full flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in"
	>
		<header class="header rounded-b-lg dark:bg-black shadow-lg bg-white  py-1 px-4">
			<div class="header-content flex items-center flex-row gap-3">
				<span class="text-lg dark:text-gray-300  ml-2">Dashboards</span>

				<SpaceSearch />
				<div class="flex ml-auto">
					<div class="ml-1">
						<Button
							outline
							size="xs"
							class="relative"
							rel="noreferrer"
							target="_blank"
							href="/{$page.data.space.appId}"
						>
							<svg
								class="absolute -top-1  -right-2"
								xmlns="http://www.w3.org/2000/svg"
								height="18"
								fill="currentColor"
								viewBox="0 96 960 960"
								width="18"
								><path
									d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h279v60H180v600h600V597h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60V319L382 717Z"
								/></svg
							>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								height="18"
								viewBox="0 -960 960 960"
								width="18"
								><path
									d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-43-61v-82q-35 0-59-26t-24-61v-44L149-559q-5 20-7 39.5t-2 39.5q0 130 84.5 227T437-141Zm294-108q22-24 38.5-51t28-56.5q11.5-29.5 17-60.5t5.5-63q0-106-58-192.5T607-799v18q0 35-24 61t-59 26h-87v87q0 17-13.5 28T393-568h-83v88h258q17 0 28 13t11 30v127h43q29 0 51 17t30 44Z"
								/></svg
							>
						</Button>
					</div>
					<div class="mx-3">
						<Button
							outline
							class="relative"
							size="xs"
							rel="noreferrer"
							target="_blank"
							href="/a/{$page.data.space.appId}"
						>
							<svg
								class="absolute -top-1  -right-2"
								xmlns="http://www.w3.org/2000/svg"
								height="18"
								fill="currentColor"
								viewBox="0 96 960 960"
								width="18"
								><path
									d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h279v60H180v600h600V597h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60V319L382 717Z"
								/></svg
							>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								height="18"
								viewBox="0 -960 960 960"
								width="18"
								><path
									d="M690.882-270q25.883 0 44-19Q753-308 753-333.882q0-25.883-18.118-44-18.117-18.118-44-18.118Q665-396 646-377.882q-19 18.117-19 44Q627-308 646-289q19 19 44.882 19ZM689.5-145q33.5 0 60.5-14t46-40q-26-14-51.962-21-25.961-7-54-7-28.038 0-54.538 7-26.5 7-51.5 21 19 26 45.5 40t60 14ZM480-80q-138-32-229-156.5T160-522v-239l320-120 320 120v270q-14-7-30-12.5t-30-7.5v-208l-260-96-260 96v197q0 76 24.5 140T307-269.5q38 48.5 84 80.5t89 46q6 12 18 27t20 23q-9 5-19 7.5T480-80Zm212.5 0Q615-80 560-135.5T505-267q0-78.435 54.99-133.717Q614.98-456 693-456q77 0 132.5 55.283Q881-345.435 881-267q0 76-55.5 131.5T692.5-80ZM480-479Z"
								/></svg
							></Button
						>
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
									>{user?.role?.name ?? 'Unknown Role'}</span
								>
							</span>
						</a>
					{/if}

					<div class="dark:text-white ml-2 flex self-center">
						<!-- <button on:click={() => (help = true)}>
						<svg
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 96 960 960"
							width="24"
							><path
								d="M484 809q16 0 27-11t11-27q0-16-11-27t-27-11q-16 0-27 11t-11 27q0 16 11 27t27 11Zm-35-146h59q0-26 6.5-47.5T555 566q31-26 44-51t13-55q0-53-34.5-85T486 343q-49 0-86.5 24.5T345 435l53 20q11-28 33-43.5t52-15.5q34 0 55 18.5t21 47.5q0 22-13 41.5T508 544q-30 26-44.5 51.5T449 663Zm31 313q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"
							/></svg
						>
					</button> -->
						<!-- <Modal bind:open={help}>
							<div slot="header" class="text-lg">Help</div>
							<div>
								<div>Additional resources</div>
								<Button on:click={handleQG}>Guide</Button>
								<Button on:click={handleWatch}>Video</Button>
							</div>
						</Modal> -->
					</div>
				</div>
			</div>
		</header>
		<div class="main-content flex-1 overflow-auto  dark:bg-gray-700   flex flex-col flex-grow p-1">
			<div
				class="flex print-area fle max-w-2x max-w-7xl  dark:bg-black pb-20 overflow-auto flex-grow  bg-white rounded "
			>
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

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

<style>
	@media print {
		.hide-print {
			display: none !important;
		}
		.print-area {
			display: block;
		}
	}
</style>
