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
	const space = $page.data.space;
	import PermissionDialog from './PermissionDialog.svelte';
	import UpdateDrawer from './UpdateDrawer.svelte';
	const onboarding = space.onboarding[0];
	const interest = JSON.parse(onboarding?.stepCoding ?? '');
	export let form: any;
	let externalFormModal = false;

	function handleClickItem(role: any) {
		externalFormModal = true;
	}
</script>

<svelte:head>
	<title>{space?.name || 'Unknown Space'}</title>
</svelte:head>

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
					<TableBodyCell class="cursor-pointer" on:click={() => handleClickItem(role)}
						><UpdateDrawer {role} /></TableBodyCell
					>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</Card>
