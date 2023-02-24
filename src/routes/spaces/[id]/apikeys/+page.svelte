<script lang="ts">
	import { Datepicker, Button, Alert } from 'flowbite-svelte';
	export let form: any;
</script>

<div class="text-center px-6 lg:px-48">
	<div>
		<p class="text-lg mt-9">Create API KEYS</p>
	</div>
	{#if form?.success}
		<div class="my-9 text-start">
			<Alert>
				<p>Api key created</p>
				<p class="text-lg my-4">{form?.data?.token}</p>
				<small
					>Copy and save this key before you leave / reload this page as you won't be able to see it
					again.</small
				>
			</Alert>
		</div>
	{/if}
	<form class="mt-9" method="POST">
		<div class="text-left text-lg text-gray-500 mb-3">
			<label for="">Set expiry date</label>
		</div>
		<Datepicker />
		<Button class="w-full mt-4" type="submit">Generate new key</Button>
	</form>
</div>
