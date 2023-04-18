<script lang="ts">
	import { page } from '$app/stores';
	import { convertToSlug } from '$lib/util/slugit';
	import {
		Modal,
		Alert,
		Button,
		Input,
		Textarea,
		Label,
		Checkbox,
		Toggle,
		Hr
	} from 'flowbite-svelte';
	const space = $page?.data?.space;
	let tables = space?.tables ?? [];
	let formModal = false;

	let meta: any = {};

	let roleName = '';


	function handleSubmit(){
		
	}


</script>

<div class="flex justify-end">
	<Button on:click={() => (formModal = true)} gradient color="pinkToOrange" pill size="xs"
		>Add roles</Button
	>
</div>

<form method="post" action="?/createRole&tab=roles">
	<Modal class="w-full" autoclose={false} bind:open={formModal}>
		<div slot="header" class="text-center">
			<p class="text-2xl dark:text-gray-100">Add role</p>
		</div>
		<div>
			<Label>
				<span> Name </span>
				<Input
					name="name"
					required
					autofocus
					bind:value={roleName}
					Placeholder="Enter role name, i.e admin, user, staff, guest..."
				/>
			</Label>
			{#if roleName}
				<div class="text-sm mt-2">
					Role name will be: {convertToSlug(roleName)}
				</div>
			{/if}
			<Label class="mt-4">
				<span> Description </span>
				<Textarea name="description" required />
			</Label>
			<Checkbox
				bind:value={meta.isSuperUser}
				name="isSuperUser"
				bind:checked={meta.isSuperUser}
				class="mt-4"
			>
				<span class="text-gray-900 dark:text-gray-100"> Is Super User </span>
			</Checkbox>
			{#if !meta.isSuperUser}
				<Hr class="my-2" />
				<Toggle size="small" class="mt-4">
					<span class="text-gray-900 dark:text-gray-100"> Create API Keys </span>
				</Toggle>
				<Toggle size="small" class="mt-4">
					<span class="text-gray-900 dark:text-gray-100"> Create roles </span>
				</Toggle>
				<Toggle size="small" class="mt-4">
					<span class="text-gray-900 dark:text-gray-100">Signup users </span>
				</Toggle>
				<Hr class="my-2" />
				<Checkbox bind:checked={meta.updateAllConfig} class="mt-4">
					<span class="text-gray-900 dark:text-gray-100">Update space config </span>
				</Checkbox>
				{#if !meta.updateAllConfig}
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Update auth token options </span>
					</Toggle>
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Update auth providers </span>
					</Toggle>
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Update mail settings </span>
					</Toggle>
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Update sms settings </span>
					</Toggle>
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Update payment providers </span>
					</Toggle>
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Update file storage options </span>
					</Toggle>
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Update logistics providers </span>
					</Toggle>
				{/if}
				<Hr class="my-2" />
				<Checkbox bind:checked={meta.updateAllEditor} class="mt-4">
					<span class="text-gray-900 dark:text-gray-100">UI Updates </span>
				</Checkbox>
				{#if !meta.updateAllEditor}
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Switch UI </span>
					</Toggle>
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Create UI </span>
					</Toggle>
					<Toggle size="small" class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Create pages </span>
					</Toggle>
				{/if}

				<Hr class="my-2" />
				<Checkbox bind:checked={meta.allCollectionCrud} class="mt-4">
					<span class="text-gray-900 dark:text-gray-100">Collections CRUD </span>
				</Checkbox>

				{#if !tables.length}
					<Alert class="mt-3"
						>No collections have been added to this space. You can configure collection permissions
						later.</Alert
					>
				{/if}

				{#if !meta.allCollectionCrud}
					{#each tables as table}
						<div class="pl-6">
							<Hr />
							<div class="text-2xl">{table.name}</div>
							<Checkbox bind:checked={table.allCRUD} class="mt-4">
								<span class="text-gray-900 dark:text-gray-100">CRUD </span>
							</Checkbox>
							{#if !table.allCRUD}
								<Toggle size="small" bind:checked={table.create} class="mt-4">
									<span class="text-gray-900 dark:text-gray-100">Create </span>
								</Toggle>
								<Toggle size="small" bind:checked={table.read} class="mt-4">
									<span class="text-gray-900 dark:text-gray-100">Read </span>
								</Toggle>
								<Toggle size="small" bind:checked={table.update} class="mt-4">
									<span class="text-gray-900 dark:text-gray-100">Update </span>
								</Toggle>
								<Toggle size="small" bind:checked={table.delete} class="mt-4">
									<span class="text-gray-900 dark:text-gray-100">Delete </span>
								</Toggle>
								<Toggle size="small" bind:checked={table.dashboards} class="mt-4">
									<span class="text-gray-900 dark:text-gray-100">Dashboards </span>
								</Toggle>
							{/if}
						</div>
					{/each}
				{/if}
			{/if}
			<input name="meta" value={JSON.stringify(meta)} type="hidden" />
		</div>
		<button type="submit" class="w-full">Save role</button>
	</Modal>
</form>
