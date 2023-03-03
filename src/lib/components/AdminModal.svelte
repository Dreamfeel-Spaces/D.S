<script>
	import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	let formModal = false;
</script>

<div class="text-end">
	<Button on:click={() => (formModal = true)}>Add admin via email</Button>
</div>
<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="?/addAdmin&tab=admins" method="POST">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Add</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input type="email" name="email" placeholder="name@company.com" required />
		</Label>
		<p>If user not found, a signup request will be sent to their email</p>
		<Button type="submit" class="w-full1">Search and add</Button>
	</form>
</Modal>
