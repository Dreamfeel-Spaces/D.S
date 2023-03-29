<script lang="ts">
	import axios from 'axios';
	import { page } from '$app/stores';
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
	<Button size="xs" gradient on:click={() => (formModal = true)}>Generate Credentials</Button>
</div>
<Modal bind:open={formModal} autoclose={false} class="w-full">
	<div>
		<form on:submit|preventDefault={handleGenerate}>
			<b class="text-2xl">Demo Credentials </b>
			<p class="my-4">
				These credentials are only meant for testing in the Demo space. Credentials are deleted
				periodically. For testing, file upload has been disabled. To create a space, <b
					><a class="underline" href="/spaces/create">Create a new space. </a></b
				>
			</p>

			<div>
				<Checkbox required>
					<span class="text-gray-500"> I have read and understood this policy</span>
				</Checkbox>
			</div>

			{#if res}
				<Alert class="my-4">
					<p class="text-xl mb-4">Your credentials.</p>
					<p><b>Username</b> : {res.username}</p>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<p
						on:click={async () => await navigator.clipboard.writeText(res.username)}
						class="mb-6 underline cursor-pointer"
					>
						Copy username
					</p>
					<p><b>Password</b> : {res.password}</p>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<p
						on:click={async () => await navigator.clipboard.writeText(res.password)}
						class="mb-6 underline cursor-pointer"
					>
						Copy password
					</p>
					<p class="mt-3">
						<a target="_blank" rel="noreferrer" href={`/a/${$page.params['app_id']}/accounts`}
							>Login in a new tab</a
						>
					</p>
				</Alert>
			{/if}

			<Button type="submit" class="mt-4"
				>{#if loading}
					Please wait...
				{:else}
					Generate
				{/if}</Button
			>
		</form>
	</div>
</Modal>
