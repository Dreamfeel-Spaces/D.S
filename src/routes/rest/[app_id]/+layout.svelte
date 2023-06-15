<script>
	import {
		DarkMode,
		Button,
		SidebarItem,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		Modal,
		Textarea,
		Dropzone,
		Radio,
		Alert,

		Hr

	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import SpaceNav from '$lib/components/SpaceNav.svelte';
	const space = $page.data.space;
	const spaceSession = $page.data.spaceSession;
	const user = spaceSession?.user;
	let whoAmi = 'clone_api';
	import { apiHelperModal } from '$lib/wsstore';
	import SelectOption from './quick-setup/SelectOption.svelte';
	let setup = (space?.apiSetup ?? [])[0];
	import Request from './[table]/endpoints/Request.svelte';
	import SpaceSearch from './SpaceSearch.svelte';
	import { useEffect } from '$lib/wsstore/hooks';

	const hasUser = Boolean(user?.id);

	useEffect(
		() => {},
		() => [$page.url.pathname]
	);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

<SpaceNav modalOnly={true} />

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

<div class="flex flex-row h-screen dark:bg-black bg-gray-100 text-gray-800">
	<aside
		class="sidebar h-full overflow-auto hidden lg:block min-h-screen dark:text-gray-900 w-72 2xl:w-[30rem] 4xl:w-[36rem]  8xl:w-[75rem] 6xl:w-[64rem]   z-30 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-black bg-gray-50"
	>
	<div class="sidebar-header  flex justify-center pt-3    py-1">
		<div class="flex  ">
			{#if space?.icon}
				<img width="36" alt="Space icon" src={space?.icon} />
			{/if}
			<a href={`/a/${space.appId}`} class="inline-flex flex-row items-center">
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
	<Hr />
		<div class="sidebar-content px-4 py-6">
			<ul class="flex flex-col w-full">
				<li class="my-px">
					<a
						href={`/rest/${space.appId}`}
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-900 dark:text-gray-300 {!/\/rest\/([^/]+)\//.test(
							$page.url.pathname
						)
							? 'bg-blue-900 text-white'
							: ''}"
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
				<!-- <li class="my-px">
					<a
						href={`/rest/${space.appId}/table/create`}
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-900 dark:text-gray-300 dark:bg-black bg-gray-100"
					>
						<span class="flex items-center justify-center text-lg text-gray-400">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z" /></svg
							>
						</span>
						<span class="ml-3">Add</span>
					</a>
				</li> -->
				<li class="my-px">
					<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase">API</span>
				</li>
				<SidebarDropdownWrapper
					isOpen={/\/rest\/([^/]+)\/([^/]+)/.test($page.url.pathname) &&
						!$page.url.pathname.includes('permissions') &&
						!$page.url.pathname.includes('create') &&
						!$page.url.pathname.includes('endpoints') &&
						!$page.url.pathname.includes('events') &&
						!$page.url.pathname.includes('file_storage') &&
						!$page.url.pathname.includes('sms') &&
						!/\/mail/.test($page.url.pathname) &&
						!/\/push_notifications/.test($page.url.pathname) &&
						!/\/logs/.test($page.url.pathname) &&
						!/\/token-options/.test($page.url.pathname) &&
						!/\/authentication/.test($page.url.pathname)}
					label={'Models'}
				>
					<svelte:fragment slot="icon">
						<svg
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 96 960 960"
							width="24"
							><path
								d="M570 896v-60h120q21 0 35.5-14.375T740 786V686q0-37 22.5-66t57.5-40v-8q-35-10-57.5-39.5T740 466V366q0-21.25-14.375-35.625T690 316H570v-60h120q46 0 78 32.083 32 32.084 32 77.917v100q0 21.25 14.375 35.625T850 516h30v120h-30q-21.25 0-35.625 14.375T800 686v100q0 45.833-32.083 77.917Q735.833 896 690 896H570Zm-300 0q-46 0-78-32.083-32-32.084-32-77.917V686q0-21.25-14.375-35.625T110 636H80V516h30q21.25 0 35.625-14.375T160 466V366q0-45.833 32.083-77.917Q224.167 256 270 256h120v60H270q-21 0-35.5 14.375T220 366v100q0 37-22.5 66.5T140 572v8q35 11 57.5 40t22.5 66v100q0 21.25 14.375 35.625T270 836h120v60H270Z"
							/></svg
						>
					</svelte:fragment>

					{#each $page.data?.tables ?? [] as table}
						<SidebarDropdownItem
							active={$page.params.table === table.name &&
								/\/rest\/([^/]+)\/([^/]+)/.test($page.url.pathname) &&
								!$page.url.pathname.includes('permissions')}
							href={`/rest/${space.appId}/${table.name}/`}
							label={table.label || table.name}
						/>
					{/each}
				</SidebarDropdownWrapper>
				<SidebarDropdownWrapper
					isOpen={/\/rest\/([^/]+)\/([^/]+)/.test($page.url.pathname) &&
						$page.url.pathname.includes('permissions')}
					label={'Permissions'}
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							fill="currentColor"
							viewBox="0 96 960 960"
							width="24"
							><path
								d="M140 976q-24 0-42-18t-18-42V436q0-24 18-42t42-18h237V236q0-24 18-42t42-18h87q24 0 42 18t18 42v140h236q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680V436H584q0 28-18.5 44T519 496h-78q-27 0-45.5-16T377 436H140v480Zm92-107h239v-14q0-18-9-32t-23-19q-32-11-50-14.5t-35-3.5q-19 0-40.5 4.5T265 744q-15 5-24 19t-9 32v14Zm336-67h170v-50H568v50Zm-214-50q22.5 0 38.25-15.75T408 638q0-22.5-15.75-38.25T354 584q-22.5 0-38.25 15.75T300 638q0 22.5 15.75 38.25T354 692Zm214-63h170v-50H568v50ZM437 436h87V236h-87v200Zm43 240Z"
							/></svg
						>
					</svelte:fragment>

					{#each $page.data?.tables ?? [] as table}
						<SidebarDropdownItem
							active={$page.params.table === table.name &&
								/\/rest\/([^/]+)\/([^/]+)/.test($page.url.pathname) &&
								$page.url.pathname.includes('permissions')}
							href={`/rest/${space.appId}/${table.name}/permissions`}
							label={table.label ?? table?.name}
						/>
					{/each}
				</SidebarDropdownWrapper>
				<SidebarDropdownWrapper
					isOpen={/\/rest\/([^/]+)\/([^/]+)/.test($page.url.pathname) &&
						$page.url.pathname.includes('events')}
					label={'Events'}
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							height="24"
							viewBox="0 96 960 960"
							width="24"
							><path
								d="m393 891 279-335H492l36-286-253 366h154l-36 255Zm-73 85 40-280H160l360-520h80l-40 320h240L400 976h-80Zm153-395Z"
							/></svg
						>
					</svelte:fragment>

					{#each $page.data?.tables ?? [] as table}
						<SidebarDropdownItem
							active={$page.params.table === table.name &&
								/\/rest\/([^/]+)\/([^/]+)/.test($page.url.pathname) &&
								$page.url.pathname.includes('events')}
							href={`/rest/${space.appId}/${table.name}/events`}
							label={table.label ?? table?.name}
						/>
					{/each}
				</SidebarDropdownWrapper>

				<SidebarItem
					href={`/rest/${space.appId}/authentication/token-options`}
					label={'Token Options'}
					active={/\/token-options/.test($page.url.pathname)}
				>
					<span slot="icon" class="flex items-center justify-center text-lg dark:text-gray-300">
						<svg
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 96 960 960"
							width="24"
							><path
								d="M80 856v-61h800v61H80Zm38-254-40-22 40-68H40v-45h78l-40-68 40-22 38 67 38-67 40 22-40 68h78v45h-78l40 68-40 22-38-67-38 67Zm324 0-40-24 40-68h-78v-45h78l-40-68 40-22 38 67 38-67 40 22-40 68h78v45h-78l40 68-40 24-38-67-38 67Zm324 0-40-24 40-68h-78v-45h78l-40-68 40-22 38 67 38-67 40 22-40 68h78v45h-78l40 68-40 24-38-67-38 67Z"
							/></svg
						>
					</span>
				</SidebarItem>
				<li class="my-px">
					<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase"
						>Rest Endpoints</span
					>
				</li>

				{#each $page.data?.tables ?? [] as table}
					<li class="my-px">
						<a
							href={`/rest/${space.appId}/${table.name}/endpoints/`}
							class="flex flex-row items-center h-10 px-2 rounded-lg {/\/endpoints/.test(
								$page.url.pathname
							) && $page.params.table === table.name
								? 'bg-gray-600'
								: 'dark:text-gray-300'} dark:text-gray-300 hover:bg-gray-600 hover:text-gray-700"
						>
							{#if table.icon}
								<span class="material-symbols-outlined">
									{table.icon}
								</span>
							{:else}
								<span
									style="color:{table.colorCode}"
									class="flex items-center justify-center text-lg"
								>
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
							{/if}
							<span class="ml-3 ">{table?.label ?? table?.name}</span>
						</a>
					</li>
				{/each}
				<li class="my-px">
					<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase"
						>Preferences</span
					>
				</li>
				<SidebarItem
					active={/\/file_storage/.test($page.url.pathname)}
					href={`/rest/${space.appId}/file_storage`}
					label={`File storage`}
				>
					<span slot="icon" class="flex items-center justify-center text-lg dark:text-gray-300">
						<span class="material-symbols-outlined"> home_storage </span>
					</span></SidebarItem
				>
				<SidebarItem
					href={`/rest/${space.appId}/sms`}
					active={/\/sms/.test($page.url.pathname)}
					label={`SMS`}
				>
					<span slot="icon" class="material-symbols-outlined"> sms </span></SidebarItem
				>
				<SidebarItem
					href={`/rest/${space.appId}/mail`}
					active={/\/mail/.test($page.url.pathname)}
					label={`Mail`}
				>
					<span slot="icon" class="material-symbols-outlined"> mail </span></SidebarItem
				>
				<SidebarItem
					href={`/rest/${space.appId}/push_notifications`}
					active={/\/push_notifications/.test($page.url.pathname)}
					label={`Push notifications`}
				>
					<span slot="icon" class="material-symbols-outlined"> schedule_send </span></SidebarItem
				>
				<li class="my-px">
					<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase"
						>Application</span
					>
				</li>
				<SidebarItem
					href={`/rest/${space.appId}/logs`}
					active={/\/logs/.test($page.url.pathname)}
					label={`Logs`}
				>
					<span slot="icon" class="material-symbols-outlined"> electric_meter </span></SidebarItem
				>
			</ul>
		</div>
	</aside>
	<main
		class="main flex dark:bg-black flex-col h-full flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in"
	>
		<header class="header rounded-b-lg dark:bg-black shadow-lg bg-white  py-1 px-4">
			<div class="header-content flex items-center flex-row gap-3">
				<span class="text-lg dark:text-gray-300  ml-2">Admin</span>

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
		<div class="main-content flex-1 overflow-hidden dark:bg-gray-700  flex flex-col flex-grow p-2">
			<div
				class="flex flex-col max-w-[100%]  dark:bg-black   p-6 rounded-xl  overflow-auto flex-grow  bg-white  "
			>
				<slot />
			</div>
		</div>
		<footer class="footer  px-4 py-2">
			<div class="footer-content">
				<p class="text-xs text-gray-600 dark:text-gray-300 text-center">
					© Dreamfeel Spaces. All rights reserved.
				</p>
			</div>
		</footer>
	</main>
</div>
