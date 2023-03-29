<script lang="ts">
	export let form: any;
	import { Button, Alert, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
</script>

<Breadcrumb>
	<BreadcrumbItem>Home</BreadcrumbItem>
	<BreadcrumbItem>Editor</BreadcrumbItem>
	<BreadcrumbItem>Space</BreadcrumbItem>
	<BreadcrumbItem>UI's</BreadcrumbItem>
	<BreadcrumbItem>Create</BreadcrumbItem>
</Breadcrumb>

<div class="text-lg p-3">New ui version</div>

{#if form?.success}
	<div class="mt-9">
		<Alert>New ui version has been number: {form?.data?.version} added</Alert>
	</div>
{/if}

<div class="px-6">
	<form method="post">
		<Button type="submit">Create</Button>
	</form>
</div>
