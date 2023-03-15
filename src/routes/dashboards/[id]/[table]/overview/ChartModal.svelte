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
	<Button size="xs" pill gradient color="pinkToOrange" on:click={() => (formModal = true)}
		>New chart</Button
	>
</div>
<Modal bind:open={formModal} autoclose={false} class="w-full">
	<form class="flex flex-col space-y-3" action="?/addChart&tab=charts" method="POST">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Chart</h3>
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
		<div class="flex gap-2 wrap">
			{#each columns as column}
				<Checkbox bind:checked={column.checked} bind:value={column.checked}>{column.name}</Checkbox>
			{/each}
		</div>
		<div class="mb-3 w-full  flex gap-2 wrap">
			<div>
				<div class="flex">
					<div class=" flex-1">Label Option</div>
				</div>
				<Select
					required
					bind:value={metaData.labelKey}
					items={columns.map((col) => ({
						name: col.name,
						value: col.name
					}))}
					name="labelKey"
				/>
			</div>
			<div>
				<div class="flex">
					<div class=" flex-1">Value Option</div>
				</div>
				<Select
					required
					bind:value={metaData.valueKey}
					items={columns.map((col) => ({
						name: col.name,
						value: col.name
					}))}
					name="valueKey"
				/>
			</div>
		</div>

		<div class="flex">
			<div class=" flex-1">Chart type</div>
		</div>
		<div class="mb-3 flex gap-2 wrap">
			<Select
				required
				bind:value={metaData.type}
				items={[
					{
						name: 'Bar',
						value: 'bar'
					},
					{
						name: 'Line',
						value: 'line'
					},
					{
						name: 'Pie',
						value: 'pie'
					},
					{
						name: 'Scatter',
						value: 'scatter'
					}
				]}
				name="type"
			/>
		</div>

		<Button type="submit" class="w-full">Create chart</Button>
	</form>
</Modal>
