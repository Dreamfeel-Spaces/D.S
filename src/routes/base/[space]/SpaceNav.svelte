<script>
	import { page } from '$app/stores';
	import {
		Drawer,
		CloseButton,
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarDropdownWrapper,
		SidebarDropdownItem,
		Button
	} from 'flowbite-svelte';
	import logo from '../../../assets/logo.png';
	const space = $page?.data?.space;
	import { sineIn } from 'svelte/easing';
	let hidden2 = true;
	let transitionParams = {
		x: 320,
		duration: 200,
		easing: sineIn
	};
</script>

<nav
	class="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start "
	data-te-navbar-ref
>
	<div class="flex w-full flex-wrap items-center justify-between px-6">
		<div
			class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
			id="navbarSupportedContent1"
			data-te-collapse-item
		>
			<a
				rel="external"
				class="mt-2 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mt-0"
				href="/"
			>
				<img src={logo} style="height: 40px" alt="logo transparent" loading="lazy" />
			</a>

			<!-- Left links -->
			<ul class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row" data-te-navbar-nav-ref>
				<li class="lg:pr-2" data-te-nav-item-ref>
					<a
						rel="external"
						class="text-neutral-500 text-2xl hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
						href={`/a/${$page.data?.space?.appId}`}
						data-te-nav-link-ref
					>
						{$page.data?.space?.name}
					</a>
				</li>
			</ul>
			<!-- Left links -->
		</div>

		<div class="flex-1" />

		<!-- Right elements -->
		<div class="relative flex items-center">
			<div class="relative" data-te-dropdown-ref>
				<ul
					class="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
					aria-labelledby="dropdownMenuButton1"
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

			<div class="relative flex" data-te-dropdown-ref>
				{#if $page.data.space?.appId === 'demo'}
					<Button class="mr-4" size="xs" color="green">Live demo</Button>
				{/if}
				<button on:click={() => (hidden2 = false)}>
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24">
						<path d="M120 816v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
					</svg>
				</button>
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

<Drawer
	placement="right"
	transitionType="fly"
	{transitionParams}
	bind:hidden={hidden2}
	id="sidebar2"
>
	<div class="flex items-center">
		<div class="flex">
			<a href="/">
				<p class="text-xl text-gray-700 mt-1">
					{$page.data.space.name}
				</p>
			</a>
		</div>
		<CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
	</div>

	<div class="bg-gray-100 text-gray-700 p-2">
		<small class="text-right w-48 flex-wrap"> You are logged in as</small>
		<hr class="my-2" />
		<p class="flex justify-between w-64 overflow-auto my-3 ">
			Username: <b class="ml-6">{$page.data?.spaceSession?.user?.username}</b>
		</p>
		<p class="flex justify-between">
			Role: <b>{$page.data?.spaceSession?.user?.role}</b>
		</p>
		<form method="post" action={`/a/${space?.appId}/accounts?/signout`}>
			<Button type="submit" class="mt-3" size="xs">Sign out</Button>
		</form>
	</div>

	<Sidebar>
		<SidebarWrapper divClass="overflow-y-auto py-4 px-3 ">
			<SidebarGroup>
				<SidebarItem
					on:click={() => (hidden2 = true)}
					href={`/dashboards/${space?.appId}/`}
					rel="external"
					label="Dashboards"
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
					on:click={() => (hidden2 = true)}
					href={`/base/${space?.appId}/`}
					rel="external"
					label="API"
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
					on:click={() => (hidden2 = true)}
					href={`/editor/${space?.appId}/`}
					rel="external"
					label="Editor"
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
					on:click={() => (hidden2 = true)}
					href={`/spaces/${space?.appId}/`}
					rel="external"
					label="Preferences"
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
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>
