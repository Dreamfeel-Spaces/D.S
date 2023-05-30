<script>
	//@ts-nocheck
	import axios from 'axios';
	import { Alert, Button, Heading, Hr, Input, Label, Select } from 'flowbite-svelte';
	import { page } from '$app/stores';
	let provider = 'twilio';
	let saving = false;
	let success = false;
	let error = false;
	let errorMsg = false;

	let data = $page.data.values ?? {};

	async function handleSubmit() {
		try {
			saving = true;
			error = false;
			success = false;
			errorMsg = false;
			const response = await axios.put(`/rest/${$page.params.app_id}/sms/svr`, {
				provider,
				value: JSON.stringify(data)
			});
			if (response) {
				saving = false;
				error = false;
				success = true;
			}
		} catch (e) {
			saving = false;
			errorMsg = e;
			error = true;
			success = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div
		class="container min-h-full text-black space-y-9 dark:text-gray-100 bg-gray-300 dark:bg-black p-6 rounded-xl"
	>
		<Heading tag="h5">SMS</Heading>
		<Hr />
		{#if success}
			<Alert accent dismissable class="my-4">Success. Configuration updated!</Alert>
		{/if}
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
					<Input required bind:value={data['TWILIO_SID']} />
				</Label>
				<Label>
					Auth Token
					<Input required type="password" bind:value={data['TWILIO_AUTH_TOKEN']} />
				</Label>
			</div>
		{/if}

		{#if provider === 'nexmo'}
			<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2">
				<Label>
					API KEY
					<Input required bind:value={data['NEXMO_API_KEY']} />
				</Label>
				<Label>
					SECRET
					<Input required type="password" bind:value={data['NEXMO_API_SECRET']} />
				</Label>
			</div>
		{/if}

		{#if provider === 'message_bird'}
			<div class="space-y-4">
				<Label>
					Api key
					<Input required type="password" bind:value={data['MESSAGE_BIRD_API_KEY']} />
				</Label>
			</div>
		{/if}

		<div class="flex justify-end">
			<Button type={saving ? 'button' : 'submit'}
				>{#if saving}
					Updating...
				{:else}
					Update
				{/if}</Button
			>
		</div>
	</div>
</form>
