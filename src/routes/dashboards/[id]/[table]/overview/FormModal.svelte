<script lang="ts">
	//@ts-nocheck
	import { Button, Modal, Label, Input, Select, Checkbox, Textarea } from 'flowbite-svelte';
	let formModal = false;
	export let columns: any = [];
	let metaData = {
		sort: '',
		sortBy: '',
		layout: '',
		orientation: ''
	};
</script>

<div class="text-end">
	<Button on:click={() => (formModal = true)}>Create form</Button>
</div>
<Modal bind:open={formModal} autoclose={false} class="w-full">
	<form class="flex flex-col space-y-3" action="?/addForm&tab=forms" method="POST">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Configure form</h3>
		<input value={JSON.stringify([...columns])} name={'columnMetaData'} type="hidden" />
		<Label class="space-y-2">
			<span>Name</span>
			<Input required type="text" name="name" placeholder="name" />
		</Label>
		<Label class="space-y-2">
			<span>Desc</span>
			<Textarea rows={3} type="text" name="description" placeholder="Desc" />
		</Label>
		<div class="flex">
			<div class=" flex-1">Select fields</div>
			<Checkbox
				checked={columns.filter((col) => col.checked).length === columns.length}
				on:click={() => {
					columns = [...columns.map((col) => ({ ...col, checked: !col.checked }))];
				}}>Select all</Checkbox
			>
		</div>
		<div class="mflex gap-2 wrap">
			{#each columns as column}
				<Checkbox bind:checked={column.checked} bind:value={column.checked}>{column.name}</Checkbox>
			{/each}
		</div>
		<Button type="submit" class="w-full">Create form</Button>
	</form>
</Modal>
