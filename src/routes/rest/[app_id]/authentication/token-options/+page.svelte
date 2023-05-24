<script lang="ts">
	//@ts-nocheck
	import { Input, Select, Heading, Button, Alert } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import axios from 'axios';
	let data = $page.data.values ?? {
		EXPIRY: 1,
		FREQUENCY: 'daily',
		APP_SECRET: ''
	};

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
			const response = await axios.put(
				`/rest/${$page.params.app_id}/authentication/token-options/svr`,
				{
					value: JSON.stringify(data)
				}
			);
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
	<div class="container">
		<div class="space-y-6">
			<Heading tag="h4">Token Options</Heading>
			{#if success}
				<Alert dismissable accent class="my-3">Success! Configuration changes saved!</Alert>
			{/if}
			<div class="grid grid-cols-2 gap-2">
				<div>
					<Input required bind:value={data['EXPIRY']} placeholder="Expiry" />
				</div>
				<div>
					<Select
						required
						bind:value={data['FREQUENCY']}
						items={[
							{ name: 'Day (s)', value: 'daily' },
							{ name: 'Week (s)', value: 'weekly' },
							{ name: 'Month (s)', value: 'monthly' }
						]}
					/>
				</div>
			</div>
			<div>
				<Input
					required
					bind:value={data['APP_SECRET']}
					type="password"
					placeholder="Token Encryption secret"
				/>
			</div>
			<Button type="submit" disabled={saving} class="w-full"
				>{#if saving}
					Saving...
				{:else}
					Update
				{/if}</Button
			>
		</div>
	</div>
</form>
