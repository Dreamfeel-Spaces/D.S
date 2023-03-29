<script lang="ts">
	//@ts-nocheck
	import {
		Button,
		Modal,
		Label,
		Input,
		Select,
		Checkbox,
		Textarea,
		Fileupload,
		CloseButton
	} from 'flowbite-svelte';
	let formModal = false;
	let metaData = {
		shareWith: 'anyone',
		sortBy: '',
		layout: '',
		table: '',
		via: 'external'
	};
	export let permissions: any[];
	export let tables: any[];
	export let reports: any[];
	export let type = '';
	export let itemId: string;
	export let description = '';
	export let title = '';
	export let tab = 'reports';
	let users = [{}];
	// console.log(metaData.table);
	let columns = tables?.find((table) => table.id === metaData.table)?.columns;
</script>

<div>
	<Button on:click={() => (formModal = true)} pill gradient size="xs">Share {type}</Button>
	<Modal bind:open={formModal} autoclose={false} class="w-full">
		<form method="post" action={`?/createSharable&tab=${tab}`}>
			<input type="hidden" value={type} name="type" />
			<input type="hidden" value={itemId} name="id" />
			<div class="mb-4">
				<p class="text-2xl">Share {type}</p>
			</div>
			<div class="mb-6">
				<label for="shareWith">Share via</label>
				<Select
					required
					bind:value={metaData.via}
					name="via"
					items={[
						{ name: 'Slack', value: 'slack' },
						{ name: 'External', value: 'external' }
					]}
				/>
			</div>

			<div class="mb-6">
				<label for="shareWith">Share with</label>
				<Select
					required
					bind:value={metaData.shareWith}
					name="shareWith"
					items={[
						{ name: 'Role', value: 'roles' },
						{ name: 'Collection', value: 'collection' },
						{ name: 'Select from report', value: 'report' },
						{ name: 'Add manually', value: 'add_manually' },
						{ name: 'Anyone', value: 'anyone' }
					]}
				/>
			</div>

			{#if metaData.shareWith === 'roles'}
				<div class="mb-6">
					<div class="mb-3">Select roles</div>
					{#each permissions as permission}
						<Checkbox class="mb-3">{permission.name}</Checkbox>
					{/each}
				</div>
			{/if}

			<input type="hidden" value={JSON.stringify(permissions)} name="roles" />

			{#if metaData.shareWith === 'collection'}
				<div class="mb-6">
					<div class="mb-3">Select collection</div>
					<Select
						name="collection"
						bind:value={metaData.table}
						items={tables.map((table) => ({
							name: table.name,
							value: table.id
						}))}
					/>
				</div>
				<div class="mb-6">
					<div class="mb-3">Select email field</div>
					<Select name="field" />
					<!-- items={[...[tables.filter((table) => table.name == metaData.table).columns]].map(
							(table) => ({
								name: table.name,
								value: table.value
							})
						)} -->
				</div>
			{/if}

			{#if metaData.shareWith === 'report'}
				<div class="mb-6">
					<div class="mb-3">Select report</div>
					<Select
						name="report"
						items={reports.map((table) => ({
							name: table.name,
							value: table.id
						}))}
					/>
				</div>
			{/if}

			{#if metaData.shareWith === 'add_manually'}
				<div class="mb-6">
					<input type="hidden" name="users" value={JSON.stringify(users)} />
					<div class="mb-3">Add users</div>
					<div class="grid grid-cols-2 gap-2">
						{#each users as user, index}
							<div>
								<div class="flex justify-between">
									<p>Email</p>
									<CloseButton
										on:click={() => {
											let all = [...users];
											all.splice(index, 1);
											users = [...all];
										}}
									/>
								</div>
								<Input placeholder="Share with email" required />
							</div>
						{/each}
						<button
							type="button"
							on:click={() => {
								users = [...users, {}];
							}}
							class="text-xs text-center border py-2 border-gray-200 rounded "
							size="xs"
						>
							<div>+</div>
							<div>Add field</div>
						</button>
					</div>
				</div>
			{/if}

			<div class="mb-6">
				<label for="coverImage">Custom cover Image</label>
				<Fileupload name="coverImage" />
			</div>

			<div class="mb-6">
				<label for="coverImage">Custom title</label>
				<Input bind:value={title} name="title" />
			</div>

			<div class="mb-6">
				<label for="coverImage">Custom description</label>
				<Input bind:value={description} name="description" />
			</div>
			<Button type="submit" class="w-full">Share</Button>
		</form>
	</Modal>
</div>
