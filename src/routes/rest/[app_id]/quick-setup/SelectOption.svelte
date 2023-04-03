<script>
	import { page } from '$app/stores';
	import { Button, Modal, Spinner } from 'flowbite-svelte';
	let modalOpen = false;
	import axios from 'axios';
	import { goto } from '$app/navigation';

	export let ctx = '';

	import { apiHelperModal } from '$lib/wsstore';

	async function handleRequest() {
		modalOpen = true;
		const response = await axios.put(`/rest/${$page.params["app_id"]}/quick-setup/sver`, { ctx });
		if (response.data) {
			modalOpen = false;
			if (ctx === 'dismiss') {
				window.location.reload();
			}
			goto(`/rest/${$page.params["app_id"]}`);
		}
	}
</script>

{#if ctx !== 'setup'}
	<Button
		disabled={ctx === 'setup'}
		color={ctx === 'skip' ? 'dark' : 'blue'}
		outline
		on:click={$apiHelperModal.open ? () => apiHelperModal.set({ open: false }) : handleRequest}
		size="xs"
		>{#if ctx === 'skip'}Skip {:else if ctx === 'dismiss'}Dismiss {:else}Select{/if}</Button
	>
{/if}

<Modal permanent class="w-full" bind:open={modalOpen}>
	<div class=" text-2xl self-center">
		<div>
			<Spinner />
			<span class="ml-2 mt-2">
				{#if ctx === 'dismiss'} Please wait... {:else}Setting you up...{/if}
			</span>
		</div>
	</div>
</Modal>
