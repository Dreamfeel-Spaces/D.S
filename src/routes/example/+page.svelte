<script>
	//@ts-nocheck
	import { page } from '$app/stores';
	export let data = { examples: [], count: 0, page: 1, pages: 0, skip: 0 };
	let { examples = [] } = data;
	let currPage = $page.url.searchParams.get('page') ?? 1;
</script>



<a href="/example/create">Add example</a>

{#if examples.length}
	{#each examples as example, idx}
		<div class="my-3">
			<a href={`/example/${example.id}`}>{idx + 1}: {example.property}</a>
		</div>
	{/each}
{:else}
	<div>Data not found</div>
{/if}
<div class="mt-9">
	<p class="mb-2">
		{currPage}
	</p>
	{#if !data.page < data.pages}
		<a href={`/example?page=${data.page + 1}`}>{data.page + 1}</a>
	{/if}
</div>
