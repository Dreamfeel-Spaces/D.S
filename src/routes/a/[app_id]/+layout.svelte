<script>
	// @ts-nocheck

	import { Button, Modal, Checkbox, Hr, Avatar } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import logo from '$lib/assets/beta-logo.png';
	import SpaceNav from '$lib/components/SpaceNav.svelte';
	import SpaceSearch from '../../rest/[app_id]/SpaceSearch.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { onMount } from 'svelte';
	import { qsLauncher } from './quickSetup';
	import { recentlyViewed } from '$lib/wsstore';
	const space = $page.data.space;
	const spaceSession = $page.data.spaceSession;
	const user = spaceSession?.user;
	const hasUser = Boolean(user?.id);

	let demoDialogOpen = false;

	let neverShowAgain = false;

	function handleDismiss() {
		demoDialogOpen = false;
		localStorage.setItem('demovideoDismissed', 'true');
		if (neverShowAgain) localStorage.setItem('permanentDisableDemoVideo', 'true');
	}

	onMount(() => {
		// let permanentDisableDemoVideo = localStorage.getItem('permanentDisableDemoVideo');
		// if (permanentDisableDemoVideo) {
		// 	demoDialogOpen = false;
		// } else demoDialogOpen = true;
	});

	let help = false;

	function handleWatch() {
		help = false;
		demoDialogOpen = true;
	}

	function handleQG() {
		help = false;
		qsLauncher.set({ skipped: false, step: 0 });
	}
</script>

{#if !$page.data.spaceSession?.user?.id}
	<div class="pt-9 min-h-screen flex acc_bg  dark:bg-black grid-cols-2 justify-center">
		<div class="w-1/2">
			<slot />
		</div>
	</div>
{/if}

{#if $page.data.spaceSession?.user?.id}
	{#if /\/templates/.test($page.url.pathname)}
		<slot />
	{/if}
	{#if !/\/templates/.test($page.url.pathname)}
		<SpaceNav modalOnly={true} />

		<Modal permanent size="lg" class="w-full" bind:open={demoDialogOpen}>
			<div slot="header">Watch demo video?</div>
			<div>
				<div style="position: relative; padding-bottom: 56.25%; height: 0;">
					<!-- svelte-ignore a11y-missing-attribute -->
					<iframe
						src="https://www.loom.com/embed/79f5ac8bd1584acfb618285a01a156b0"
						frameborder="0"
						webkitallowfullscreen
						mozallowfullscreen
						allowfullscreen
						style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
					/>
				</div>
			</div>
			<div slot="footer" class="flex justify-end">
				<div>
					<Checkbox bind:value={neverShowAgain} bind:checked={neverShowAgain}
						>Never show again</Checkbox
					>
					<Button class="mt-2" on:click={handleDismiss}>Skip</Button>
				</div>
			</div>
		</Modal>

		<Tooltip />

		<div class="flex flex-row h-screen  dark:bg-black bg-gray-100 text-gray-800">
			<aside
				class="sidebar border-gray-800 border-r  min-h-screen dark:text-gray-900  w-80 min-w-80 max-w-sm 2xl:w-[30rem] 4xl:w-[36rem]  8xl:w-[75rem] 6xl:w-[64rem]   z-30 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-black bg-gray-50"
			>
				<div
					class="sidebar-header border-b  border-gray-800 gap-3  flex justify-center pt-1    py-1"
				>
					<div class="flex gap-2  items-center">
						{#if space?.icon}
							<Avatar
								size="xs"
								class="bg-transparent dark:bg-transparent"
								alt="Space icon"
								src={space?.icon ?? logo}
							/>
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
				<div class="sidebar-content 4xl:py-9 px-4 py-1 pt-3">
					<ul class="flex flex-col w-full">
						<li class="4xl:space-y-9 space 6xl:space-y-16">
							<a
								href={`/a/${space?.appId}`}
								class="flex   flex-row items-center 4xl:py-9 6xl:py-16  h-10 px-3 {!/\/a\/([^/]+)\//.test(
									$page.url.pathname
								)
									? 'bg-blue-900 text-gray-200'
									: ''} rounded-lg dark:text-gray-100"
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
								<span class="ml-3 4xl:text-4xl 6xl:text-6xl  ">Home</span>
							</a>
						</li>

						<li class="my-px">
							<span
								class="flex 4xl:text-3xl font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase"
								>Space</span
							>
						</li>
						<li class="my-px">
							<a
								href="/rest/{$page.params['app_id']}"
								id="rest_link"
								class="flex 4xl:text-4xl 4xl:py-9 hover:text-gray-100 flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 dark:hover:text-gray-700"
							>
								<span class="flex items-center justify-center text-lg dark:text-gray-400">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										fill="currentColor"
										viewBox="0 96 960 960"
										width="24"
										><path
											d="M480 936q-151 0-255.5-46.5T120 776V376q0-66 105.5-113T480 216q149 0 254.5 47T840 376v400q0 67-104.5 113.5T480 936Zm0-488q86 0 176.5-26.5T773 362q-27-32-117.5-59T480 276q-88 0-177 26t-117 60q28 35 116 60.5T480 448Zm-1 214q42 0 84-4.5t80.5-13.5q38.5-9 73.5-22t63-29V438q-29 16-64 29t-74 22q-39 9-80 14t-83 5q-42 0-84-5t-80.5-14q-38.5-9-73-22T180 438v155q27 16 61 29t72.5 22q38.5 9 80.5 13.5t85 4.5Zm1 214q48 0 99-8.5t93.5-22.5q42.5-14 72-31t35.5-35V654q-28 16-63 28.5T643.5 704q-38.5 9-80 13.5T479 722q-43 0-85-4.5T313.5 704q-38.5-9-72.5-21.5T180 654v126q5 17 34 34.5t72 31q43 13.5 94 22t100 8.5Z"
										/></svg
									>
								</span>
								<span class="ml-3 l">API</span>
							</a>
						</li>
						<li class="my-px">
							<a
								href={`/editor/${space.appId}`}
								class="flex  flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 4xl:text-4xl 4xl:py-9 hover:text-gray-100 dark:hover:text-gray-700"
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
								<span class="ml-3">UI</span>
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
								on:click={() => {
									recentlyViewed.set({
										[`/a/${space.appId}/pos`]: { url: `/a/${space.appId}/pos` },
										...$recentlyViewed
									});
								}}
								href={`/a/${space.appId}/pos`}
								class="flex {/\/pos/.test($page.url.pathname)
									? 'bg-blue-900'
									: ''} flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 4xl:text-4xl 4xl:py-9 hover:text-gray-100  dark:hover:text-gray-700"
							>
								<span class="flex items-center justify-center text-l">
									<svg
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 96 960 960"
										width="24"
										><path
											d="M260 426q-24.75 0-42.375-17.625T200 366V236q0-24.75 17.625-42.375T260 176h440q24.75 0 42.375 17.625T760 236v130q0 24.75-17.625 42.375T700 426H260Zm0-60h440V236H260v130ZM140 976q-24.75 0-42.375-17.625T80 916v-70h800v70q0 24.75-17.625 42.375T820 976H140ZM80 816l145-324q8-16 22.603-26 14.603-10 31.397-10h402q16.794 0 31.397 10Q727 476 735 492l145 324H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z"
										/></svg
									>
								</span>
								<span class="ml-3">POS</span>
							</a>
						</li>
						<li class="my-px">
							<a
								on:click={() => {
									recentlyViewed.set({
										[`/a/${space.appId}/pay`]: { url: `/a/${space.appId}/pay` },
										...$recentlyViewed
									});
								}}
								href={`/a/${space.appId}/pay`}
								class="flex {/\/pay/.test($page.url.pathname)
									? 'bg-blue-900'
									: ''} flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 4xl:text-4xl 4xl:py-9 hover:text-gray-100 dark:hover:text-gray-700"
							>
								<span class="flex items-center justify-center text-l">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										fill="currentColor"
										viewBox="0 96 960 960"
										width="24"
										><path
											d="M540 636q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM220 776q-24.75 0-42.375-17.625T160 716V316q0-24.75 17.625-42.375T220 256h640q24.75 0 42.375 17.625T920 316v400q0 24.75-17.625 42.375T860 776H220Zm100-60h440q0-42 29-71t71-29V416q-42 0-71-29t-29-71H320q0 42-29 71t-71 29v200q42 0 71 29t29 71Zm480 180H100q-24.75 0-42.375-17.625T40 836V376h60v460h700v60ZM220 716V316v400Z"
										/></svg
									>
								</span>
								<span class="ml-3">Pay</span>
							</a>
						</li>

						<li class="my-px">
							<a
								on:click={() => {
									recentlyViewed.set({
										[`/a/${space.appId}/pay`]: { url: `/a/${space.appId}/pay` },
										...$recentlyViewed
									});
								}}
								href={`/a/${space.appId}/delivery`}
								class="flex {/\/delivery/.test($page.url.pathname)
									? 'bg-blue-900'
									: ''} flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 4xl:text-4xl 4xl:py-9 hover:text-gray-100 dark:hover:text-gray-700"
							>
								<span class="flex items-center justify-center text-l">
									<svg
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 -960 960 960"
										width="24"
										><path
											d="M224.118-161Q175-161 140.5-195.417 106-229.833 106-279H40v-461q0-24 18-42t42-18h579v167h105l136 181v173h-71q0 49.167-34.382 83.583Q780.235-161 731.118-161 682-161 647.5-195.417 613-229.833 613-279H342q0 49-34.382 83.5-34.383 34.5-83.5 34.5ZM224-221q24 0 41-17t17-41q0-24-17-41t-41-17q-24 0-41 17t-17 41q0 24 17 41t41 17ZM100-339h22q17-27 43.041-43 26.041-16 58-16t58.459 16.5Q308-365 325-339h294v-401H100v401Zm631 118q24 0 41-17t17-41q0-24-17-41t-41-17q-24 0-41 17t-17 41q0 24 17 41t41 17Zm-52-204h186L754-573h-75v148ZM360-529Z"
										/></svg
									>
								</span>
								<span class="ml-3">Delivery</span>
							</a>
						</li>

						<li class="my-px">
							<span
								class="flex  4xl:text-3xl font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase"
								>More</span
							>
						</li>
						<li class="my-px">
							<a
								href={`/a/${space.appId}/roles`}
								class="flex flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 {/\/roles/.test(
									$page.url.pathname
								)
									? 'bg-blue-900'
									: ''} 4xl:text-4xl 4xl:py-9 hover:text-gray-100  dark:hover:text-gray-700"
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
								<span class="ml-3">Roles</span>
							</a>
						</li>
						<li class="my-px">
							<a
								on:click={() => {
									recentlyViewed.set({
										[`/a/${space.appId}/accounts`]: { url: `/a/${space.appId}/pos` },
										...$recentlyViewed
									});
								}}
								href={`/a/${space.appId}/accounts`}
								class="flex flex-row {/\/accounts/.test($page.url.pathname)
									? 'bg-blue-900'
									: ''}  items-center h-10 px-3 rounded-lg dark:text-gray-300 4xl:text-4xl 4xl:py-9  dark:hover:bg-gray-600 hover:text-gray-700"
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
								<span class="ml-3">Account</span>
							</a>
						</li>
						<li class="my-px">
							<a
								on:click={() => {
									recentlyViewed.set({
										[`/a/${space.appId}/wallets`]: { url: `/a/${space.appId}/pos` },
										...$recentlyViewed
									});
								}}
								href={`/a/${space.appId}/wallets`}
								class="flex flex-row items-center {/\/wallets/.test($page.url.pathname)
									? 'bg-blue-900'
									: ''} h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 4xl:text-4xl 4xl:py-9 hover:text-gray-100"
							>
								<span class="flex items-center justify-center text-lg dark:text-gray-400">
									<svg
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 96 960 960"
										width="24"
										><path
											d="M640 636q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM200 856V296v560Zm0 80q-33 0-56.5-23.5T120 856V296q0-33 23.5-56.5T200 216h560q33 0 56.5 23.5T840 296v100h-80V296H200v560h560V756h80v100q0 33-23.5 56.5T760 936H200Zm320-160q-33 0-56.5-23.5T440 696V456q0-33 23.5-56.5T520 376h280q33 0 56.5 23.5T880 456v240q0 33-23.5 56.5T800 776H520Zm280-80V456H520v240h280Z"
										/></svg
									>
								</span>
								<span class="ml-3">Wallets</span>
							</a>
						</li>
						<li class="my-px">
							<a
								on:click={() => {
									recentlyViewed.set({
										[`/a/${space.appId}/preferences`]: { url: `/a/${space.appId}/pos` },
										...$recentlyViewed
									});
								}}
								href={`/a/${space.appId}/preferences`}
								class="flex {/\/preferences/.test($page.url.pathname)
									? 'bg-blue-900'
									: ''} flex-row items-center h-10 px-3 rounded-lg dark:text-gray-300 hover:bg-gray-600 4xl:text-4xl 4xl:py-9 hover:text-gray-100"
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
								<span class="ml-3">Settings</span>
							</a>
						</li>
					</ul>
				</div>
			</aside>
			<main
				class="main h-full  flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in"
			>
				<!-- <a class="w-full" rel="external" href="/early-access">
				<div class="bg-blue-ss w-full text-center py-1 lg:px-4">
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
									href="{$page.url.protocol}//{$page.params.app_id}.{$page.url.host}"
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
									href="/dashboards/{$page.data.space.appId}"
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
											d="M510-570v-270h330v270H510ZM120-450v-390h330v390H120Zm390 330v-390h330v390H510Zm-390 0v-270h330v270H120Zm60-390h210v-270H180v270Zm390 330h210v-270H570v270Zm0-450h210v-150H570v150ZM180-180h210v-150H180v150Zm210-330Zm180-120Zm0 180ZM390-330Z"
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
								<Modal bind:open={help}>
									<div slot="header" class="text-lg">Help</div>
									<div>
										<div>Additional resources</div>
										<Button on:click={handleQG}>Guide</Button>
										<Button on:click={handleWatch}>Video</Button>
									</div>
								</Modal>
							</div>
						</div>
					</div>
				</header>
				<div
					class="main-content flex-1 overflow-hidden dark:bg-gray-700  flex flex-col flex-grow p-2"
				>
					<div
						class="flex flex-col  dark:bg-black p-4 rounded-xl overflow-auto flex-grow  bg-white  "
					>
						<slot />
					</div>
				</div>
				<footer class="footer px-4 py-2">
					<div class="footer-content">
						<p class="text-xs text-gray-600 text-center">
							© Dreamfeel Spaces. All rights reserved.
						</p>
					</div>
				</footer>
			</main>
		</div>
	{/if}
{/if}

<style>
	.acc_bg {
		/* background-color: #ffffff; */
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='2'%3E%3Cpath transform='translate(0 0)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='4' transform='rotate(0 800 450)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(0 0)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='4'%3E%3Cpath transform='translate(0 0)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='8' transform='rotate(0 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='rotate(0 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
	}
	/* @media{

	} */
</style>
