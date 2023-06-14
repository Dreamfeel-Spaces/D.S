<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { DarkMode, Button, Modal, Checkbox, Avatar } from 'flowbite-svelte';
	let space = $page.data.space;
	import categories from '$lib/templates/templatecategories.json';
</script>

<div class="flex flex-row min-h-screen dark:bg-black bg-gray-100 text-gray-800">
	<aside
		class="sidebar dark:text-gray-900 w-72  z-30 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in dark:bg-black bg-gray-50"
	>
		<div class="sidebar-header flex items-center  ml-7 py-3">
			<div class="inline-flex">
				{#if space?.icon}
					<Avatar src={space?.icon} />
				{/if}
				<a href={`/a/${space.appId}`} class="inline-flex flex-row items-center">
					<span class="leading-10 dark:text-gray-100 text-2xl font-bold ml-1 uppercase"
						>{space.name}</span
					>
				</a>
			</div>
		</div>
		<div class="sidebar-content px-4 py-1">
			<ul class="flex flex-col w-full">
				<li class="my-px">
					<a
						href={`/a/${space?.appId}/templates`}
						class="flex flex-row items-center  h-10 px-3 {!$page.params.url && !$page.params.id
							? 'bg-blue-900 text-white'
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
						<span class="ml-3">All</span>
					</a>
				</li>
				<li class="my-px">
					<span class="flex font-medium text-sm dark:text-gray-300 px-4 my-4 uppercase"
						>Categories</span
					>
				</li>
				{#each categories as category}
					<li class="my-px">
						<a
							href={`/a/${space?.appId}/templates/c/${category.url}`}
							id="rest_link"
							class="flex flex-row items-center  h-10 px-3 {$page.params.url === category.url
								? 'bg-blue-900 text-white'
								: ''} rounded-lg dark:text-gray-100">{category.name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
	<main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
		<header class="header dark:bg-black bg-white shadow py-1 px-4">
			<div class="header-content flex items-center flex-row">
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
