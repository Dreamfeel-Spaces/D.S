<script lang="ts">
	import PagePreview from '$lib/components/PagePreview.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const pages = data?.ui?.pages ?? [];
	let pageIndex = 0;
</script>

<PagePreview page={pages[pageIndex]} />
