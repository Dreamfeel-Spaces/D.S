<script lang="ts">
	//@ts-nocheck
	export let data: any = { permissions: [] };

	import { Checkbox, Button, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { page } from '$app/stores';

	let permissions = data.permissions;
</script>

<div class="mt-3">
	<Breadcrumb>
		<BreadcrumbItem>Home</BreadcrumbItem>
		<BreadcrumbItem>Dashboards</BreadcrumbItem>
		<BreadcrumbItem>
			{$page.params["app_id"]}
		</BreadcrumbItem>
		<BreadcrumbItem>{$page.params.table}</BreadcrumbItem>
		<BreadcrumbItem>Permissions</BreadcrumbItem>
	</Breadcrumb>
</div>
<form method="post">
	<div class="p-6">
		<div class="text-lg mb-3 text-gray-500">Required permissions</div>
		<div class="mb-6 text-gray-500" />
		<!-- {#each data.requiredPermissions as permission}
			<div class="mb-4">
				<Checkbox disabled bind:checked={permission.checked} bind:value={permission.checked}>
					{permission.name}</Checkbox
				>
			</div>
		{/each} -->
		<hr class="my-2" />
		{#each data.permissions as permission}
			<div class="mb-4">
				<Checkbox bind:checked={permission.checked} bind:value={permission.checked}>
					{permission.name}</Checkbox
				>
			</div>
		{/each}
		<input
			type="hidden"
			value={JSON.stringify(data.permissions)}
			name="requiredPermissions"
			id="requiredPermissions"
		/>
		<Button type="submit">Update</Button>
	</div>
</form>
