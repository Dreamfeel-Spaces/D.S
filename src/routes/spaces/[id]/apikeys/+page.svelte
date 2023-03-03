<script lang="ts">
	import { Datepicker, Button, Alert, Input, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	export let form: any;
</script>

<div class=" px-6 lg:px-48">
	<div class="mt-4 flex">
		<Breadcrumb class="flex-1">
			<BreadcrumbItem>Home</BreadcrumbItem>
			<BreadcrumbItem>Spaces</BreadcrumbItem>
			<BreadcrumbItem>Item</BreadcrumbItem>
			<BreadcrumbItem disabled>Apikeys</BreadcrumbItem>
		</Breadcrumb>
		<p class="text-lg">Go back</p>
	</div>
	{#if form?.success}
		<div class="my-9 text-start">
			<Alert>
				<p>
					<b>Api key created</b>
				</p>
				<p class="text-lg my-4">{form?.data?.token}</p>
				<small
					>Copy and save this key before you leave / reload this page as you won't be able to see it
					again.</small
				>
			</Alert>
		</div>
	{/if}
	<form class="mt-9" method="POST">
		<div class="text-left text-lg text-gray-500 mb-6">
			<label for="name">Name</label>
			<Input required id="name" name="name" autofocus />
		</div>
		<div class="text-left text-lg text-gray-500 mb-6">
			<label for="expiry">Set expiry date</label>
			<Datepicker required id="expiry" name="expiry" />
		</div>

		<Button class="w-full mt-4" type="submit">Generate new key</Button>
	</form>
</div>
