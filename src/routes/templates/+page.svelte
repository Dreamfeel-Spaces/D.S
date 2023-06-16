<script>
	import { Button, Card, Heading } from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<div class="dark:bg-black  p-3">
	<div class="flex">
		<Heading class="flex-1" tag="h5">All templates</Heading>
		<div>
			<Button  href="#" >Create templates</Button>
		</div>
	</div>
	<div class="grid mt-4 grid-cols-3 gap-3">
		{#each $page.data.templates as template}
			<a
				href="/templates/{template.id}"
				class="max-w-sm   dark:bg-gray-900 dark:text-white rounded overflow-hidden shadow-lg"
			>
				<img
					class="w-full"
					loading="lazy"
					src={'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png'}
					alt="Sunset in the mountains"
				/>
				<div class="px-6 py-4">
					<div class="font-bold text-xl mb-2">{template.name}</div>
				</div>
				<div class="text-xs ml-7">PRICING: FREE</div>
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
		{/each}
	</div>
</div>
