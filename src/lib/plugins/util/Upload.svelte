<script lang="ts">
	import {
		Button,
		Modal,
		Heading,
		Label,
		Hr,
		Input,
		Textarea,
		Alert,
		Select,
		Avatar
	} from 'flowbite-svelte';
	// @ts-ignore
	import Dropzone from 'svelte-file-dropzone';
	import axios from 'axios';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { uploadCloudinary } from '$lib/files/upload';
	import type { Editor } from 'grapesjs';

	$: modalOpen = false;

	export let editor: Editor | null = null;

	function toggleModal() {
		modalOpen = !modalOpen;
	}
	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
		files.accepted.forEach(handleImgSrc);
	}

	function handleImgSrc(file) {
		const preview = document.querySelector('#preview');
		let image;
		const reader = new FileReader();
		reader.addEventListener('load', function () {
			const image = new Image();
			image.height = 100;
			image.title = file.name;
			image.src = reader.result;
			image.style.width = '100%';
			preview.appendChild(image);
		});
		reader.readAsDataURL(file);

		return image;
	}

	let title;
	let description;
	let category;
	let price = 0.0;

	let saving = false;
	let success = false;
	let error = false;
	let errorMsg = false;

	async function handleSubmit() {
		saving = true;

		let url = `/editor/${$page.params.app_id}/${$page.params.builder}/${$page.params.path}/assets`;

		const assets: any[] = await uploadCloudinary(
			files.accepted.map((file, i) => ({ fileData: file, field: i }))
		);

		success = false;
		error = false;
		try {
			const response = await axios.post(url, {
				assets
			});
			if (response) {
				success = true;
				saving = false;

				assets.forEach((ass, i) => {
					editor?.BlockManager.add(`Asset ${i}`, {
						label: `<img  src="${ass.url}" />`,
						content: `<img  src="${ass.url}" />`,
						category: 'Assets'
					});
				});

				invalidateAll();
			}
		} catch (error) {
			saving = false;
			error = true;
		}
	}
</script>

<section class="p-6 text-left">
	<div class="flex">
		<Heading class="flex-1" tag="h6">Assets</Heading>
		<Button color="dark" size="xs" on:click={toggleModal}>Upload</Button>
	</div>

	<Hr class="my-1" />

	<form on:submit|preventDefault={handleSubmit}>
		<Modal size="lg" bind:open={modalOpen}>
			<Heading tag="h6" slot="header">Upload files</Heading>

			{#if success}
				<div class="my-9">
					<Alert>Files uploaded!</Alert>
				</div>
			{/if}

			<Label>
				<div class="mb-4 text-lg ">Files</div>
				<Dropzone accept="image/*" multiple={true} on:drop={handleFilesSelect} />
			</Label>
			<div id="preview" class="grid gap-3 grid-cols-3" />
			<Button
				color="teal"
				size="xs"
				disabled={saving || !files.accepted.length}
				type="submit"
				slot="footer"
				>{#if saving} Uploading... {:else} Upload {/if}</Button
			>
		</Modal>
	</form>

	<!-- {#if $page.data.products.length}
	  <div class="relative overflow-x-auto">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		  <thead
			class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
		  >
			<tr>
			  <th scope="col" class="px-6 py-3" />
			  <th scope="col" class="px-6 py-3"> Title </th>
			  <th scope="col" class="px-6 py-3" />
			</tr>
		  </thead>
		  <tbody>
			{#each $page.data.products as category}
			  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
				<th
				  scope="row"
				  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
				  <Avatar src={category.media[0].url} />
				</th>
				<td class="px-6 py-4"> {category.title} </td>
				<td class="px-6 underline text-blue-600 py-4">
				  <a href="/dashboard/products/{category.id}">View</a>
				</td>
			  </tr>
			{/each}
		  </tbody>
		</table>
	  </div>
	{:else}
	  <div>No products have been added</div>
	{/if} -->
</section>
