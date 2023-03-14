<script>
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="grid grid-cols-2 gap-2">
		<div class="py-8 px-4 mx-auto max-w-screen-xl  lg:py-16 lg:px-12">
			<h1
				class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
			>
				Dashboards
			</h1>
			<p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400">
				Here at Flowbite we focus on markets where technology, innovation, and capital can unlock
				long-term value and drive economic growth.
			</p>
		</div>
		<div class=" mt-8 px-6">
			<div class="grid grid-cols-4   gap-3">
				{#each apps as app}
					<a rel="external" href={`/dashboards/${app?.appId}`}>
						<Card class="text-center">
							<div>
								{app.name}
							</div>
							<div class="text-xs">@{app.name}</div>
						</Card>
					</a>
				{/each}
				<a rel="external" href={`/spaces/create`}>
					<Card class="text-center">
						<div>+</div>
						<div class="text-xs">Create space</div>
					</Card>
				</a>
			</div>
		</div>
	</div>
</section>
