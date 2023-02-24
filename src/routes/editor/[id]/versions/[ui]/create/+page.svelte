<script lang="ts">
	export let form: any;
	import { Input, Button, Alert } from 'flowbite-svelte';
</script>

<div class="text-lg p-3">New ui version</div>

{#if form?.success}
	<div class="mt-9">
		<Alert>New ui version has been number: {form?.data?.version} added</Alert>
	</div>
{/if}

<div>
	<form method="post">
		<Button type="submit">Create</Button>
	</form>
</div>
