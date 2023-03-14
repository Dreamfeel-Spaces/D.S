<script lang="ts">
	import axios from 'axios';
	import { Button, Modal, Alert, Checkbox, Spinner } from 'flowbite-svelte';
	let formModal = false;

	let loading = false;
	let res: any = '';

	async function handleGenerate() {
		loading = true;
		res = '';
		try {
			const response = await axios.get(`/a/demo/accounts/cred`);
			res = response.data;
			loading = false;
		} catch (e) {
			loading = false;
		}
	}
</script>

<div class="text-end">
	<Button on:click={() => (formModal = true)}>Generate Credentials</Button>
</div>
<Modal bind:open={formModal} autoclose={false} class="w-full">
	<Alert>
		<form on:submit|preventDefault={handleGenerate}>
			<b class="text-2xl">Demo Credentials </b>
			<p class="my-4">
				These credentials are only meant for testing in the Demo space. Credentials are
				automatically deleted periodically. For testing, file upload has been disabled. To test a
				full space, <a class="underline" href="/spaces/create">Create a new space. </a>
			</p>
			<div>
				<Checkbox required>I have understood the terms and conditions</Checkbox>
			</div>

			{#if res}
				<div class="my-4">
					Your credentials.
					<p><b>Username</b> : {res.username}</p>
					<p><b>Password</b> : {res.password}</p>
				</div>
			{/if}

			<Button type="submit" class="mt-4"
				>{#if loading}
					<Spinner />
				{:else}
					Generate
				{/if}</Button
			>
		</form>
	</Alert>
</Modal>
