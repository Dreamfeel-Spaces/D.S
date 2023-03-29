<script lang="ts">
	import {
		Input,
		Spinner,
		Button,
		NumberInput,
		Alert,
		Radio,
		CloseButton,
		Accordion,
		AccordionItem,
		Checkbox,
		Toast
	} from 'flowbite-svelte';
	import axios from 'axios';
	import { page } from '$app/stores';
	import Code from '../../../../Code.svelte';

	export let url = '';
	export let method = '';
	let apiResponse: any;
	let loading = false;

	export let table: any = '';

	export let action: any = '';

	export let clone: Boolean = false;

	const columns = table?.columns ?? [];

	let data: any;
	let error: any;

	let take: any;
	let skip: any;

	let itemId: string = '';

	let apiKey = '';
	let tablename = '';
	let splitter = ``;
	let apiUrl = `${$page.url.origin}/api/examples`;

	let headers = [{ name: '', value: '' }];

	let colItems = columns.map((col: any) => ({
		name: col.name,
		value: '',
		type: col.type
	}));

	let asItem = 'as_item';

	function parseResponse(splitter: string, data: any) {
		let keys = splitter.split('.');
		keys.splice(0, 1);
		return keys.reduce((prev: any, curr: any, index) => {
			try {
				return prev[curr];
			} catch (e) {
				return null;
			}
		}, data);
	}

	let statuscode: any = null;
	let statusText = '';

	let apiColumns = {};

	let apiKeysData = () =>
		Object.keys(data ?? {}).map((key) => {
			return {
				name: key,
				type: typeof data[key],
				checked: true,
				data: data[key]
			};
		});

	let nestedApiKeysData = () => {
		try {
			return Object.keys(parseResponse(splitter, data)[0] ?? {})
				.filter((key) => key !== 'id')
				.map((key) => {
					const _data = parseResponse(splitter, data) ?? {};
					return {
						name: key,
						type: typeof _data[0][key],
						checked: true,
						data: _data[0][key]
					};
				});
		} catch (e) {
			return [];
		}
	};

	let savingColumns = false;
	let savingColumnsSuccess = false;

	async function handleSaveColumns(collections: any[] = []) {
		try {
			savingColumns = true;
			savingColumnsSuccess = false;
			const response = await axios.post(`/base/${$page.params["app_id"]}/svr`, { collections });
			if (response.data) {
				savingColumnsSuccess = true;
				savingColumns = false;
			}
		} catch (e) {
			savingColumns = false;
			savingColumnsSuccess = false;
		}
	}

	async function handleFetch() {
		data = '';
		loading = true;
		statuscode = '';
		statusText = '';
		savingColumns = false;
		savingColumnsSuccess = false;

		if (clone) {
			try {
				const response = await axios.get(`${apiUrl}`, {
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
		} else if (action === 'find_first') {
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
	{#if clone}
		<label for="Url">URL </label>
		<Input bind:value={apiUrl} required class="my-3" placeholder={`Enter url`} />
	{/if}

	{#if clone}
		<div class="my-3 pl-9 bg-gray-700 py-3 rounded-xl">
			<p>Headers</p>
			{#each headers as header, index}
				<div class="grid gap-2 grid-cols-2 mt-3">
					<div><Input required value={header.name} placeholder="key" /></div>
					<div class="flex">
						<Input required value={header.value} placeholder="value" />
						<CloseButton
							on:click={() => {
								let all = [...headers];
								all.splice(index, 1);
								headers = [...all];
							}}
						/>
					</div>
					<div />
				</div>
			{/each}
			<button
				type="button"
				on:click={() => (headers = [...headers, { name: '', value: '' }])}
				class="mt-3"
				>Add header
			</button>
		</div>
	{/if}

	<label for="X-API-KEY"> X-API-KEY </label>
	<Input
		type="password"
		bind:value={apiKey}
		required={!clone}
		class="my-3"
		placeholder={`Api Key`}
	/>
	{#if !clone}
		<div>
			<a
				class="text-blue-500 hover:underline"
				target="blank"
				href={`/spaces/${$page.params["app_id"]}?tab=apikeys`}>Get an api key</a
			>
		</div>
	{/if}

	{#if action === 'find_unique' || action === 'delete'}
		<div class="my-6">
			<label for="id">ID</label>
			<Input bind:value={itemId} required class="my-3" placeholder={`Enter item id`} />
		</div>
	{/if}

	{#if action === 'create' || action === 'signup' || action === 'signin'}
		<div class="text-2xl mt-4">Request body</div>
		{#each colItems as col}
			{#if col.type === 'string' || col.type === 'number' || col.type === 'email' || col.type === 'password' || col.type === 'image'}
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
		<div class="flex justify-center">
			<div>
				<Spinner />
			</div>
		</div>
	{:else}
		<Button size="xs" type="submit" class={clone ? `mt-3 w-full` : 'mt-3'}>Send request</Button>
	{/if}

	<div class="mt-9">
		<p class="text-2xl">Response</p>
		<div class="mt-3">
			<p>{statuscode}: {statusText}</p>
		</div>
		{#if data && !clone}
			<div class={`my-6 text-green-500 text-wrap max-w-96 max-h-64 overflow-auto`}>
				<Code code={JSON.stringify(data, null, '\t')} />
			</div>
		{/if}

		{#if clone && data}
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="header">Response</svelte:fragment>
					<div class={`my-6 text-green-500 text-wrap max-w-96 max-h-64 overflow-auto`}>
						<Code code={JSON.stringify(data, null, '\t')} />
					</div>
				</AccordionItem>
			</Accordion>
		{/if}

		{#if clone && data}
			<Input
				color={tablename ? 'base' : 'red'}
				class="mt-4"
				bind:value={tablename}
				placeholder="Collection name"
			/>

			{#if typeof data === 'object'}
				<div class="mt-3">
					<div class="text-2xl mb-2">Object detected.</div>
					<ul
						class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
					>
						<li>
							<Radio class="p-3" bind:group={asItem} value="as_item">Save as item.</Radio>
						</li>
						<li>
							<Radio class="p-3" bind:group={asItem} value="nested_list">Use nested list.</Radio>
						</li>
						<li>
							<Radio class="p-3" bind:group={asItem} value="nested_object">Use nested object.</Radio
							>
						</li>
					</ul>

					{#if asItem === 'as_item'}
						<div class="my-3">
							<p class="text-2xl mb-2">Select columns to add</p>
							<ul
								class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
							>
								{#each apiKeysData() as column}
									<li>
										<div>
											<Checkbox bind:checked={column.checked} class="p-3" value="create_manually"
												>{column.name} - {column.type === 'object' ? 'rel' : column.type}</Checkbox
											>
										</div>
									</li>
								{/each}
							</ul>
						</div>
					{:else if asItem === 'nested_object'}
						<div class="mt-3">
							<Input
								bind:value={splitter}
								placeholder={`Enter key i.e  ${tablename ? tablename : 'collectionName'}.data`}
							/>

							<div class="mt-4">
								{Object.keys(parseResponse(splitter, data) ?? {})}
							</div>
						</div>
					{:else}
						<div class="mt-3">
							<Input
								bind:value={splitter}
								placeholder={`Enter key i.e  ${tablename ? tablename : 'collectionName'}.data`}
							/>

							<div class="mt-4">
								<ul
									class="w-full mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
								>
									{#each nestedApiKeysData() as column}
										<li>
											<div>
												<Checkbox bind:checked={column.checked} class="p-3" value="create_manually"
													>{column.name} - {column.type === 'object'
														? 'rel'
														: column.type}</Checkbox
												>
											</div>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					{/if}
				</div>
			{/if}

			{#if data?.length}
				Object.keys(data[0])
			{/if}
			{#if savingColumnsSuccess}
				<Toast simple>Schema has been saved.</Toast>
			{/if}
			<Button
				disabled={!tablename}
				on:click={() => handleSaveColumns([{ name: tablename, columns: apiKeysData() }])}
				class="w-full"
			>
				{#if savingColumns}
					<Spinner />{:else}Save columns{/if}
			</Button>
		{/if}

		{#if error}
			<div class={`my-6 text-red-500`}>
				{error}
			</div>
		{/if}
		{#if !clone}
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
		{/if}
	</div>
</form>
