<script>
	// @ts-nocheck

	/** @type {import('./$types').ActionData} */
	export let form;

	import { uploadCloudinary } from '$lib/files/upload';

	import Dropzone from 'svelte-file-dropzone';

	let coverImage = '';
	let uploading = false;

	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		uploading = true;
		const { acceptedFiles, fileRejections } = e.detail;

		uploadCloudinary([{ fileData: acceptedFiles[0], field: 'coverImage' }]).then((data) => {
			coverImage = data[0].url;
			uploading = false;
		});
	}

	let state = {
		type: 'word'
	};

	import { page } from '$app/stores';

	const user = $page.data.session?.user;

	import { onMount } from 'svelte';

	let editor;

	export let toolbarOptions = {
		container: [
			[
				{ header: 1 },
				{ header: 2 },
				{ header: 3 },
				{ header: 4 },
				{ header: 5 },
				{ header: 6 },
				'blockquote',
				'link'
			],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'ordered' }],
			[{ align: [] }],
			['image'],
			['clean'],
			[{ indent: '-1' }, { indent: '+1' }] // outdent/indent
		],
		handlers: {
			image: imageHandler
		}
	};

	let content;

	let quill;

	onMount(async () => {
		const { default: Quill } = await import('quill');

		quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'bubble',
			placeholder: 'Write your story...'
		});

		quill.on('text-change', function (delta, oldDelta, source) {
			content = quill.root.innerHTML;
			console.log(quill.root.innerHTML);
		});
	});

	function imageHandler() {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();
		input.onchange = async function () {
			const file = input.files[0];
			const files = await uploadCloudinary([{ fileData: file, field: 'hh' }]);
			const url = files[0].url;
			const range = quill.getSelection();
			quill.insertEmbed(range.index, 'image', url);
		};
	}
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="About this app" />
	<link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet" />
</svelte:head>

{#if !user}
	<div class="mt-9 text-center text-lg bg-red-200 p-2 rounded-lg lg:mx-48 outline outline-red-400">
		<p class="my-2">You must be signed in to view this page</p>
		<a href="/auth/signin">Sign in </a>
	</div>
{/if}

{#if user}
	<div class="lg:mx-48">
		{#if form?.success}
			<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
				<p class="font-bold">Success</p>
				<p>Definition entry has been added</p>
			</div>
		{/if}
		<h1 class="mt-9 mb-3  text-2xl ">New Post</h1>
		<p>
			Please review <a href="/guidelines">Our content guidelines</a> before writing your blog post. Here's
			the short version: Share definitions that other people will find meaningful and never post hate
			speech or people’s personal information.
		</p>

		<form method="POST" class="mt-5">
			<div class="mb-6">
				{#if state.type === 'word'}
					<label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
						>Post title</label
					>
				{/if}

				<input
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Choose a title for your post"
					required
					id="title"
					name="title"
				/>
			</div>
			<div class="mb-6">
				<label for="dropzone">Cover image</label>
				<input
					bind:value={coverImage}
					id="coverImage"
					type="hidden"
					class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					name="coverImage"
					rows="18"
					placeholder="Write your post here. Markdown is supported"
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
			<div class="mb-6">
				<label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
					>Blog content
				</label>
				<input
					bind:value={content}
					id="content"
					type="hidden"
					class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					name="content"
					rows="18"
					placeholder="Write your post here. Markdown is supported"
				/>
				<div class="editor-wrapper">
					<div
						class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						bind:this={editor}
						on:text={(e) => {
							console.log(e);
						}}
					/>
				</div>
			</div>

			<button
				type="submit"
				class="text-white   bg-blue-700 hover:bg-blue-800 mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Save draft</button
			>
		</form>
	</div>
{/if}
