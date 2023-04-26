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
	<button on:click={() => (formModal = true)} 
		><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"
			><path
				d="M727 976q-47.5 0-80.75-33.346Q613 909.307 613 861.669q0-6.669 1.5-16.312T619 828L316 652q-15 17-37 27.5T234 690q-47.5 0-80.75-33.25T120 576q0-47.5 33.25-80.75T234 462q23 0 44 9t38 26l303-174q-3-7.071-4.5-15.911Q613 298.25 613 290q0-47.5 33.25-80.75T727 176q47.5 0 80.75 33.25T841 290q0 47.5-33.25 80.75T727 404q-23.354 0-44.677-7.5T646 372L343 540q2 8 3.5 18.5t1.5 17.741q0 7.242-1.5 15Q345 599 343 607l303 172q15-14 35-22.5t46-8.5q47.5 0 80.75 33.25T841 862q0 47.5-33.25 80.75T727 976Zm.035-632Q750 344 765.5 328.465q15.5-15.535 15.5-38.5T765.465 251.5q-15.535-15.5-38.5-15.5T688.5 251.535q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5Zm-493 286Q257 630 272.5 614.465q15.5-15.535 15.5-38.5T272.465 537.5q-15.535-15.5-38.5-15.5T195.5 537.535q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5Zm493 286Q750 916 765.5 900.465q15.5-15.535 15.5-38.5T765.465 823.5q-15.535-15.5-38.5-15.5T688.5 823.535q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5ZM727 290ZM234 576Zm493 286Z"
			/></svg
		></button
	>
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
