<script>
	import { Card, Heading } from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<Card size="xl">
	<Heading tag="h6">All templates</Heading>
	{#each $page.data.templates as template}
		<div class="grid mt-4 grid-cols-3 gap-3">
			<a
				href="/a/{$page.params.app_id}/templates/{template.id}"
				class="max-w-sm rounded overflow-hidden shadow-lg"
			>
				<img
					class="w-full"
					loading="lazy"
					src="https://res.cloudinary.com/dreamnerd/image/upload/v1683785200/download_y6vqef.png"
					alt="Sunset in the mountains"
				/>
				<div class="px-6 py-4">
					<div class="font-bold text-xl mb-2">{template.name}</div>
					<p class="text-gray-700 text-base">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
						Maiores et perferendis eaque, exercitationem praesentium nihil.
					</p>
				</div>
				<div class="px-6 pt-4 pb-2">
					<span
						class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
						>#photography</span
					>
					<span
						class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
						>#travel</span
					>
					<span
						class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
						>#winter</span
					>
				</div>
			</a>
		</div>
	{/each}
</Card>
