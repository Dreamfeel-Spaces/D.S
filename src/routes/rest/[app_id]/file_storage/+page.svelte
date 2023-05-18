<script>
	import { Alert, Button, Heading, Hr, Input, Label, Select } from 'flowbite-svelte';
	let provider = 'dreamfeel';
</script>

<div
	class="container min-h-full text-black space-y-9 dark:text-gray-100 bg-gray-300 dark:bg-gray-900 p-6 rounded-xl"
>
	<Heading tag="h5">File storage</Heading>
	<Hr />
	<Select
		bind:value={provider}
		items={[
			{ name: 'Dreamfeel Spaces', value: 'dreamfeel' },
			{ name: 'AWS S3', value: 's3' },
			{ name: 'GCP', value: 'gcp' },
			{ name: 'Cloudinary', value: 'cloudinary' },
			{ name: 'Azure Blob Storage', value: 'azure' }
		]}
		placeholder="Select storage provider"
	/>

	{#if provider === 'dreamfeel'}
		<div>
			<Alert accent>You're all set. This option doesn't require additional configuration</Alert>
		</div>
	{/if}

	{#if provider === 'gcp'}
		<Label>
			Google App Credentials
			<Input />
		</Label>
	{/if}

	{#if provider === 's3'}
		<div>
			<Alert accent
				>If you have existing uploaded files, you'll have to migrate them manually from the local
				file system to the S3 storage</Alert
			>
		</div>

		<div class="space-y-4">
			<div class="grid gap-3  md:grid-cols-3  lg:grid-cols-3 ">
				<Label>
					Endpoint
					<Input />
				</Label>
				<Label>
					Bucket
					<Input />
				</Label>
				<Label>
					Region
					<Input />
				</Label>
			</div>
			<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2 ">
				<Label>
					Access Key
					<Input />
				</Label>
				<Label>
					Secret
					<Input />
				</Label>
			</div>
		</div>
	{/if}

	{#if provider === 'cloudinary'}
		<div>
			<Alert accent
				>If you have existing uploaded files, you'll have to migrate them manually from the local
				file system to the Cloudinary</Alert
			>
		</div>

		<div class="space-y-4">
			<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2 ">
				<Label>
					Cloudname
					<Input />
				</Label>
				<Label>
					Api env var
					<Input />
				</Label>
			</div>
			<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2 ">
				<Label>
					Api Key
					<Input />
				</Label>
				<Label>
					Api Secret
					<Input />
				</Label>
			</div>
		</div>
	{/if}

	{#if provider === 'azure'}
		<div>
			<Alert accent
				>If you have existing uploaded files, you'll have to migrate them manually from the local
				file system to the S3 storage</Alert
			>
		</div>

		<div class="space-y-4">
			<Label>
				Connection String
				<Input />
			</Label>
			<div class="grid gap-3  md:grid-cols-3  lg:grid-cols-3 ">
				<Label>
					Storage account
					<Input />
				</Label>
				<Label>
					Access Key
					<Input />
				</Label>
				<Label>
					SAS Tokwn
					<Input />
				</Label>
			</div>
		</div>
	{/if}
	<div class="flex justify-end">
		<Button>Update</Button>
	</div>
</div>
