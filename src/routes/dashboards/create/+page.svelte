<script lang="ts">
	import { enhance } from '$app/forms';
	import { convertToSlug } from '$lib/util/slugit';
	import { Input, Button, Alert } from 'flowbite-svelte';
	let appName = '';
	let appId = appName;
	export let form: any;
</script>

{#if form?.success}
	<div class="px-6 mt-9">
		<Alert>
			<div class="mb-3">
				<b>Space saved!</b>
			</div>
			<a class="hover:underline" rel="external" href={`/spaces/${form?.data?.appId}`}
				>View details</a
			>
		</Alert>
	</div>
{/if}
<div class="text-3xl text-gray-500 mt-9 text-center ">Create Dashboard</div>
<div class="mt-9 px-6 mx-2">
	<form method="POST" use:enhance>
		<div class="mb-6 w-full">
			<label for="name">Name</label>
			<Input
				required
				bind:value={appName}
				placeholder="Name your space"
				class="w-full"
				id="name"
				name="name"
				type="text"
			/>
		</div>
		<div class="mb-6 w-full">
			<label for="appId">App ID</label>
			<Input
				required
				placeholder="Unique app id i.e app-id"
				bind:value={appId}
				class="w-full"
				id="appId"
				name="appId"
				type="text"
			/>
			<small>
				Formatted: {convertToSlug(appId ? appId : appName)}
			</small>
			<br />
			{#if convertToSlug(appId ? appId : appName).length > 24}
				<small class="text-red-400 mt-3"> App ID cannot exceed 24 characters in length </small>
			{/if}
		</div>

		<Button
			disabled={convertToSlug(appId ? appId : appName).length > 24}
			class="w-full"
			type="submit">Save</Button
		>
	</form>
</div>
