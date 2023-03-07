<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	const apps = $page.data.myapps;
	export let data: PageData;
</script>

<div class="lg:px-48 px-6">
	<div class="text-center text-3xl text-gray-500 mt-12">Spaces</div>
	<hr class="my-4" />
	<div class="grid grid-cols-4  mt-9 gap-3">
		{#each data.apps as app}
			<a target="blank" href={`http://${app.appId}.localhost:5173`}>
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
