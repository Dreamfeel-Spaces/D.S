<script lang="ts">
	import CodeEditor from '$lib/components/code-editor/CodeEditor.svelte';
	import { helloWorld, helloSms, helloPush } from '$lib/email/temps';
	import { useEffect } from '$lib/wsstore/hooks';
	import {
		Input,
		Card,
		Select,
		Heading,
		Button,
		Modal,
		Label,
		Alert,
		Hr,
		P
	} from 'flowbite-svelte';
	let modalOpen = false;
	let reaction = '';
	let sms = helloSms;
	let pushNotifications = helloPush;
	let email = helloWorld;
	export let form;
	import { page } from '$app/stores';
</script>

<!-- <div class="container">
	<div class="dark:bg-gray-900 p-6 h-full rounded-xl">
	
	</div>
	
</div> -->

<div class="container bg-gray-100 p-3 rounded-xl min-h-full dark:bg-gray-900 ">
	<div class="flex ">
		<Heading class="flex-1" tag="h4">Events</Heading>
		<div><Button on:click={() => (modalOpen = true)}>Create Events</Button></div>
	</div>
	{#if !$page.data.events.length}
		<div class="text-center">
			<P>No events have been added</P>
		</div>
	{/if}
	{#if form?.success}
		<Alert>Event has been saved</Alert>
	{/if}

	{#if $page.data.events.length}
		<div class="relative mt-5 overflow-x-auto">
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="px-6 py-3"> Name </th>
						<th scope="col" class="px-6 py-3"> Trigger </th>
						<th scope="col" class="px-6 py-3"> Action </th>
						<th scope="col" class="px-6 py-3" />
					</tr>
				</thead>
				<tbody>
					{#each $page.data.events as event}
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								{event.name}
							</th>
							<td class="px-6 py-4"> {event.trigger} </td>
							<td class="px-6 py-4"> {event.action} </td>
							<td class="px-6 py-4">
								<a href="/rest/{$page.params.app_id}/{$page.params.table}/events/{event.id}">
									<svg
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 96 960 960"
										width="24"
										><path
											d="M120 936V636h60v198l558-558H540v-60h300v300h-60V318L222 876h198v60H120Z"
										/></svg
									>
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<form method="post">
	<Modal size="lg" class="w-full" bind:open={modalOpen}>
		<Heading slot="header" tag="h4">Add action</Heading>
		<div class="space-y-6">
			<Label>
				<div class="my-2">Name</div>
				<Input placeholder="Event name" name="name" required />
			</Label>
			<div>
				<label for="trigger">Run event on</label>
				<Select
					required
					name="trigger"
					items={[
						{ name: 'Create', value: 'create' },
						{ name: 'Update', value: 'update' },
						{ name: 'Read', value: 'read' },
						{ name: 'Delete', value: 'delete' }
					]}
				/>
			</div>

			<div>
				<label for="action">Action</label>
				<Select
					required
					name="action"
					bind:value={reaction}
					items={[
						{ name: 'Send Email', value: 'send_email' },
						{ name: 'Send SMS', value: 'send_sms' },
						{ name: 'Push notification', value: 'push_notifications' }
					]}
				/>
			</div>
			<div class="mt-6">
				{#if reaction === 'send_email'}
					<p>HTML BODY</p>
					<input name="data" bind:value={email} type="hidden" />
					<CodeEditor bind:code={email} language="html" />
					<p class="text-sm">Use object keys as placeholders</p>
				{/if}
				{#if reaction === 'send_sms'}
					<p>SMS BODY</p>
					<input name="data" bind:value={sms} type="hidden" />
					<CodeEditor bind:code={sms} />
					<p class="text-sm">Use object keys as placeholders</p>
				{/if}
				{#if reaction === 'push_notifications'}
					<p>NOTIFICATION BODY</p>
					<CodeEditor bind:code={pushNotifications} />
					<p class="text-sm">Use object keys as placeholders</p>
				{/if}
			</div>
		</div>
		<Button type="submit" slot="footer">Save</Button>
	</Modal>
</form>
