<script lang="ts">
	interface Data {
		nextImage: Function;
		previousImage: Function;
	}

	import { Radio, Button, Input } from 'flowbite-svelte';
	import SelectOption from './SelectOption.svelte';
	let whoAmi = '';
</script>

<form action="?/stepZero" method="post" class=" px-6">
	<div class="text-center border-gray-800  min-h-100">
		<div class="flex justify-end mr-6">
			<SelectOption ctx="skip" />
		</div>
		<p class="text-3xl text-gray-900  dark:text-gray-50 ">
			Do you have an existing API/ Database Schema ?
		</p>
		<p class="my-6">We'll help you get started based on your responses. .</p>
		<ul
			class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
		>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="existing_schema"
					>Yes, I have an existing schema.</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="existing_api"
					>Yes, I have an existing API.</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="none">I have none of these.</Radio>
			</li>
		</ul>

		<div class="mt-6">
			<input value={JSON.stringify(whoAmi)} name="whoAmi" type="hidden" />
			<Button disabled={!whoAmi} class="w-full" type="submit">Continue</Button>
		</div>
		<div class="mt-6">
			<input value={JSON.stringify(whoAmi)} name="whoAmi" type="hidden" />
		</div>
	</div>
</form>
