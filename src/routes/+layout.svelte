<script lang="ts">
	//@ts-nocheck

	import '../app.css';

	import {
		Drawer,
		CloseButton,
		Sidebar,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Button,
		DarkMode,
		Toast,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		Chevron
	} from 'flowbite-svelte';

	import { sineIn } from 'svelte/easing';
	let hidden2 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	import { page } from '$app/stores';
	const pathname = $page.url.pathname;
	let isDashboard = /\/dashboards/.test(pathname);
	let isEditor = /\/editor/.test(pathname);
	let isBase = /\/base/.test(pathname);
	let isSpaces = /\/spaces/.test(pathname);
	let spaceId = $page.params['app_id'];
	let session = $page.data.session;

	let subdomain = $page.data.subdomain;

	let isPreview =
		/^\/preview/.test(pathname) ||
		$page.params.appId ||
		/^\/forms\/(.+)\/?/.test(pathname) ||
		/^\/reports\/(.+)\/?/.test(pathname) ||
		/^\/editor\/(.+)\/?/.test(pathname) ||
		/^\/dashboards\/(.+)\/?/.test(pathname) ||
		/^\/preferences\/(.+)\/?/.test(pathname) ||
		/^\/rest\/(.+)\/?/.test(pathname) ||
		/^\/a\/(.+)\/?/.test(pathname) ||
		/^\/onboarding\/?/.test(pathname);


	import logo from '../assets/logo.png';
	import Rt from '$lib/ws/Rt.svelte';
	import { browser } from '$app/environment';

	let solutionsOpen = false;

	let acceptCookies = browser && JSON.parse(localStorage.getItem('cookie_consent') ?? 'false');
</script>

<Toast position="center" open={browser && !acceptCookies} class=" bottom-9 left-9  fixed z-50">
	<p class="text-sm">Cookie settings</p>
	<p class="my-2">
		This site relies on cookies to give you... Please accept our cookies so you can have the best
		experience with our software.
	</p>
	<Button
		on:click={() => {
			localStorage.setItem('cookie_consent', 'true');
			acceptCookies = true;
		}}>Accept</Button
	>
</Toast>

<Rt />

<svelte:head>
	<title>Dreamfeel spaces</title>
</svelte:head>

{#if subdomain}
	{@html $page.data.html}
{/if}

{#if isPreview && !subdomain}
	<slot />
{/if}

{#if !isPreview && !subdomain}
	<div>
		<nav
			class="flex-no-wrap fixed z-50 flex w-full items-center justify-between bg-neutral-100   dark:bg-gray-900 py-4 shadow-md shadow-black/5 dark:shadow-black/10 lg:flex-wrap lg:justify-start "
			data-te-navbar-ref
		>
			<div class="flex w-full flex-wrap items-center justify-between px-6">
				<button
					on:click={() => (hidden2 = false)}
					class="block border-0 bg-transparent py-2 px-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
					type="button"
					data-te-collapse-init
					data-te-target="#navbarSupportedContent1"
					aria-controls="navbarSupportedContent1"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="[&>svg]:w-7">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="h-7 w-7 dark:text-gray-100"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
				</button>
				<div
					class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
					id="navbarSupportedContent1"
					data-te-collapse-item
				>
					<div class="mr-4 cursor-pointer">
						<button on:click={() => (hidden2 = false)}>
							<svg
								class="dark:text-yellow-100"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
							>
								<path d="M120 816v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
							</svg>
						</button>
					</div>

					<a
						rel="external"
						on:click={() => (hidden2 = true)}
						class="mt-2 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mt-0"
						href="/"
					>
						<img src={logo} style="height: 30px" alt="logo transparent" loading="lazy" />
					</a>
					<!-- Left links -->
					<ul class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row" data-te-navbar-nav-ref>
						<li class="lg:pr-2" data-te-dropdown-ref>
							<button class="dark:text-white flex">
								<div class="flex self-center">Solutions</div>
								<div class="flex self-center  pt-1 ">
									<Chevron />
								</div>
							</button>
							<Dropdown class="w-72">
								<DropdownItem href="/rest" rel="external">
									<p>Rest APIs</p>
									<small>Collections, Auth, Payments, File storage etc... </small>
								</DropdownItem>
								<DropdownItem href="/dashboards" rel="external">
									<p>Dashboards</p>
									<small>AI Analytics, reports, forms, Import, export</small>
								</DropdownItem>
								<DropdownItem href="/editor" rel="external">
									<p>User interfaces</p>
									<small>UI builder, Tailwind CSS and Native components</small>
								</DropdownItem>
								<DropdownItem class="flex items-center justify-between">
									<p slot="header">Enterprise</p>
								<Chevron placement="right">
										<p>UI builder, Tailwind CSS and Native components</p>
									</Chevron>
								</DropdownItem>
								<Dropdown placement="right-start">
									<DropdownItem>E-Commerce</DropdownItem>
									<DropdownItem>SMEs</DropdownItem>
									<DropdownItem>Startups</DropdownItem>
									<DropdownItem>Non Profits</DropdownItem>
									<DropdownItem>Government organizations</DropdownItem>
									<DropdownItem>Schools</DropdownItem>
								</Dropdown>
							</Dropdown>
						</li>
						<li class="lg:pr-2" data-te-nav-item-ref>
							<a
								rel="external"
								class=" hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
								href="/create"
								data-te-nav-link-ref>New Space</a
							>
						</li>
						<!--	<li class="lg:pr-2" data-te-nav-item-ref>
							<a
								rel="external"
								class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
								href="/editor"
								data-te-nav-link-ref>Editor <small class="text-xs"> (preview)</small></a
							>
						</li> -->
						<!-- <li class="lg:pr-2" data-te-nav-item-ref>
							<a
								rel="external"
								class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
								href="/spaces"
								data-te-nav-link-ref>Spaces</a
							>
						</li> -->
					</ul>
					<!-- Left links -->
				</div>
				<!-- Collapsible wrapper -->

				<!-- Right elements -->
				<div class="relative flex items-center">
					<!-- Icon -->
					<a
						rel="external"
						class="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
						href="/about"
						id="dropdownMenuButton1"
						role="button"
						data-te-dropdown-toggle-ref
						aria-expanded="false"
					>
						About us
					</a>
					<a
						rel="external"
						class="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
						href="/docs"
						id="dropdownMenuButton1"
						role="button"
						data-te-dropdown-toggle-ref
						aria-expanded="false"
					>
						Docs
					</a>
					<a
						rel="external"
						class="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
						href="/blog"
						id="dropdownMenuButton1"
						role="button"
						data-te-dropdown-toggle-ref
						aria-expanded="false"
					>
						Blog
					</a>

					<a
						rel="external"
						class="mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
						href="/spaces"
					>
						<span class="[&>svg]:w-5">
							<svg
								class="dark:text-gray-100"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
							>
								<path
									d="M666 616 440 390l226-226 226 226-226 226Zm-546-80V216h320v320H120Zm400 400V616h320v320H520Zm-400 0V616h320v320H120Zm80-480h160V296H200v160Zm467 48 113-113-113-113-113 113 113 113Zm-67 352h160V696H600v160Zm-400 0h160V696H200v160Zm160-400Zm194-65ZM360 696Zm240 0Z"
								/>
							</svg>
						</span>
					</a>

					<div class="relative">
						<DarkMode />
					</div>
					<div class="relative" data-te-dropdown-ref>
						{#if $page.data.session}
							<a
								class="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
								href="/accounts"
								id="dropdownMenuButton2"
								role="button"
								data-te-dropdown-toggle-ref
								aria-expanded="false"
							>
								<img
									src={$page.data.session?.user?.image}
									class="rounded-full"
									style="height: 25px; width: 25px"
									alt=""
									loading="lazy"
								/>
							</a>
						{:else}
							<a href="/accounts"> <Button color="pinkToOrange" gradient>Sign in</Button></a>
						{/if}
						<ul
							class="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
							aria-labelledby="dropdownMenuButton2"
							data-te-dropdown-menu-ref
						>
							<li>
								<a
									class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
									href="/"
									data-te-dropdown-item-ref>Action</a
								>
							</li>
							<li>
								<a
									class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
									href="/"
									data-te-dropdown-item-ref>Another action</a
								>
							</li>
							<li>
								<a
									class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
									href="/"
									data-te-dropdown-item-ref>Something else here</a
								>
							</li>
						</ul>
					</div>
				</div>
				<!-- Right elements -->
			</div>
		</nav>
	</div>

	<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
		<div class="flex items-center">
			<a on:click={() => (hidden2 = true)} href="/">
				<img src={logo} style="height: 40px" alt="logo transparent" loading="lazy" />
			</a>
			<CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
		</div>
		<Sidebar>
			<SidebarWrapper divClass="overflow-y-auto py-4 px-3 ">
				<SidebarGroup>
					<SidebarItem
						active={/^\/admin/.test(pathname)}
						on:click={() => (hidden2 = true)}
						href="/admin"
						rel="external"
						label="Admin"
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
					<SidebarDropdownWrapper isOpen={isSpaces} label="Spaces">
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
						<SidebarDropdownItem
							on:click={() => (hidden2 = true)}
							href={`/create`}
							label={'New +'}
							rel="external"
							active={isSpaces && /$\/create/.test(pathname)}
						/>
						{#each $page.data.myapps as app}
							<SidebarDropdownItem
								on:click={() => (hidden2 = true)}
								href={`/a/${app.appId}`}
								label={app.name}
								rel="external"
								active={isSpaces && spaceId === app.appId}
							/>
						{/each}
					</SidebarDropdownWrapper>
					<!-- <SidebarDropdownWrapper isOpen={isBase} label="Apis">
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
						{#each $page.data.myapps as app}
							<SidebarDropdownItem
								on:click={() => (hidden2 = true)}
								href={`/base/${app.appId}`}
								label={app.name}
								rel="external"
								active={isBase && spaceId === app.appId}
							/>
						{/each}
					</SidebarDropdownWrapper> -->
					<!-- <SidebarDropdownWrapper isOpen={isDashboard} label="Dashboards">
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

						{#each $page.data.myapps as app}
							<SidebarDropdownItem
								on:click={() => (hidden2 = true)}
								href={`/dashboards/${app.appId}`}
								label={app.name}
								active={isDashboard && spaceId === app.appId}
								rel="external"
							/>
						{/each}
					</SidebarDropdownWrapper> -->
					<!-- <SidebarDropdownWrapper isOpen={isEditor} label="Editor">
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
						{#each $page.data.myapps as app}
							<SidebarDropdownItem
								on:click={() => (hidden2 = true)}
								href={`/editor/${app.appId}`}
								label={app.name}
								active={isEditor && spaceId === app.appId}
								rel="external"
							/>
						{/each}
					</SidebarDropdownWrapper> -->
					<SidebarDropdownWrapper isOpen={/\/blog/.test(pathname)} label="Blog">
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
						<SidebarDropdownItem
							on:click={() => (hidden2 = true)}
							label="Your posts"
							rel="external"
							href="/blog/my-posts"
							active={/\/blog\/my-posts/.test(pathname)}
						/>
						<SidebarDropdownItem
							on:click={() => (hidden2 = true)}
							label="Your drafts"
							href="/blog/drafts"
							rel="external"
							active={/\/blog\/drafts/.test(pathname)}
						/>
					</SidebarDropdownWrapper>
					<!-- <SidebarItem label="Kanban" {spanClass}>
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
					<svelte:fragment slot="subtext">
						<span
							class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
							>Pro</span
						>
					</svelte:fragment>
				</SidebarItem> -->
					<!-- <SidebarItem label="Inbox" {spanClass}>
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
								d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
							/></svg
						>
					</svelte:fragment>
					<svelte:fragment slot="subtext">
						<span
							class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200"
							>3</span
						>
					</svelte:fragment>
				</SidebarItem> -->
					<!-- <SidebarItem label="Your account">
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
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/></svg
						>
					</svelte:fragment>
				</SidebarItem> -->
					<SidebarItem
						on:click={() => (hidden2 = true)}
						href="/accounts"
						label={Boolean(session) ? 'Sign out' : 'Sign In'}
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
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
								/></svg
							>
						</svelte:fragment>
					</SidebarItem>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</Drawer>
	<div class="pt-16 dark:bg-gray-900">
		<slot />
	</div>
{/if}
