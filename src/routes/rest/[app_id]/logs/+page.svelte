<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Accordion, AccordionItem, Alert } from 'flowbite-svelte';
</script>

<div class="px-9 pt-4 max-h-108 overflow-auto">
	<div class="my-4 text-3xl text-gray-700">
		<p>Logs</p>
	</div>
	{#each data?.logs ?? [] as log}
		<Alert class="mb-2">
			<p>{log.url}</p>
			<p>{new Date(log.timestamp)}</p>
			<p>{log.severity}</p>
		</Alert>
	{/each}
</div>
