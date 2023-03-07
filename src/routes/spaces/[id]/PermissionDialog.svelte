<script lang="ts">
	import { Button, Modal, Label, Input, Select } from 'flowbite-svelte';
	let formModal = false;
	let permissions: any = '';
</script>

<div>
	<div>
		<Button size="xs" pill gradient on:click={() => (formModal = true)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
				/><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
				/></svg
			>
			{'Add Roles'}
		</Button>
	</div>
</div>
<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="?/createPage&tab=permission" method="POST">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Add</h3>
		<Label class="space-y-2">
			<span>Name</span>
			<Input type="text" autofocus name="name" required />
		</Label>

		<Label class="space-y-2">
			<span>Description</span>
			<Input type="text" name="path" id="path" required />
		</Label>
		<Button type="submit" class="w-full1">Save</Button>
	</form>
</Modal>
