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
    let trigger = $page.data.event?.trigger
	let reaction = $page.data.event?.action;
	let sms = $page.data.event?.data;
	let pushNotifications = $page.data.event?.data;
	let email = $page.data.event?.data;
	export let form;
    let eventName = $page.data.event?.name
	import { page } from '$app/stores';
</script>

<!-- <div class="container">
	<div class="dark:bg-black p-6 h-full rounded-xl">
	
	</div>
	
</div> -->

<div class="container bg-gray-100 p-6 rounded-xl min-h-100 dark:bg-black ">
	<div class="flex ">
		<Heading class="flex-1" tag="h4">{$page.data.event?.name}</Heading>
	</div>

	{#if form?.success}
		<Alert>Event has been saved</Alert>
	{/if}

	<form method="post">
		<div class="space-y-6">
			<Label>
				<div class="my-2">Name</div>
				<Input bind:value={eventName} placeholder="Event name" name="name" required />
			</Label>
			<div>
				<label for="trigger">Run event on</label>
				<Select
                bind:value={trigger}
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
	</form>
</div>
