<script>
	export let form = { success: false, data: { id: '' } };
	// const { success = false, data: formData } = form;
</script>

{#if form?.success}
	<div>Example saved successfully</div>
	<div>
		<a href={`/example/${form?.data?.id}`}>View example</a>
	</div>
{/if}

<form method="post">
    <label for="property">Example</label>
	<input required name="property" type="text" id="property" />
	<button type="submit">Save</button>
</form>
