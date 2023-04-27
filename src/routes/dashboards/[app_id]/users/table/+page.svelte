<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import {
		Button,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';
	export let data: PageData;
</script>

<div class="flex justify-end mt-6">
	<a href={`/dashboards/${$page.params['app_id']}/users/add`}>
		<Button pill gradient size="xs">Add user</Button>
	</a>
</div>

<Table striped class="mt-6">
	<TableHead>
		<TableHeadCell>ID</TableHeadCell>
		<TableHeadCell>Email</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>Date Added</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each data?.admins as admin}
			<TableBodyRow>
				<TableBodyCell>{admin.id}</TableBodyCell>
				<TableBodyCell>{admin.username}</TableBodyCell>
				<TableBodyCell>{admin.status}</TableBodyCell>
				<TableBodyCell>{admin.dateCreated}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
