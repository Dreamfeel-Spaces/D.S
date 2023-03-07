<script>
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
</script>

<div class="lg:px-48 px-6">
	<div class="text-center text-3xl text-gray-500 mt-12">Spaces UI</div>
	<hr class="my-4" />
	<div class="grid grid-cols-4  mt-9 gap-3">
		{#each apps as app}
			<a rel="external" href={`/editor/${app.appId}`}>
				<Card>
					{app.name}
				</Card>
			</a>
		{/each}
	</div>
</div>
