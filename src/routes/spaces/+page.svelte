<script>
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
		<h1
			class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			Organizations
		</h1>
		<p
			class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
		Here at Flowbite we focus on markets where technology, innovation, and capital can unlock
			long-term value and drive economic growth.
		</p>
	</div>
</section>

<div class="lg:px-48 px-6">
	<hr class="my-4" />
	<div class="grid grid-cols-4  mt-9 gap-3">
		{#each apps as app}
			<a rel="external" href={`/spaces/${app.appId}`}>
				<Card class="text-center">
					<div>
						{app.name}
					</div>
					<div class="text-xs">@{app.name}</div>
				</Card>
			</a>
		{/each}
	</div>
</div>
