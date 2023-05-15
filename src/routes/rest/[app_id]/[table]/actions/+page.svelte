<script lang="ts">
	import { Input, Card, Select, Heading, Button, Modal } from 'flowbite-svelte';
	let expiry = 'daily';
	let modalOpen = false;
</script>

<div class="container">
	<div class="dark:bg-gray-900 p-6 h-full rounded-xl">
		<div class="flex justify-between">
			<Heading tag="h4">Actions</Heading>
			<div><Button on:click={() => (modalOpen = true)}>Add</Button></div>
		</div>
	</div>
</div>

<div>
	<Modal class="w-full" bind:open={modalOpen}>
		<Heading slot="header" tag="h4">Add action</Heading>
		<div class="space-y-6">
			<div>
				<label for="trigger">Trigger</label>
				<Select
					items={[
						{ name: 'On Create', value: 'daily' },
						{ name: 'On Update', value: 'daily' },
						{ name: 'On Read', value: 'daily' },
						{ name: 'On Delete', value: 'daily' }
					]}
					bind:value={expiry}
				/>
			</div>

			<div>
				<label for="action">Reaction</label>
				<Select
					items={[
						{ name: 'Send Email', value: 'daily' },
						{ name: 'Send SMS', value: 'daily' },
						{ name: 'Push notification', value: 'daily' },
						{ name: 'Create file', value: 'daily' }
					]}
					bind:value={expiry}
				/>
			</div>
		</div>
		<Button slot="footer">Update</Button>
	</Modal>
</div>
