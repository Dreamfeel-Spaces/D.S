<script>
	// @ts-nocheck
	import axios from 'axios';

	import { Alert, Button, Heading, Hr, Input, Label, Select } from 'flowbite-svelte';
	import { page } from '$app/stores';

	let saving = false;
	let success = false;
	let error = false;
	let errorMsg = false;

	let data = $page.data.values ?? { S3_REGION: 'eu-central-1' };
	let provider = $page.data.configVars?.for ?? 'dreamfeel';

	async function handleSubmit() {
		try {
			saving = true;
			error = false;
			success = false;
			errorMsg = false;
			const response = await axios.put(`/rest/${$page.params.app_id}/file_storage/svr`, {
				provider,
				value: JSON.stringify(data)
			});
			if (response) {
				saving = false;
				error = false;
				success = true;
			}
		} catch (e) {
			saving = false;
			errorMsg = e;
			error = true;
			success = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div
		class="container min-h-full text-black space-y-9 dark:text-gray-100 bg-gray-300 dark:bg-black p-6 rounded-xl"
	>
		<Heading tag="h5">File storage</Heading>
		<Hr />

		{#if success}
			<Alert accent dismissable class="my-4">Success. Configuration updated!</Alert>
		{/if}
		<Select
			required
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
				<Input required bind:value={data['GOOGLE_CLOUD_PLATFORM']} />
			</Label>
		{/if}

		{#if provider === 's3'}
			<div class="space-y-4">
				<div class="grid gap-3  md:grid-cols-3  lg:grid-cols-3 ">
					<Label>
						Endpoint
						<Input required bind:value={data['S3_ENDPOINT']} />
					</Label>
					<Label>
						Bucket
						<Input required bind:value={data['S3_BUCKET']} />
					</Label>
					<Label>
						Region
						<Input required bind:value={data['S3_REGION']} />
					</Label>
				</div>
				<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2 ">
					<Label>
						Access Key
						<Input required bind:value={data['S3_ACCESS_KEY']} type="password" />
					</Label>
					<Label>
						Secret
						<Input required bind:value={data['S3_SECRET']} type="password" />
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
						<Input required bind:value={data['CLOUDINARY_CLOUDNAME']} />
					</Label>
					<Label>
						Api env var
						<Input required bind:value={data['CLOUDINARY_ENV_VAR']} />
					</Label>
				</div>
				<div class="grid gap-3  md:grid-cols-2  lg:grid-cols-2 ">
					<Label>
						Api Key
						<Input required bind:value={data['CLOUDINARY_API_KEY']} type="password" />
					</Label>
					<Label>
						Api Secret
						<Input required bind:value={data['CLOUDINARY_API_SECRET']} type="password" />
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
					<Input required bind:value={data['AZURE_CONNECTION_STRING']} />
				</Label>
				<div class="grid gap-3  md:grid-cols-3  lg:grid-cols-3 ">
					<Label>
						Storage account
						<Input required bind:value={data['AZURE_STORAGE_ACCOUNT']} />
					</Label>
					<Label>
						Access Key
						<Input required type="password" bind:value={data['AZURE_ACCESS_KEY']} />
					</Label>
					<Label>
						SAS Token
						<Input required type="password" bind:value={data['AZURE_SAS_TOKEN']} />
					</Label>
				</div>
			</div>
		{/if}
		<div class="flex justify-end">
			<Button type={saving ? 'button' : 'submit'}
				>{#if saving}
					Updating...
				{:else}
					Update
				{/if}</Button
			>
		</div>
	</div>
</form>
