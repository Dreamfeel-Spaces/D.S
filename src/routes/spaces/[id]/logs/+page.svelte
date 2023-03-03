<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Accordion, AccordionItem } from 'flowbite-svelte';
</script>

<div>
	<Accordion>
		{#each data?.space?.logs as log}
			<AccordionItem />{/each}
	</Accordion>
</div>
