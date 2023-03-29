<script lang="ts">
	import { Search, Modal, Spinner, ListPlaceholder } from 'flowbite-svelte';
	let modalOpen = false;
	let searching = false;
	function handleSearch() {
		searching = true;
		modalOpen = true;
	}

	let searchTerm = '';
</script>

<div class="mt-1">
	<form on:submit|preventDefault={handleSearch}>
		<Search bind:value={searchTerm} required size="sm" />
	</form>
</div>

<Modal class="w-full" bind:open={modalOpen}>
	<div class="mt-2">
		<form on:submit|preventDefault={handleSearch}>
			<Search bind:value={searchTerm} required />
		</form>
	</div>
	<div>
		{#if searching}
			<div class="flex justify-center">
				<Spinner />
			</div>
			<div class="flex justify-center mt-4">
				<ListPlaceholder size="xl" class="w-full" />
			</div>
		{/if}
	</div>
</Modal>
