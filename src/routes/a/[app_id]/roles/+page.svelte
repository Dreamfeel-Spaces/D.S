<script lang="ts">
	import {
		Button,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Card
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
	const space = $page.data.space;
	import PermissionDialog from '../../../preferences/[app_id]/PermissionDialog.svelte';
	let appId = $page.params['app_id'];
	const onboarding = space.onboarding[0];
	const interest = JSON.parse(onboarding?.stepCoding ?? '');
	export let form: any;
</script>

<Card size="xl" class="min-h-100">
	<PermissionDialog />
	{#if form?.roleSuccess}
		<div class="dark:text-gray-100">Role has been added</div>
	{/if}

	<Table class="mt-9">
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Role</TableHeadCell>
			<TableHeadCell>Date Added</TableHeadCell>
			<TableHeadCell />
		</TableHead>
		<TableBody>
			{#each $page.data.roles ?? [] as role}
				<TableBodyRow>
					<TableBodyCell>{role.name}</TableBodyCell>
					<TableBodyCell
						>{#if role.isSuperUser}
							<Button size="xs" pill color="red">
								<span class="text-xs"> SUPER_USER </span>
							</Button>
						{:else}
							<Button size="xs" pill color="blue">
								<span class="text-xs"> {role.name.toUpperCase()}</span>
							</Button>
						{/if}
					</TableBodyCell>
					<TableBodyCell>{role.created}</TableBodyCell>
					<TableBodyCell><a href="/edit">Edit</a></TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</Card>
