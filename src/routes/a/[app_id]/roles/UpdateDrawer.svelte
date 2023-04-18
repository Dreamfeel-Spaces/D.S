<script lang="ts">
	import { page } from '$app/stores';
	import { convertToSlug } from '$lib/util/slugit';
	import {
		Modal,
		Alert,
		Input,
		Textarea,
		Label,
		Checkbox,
		Toggle,
		Hr,
		Drawer,
		Button,
		CloseButton
	} from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	let hidden1 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	const space = $page?.data?.space;
	let tables = space?.tables ?? [];
	let formModal = false;
	export let role: any = {};

	let meta: any = {};

	let roleName = '';
</script>

<div>
	<div class="flex justify-end">
		<button on:click={() => (hidden1 = false)}>Edit</button>
	</div>
	<form action="?/update" method="post">
		<input type="hidden" name="id" bind:value={role.id} />
		<Drawer
			class="w-64"
			transitionType="fly"
			{transitionParams}
			bind:hidden={hidden1}
			id="sidebar1"
		>
			<div class="my-4">
				<p class="text-xl dark:text-gray-100">Update role</p>
			</div>
			<div>
				<Label>
					<span> Name </span>
					<Input
						name="name"
						required
						autofocus
						bind:value={role.name}
						Placeholder="Enter role name, i.e admin, user, staff, guest..."
					/>
				</Label>
				{#if roleName}
					<div class="text-sm mt-2">
						Role name will be: {convertToSlug(role.name)}
					</div>
				{/if}
				<Label class="mt-4">
					<div>
						<span> Description </span>
					</div>
					<div>
						<Textarea bind:value={role.description} name="description" required />
					</div>
				</Label>
				<Checkbox
					bind:value={role.isSuperUser}
					name="isSuperUser"
					bind:checked={role.isSuperUser}
					class="mt-4"
				>
					<span class="text-gray-900 dark:text-gray-100"> Is Super User </span>
				</Checkbox>
				{#if !role.isSuperUser}
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
					<Checkbox bind:checked={role.updateAllConfig} class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Update space config </span>
					</Checkbox>
					{#if !role.updateAllConfig}
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
					<Checkbox bind:checked={role.updateAllEditor} class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">UI Updates </span>
					</Checkbox>
					{#if !role.updateAllEditor}
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
					<Checkbox bind:checked={role.allCollectionCrud} class="mt-4">
						<span class="text-gray-900 dark:text-gray-100">Collections CRUD </span>
					</Checkbox>

					{#if !tables.length}
						<Alert class="mt-3">No collections to add.</Alert>
					{/if}

					{#if !role.allCollectionCrud}
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
			<Button type="submit" class=" mt-9 w-full">Save role</Button>
		</Drawer>
	</form>
</div>
