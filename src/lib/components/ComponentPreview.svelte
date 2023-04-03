<script lang="ts">
	import Hero from './variations/Hero.svelte';

	export let component: any = {
		type: ''
	};
	const type = component.value ?? component.type;
	const variant = component.variant;
</script>

{#if type === 'hero'}
	<Hero {component} />
{/if}
