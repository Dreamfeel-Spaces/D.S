<script lang="ts">
	//@ts-nocheck

	import type { PageData } from './$types';

	import { Checkbox, Button, Card } from 'flowbite-svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	const table = data.table;

	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	onMount(() => {
		invalidateAll();
	});
</script>

<form method="post">
	<div class="p-6">
		<Card size="xl">
			<p>Create</p>
			<p>Select roles with create access</p>
			<div class="mt-3">
				{#each data.roles as permission}
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
				{#each data.roles as permission}
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
				{#each data.roles as permission}
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
				{#each data.roles as permission}
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
			value={JSON.stringify(data.roles)}
			name="requiredPermissions"
			id="requiredPermissions"
		/>
		<Button class="w-full mt-9" type="submit">Update</Button>
	</div>
</form>
