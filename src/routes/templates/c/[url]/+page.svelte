<script lang="ts">
	import { page } from '$app/stores';
	let template = {};
	import categories from '$lib/templates/templatecategories.json';
	import { useEffect } from '$lib/wsstore/hooks';
	let category = categories.find((category) => category.url === $page.params.url);

	let templates = $page.data.templates;

	useEffect(
		() => {
			category = categories.find((category) => category.url === $page.params.url);
		},
		() => [$page.params.url]
	);
</script>

<div class="py-3 px-4 md:px-6 2xl:px-0 2xl:mx-auto 2xl:container flex justify-center items-center">
	<div class="flex justify-between items-center w-full">
		<div class="flex flex-col justify-start items-start">
			<p class="text-sm leading-none text-gray-600 dark:text-gray-300">home - templates</p>
			<div class="mt-2 flex flex-row justify-end items-center space-x-3">
				<p class="text-2xl font-semibold leading-normal text-gray-800 dark:text-white">Templates</p>
				<p class="text-base leading-4 text-gray-600 mt-2 dark:text-gray-400">(09 templates)</p>
			</div>
		</div>

		<button
			class="hover:text-gray-500 text-gray-600 bg-gray-100 py-3.5 px-3 rounded-sm flex flex-row justify-center items-center space-x-3 dark:bg-gray-800 dark:bg-gray-700"
		>
			<svg
				class="dark:text-gray-300"
				width="24"
				height="16"
				viewBox="0 0 24 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4 14.6452V9.33875"
					stroke="currentColor"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M4 6.30645V1"
					stroke="currentColor"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12 14.6452V7.82263"
					stroke="currentColor"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12 4.79032V1"
					stroke="currentColor"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M20 14.6452V10.8549"
					stroke="currentColor"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M20 7.82258V1"
					stroke="currentColor"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M1 9.33875H7"
					stroke="currentColor"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M9 4.79028H15"
					stroke="currentColor"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M17 10.8549H23"
					stroke="currentColor"
					stroke-width="1.25"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>

			<p class="hidden md:block text-sm leading-none dark:text-gray-300">Filters</p>
		</button>
	</div>
</div>

<div class="mx-auto container px-6 xl:px-0 py-3">
	<div class="flex flex-col">
		<div class="flex flex-col justify-center">
			<div class="relative">
				<img
					class="hidden sm:block w-full"
					src={category?.imageUrl
						? category?.imageUrl
						: 'https://i.ibb.co/HxXSY0j/jason-wang-Nx-Awry-Abt-Iw-unsplash-1-1.png'}
					alt="sofa"
				/>
				<img
					class="sm:hidden w-full"
					src={category?.imageUrl
						? category?.imageUrl
						: 'https://i.ibb.co/HxXSY0j/jason-wang-Nx-Awry-Abt-Iw-unsplash-1-1.png'}
					alt="sofa"
				/>
				<div
					class="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start"
				>
					<p class="text-3xl sm:text-4xl font-semibold leading-9 text-white">{category?.name}</p>
				</div>
			</div>
		</div>
	</div>
</div>

{#each $page.data.templates as template}
	<div class="grid mt-4 grid-cols-3 gap-3">
		<a
			href="/a/{$page.params.app_id}/templates/{template.id}"
			class="max-w-sm rounded overflow-hidden shadow-lg"
		>
			<img
				class="w-full"
				loading="lazy"
				src="https://res.cloudinary.com/dreamnerd/image/upload/v1683813200/Screenshot_from_2023-05-11_16-51-40_drnmo8.png"
				alt="Sunset in the mountains"
			/>
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">{template.name}</div>
			</div>
			<div class="px-6 pt-4 pb-2">
				<button
					on:click={(e) => e.stopPropagation()}
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>More info</button
				>
				<a
					target="blank"
					href="/{$page.data.space?.appId}"
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>Preview</a
				>
			</div>
		</a>
	</div>
{/each}

{#if !$page.data.templates.length}
	<div class="h-100 min-h-100 flex justify-center items-center">
		<div class="text-3xl">No templates have been added for this category</div>
	</div>
{/if}
