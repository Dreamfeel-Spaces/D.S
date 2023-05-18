<script>
	import { Alert, Button, Checkbox, Heading, Hr, Input, Label, Select } from 'flowbite-svelte';
	let provider = 'twilio';
</script>

<div
	class="container min-h-full text-black space-y-9 dark:text-gray-100 bg-gray-300 dark:bg-gray-900 p-6 rounded-xl"
>
	<Heading tag="h5">Mail</Heading>
	<Hr />
	<Label>
		SMTP HOST
		<Input />
	</Label>
	<Label>
		SMTP PORT
		<Input />
	</Label>
	<Checkbox>Secure</Checkbox>
	<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2">
		<Label>
			Username
			<Input />
		</Label>
		<Label>
			Password
			<Input type="password" />
		</Label>
	</div>

	<div class="flex justify-end">
		<Button>Update</Button>
	</div>
</div>
