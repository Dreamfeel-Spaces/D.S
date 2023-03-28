<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { DarkMode } from 'flowbite-svelte';
</script>

<DarkMode />

<div>
	{@html data.html}
</div>
