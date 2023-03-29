<script lang="ts">
	export let form: any;
</script>

{#if form?.saveSpaceSuccess}
	<div>form saved!</div>
{/if}

<form method="POST" />
