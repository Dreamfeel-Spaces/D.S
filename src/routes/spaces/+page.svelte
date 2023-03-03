<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { apps = [] } = data;
	let hasApps = Boolean(apps.length);
</script>

{#if !hasApps}
	<div class="mt-3">
		<p>No apps added</p>
	</div>
{/if}

<div class="flex justify-center mt-4">
	<div class="grid grid-cols-9 gap-4 mx-9">
		{#each data?.apps ?? [] as app}
			<a href={`/${app.appId}`}>
				<Card class="text-left" size="lg" padding="xl">
					<h5 class="mb-2  font-bold text-gray-900 dark:text-white">{app.name}</h5>
					<p class=" text-left text-base text-gray-500 sm:text-lg dark:text-gray-400">
						"key: itemkey"
					</p>
				</Card>
			</a>
		{/each}
	</div>
</div>
