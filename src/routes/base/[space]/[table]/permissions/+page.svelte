<script lang="ts">
	//@ts-nocheck

	import type { PageData } from './$types';

	import { Checkbox, Button, Breadcrumb, BreadcrumbItem, Card } from 'flowbite-svelte';
	import { page } from '$app/stores';

	let roles = $page.data.space.roles;

	export let data: PageData;

	const table = data.table;

	let permissions = roles.map((role) => {
		for (let cP of table.aPICreatePermissions) {
			if (cP.userRoles.id === role.id || role.isSuperUser) {
				role = { ...role, createChecked: true };
			}
		}

		for (let cP of table.aPIGETPermissions) {
			if (cP.userRoles.id === role.id || role.isSuperUser) {
				role = { ...role, readChecked: true };
			}
		}

		for (let cP of table.aPIUpdatePermissions) {
			if (cP.userRoles.id === role.id || role.isSuperUser) {
				role = { ...role, updateChecked: true };
			}
		}

		for (let cP of table.aPIDeletePermissions) {
			if (cP.userRoles.id === role.id || role.isSuperUser) {
				role = { ...role, deleteChecked: true };
			}
		}

		return role;
	});
</script>

<div class="mt-3">
	<Breadcrumb>
		<BreadcrumbItem>Home</BreadcrumbItem>
		<BreadcrumbItem>Dashboards</BreadcrumbItem>
		<BreadcrumbItem>
			{$page.params.id}
		</BreadcrumbItem>
		<BreadcrumbItem>{$page.params.table}</BreadcrumbItem>
		<BreadcrumbItem>Permissions</BreadcrumbItem>
	</Breadcrumb>
</div>
<form method="post" class="max-h-99 overflow-auto">
	<div class="p-6">
		<div class=" mb-3 text-gray-500 text-3xl">API Permissions</div>
		<div class="mb-6 text-gray-500" />

		<Card size="xl">
			<p>Create</p>
			<p>Select roles with create access</p>
			<div class="mt-3">
				{#each permissions as permission}
					<div class="mb-4">
						<Checkbox bind:checked={permission.createChecked} bind:value={permission.createChecked}>
							{permission.name}</Checkbox
						>
					</div>
				{/each}
			</div>
		</Card>

		<Card class="mt-4" size="xl">
			<p>Read</p>
			<p>Select roles with read access</p>
			<div class="mt-3">
				{#each permissions as permission}
					<div class="mb-4">
						<Checkbox bind:checked={permission.readChecked} bind:value={permission.readChecked}>
							{permission.name}</Checkbox
						>
					</div>
				{/each}
			</div>
		</Card>

		<Card class="mt-4" size="xl">
			<p>Update</p>
			<p>Select roles with update access</p>
			<div class="mt-3">
				{#each permissions as permission}
					<div class="mb-4">
						<Checkbox bind:checked={permission.updateChecked} bind:value={permission.updateChecked}>
							{permission.name}</Checkbox
						>
					</div>
				{/each}
			</div>
		</Card>

		<Card class="mt-4" size="xl">
			<p>Delete</p>
			<p>Select roles with delete access</p>
			<div class="mt-3">
				{#each permissions as permission}
					<div class="mb-4">
						<Checkbox bind:checked={permission.deleteChecked} bind:value={permission.deleteChecked}>
							{permission.name}</Checkbox
						>
					</div>
				{/each}
			</div>
		</Card>

		<input
			type="hidden"
			value={JSON.stringify(permissions)}
			name="requiredPermissions"
			id="requiredPermissions"
		/>
		<Button class="w-full mt-9" type="submit">Update</Button>
	</div>
</form>
