<script>
	import { Button, Card, Heading } from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<div class="dark:bg-black  p-3">
	<div class="flex">
		<!-- <Heading class="flex-1" tag="h5">All spaces</Heading> -->
		<div />
	</div>
	<div class="grid mt-4 grid-cols-3 gap-3">
		{#each $page.data.apps as template}
			<a
				rel="external"
				href="/a/d/{template.appId}"
				class="max-w-sm   dark:bg-gray-900 dark:text-white rounded overflow-hidden shadow-lg"
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
			</a>
		{/each}
	</div>
</div>
