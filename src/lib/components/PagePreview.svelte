<script lang="ts">
	import ComponentPreview from './ComponentPreview.svelte';
	export let page: any = { components: [] };
</script>

{#each page.components as component}
	<section>
		<ComponentPreview component={{ ...component }} />
	</section>
{/each}
