<script lang="ts">
	import { Input, Button, Select, Alert } from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let form: any;
	export let data: PageData;
	let newUserRole = 'user';
	import { page } from '$app/stores';
</script>

<div class="px-6">
	<div class="my-6 text-2xl text-gray-500">
		<p>Add user</p>
	</div>

	{#if form?.userCreateSuccess}
		<div class="my-6">
			<Alert>
				<div class="text-lg"><b>User added</b></div>
				<a href={`/dashboards/${$page.params["app_id"]}/users/${form?.data?.id}`}>View details</a>
			</Alert>
		</div>
	{/if}

	<form method="post">
		<div class="mb-6">
			<label for="fullname">Fullname</label>
			<Input placeholder="Jane Doe" required name="fullname" id="fullname" />
		</div>
		<div class="mb-6">
			<label for="email">Email</label>
			<Input placeholder="user@company.mail" type="email" required name="email" id="email" />
		</div>
		<div class="mb-6">
			<label for="role">Role</label>
			<Select
				name="role"
				id="role"
				bind:value={newUserRole}
				items={data?.roles?.map((role) => ({
					name: role.name,
					value: role.name
				}))}
			/>
		</div>
		<Button class="w-full" type="submit">Save</Button>
	</form>
</div>
