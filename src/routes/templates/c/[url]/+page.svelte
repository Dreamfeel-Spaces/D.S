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


<div class="mx-auto pt-20 container px-6 xl:px-0 py-3">
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
					<p class="text-xl  font-semibold leading-9 text-white">{category?.name}</p>
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
