<script lang="ts">
	//@ts-nocheck
	import type { ActionData, PageData } from './$types';
	import { Card, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	export let data: PageData;
	export let form: ActionData;
	let displayName = data.item._displayName;
	let item = { ...data.item };
	delete item['_displayName'];

	function handleUpdate() {
		goto(
			`/base/${$page.params["app_id"]}/table/${$page.params.table}/records/${$page.params.item}/update`
		);
	}
</script>

{#if form?.success}
	<div class="my-4">Item deleted</div>
{/if}

<div class="flex justify-center mt-16">
	<Card class="text-left" size="lg" padding="xl">
		<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{item[displayName]}</h5>

		{#each Object.keys(item ?? {}) as key}
			<p class="mb-5 text-left text-base text-gray-500 sm:text-lg dark:text-gray-400">
				{key}: {item[key]}
			</p>
		{/each}
		<div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
			<Button on:click={handleUpdate}>Update</Button>
			<form action="?/delete" method="POST">
				<Button type="submit" class="bg-red-500 hover:bg-red-700">Delete</Button>
			</form>
		</div>
	</Card>
</div>
