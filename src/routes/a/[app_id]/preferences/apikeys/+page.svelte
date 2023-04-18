<script lang="ts">
	import { Datepicker, Button, Alert, Input, Card, BreadcrumbItem } from 'flowbite-svelte';
	export let form: any;
</script>

<Card  size="xl" class="w-full" >
	<div class=" px-6 lg:px-6 pb-40">
	
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
	
</Card>
