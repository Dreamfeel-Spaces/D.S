<script>
	export let form = { success: false, data: {} };
	let { success: saveSpaceSuccess, data: newSpaceData } = form;
</script>

{#if saveSpaceSuccess}
	<div>form saved!</div>
{/if}

<form method="POST" />
