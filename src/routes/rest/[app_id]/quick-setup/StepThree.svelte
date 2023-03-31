<script lang="ts">
	import { page } from '$app/stores';

	import { Radio, Button, Select, Textarea, Label, Dropzone, Alert } from 'flowbite-svelte';
	import Request from '../[table]/endpoints/Request.svelte';
	import SelectOption from './SelectOption.svelte';
	let whoAmi: any = 'existing_schema';
	let schemaType = '';

	const space = $page.data.space;

	const setup = space.apiSetup[0];
</script>

<form action="?/stepThree" method={'post'} class=" px-6">
	{#if setup.stepOne === '"existing_schema"'}
		<div class="text-center border-gray-800  min-h-100">
			<div class="flex justify-end mr-6">
				<SelectOption ctx="skip" />
			</div>
			<p class="text-3xl text-gray-900  dark:text-gray-50 ">Import existing schema?</p>
			<p class="my-6">We'll help you get started based on your responses. .</p>

			<ul
				class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
			>
				<li>
					<Radio class="p-3" bind:group={whoAmi} value="existing_schema"
						>I'll use existing schema.</Radio
					>
				</li>
				<li>
					<Radio class="p-3" bind:group={whoAmi} value="brand_new_schema"
						>I'll create a new schema.</Radio
					>
				</li>
			</ul>

			<div class="mt-9">
				<input value={JSON.stringify(whoAmi)} name="whoAmi" type="hidden" />
				<Button disabled={!whoAmi} class="w-full" type="submit">Continue</Button>
			</div>
		</div>
	{/if}
	{#if setup.stepOne === '"existing_api"'}
		<div class="text-center border-gray-800  min-h-100">
			<p class="text-3xl text-gray-900  dark:text-gray-50 ">Import existing API?</p>
			<p class="my-6">We'll help you get started based on your responses. .</p>

			<ul
				class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
			>
				<li>
					<Radio class="p-3" bind:group={whoAmi} value="existing_api"
						>Create from existing API.</Radio
					>
				</li>

				<li>
					<Radio class="p-3" bind:group={whoAmi} value="describe_existing_api"
						>Describe your current API.</Radio
					>
				</li>
				<li>
					<Radio class="p-3" bind:group={whoAmi} value="create_manually">Create Manually.</Radio>
				</li>
			</ul>

			<div class="mt-9">
				<input value={JSON.stringify(whoAmi)} name="whoAmi" type="hidden" />
				<SelectOption ctx="skip" />
				<Button disabled={!whoAmi} class="w-full mt-4" type="submit">Continue</Button>
			</div>
		</div>
	{/if}

	{#if setup.stepOne === '"none"'}
		<div class="text-center border-gray-800  min-h-100">
			<div class="flex justify-end mr-6">
				<SelectOption ctx="skip" />
			</div>
			<p class="text-3xl text-gray-900  dark:text-gray-50 ">Create New</p>
			<p class="my-6">We'll help you get started based on your responses. .</p>

			<ul
				class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
			>
				<li>
					<Radio class="p-3" bind:group={whoAmi} value="create_manually">Create Manually.</Radio>
				</li>
				<li>
					<Radio class="p-3" bind:group={whoAmi} value="ai_prompt"
						>Describe Schema <small class="text-sm" />
					</Radio>
				</li>
				<li>
					<Radio class="p-3" bind:group={whoAmi} value="json_upload">Upload from JSON.</Radio>
				</li>
				<li>
					<Radio class="p-3" bind:group={whoAmi} value="prisma_upload">Upload Prisma.</Radio>
				</li>
			</ul>

			<div class="mt-3" />

			<div class="mt-9">
				<input value={JSON.stringify(whoAmi)} name="whoAmi" type="hidden" />
				<Button disabled={!whoAmi} class="w-full" type="submit">Continue</Button>
			</div>
		</div>
	{/if}
</form>
