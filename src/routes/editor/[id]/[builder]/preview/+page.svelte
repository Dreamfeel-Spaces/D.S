<script lang="ts">
	import PagePreview from '$lib/components/PagePreview.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let pages = data?.ui?.pages ?? [];
	let pageIndex = 0;
</script>

<PagePreview page={pages[pageIndex]} />
