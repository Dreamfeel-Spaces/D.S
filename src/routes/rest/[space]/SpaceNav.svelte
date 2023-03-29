<script lang="ts">
	import { page } from '$app/stores';
	import {
		Drawer,
		CloseButton,
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem,
		DarkMode,
		Avatar,
		Button,
		Modal,
		Input,
		Label
	} from 'flowbite-svelte';
	import logo from '../../../assets/logo.png';
	const space = $page?.data?.space;
	import { sineIn } from 'svelte/easing';
	import SpaceSearch from './SpaceSearch.svelte';
	import { convertToSlug } from '$lib/util/slugit';
	import { passwordResetDialog } from '$lib/wsstore';
	let hidden2 = true;
	let transitionParams = {
		x: 320,
		duration: 200,
		easing: sineIn
	};
	let spaceUser = $page.data.spaceSession?.user;
	let user: any = { email: spaceUser?.username, username: spaceUser?.username };

	let password = '';
	let confirmPassword = '';
	let authMenuOpen = false;
</script>

<Modal
	open={(!spaceUser?.defaultPasswordUpdated && spaceUser) || $passwordResetDialog.open}
	class="w-full z-69"
>
	<form
		action={`/a/${space.appId}/accounts?/updatePassword&next=${$page.url.pathname}`}
		method="post"
		class="pt-6"
	>
		<div class="text-center">
			<div class="flex mb-4  justify-center">
				<Avatar size="xl" />
			</div>
			<p class="text-2xl">Update your {space.name} profile</p>
			<div class="mt-2 mb-6">Add a secure password to your {space.name} account.</div>
		</div>
		<Label class="my-2" for="password">Username</Label>
		<Input
			required
			name="username"
			placeholder="Enter a username"
			bind:value={user.username}
			class="my-3"
		/><Label class="my-2" for="email">Email address</Label>
		<Input
			required
			name="email"
			placeholder="Enter email address..."
			type="email"
			bind:value={user.email}
			class="my-3"
		/>
		<Label class="mb-2 mt-9" for="password">New password</Label>
		<Input
			required
			name="password"
			placeholder="Enter new password..."
			type="password"
			bind:value={password}
			color={password && confirmPassword && password !== confirmPassword ? 'red' : 'base'}
			class="my-3"
		/>
		<Label class="my-2" for="confirmPassword">Confirm password</Label>
		<Input
			color={password && confirmPassword && password !== confirmPassword ? 'red' : 'base'}
			required
			bind:value={confirmPassword}
			placeholder="Confirm new password"
			type="password"
			name="confirmPassword"
			class="my-3"
		/>
		{#if password && confirmPassword && password !== confirmPassword}
			<small class="text-red-600">Passwords do not match</small>
		{/if}
		<br />
		<Button disabled={password && confirmPassword && password !== confirmPassword} type="submit"
			>Update</Button
		>
	</form>
</Modal>

<nav
	class="flex-no-wrap z-48 fixed n w-full min-w-max  flex items-center justify-between dark:bg-gray-900 bg-neutral-100 py-4 shadow-md shadow-black/5  dark:shadow-black/10 lg:flex-wrap lg:justify-start "
	data-te-navbar-ref
>
	<div class="flex flex-1 flex-wrap items-center justify-between px-6">
		<div
			class="!visible  hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
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
						class="text-gray-700 dark:text-gray-500 text-2xl hover:text-gray-700 focus:text-neutral-700 disabled:text-black/30  dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
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
				<!-- <div>
					<Dropdown>
						<svelte:fragment slot="header">Hehe</svelte:fragment>
						<DropdownHeader>Select</DropdownHeader>
						<DropdownItem>hhh</DropdownItem>
					</Dropdown>
				</div> -->
			</div>

			<div class="relative flex">
				<div class="mr-4">
					<SpaceSearch />
				</div>
				{#if $page.data.space?.appId === 'demo'}
					<Button pill class="mr-4" size="xs" color="green">Live demo</Button>
				{/if}
				<div class="px-3 flex self-center">
					<button on:click={() => (authMenuOpen = true)}>
						<Avatar class="cursor-pointer" data-te-dropdown-ref size="xs" />
					</button>
					<ul
						class={`absolute ${
							authMenuOpen ? 'block' : 'hidden'
						}  left-auto right-0 z-[1000] float-left m-0 mt-1  min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`}
						aria-labelledby="dropdownMenuButton1"
						data-te-dropdown-menu-ref
					>
						<li>
							<a
								class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
								href={`/a/${space.appId}/accounts`}
								on:click={() => (authMenuOpen = false)}
								data-te-dropdown-item-ref>My {space.name} account</a
							>
						</li>
						<li>
							<form method="post" action={`/a/${space.appId}/accounts?/signout`}>
								<button
									on:click={() => (authMenuOpen = false)}
									class="block text-left w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
									data-te-dropdown-item-ref>Signout</button
								>
							</form>
						</li>
						<li>
							<button
								on:click={() => (authMenuOpen = false)}
								class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
								data-te-dropdown-item-ref>Close</button
							>
						</li>
					</ul>
				</div>
				<div>
					<DarkMode />
				</div>
				<button class="dark:text-gray-100" on:click={() => (hidden2 = false)}>
					<svg
						class="dark:text-gray-100"
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 96 960 960"
						fill="currentColor"
						width="24"
					>
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
