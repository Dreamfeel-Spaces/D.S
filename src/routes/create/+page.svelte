<script lang="ts">
	//@ts-nocheck
	import { convertToSlug } from '$lib/util/slugit';
	import { Input, Button, Alert, Card, Heading, Spinner, Modal, A } from 'flowbite-svelte';
	import Dropzone from 'svelte-file-dropzone';

	import { onDestroy } from 'svelte';
	import axios from 'axios';
	import { useEffect } from '$lib/wsstore/hooks';
	import { uploadCloudinary } from '$lib/files/upload';
	// import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	let appName = '';
	let appId = appName;
	export let form: any;

	let throttling = false;

	let requestTimeOut: any;

	let notUnique = false;

	async function handleFindUnique(id: string) {
		try {
			const response = await axios.get(`/create/unique/${id}`);
			notUnique = response.data;
			throttling = false;
		} catch (e) {
			notUnique = true;
			throttling = false;
		}
	}

	function onChangeAppId(e: any) {
		const value: string = convertToSlug(e.target.value);
		if (value) {
			throttling = true;
			if (requestTimeOut) {
				clearTimeout(requestTimeOut);
			}
			requestTimeOut = setTimeout(() => handleFindUnique(value), 690);
		} else {
			notUnique = false;
			throttling = false;
		}
	}

	let saving = false;

	let saveSpaceSuccess = false;

	let saveSpaceError = false;

	let logoFiles: any = [];

	useEffect(
		() => {
			console.log(logoFiles);
		},
		() => [logoFiles]
	);

	let coverImage = '';
	let uploading = false;

	function handleFilesSelect(e) {
		uploading = true;
		const { acceptedFiles, fileRejections } = e.detail;

		uploadCloudinary([{ fileData: acceptedFiles[0], field: 'coverImage' }]).then((data) => {
			coverImage = data[0].url;
			uploading = false;
		});
	}

	async function handleSubmit() {
		try {
			saving = true;
			saveSpaceSuccess = false;
			saveSpaceError = false;
			const res = await axios.post(`/create/svr`, {
				name: appName,
				appId,
				icon: coverImage
			});
			if (res.status === 200) {
				saveSpaceSuccess = true;
				goto(`/a/${convertToSlug(appId)}/onboarding`);
				// window.location.reload();
				saving = false;
			}
		} catch (e) {
			console.log(e);
			saveSpaceError = true;
			saving = false;
		}
	}

	onDestroy(() => {
		if (requestTimeOut) clearTimeout(requestTimeOut);
	});
</script>

{#if form?.error}
	<div class="px-6 mt-9 lg:px-64">
		<Alert dismissable class="bg-red-200 text-red-600 ">
			<div class="mb-3">
				<b>An error occured. Please try again.</b>
			</div>
		</Alert>
	</div>
{/if}

<!-- {#if form?.success} -->

<!-- {/if} -->

<Modal bind:open={saving} class="w-full" permanent>
	<div class="flex">
		<Spinner />
		<Heading class="ml-3" tag="h4">Setting you up, please wait...</Heading>
	</div>
	<div>You will be automatically be redirected to a new page..</div>
</Modal>

<div class="px-6 mx-2 lg:px-72 pb-36 pt-9  flex justify-center">
	<Card class="w-full mt-9" size="lg">
		<section>
			<div class="py-8 mx-auto max-w-screen-xl text-center">
				<Heading>New Space</Heading>
				<!-- <p
					class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
				>
					Here at Dreamfeel we focus on markets where technology, innovation, and capital can unlock
					long-term value and drive economic growth.
				</p> -->
			</div>
		</section>
		{#if saveSpaceSuccess}
			<div class=" my-9">
				<Modal accent>
					<div class="mb-3">
						<b>Congrats!</b>
						<p>Your space, {appName} has been created.</p>
						<A rel="external" href="/a/{convertToSlug(appId)}/onboarding">Go to new space</A>
					</div>
					<!-- <a class="hover:underline" rel="external" href={`/a/${form?.data?.appId}`}>Go to space</a> -->
				</Modal>
			</div>
		{/if}
		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-6 w-full">
				<label class="dark:text-gray-100" for="appId">App ID</label>
				<Input
					placeholder="Unique app id i.e app-id"
					bind:value={appId}
					class="w-full"
					id="appId"
					name="appId"
					color={notUnique ? 'red' : 'base'}
					on:change={onChangeAppId}
					type="text"
				/>
				{#if throttling}
					<div class="text-xs dark:text-gray-100">Validating Space ID...</div>
				{/if}
				{#if notUnique}
					<p class="text-red-600">App ID already taken</p>
				{/if}
				<div>
					<small class="dark:text-gray-100">
						Formatted: {convertToSlug(appId ? appId : appName)}
					</small>
				</div>

				<br />
				{#if convertToSlug(appId ? appId : appName).length > 24}
					<small class="text-red-400 mt-3"> App ID cannot exceed 24 characters in length </small>
				{/if}
			</div>
			<div class="mb-6 w-full">
				<label class="dark:text-gray-100" for="name">App Name</label>
				<Input
					required
					bind:value={appName}
					placeholder="Name your space"
					class="w-full"
					id="name"
					name="name"
					type="text"
				/>
			</div>

			<div class="mb-6 w-full">
				<label class="dark:text-gray-100" for="files">App Logo</label>

				<input
					bind:value={coverImage}
					id="logo"
					type="hidden"
					class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					name="logo"
				/>

				<Dropzone accept="image/*" multiple={false} on:drop={handleFilesSelect} />
				{#if coverImage}
					<img class="mt-4" width={81} src={coverImage} alt="Cover" />
				{/if}
				{#if uploading}
					<div class="mt-4" role="status">
						<svg
							aria-hidden="true"
							class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
						<span class="sr-only">Uploading...</span>
					</div>
				{/if}
			</div>
			<Button
				disabled={convertToSlug(appId ? appId : appName).length > 24}
				class="w-full mb-18"
				type="submit">{saving ? 'Please wait...' : 'Save'}</Button
			>
		</form>
	</Card>
</div>
