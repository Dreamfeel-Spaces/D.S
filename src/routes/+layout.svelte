<script lang="ts">
	//@ts-nocheck

	import '../app.css';

	import {
		Drawer,
		CloseButton,
		Sidebar,
		Button,
		Toast
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

	import logo from '../assets/beta-logo.png';
	import Rt from '$lib/ws/Rt.svelte';
	import { browser } from '$app/environment';
	import Pos from '$lib/cbd/pos/POS.svelte';
	import Pay from '$lib/cbd/pay/Pay.svelte';
	import QuickSetupPay from '$lib/cbd/pay/QuickSetupPay.svelte';

	let seebdm = ($page.url.toJSON()?.split('.')[0] ?? '')?.split('//')[1];

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

{#if seebdm === 'pos'}
	<Pos />
{:else if seebdm === 'pay'}
	{#if /\/quick-start/.test($page.url.pathname)}
		<QuickSetupPay />
	{:else}
		<Pay />
	{/if}
{:else}
	{#if subdomain}
		{@html $page.data.html}
	{/if}

	{#if /\/a$/.test($page.url.pathname) || /\/templates/.test($page.url.pathname) || (isPreview && !subdomain)}
		<slot />
	{/if}

	{#if !isPreview && !subdomain && !/\/templates/.test($page.url.pathname) && !/\/a$/.test($page.url.pathname)}
		<div>
			<nav
				class="flex-no-wrap fixed z-50 lg:flex w-full items-center justify-between bg-neutral-100   dark:bg-black pb-2 shadow-md shadow-black/5 dark:shadow-black/10 lg:flex-wrap lg:justify-start "
				data-te-navbar-ref
			>
				<a class="w-full" href="/early-access">
					<div class="bg-salmon-900 w-full text-center lg:px-4">
						<!-- <div
							class="p-1 bg-blue-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
							role="alert"
						>
							<span class="flex rounded-full bg-blue-500 uppercase px-2 text-xs font-bold mr-3"
								>Alpha preview</span
							>
							<span class=" mr-2 text-left text-xs flex-auto"
								>Join the waitlist to be among the first to enjoy the limited possibilities of
								Spaces.</span
							>
							<svg
								class="fill-current opacity-75 h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								><path
									d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
								/></svg
							>
						</div> -->
					</div>
				</a>

				<div class="flex w-full flex- items-center  pt-1 justify-between px-6">
					<div class="flex lg:hidden gap-3 h-14">
						<img src={logo} alt="" />
					</div>
					<div
						class="!visible  flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
						id="navbarSupportedContent1"
						data-te-collapse-item
					>
						<div class="mr-4 hidden cursor-pointer">
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
							class="mt-2 mr-2 hidden  lg:flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mt-0"
							href="/"
						>
							<img
								class="rounded"
								src={logo}
								style="height: 42px"
								alt="logo transparent"
								loading="lazy"
							/>
						</a>
						<!-- Left links -->
						<ul
							class="list-style-none mr-auto  hidden lg:flex flex-col pl-0 lg:flex-row"
							data-te-navbar-nav-ref
						>
							<!-- <li class="lg:pr-2" data-te-dropdown-ref>
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
											<p>Tailored experiences</p>
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
							</li> -->
							<li class="lg:pr-2 " data-te-nav-item-ref>
								<a
									rel="external"
									class=" hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
									href="/create"
									data-te-nav-link-ref>New project</a
								>
							</li>
							<li class="lg:pr-2" data-te-nav-item-ref>
								<a
									rel="external"
									class="flex-1 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
									href="/templates"
									data-te-nav-link-ref>Templates</a
								>
							</li>
							<li class="lg:pr-2 dark:text-white" data-te-nav-item-ref>
								<a
									rel="external"
									class=" hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
									href="{$page.url.protocol}//pay.{$page.url.host}"
									data-te-nav-link-ref>feelpay</a
								>
							</li>
							<li class="lg:pr-2 dark:text-white" data-te-nav-item-ref>
								<a
									rel="external"
									class=" hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
									href="{$page.url.protocol}//pos.{$page.url.host}"
									data-te-nav-link-ref>feelpos</a
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
							class="hidden-arrow mr-4 hidden lg:flex items-center text-black hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
							href="/about"
							id="dropdownMenuButton1"
							role="button"
							data-te-dropdown-toggle-ref
							aria-expanded="false"
						>
							About us
						</a>
						<!-- <a
						rel="external"
						class="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
						href="/docs"
						id="dropdownMenuButton1"
						role="button"
						data-te-dropdown-toggle-ref
						aria-expanded="false"
					>
						Docs
					</a> -->
						<a
							rel="external"
							target="blank"
							class="hidden-arrow mr-4  items-center hidden lg:flex text-black hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
							href="https://blog.dreamfeel.me"
							id="dropdownMenuButton1"
							role="button"
							data-te-dropdown-toggle-ref
							aria-expanded="false"
						>
							Blog
						</a>

						{#if $page.data.session}
							<a
								rel="external"
								class="mr-4 hidden lg:flex text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
								href="/a"
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
						{/if}
						<!-- 
						<div class="relative mr-2">
							<DarkMode />
						</div> -->
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
								<a href="/create" class="hidden lg:block">
									<Button color="red" gradient>Get started</Button></a
								>
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
				<ul
					class="list-style-none mr-auto pt-4 space-y-4 mt-4 border-t border-gray-700 flex-col pl-0 lg:flex-row"
					data-te-navbar-nav-ref
				>
					<li class="lg:pr-2 " data-te-nav-item-ref>
						<a
							rel="external"
							class=" hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
							href="/create"
							data-te-nav-link-ref>New project</a
						>
					</li>
					<li class="lg:pr-2" data-te-nav-item-ref>
						<a
							rel="external"
							class="flex-1 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
							href="/templates"
							data-te-nav-link-ref>Templates</a
						>
					</li>
					<li class="lg:pr-2 dark:text-white" data-te-nav-item-ref>
						<a
							rel="external"
							class=" hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
							href="{$page.url.protocol}//pay.{$page.url.host}"
							data-te-nav-link-ref>feelpay</a
						>
					</li>
					<li class="lg:pr-2 dark:text-white" data-te-nav-item-ref>
						<a
							rel="external"
							class=" hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
							href="{$page.url.protocol}//pos.{$page.url.host}"
							data-te-nav-link-ref>feelpos</a
						>
					</li>
					<li class="lg:pr-2 border-t border-gray-700" data-te-nav-item-ref>
						<a
							rel="external"
							class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
							href="/about"
							data-te-nav-link-ref
							>About us
						</a>
					</li>
					<li class="lg:pr-2" data-te-nav-item-ref>
						<a
							rel="external"
							class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
							href="/blog"
							data-te-nav-link-ref>Blog</a
						>
					</li>
					<li class="lg:pr-2 border-t border-gray-700" data-te-nav-item-ref>
						<a
							rel="external"
							class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
							href="/accounts"
							data-te-nav-link-ref>Sign in</a
						>
					</li>
				</ul>
			</Sidebar>
		</Drawer>
		<div class="pt-16 dark:bg-black">
			<slot />
		</div>
	{/if}
{/if}
