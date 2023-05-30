<script lang="ts">
	import { convertToSlug } from '$lib/util/slugit';
	import { Input, Button, Alert } from 'flowbite-svelte';
	import { onDestroy } from 'svelte';
	import axios from 'axios';
	let appName = '';
	let appId = appName;
	export let form: any;

	let throttling = false;

	let requestTimeOut: any;

	let notUnique = false;

	async function handleFindUnique(id: string) {
		try {
			const response = await axios.get(`/spaces/create/unique/${id}`);
			notUnique = response.data;
			throttling = false;
		} catch (e) {
			notUnique = true;
			throttling = false;
		}
	}

	function onChangeAppId(e: any) {
		const value: string = convertToSlug(e.target.value);
		if (value) {
			throttling = true;
			if (requestTimeOut) {
				clearTimeout(requestTimeOut);
			}
			requestTimeOut = setTimeout(() => handleFindUnique(value), 690);
		} else {
			notUnique = false;
			throttling = false;
		}
	}

	onDestroy(() => {
		if (requestTimeOut) clearTimeout(requestTimeOut);
	});
</script>

{#if form?.error}
	<div class="px-6 mt-9 lg:px-64">
		<Alert dismissable class="bg-red-200 text-red-600 ">
			<div class="mb-3">
				<b>An error occured. Please try again.</b>
			</div>
		</Alert>
	</div>
{/if}

{#if form?.success}
	<div class="px-6 mt-9 lg:px-64">
		<Alert>
			<div class="mb-3">
				<b>New space has been created!</b>
			</div>
			<a class="hover:underline" rel="external" href={`/a/${form?.data?.appId}`}>Go to space</a>
		</Alert>
	</div>
{/if}

<section class="bg-white dark:bg-black m">
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

<div class="px-6 mx-2 lg:px-72 pb-36 ">
	<form method="POST">
		<div class="mb-6 w-full">
			<label class="dark:text-gray-100" for="appId">App ID</label>
			<Input
				placeholder="Unique app id i.e app-id"
				bind:value={appId}
				class="w-full"
				id="appId"
				name="appId"
				color={notUnique ? 'red' : 'base'}
				on:change={onChangeAppId}
				type="text"
			/>
			{#if throttling}
				<div class="text-xs dark:text-gray-100">Validating Space ID...</div>
			{/if}
			{#if notUnique}
				<p class="text-red-600">App ID already taken</p>
			{/if}
			<div>
				<small class="dark:text-gray-100">
					Formatted: {convertToSlug(appId ? appId : appName)}
				</small>
			</div>

			<br />
			{#if convertToSlug(appId ? appId : appName).length > 24}
				<small class="text-red-400 mt-3"> App ID cannot exceed 24 characters in length </small>
			{/if}
		</div>
		<div class="mb-6 w-full">
			<label class="dark:text-gray-100" for="name">Name</label>
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

		<Button
			disabled={convertToSlug(appId ? appId : appName).length > 24}
			class="w-full mb-18"
			type="submit">Save</Button
		>
	</form>
</div>
