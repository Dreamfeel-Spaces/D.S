<script lang="ts">
	import { enhance } from '$app/forms';
	import { convertToSlug } from '$lib/util/slugit';
	import { Input, Button, Alert } from 'flowbite-svelte';
	let appName = '';
	let appId = appName;
	export let form: any;
</script>

{#if form?.success}
	<div class="px-6 mt-9 lg:px-64">
		<Alert>
			<div class="mb-3">
				<b>Space created!</b>
			</div>
			<a class="hover:underline" rel="external" href={`/spaces/${form?.data?.appId}?tab=settings`}
				>Configure space</a
			>
		</Alert>
	</div>
{/if}

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
		<h1
			class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-700 md:text-5xl lg:text-6xl dark:text-white"
		>
			Create a spaces app
		</h1>
		<p
			class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			Here at Dreamfeel we focus on markets where technology, innovation, and capital can unlock
			long-term value and drive economic growth.
		</p>
	</div>
</section>

<div class="px-6 mx-2 lg:px-72">
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
