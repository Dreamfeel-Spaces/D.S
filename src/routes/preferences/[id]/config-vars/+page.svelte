<script lang="ts">
	export let form: any;
	import { Input, Button, Alert } from 'flowbite-svelte';
	let keyValue = {
		key: '',
		value: ''
	};
	let vars = [{ ...keyValue }];
	function addOptions() {
		vars = [...vars, { ...keyValue }];
	}
	function removeVar(index: number) {
		let all = [...vars];
		all.splice(index, 1);
		vars = [...all];
	}
</script>

<div class="px-6 lg:px-48">
	<div class="text-center text-xl text-gray-500 my-9">
		<h1>Add config vars</h1>

		{#if form?.success}
			<div class="my-3">
				<Alert>Saved</Alert>
			</div>
		{/if}
	</div>

	{#each vars as option, index}
		<div class="grid grid-cols-2 gap-4 mb-4">
			<div>
				<Input name="key" id="key" bind:value={option.key} required placeholder="KEY" />
				<p class="text-sm text-gray-500 mt-3">Key must be all uppercase, no spaces allowed.</p>
			</div>
			<div>
				<Input name="value" id="value" bind:value={option.value} required placeholder="VALUE" />
			</div>
		</div>
		<div class="flex justify-end">
			<Button on:click={() => removeVar(index)}>Remove</Button>
		</div>
	{/each}
	<Button on:click={addOptions} class="mt-3">Add</Button>
</div>

<div class="px-6 lg:px-48">
	<form method="POST">
		<input type="hidden" name="variables" id="variables" value={JSON.stringify(vars)} />
		<Button type="submit" class="w-full mt-9">Save</Button>
	</form>
</div>
