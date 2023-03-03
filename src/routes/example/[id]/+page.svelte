<script>
    //@ts-nocheck
	export let data = { example: { property: '' } };
	let { example } = data;
</script>

<div>
	{example?.property}
	<p />
	<a href={`/example/${example?.id}/update`}>Edit example</a>
</div>
