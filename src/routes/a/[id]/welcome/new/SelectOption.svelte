<script>
	import { page } from '$app/stores';
	import { Button, Modal, Spinner, Toggle } from 'flowbite-svelte';
	let modalOpen = false;
	import axios from 'axios';
	import { goto } from '$app/navigation';

	let includeWebApp = true;
	let includeRest = true;

	export let ctx = 'blank';

	async function handleRequest() {
		modalOpen = true;
		const response = await axios.put(`/a/${$page.params.id}/welcome/new/svr`, {
			ctx,
			includeRest,
			includeWebApp
		});
		if (response.data) {
			modalOpen = false;
			goto(`/a/${$page.params.id}`);
		}
	}
</script>

<div class="my-4">
	<Toggle checked disabled size="small">
		<span class="text-gray-700 dark:text-gray-400">*Dashboard</span>
	</Toggle>
	<div class="mt-4" />
	<Toggle bind:checked={includeRest} size="small">
		<span class="text-gray-700 dark:text-gray-400">REST API</span>
	</Toggle>
	<div class="mt-4" />

	<Toggle bind:checked={includeWebApp} size="small">
		<span class="text-gray-700 dark:text-gray-400">Web Application</span>
	</Toggle>
</div>

<Button on:click={handleRequest} size="xs">Select</Button>

<Modal permanent class="w-full" bind:open={modalOpen}>
	<div class=" text-2xl self-center">
		<div>
			<Spinner />
			<span class="ml-2 mt-2"> Setting you up... </span>
		</div>
	</div>
</Modal>
