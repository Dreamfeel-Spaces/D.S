<script lang="ts">
	//@ts-nocheck
	import axios from 'axios';
	import { Button, Card, Select, Spinner, Tabs, TabItem, Input } from 'flowbite-svelte';
	import Code from './Code.svelte';
	let method = 'get';
	let name = '';
	let id = '';
	let methods = [
		{ name: 'FIND MANY', value: 'get' },
		{ name: 'POST', value: 'post' },
		{ name: 'FIND ONE', value: 'get_one' },
		{ name: 'DELETE', value: 'delete' }
	];

	let requesting = false;

	let items: any = null;

	let statuscode: any = '';
	let statusText: any = '';

	async function handleFetch() {
		requesting = true;
		items = null;
		statuscode = '';
		statusText = '';
		if (method === 'get') {
			try {
				const response = await axios.get('/api/examples');
				if (response) {
					const data = response.data;
					items = data;
					requesting = false;
					statuscode = response.status;
					statusText = response.statusText;
					return;
				}
				requesting = false;
			} catch (e) {
				requesting = false;
				console.log(e);
			}
		} else if (method === 'post') {
			try {
				const response = await axios.post('/api/examples', { name });
				if (response) {
					const data = response.data;
					items = data;
					requesting = false;
					statuscode = response.status;
					statusText = response.statusText;
					return;
				}
				requesting = false;
			} catch (e) {
				requesting = false;
				console.log(e);
			}
		} else if (method === 'get_one') {
			try {
				const response = await axios.get('/api/examples' + `?id=${id}`);
				if (response) {
					const data = response.data;
					items = data;
					requesting = false;
					statuscode = response.status;
					statusText = response.statusText;
					return;
				}
				requesting = false;
			} catch (e) {
				requesting = false;
				console.log(e);
			}
		} else if (method === 'delete') {
			try {
				const response = await axios.delete('/api/examples' + `?id=${id}`);
				if (response) {
					const data = response.data;
					items = data;
					requesting = false;
					statuscode = response.status;
					statusText = response.statusText;
					return;
				}
				requesting = false;
			} catch (e) {
				requesting = false;
				console.log(e);
			}
		}
	}
</script>

<div>
	<form on:submit|preventDefault={handleFetch}>
		<div class="mb-6">
			<p class="text-3xl">{methods.find((m) => m.value === method)?.name ?? 'Find all'}</p>
		</div>
		<div class="mb-6">
			<Select
				on:change={() => {
					items = '';
					requesting = '';
					statuscode = '';
					statusText = '';
				}}
				bind:value={method}
				items={methods}
			/>
		</div>
		<Tabs>
			<TabItem open title="index.ts">
				<div class="h-48 min-h-48  overflow-auto">
					{#if method === 'post' || method === 'update'}
						<label for="name">Name</label>
						<Input
							class="mt-3"
							id="name"
							name="name"
							required
							bind:value={name}
							placeholder="Name"
						/>
					{/if}

					{#if method === 'get_one' || method == 'update' || method === 'delete'}
						<label for="id">ID</label>
						<Input
							class="mt-3"
							id="id"
							name="id"
							required
							type="number"
							bind:value={id}
							placeholder="ID"
						/>
					{/if}
					<Code />
					<Button type="submit" color="pinkToOrange" gradient class="my-3 w-full">
						{#if requesting}
							<Spinner color="purple" />
						{:else}
							Make request
						{/if}
					</Button>
					{#if items}
						<div class="bg-green-100  overflow-auto p-2 rounded-xl">
							<div class="flex">
								<p>{statuscode}: {statusText}</p>
							</div>
							<hr />
							<pre>
{JSON.stringify(items, null, '\t')}
										</pre>
						</div>
					{/if}
				</div>
			</TabItem>

			<TabItem title="App.svelte">
				<div class="h-48 min-h-48  overflow-auto">
					{#if method === 'post' || method === 'update'}
						<label for="name">Name</label>
						<Input
							class="mt-3"
							id="name"
							name="name"
							required
							bind:value={name}
							placeholder="Name"
						/>
					{/if}

					{#if method === 'get_one' || method == 'update' || method === 'delete'}
						<label for="id">ID</label>
						<Input
							class="mt-3"
							id="id"
							name="id"
							required
							type="number"
							bind:value={id}
							placeholder="ID"
						/>
					{/if}
					<Button type="submit" color="pinkToOrange" gradient class="my-3 w-full">
						{#if requesting}
							<Spinner color="purple" />
						{:else}
							Make request
						{/if}
					</Button>
					{#if items}
						<div class="bg-green-100  overflow-auto p-2 rounded-xl">
							<div class="flex">
								<p>{statuscode}: {statusText}</p>
							</div>
							<hr />
							<pre>
{JSON.stringify(items, null, '\t')}
										</pre>
						</div>
					{/if}
				</div>
			</TabItem>
			<TabItem title="App.jsx">
				<div class="h-48 min-h-48  overflow-auto">
					{#if method === 'post' || method === 'update'}
						<label for="name">Name</label>
						<Input
							class="mt-3"
							id="name"
							name="name"
							required
							bind:value={name}
							placeholder="Name"
						/>
					{/if}

					{#if method === 'get_one' || method == 'update' || method === 'delete'}
						<label for="id">ID</label>
						<Input
							class="mt-3"
							id="id"
							name="id"
							required
							type="number"
							bind:value={id}
							placeholder="ID"
						/>
					{/if}
					<Button type="submit" color="pinkToOrange" gradient class="my-3 w-full">
						{#if requesting}
							<Spinner color="purple" />
						{:else}
							Make request
						{/if}
					</Button>
					{#if items}
						<div class="bg-green-100  overflow-auto p-2 rounded-xl">
							<div class="flex">
								<p>{statuscode}: {statusText}</p>
							</div>
							<hr />
							<pre>
{JSON.stringify(items, null, '\t')}
										</pre>
						</div>
					{/if}
				</div>
			</TabItem>

			<TabItem title="main.py">
				<div class="h-48 min-h-48  overflow-auto">
					{#if method === 'post' || method === 'update'}
						<label for="name">Name</label>
						<Input
							class="mt-3"
							id="name"
							name="name"
							required
							bind:value={name}
							placeholder="Name"
						/>
					{/if}

					{#if method === 'get_one' || method == 'update' || method === 'delete'}
						<label for="id">ID</label>
						<Input
							class="mt-3"
							id="id"
							name="id"
							required
							type="number"
							bind:value={id}
							placeholder="ID"
						/>
					{/if}
					<Button type="submit" color="pinkToOrange" gradient class="my-3 w-full">
						{#if requesting}
							<Spinner color="purple" />
						{:else}
							Make request
						{/if}
					</Button>
					{#if items}
						<div class="bg-green-100  overflow-auto p-2 rounded-xl">
							<div class="flex">
								<p>{statuscode}: {statusText}</p>
							</div>
							<hr />
							<pre>
{JSON.stringify(items, null, '\t')}
										</pre>
						</div>
					{/if}
				</div>
			</TabItem>
			<TabItem title="App.java">
				<div class="h-48 min-h-48  overflow-auto">
					{#if method === 'post' || method === 'update'}
						<label for="name">Name</label>
						<Input
							class="mt-3"
							id="name"
							name="name"
							required
							bind:value={name}
							placeholder="Name"
						/>
					{/if}

					{#if method === 'get_one' || method == 'update' || method === 'delete'}
						<label for="id">ID</label>
						<Input
							class="mt-3"
							id="id"
							name="id"
							required
							type="number"
							bind:value={id}
							placeholder="ID"
						/>
					{/if}
					<Button type="submit" color="pinkToOrange" gradient class="my-3 w-full">
						{#if requesting}
							<Spinner color="purple" />
						{:else}
							Make request
						{/if}
					</Button>
					{#if items}
						<div class="bg-green-100  overflow-auto p-2 rounded-xl">
							<div class="flex">
								<p>{statuscode}: {statusText}</p>
							</div>
							<hr />
							<pre>
{JSON.stringify(items, null, '\t')}
										</pre>
						</div>
					{/if}
				</div>
			</TabItem>
		</Tabs>
	</form>
</div>
