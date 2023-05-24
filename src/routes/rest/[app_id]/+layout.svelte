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
	let whoAmi = 'clone_api';
	import { apiHelperModal } from '$lib/wsstore';
	import SelectOption from './quick-setup/SelectOption.svelte';
	let setup = (space?.apiSetup ?? [])[0];
	import Request from './[table]/endpoints/Request.svelte';
	import SpaceSearch from './SpaceSearch.svelte';
	import { useEffect } from '$lib/wsstore/hooks';

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

<div class="flex flex-row min-h-screen dark:bg-gray-900 bg-gray-100 text-gray-800">
	<aside
		class="sidebar hidden lg:block min-h-screen dark:text-gray-900 w-72 2xl:w-[30rem] 4xl:w-[36rem]  8xl:w-[75rem] 6xl:w-[64rem]   z-30 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-gray-900 bg-gray-50"
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
						class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-900 dark:text-gray-300 dark:bg-gray-900 bg-gray-100"
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

				<li class="my-px">
					<a
						href={`/rest/${space.appId}/authentication`}
						class="flex flex-row items-center h-10 {/\/authentication/.test($page.url.pathname) &&
						!/\/token-options/.test($page.url.pathname)
							? 'bg-gray-600 dark:text-gray-300'
							: 'dark:text-gray-300'} px-3 rounded-lg  hover:bg-gray-600 hover:text-gray-700"
					>
						<span class="flex items-center justify-center text-lg dark:text-gray-300">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M546 593q85-58 133.5-128T728 324q0-42-14-65t-38-23q-57 0-97 85t-40 200q0 20 1.5 38t5.5 34ZM120 936v-60h60v60h-60Zm165 0v-60h60v60h-60Zm165 0v-60h60v60h-60Zm165 0v-60h60v60h-60Zm165 0v-60h60v60h-60ZM122 772l-42-42 64-64-64-64 42-42 64 64 64-64 42 42-64 64 64 64-42 42-64-64-64 64Zm496-36q-32 0-57.5-14T517 681q-25 14-51.5 26.5T410 731l-21-56q28-11 53.5-22.5T492 627q-7-23-10-49.5t-3-56.5q0-146 55.5-245.5T676 176q51 0 81.5 41T788 327q0 88-57.5 172T570 650q10 13 22 19.5t26 6.5q35 0 71.5-30t68.5-86l55 26q-5 26-5.5 46t2.5 46q14-7 29.5-18.5T869 631l48 37q-25 31-55 49.5T806 736q-24 0-39-17t-18-49q-29 32-62.5 49T618 736Z"
								/></svg
							>
						</span>
						<span class="ml-3">Auth</span>
					</a>
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
	<main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
		<!-- <a class="w-full" rel="external" href="/early-access">
			<div class="bg-bdlue-900 w-full text-center py-1 lg:px-4">
				<div
					class="p-1 bg-blue-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
					role="alert"
				>
					<span class="flex rounded-full bg-blue-500 uppercase px-2 text-xs font-bold mr-3"
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
		</a> -->

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
		<div class="main-content dark:bg-gray-700  flex flex-col flex-grow p-1">
			<div
				class="flex flex-col max-w-[100%] dark:bg-gray-900 min-h-screen   p-6 rounded-xl  overflow-auto flex-grow  bg-white  "
			>
				<slot />
			</div>
		</div>
	</main>
</div>
