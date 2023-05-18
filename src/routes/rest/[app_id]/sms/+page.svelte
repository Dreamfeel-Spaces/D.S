<script>
	import { Alert, Button, Heading, Hr, Input, Label, Select } from 'flowbite-svelte';
	let provider = 'twilio';
</script>

<div
	class="container min-h-full text-black space-y-9 dark:text-gray-100 bg-gray-300 dark:bg-gray-900 p-6 rounded-xl"
>
	<Heading tag="h5">SMS</Heading>
	<Hr />
	<Select
		bind:value={provider}
		items={[
			{ name: 'Twilio', value: 'twilio' },
			{ name: 'Nexmo', value: 'nexmo' },
			{ name: 'Message Bird', value: 'message_bird' }
		]}
		placeholder="Select storage provider"
	/>

	{#if provider === 'twilio'}
		<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2">
			<Label>
				SID
				<Input />
			</Label>
			<Label>
				Auth Token
				<Input />
			</Label>
		</div>
	{/if}

	{#if provider === 'nexmo'}
		<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2">
			<Label>
				API KEY
				<Input />
			</Label>
			<Label>
				SECRET
				<Input />
			</Label>
		</div>
	{/if}

	{#if provider === 'message_bird'}
		<div class="space-y-4">
			<Label>
				Api key
				<Input />
			</Label>
		</div>
	{/if}

	<div class="flex justify-end">
		<Button>Update</Button>
	</div>
</div>
