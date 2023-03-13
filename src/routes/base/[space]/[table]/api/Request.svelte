<script lang="ts">
	import { Input, Spinner, Button, NumberInput, Alert } from 'flowbite-svelte';
	import axios from 'axios';
	import { page } from '$app/stores';

	export let url = '';
	export let method = '';
	let apiResponse: any;
	let loading = false;

	export let table: any;

	export let action: any;

	const columns = table?.columns ?? [];

	let data: any;
	let error: any;

	let take: any;
	let skip: any;

	let itemId: string = '';

	let apiKey = '';

	let colItems = columns.map((col: any) => ({
		name: col.name,
		value: '',
		type: col.type
	}));

	let statuscode: any = null;
	let statusText = '';

	async function handleFetch() {
		data = '';
		loading = true;
		statuscode = '';
		statusText = '';
		if (action === 'find_first') {
			let startParams = '';

			if (take) startParams = startParams + `take=${take}`;
			if (skip) startParams = startParams + `skip=${skip}`;

			const filters = colItems
				.filter((col: any) => Boolean(col.value))
				.reduce((prev: string, curr: any, index: number) => {
					if (startParams === '') return prev + `${curr.name}=${curr.value}`;
					return prev + `&${curr.name}=${curr.value}`;
				}, startParams);
			try {
				const response = await (axios as any)[method](`${url}?${filters}`);
				data = response.data;
				loading = false;
			} catch (e) {
				error = e;
				loading = false;
			}
		} else if (action === 'create') {
			const body = colItems.reduce((prev: any, curr: any, index: number) => {
				return { ...prev, [curr.name]: curr.value };
			}, {});
			try {
				const response = await axios.post(url, body, {
					headers: {
						'x-api-key': apiKey
					}
				});
				data = response.data;
				loading = false;
				statuscode = response.status;
				statusText = response.statusText;
			} catch (e) {
				error = e;
				loading = false;
			}
		} else if (action === 'delete') {
			try {
				const response = await axios.delete(`${url}/${itemId}`, {
					headers: {
						'x-api-key': apiKey
					}
				});
				data = response.data;
				loading = false;
				statuscode = response.status;
				statusText = response.statusText;
			} catch (e) {
				error = e;
				loading = false;
			}
		} else if (action === 'find_unique') {
			try {
				const response = await axios.get(`${url}/${itemId}`, {
					headers: {
						'x-api-key': apiKey
					}
				});
				data = response.data;
				loading = false;
				statuscode = response.status;
				statusText = response.statusText;
			} catch (e) {
				error = e;
				loading = false;
			}
		} else if (action === 'signup') {
			const body = colItems.reduce((prev: any, curr: any, index: number) => {
				return { ...prev, [curr.name]: curr.value };
			}, {});
			try {
				const response = await axios.post(`/api/auth/register`, body, {
					headers: {
						'x-api-key': apiKey
					}
				});
				data = response.data;
				loading = false;
				statuscode = response.status;
				statusText = response.statusText;
			} catch (e) {
				error = e;
				loading = false;
			}
		} else if (action === 'signin') {
			const body = colItems.reduce((prev: any, curr: any, index: number) => {
				return { ...prev, [curr.name]: curr.value };
			}, {});
			try {
				const response = await axios.post(`/api/auth/login`, body, {
					headers: {
						'x-api-key': apiKey
					}
				});
				data = response.data;
				loading = false;
				statuscode = response.status;
				statusText = response.statusText;
			} catch (e) {
				error = e;
				loading = false;
			}
		} else {
			try {
				const response = await (axios as any)[method](url, {
					headers: {
						'x-api-key': apiKey
					}
				});
				data = response.data;
				loading = false;
				statuscode = response.status;
				statusText = response.statusText;
			} catch (e) {
				error = e;
				loading = false;
			}
		}
	}
</script>

<form on:submit|preventDefault={handleFetch}>
	<label for="X-API-KEY"> X-API-KEY </label>
	<Input
		type="password"
		bind:value={apiKey}
		required
		class="my-3"
		placeholder={`Enter Space API Key ie Basic ${$page.params.space}#...`}
	/>
	<div>
		<a
			class="text-blue-500 hover:underline"
			target="blank"
			href={`/spaces/${$page.params.space}?tab=apikeys`}>Get an api key</a
		>
	</div>

	{#if action === 'find_unique' || action === 'delete'}
		<div class="my-6">
			<label for="id">ID</label>
			<Input bind:value={itemId} required class="my-3" placeholder={`Enter item id`} />
		</div>
	{/if}

	{#if action === 'create' || action === 'signup' || action === 'signin'}
		<div class="text-2xl mt-4">Request body</div>
		{#each colItems as col}
			{#if col.type === 'string' || col.type === 'number' || col.type === 'email' || col.type === 'password'}
				<div class="grid grid-cols-2 gap-3 my-5">
					<div>
						<p>{col.name}</p>
					</div>
					{#if col.type === 'number'}
						<NumberInput
							required={col.required}
							type={col.type}
							bind:value={col.value}
							placeholder={`Enter ${col.name}..`}
						/>
					{:else if col.type === 'email'}
						<Input
							required={col.required}
							type={'email'}
							bind:value={col.value}
							placeholder={`Enter ${col.name}..`}
						/>
					{:else if col.type === 'password'}
						<Input
							required={col.required}
							type={'password'}
							bind:value={col.value}
							placeholder={`Enter ${col.name}..`}
						/>
					{:else}
						<Input
							required={col.required}
							bind:value={col.value}
							placeholder={`Enter ${col.name}..`}
						/>
					{/if}
				</div>
			{/if}
		{/each}
	{/if}

	{#if action === 'find_first'}
		<div class="grid grid-cols-2 gap-3 my-5">
			<div>
				<p>Take</p>
			</div>
			<NumberInput bind:value={take} placeholder={`Take`} />
		</div>
		<div class="grid grid-cols-2 gap-3 my-5">
			<div>
				<p>Skip</p>
			</div>
			<NumberInput bind:value={skip} placeholder={`Skip`} />
		</div>
		{#each colItems as col}
			{#if col.type === 'string' || col.type === 'number' || col.type === 'email'}
				<div class="grid grid-cols-2 gap-3 my-5">
					<div>
						<p>{col.name}</p>
					</div>
					{#if col.type === 'number'}
						<NumberInput
							type={col.type}
							bind:value={col.value}
							placeholder={`Enter ${col.name}..`}
						/>
					{:else if col.type === 'email'}
						<Input type={'email'} bind:value={col.value} placeholder={`Enter ${col.name}..`} />
					{:else}
						<Input bind:value={col.value} placeholder={`Enter ${col.name}..`} />
					{/if}
				</div>
			{/if}
		{/each}
	{/if}
	{#if loading}
		<div class="flex">
			<Spinner />
		</div>
	{:else}
		<Button size="xs" type="submit" class="mt-3">Send request</Button>
	{/if}

	<div class="mt-9">
		<p class="text-2xl">Response</p>
		<div class="mt-3">
			<p>{statuscode}: {statusText}</p>
		</div>
		{#if data}
			<div class={`my-6 text-green-500 text-wrap max-w-96 max-h-64 overflow-auto`}>
				<pre>
					{JSON.stringify(data, null, '\t')}
				</pre>
			</div>
		{/if}

		{#if error}
			<div class={`my-6 text-red-500`}>
				{error}
			</div>
		{/if}

		<div class="text-2xl mt-9">
			<p>Response types</p>
			<div class="my-6">
				<Alert class="bg-green-100">
					<p class="text-xl text-green-500">200 OK</p>
					<p class="text-green-500">Server has successfully processed the request</p>
				</Alert>
			</div>
			<div class="mb-6">
				<Alert class="bg-red-100">
					<p class="text-xl text-red-500">400* Bad request</p>
					<p class="text-red-500">Request failed, something is wrong with the request.</p>
				</Alert>
			</div>
			<div class="mb-6">
				<Alert class="bg-red-100">
					<p class="text-xl text-red-500">500* Bad request</p>
					<p class="text-red-500">Request failed due to an internal server error.</p>
				</Alert>
			</div>
		</div>
	</div>
</form>
