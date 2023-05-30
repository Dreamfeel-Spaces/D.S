<script>
	import { Alert, Button, Heading, Hr, Input, Label, Select } from 'flowbite-svelte';
	let provider = 'twilio';
</script>

<div
	class="container min-h-full text-black space-y-9 dark:text-gray-100 bg-gray-300 dark:bg-black p-6 rounded-xl"
>
	<Heading tag="h5">Push nofications</Heading>
	<Hr />
	<Select
		bind:value={provider}
		items={[
			{ name: 'Firebase Cloud Messaging', value: 'fcm' },
			{ name: 'Apple Push Notifications Service', value: 'aps' },
			{ name: 'Amazon Simple Notification Service', value: 'ass' },
			{ name: 'Microsoft Azure Notifications Hub', value: 'man' }
		]}
		placeholder="Select storage provider"
	/>

	{#if provider === 'yy'}
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
