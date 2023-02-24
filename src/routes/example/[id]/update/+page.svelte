<script>
	//@ts-nocheck
	export let data = { example: {} };
	export let form = { success: false, data: {} };
</script>

{#if form?.success}
	<p>item saved</p>
{/if}

<form action="?/update" method="post">
	<p>update</p>
	<label for="property">Example</label>
	<input bind:value={data.example.property} required name="property" type="text" id="property" />
	<button type="submit">Save</button>
</form>

<form method="post" action="?/delete">
    <button> delete</button>
</form>