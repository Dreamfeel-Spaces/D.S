<script>
	//@ts-nocheck
	import { Alert, Button, Checkbox, Heading, Hr, Input, Label, Select } from 'flowbite-svelte';
	let provider = 'twilio';
	let data = $page.data.values ?? {};
	import { page } from '$app/stores';
	import axios from 'axios';

	let saving = false;
	let success = false;
	let error = false;
	let errorMsg = false;

	async function handleSubmit() {
		try {
			saving = true;
			error = false;
			success = false;
			errorMsg = false;
			const response = await axios.put(`/rest/${$page.params.app_id}/mail/svr`, {
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

<form
	on:submit|preventDefault={handleSubmit}
	class="container min-h-full text-black space-y-9 dark:text-gray-100 bg-gray-300 dark:bg-black p-6 rounded-xl"
>
	<Heading tag="h5">Mail</Heading>
	<Hr />
	{#if success}
		<Alert accent dismissable class="my-4">Success. Configuration updated!</Alert>
	{/if}
	<Label>
		SMTP HOST
		<Input required bind:value={data['SMTP_HOST']} />
	</Label>
	<Label>
		SMTP PORT
		<Input required bind:value={data['SMTP_PORT']} type="number" />
	</Label>
	<Checkbox bind:value={data['SMTP_SECURE']} bind:checked={data['SMTP_SECURE']}>Secure</Checkbox>
	<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2">
		<Label>
			Username
			<Input required bind:value={data['SMTP_USERNAME']} />
		</Label>
		<Label>
			Password
			<Input required bind:value={data['SMTP_PASSWORD']} type="password" />
		</Label>
	</div>

	<div class="flex justify-end">
		<Button type={saving ? 'button' : 'submit'}
			>{#if saving}
				Updating...
			{:else}
				Update
			{/if}</Button
		>
	</div>
</form>
