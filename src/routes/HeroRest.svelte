<script lang="ts">
	import { heroSliderPaused } from '$lib/wsstore';

	//@ts-nocheck
	import axios from 'axios';
	import { page } from '$app/stores';
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

	export let paused: any;
	export let handlePause = () => {
		heroSliderPaused.set({ paused: !$heroSliderPaused.paused });
	};

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
		<div class="mb-2 flex">
			<p class="text-3xl flex-1">{methods.find((m) => m.value === method)?.name ?? 'Find all'}</p>
			<div class="flex my-3">
				<!-- <div class="mr-2">
					<Button on:click={handlePause} size="xs" color="default"
						>{#if $heroSliderPaused.paused} Resume {:else} Pause {/if}</Button
					>
				</div> -->
				<div>
					<Button type="submit" size="xs" color="pinkToOrange" gradient>
						{#if requesting}
							Sending...
						{:else}
							Send
						{/if}
					</Button>
				</div>
			</div>
		</div>
		<div class="mb-3">
			<Select
				size="xs"
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
			<TabItem on:click={() => (items = null)} open title="JS">
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
					<Code
						language="javascript"
						code={`
// SDK
import {Space} from "dreamfeel-sdk"
const exampleSpace = new Space()
const examples = await exampleSpace.find()
console.log(examples)

// Fetch
fetch("${$page.url.origin}/api/examples")
  .then((response) => response.json())
  .then((data) => console.log(data));

//  Axios
try{
	const response = await axios.get("/exampes")
	console.log(response.data)
}catch(e){
	// ...
}

					`}
					/>

					{#if items}
						<div class="bg-green-100  overflow-auto p-2 rounded-xl">
							<p>{'>>'} console</p>
							<div class="flex">
								<p>{statuscode}: {statusText}</p>
							</div>
							<hr />
							<Code language="javascript" code={JSON.stringify(items, null, '\t')} />
						</div>
					{/if}
				</div>
			</TabItem>

			<TabItem on:click={() => (items = null)} title="Svelte">
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

					<Code
						code={`
+page.server.ts
import { Space } from "dreamfeel-sdk"

export async function load(){
	// SDK
	const exampleSpace = new Space()
	const examples = await exampleSpace.find()
	return {examples}
	// Fetch
	let examples
	fetch("${$page.url.origin}/api/examples")
  		.then((response) => response.json())
  		.then((data) => examples = data);
	return {examples};
}`}
					/>

					<Code
						language="html"
						code={`
<!-- +page.svelte -->
<script>
	import Code from "$lib/components/Code.svelte"
	export let data;
	let examples = data.examples
</script>

<Code
 language="javascript"
 code={JSON.stringify(examples, null, \'\\t\')}
 />

`}
					/>

					{#if items}
						<div class="bg-green-100  overflow-auto p-2 rounded-xl">
							<pre>
								{`
<!-- ${`+page.svelte`} -->`}
							</pre>
							<Code language="javascript" code={JSON.stringify(items, null, '\t')} />
						</div>
					{/if}
				</div>
			</TabItem>
			<TabItem on:click={() => (items = '')} title="React">
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
					<Code
						code={`
import React from "react";
import { Space } from "dreamfeel-sdk";
import ErrorBoundary from "./Errorboundary"

const space = new Space()

export default function App(){
	//SDK
	const items = React.use(space.find())
	//Fetch
	const examples = React.use(fetch("${$page.url.origin}/api/examples"))

	return (
		<ErrorBoundary fallback={<div>Error</div>} >
			<React.Suspense fallback={<div>Loading...</div>} >
				<pre>{JSON.stringify(examples, null, \"\\t\")}</pre>
			</React.Suspense>
		</ErrorBoundary>
	)
}

`}
					/>
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

			<TabItem on:click={() => (items = '')} title="Python">
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

					<Code
						code={`
// SDK
import dreamfeel_spaces
items = dreamfeel_spaces.find("items", {take:10})
print(items)

// requets				
import requests
items = requests.get('${$page.url.origin}/api/examples')
print(items)
`}
					/>

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
			<TabItem on:click={() => (items = '')} title="Java">
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

					<Code
						language="clike"
						code={`
new URL("http://example.com");
HttpURLConnection con = (HttpURLConnection) url.openConnection();
con.setRequestMethod("GET"); 
`}
					/>

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
		<p class="mt-3">Well Documented Rest API's with an SDK and code snippets</p>
	</form>
</div>
