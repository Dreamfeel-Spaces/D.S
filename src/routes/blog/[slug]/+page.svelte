<script>
	// @ts-nocheck

	export let data = { post: { title: '' } };
	import { page } from '$app/stores';
	const user = $page.data.session?.user;
	export let form;
	const comments = data.post.comments ?? [];
	import { Button } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>{data.post.title}</title>
	<meta name="keywords" content="DHOLUO, Luo, LUO Blog, Luo Stories" />
	<meta name="description" content={data.post.title} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:url" content={`https://dholuo-dictionary.me/blog/${data.post.id}`} />
	<meta property="og:image" content={data.post.coverImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@Thriving_luos" />
	<meta name="twitter:title" content={data.post.title} />
	<meta
		name="twitter:description"
		content={`Read the full story on https://dholuo-dictionary.me/blog/${data.post.id}`}
	/>
	<meta name="twitter:image" content={data.post.coverImage} />
</svelte:head>


<div class="dark:bg-black min-h-112 dark:text-gray-50">
	{#if !data.post}
		<div class="flex align-middle justify-center h-full text-lg text-center mt-20">
			<div>
				<p>Post not found. There could be a url mismatch, or it may have been deleted.</p>
				<a class="mt-4" href="/blog/new">Add a new post</a>
			</div>
		</div>
	{/if}
	
	{#if data.post}
		<div>
			<div class="lg:flex gap-4">
				<div class="mb-9 flex-1 dark:bg-gray-800 bg-white p-3 rounded-lg">
					<div class="flex">
						<h6 class="text-2xl flex-1">{data.post.title}</h6>
						<div class="flex justify-end rounded  p-2">
							<form action="?/actions" method="POST">
								<input value={data.post.id} type="hidden" id="id" name="id" />
								<input value={false} type="hidden" id="isDelete" name="isDelete" />
								{#if data.post.published}
									<Button color="red" size="xs" pill gradient type="submit">Unpublish</Button>
								{/if}
								{#if !data.post.published}
									<Button color="green" size="xs" pill gradient type="submit">Publish</Button>
								{/if}
							</form>
							<a class="mx-3" href={`/blog/${data.post.slug}/edit`}>
								<Button color="teal" size="xs" pill gradient>Edit</Button>
							</a>
							<form action="?/actions" method="POST">
								<input value={data.post.id} type="hidden" id="id" name="id" />
								<input value={true} type="hidden" id="isDelete" name="isDelete" />
								<Button color="red" size="xs" pill gradient type="submit">Delete</Button>
							</form>
						</div>
					</div>
					{#if !data.post.published}
						<div class="bg-yellow-200 p-2 my-8 outline-yellow-400 rounded-lg">
							This blog post has not been published. Any information shared will in this post will
							only be visible to the author
						</div>
					{/if}
					<div>
						{#if data.post.coverImage}
							<img class="w-full" src={data.post.coverImage} alt="Cover" />
						{/if}
					</div>
					<div class="my-6">
						{@html data.post.content}
					</div>
					<div class=" rounded mt-3 dark:bg-gray-800 bg-gray-200 p-2">
						<p class="text-lg mt-2">Comments</p>
						<div class="mt-4 pl-3">
							{#each comments as comment}
								<div class="mb-4">
									<p class="text-lg">{comment.content}</p>
									<small class="ml-3 text-sm">> By {comment.authorName}</small>
								</div>
								<hr />
							{/each}
						</div>
	
						{#if user}
							<form action="?/comment" class="mt-4" method="POST">
								<label for="content" class="sr-only" />
								{#if form?.success}
									<div class="bg-green-200 p-3 rounded my-3">
										<p>Comment added</p>
									</div>
								{/if}
								<textarea
									required
									name="content"
									id="content"
									placeholder="Add a comment"
									class="w-full p-2 rounded dark:bg-gray-800"
									rows="3"
								/>
								<p class="text-sm">
									Any comment that does not follow our <a href="/guidelines">content guidelines</a> will
									be deleted, and you will be banned from adding comments
								</p>
								<button type="submit" class="bg-blue-500 p-2 mt-3 text-white rounded"
									>Save comment</button
								>
							</form>
						{/if}
						{#if !user}
							<div class="bg-yellow-200 p-3 rounded my-3">
								<p>You must be signed in to comment</p>
								<a href="/auth/signin">View signin options</a>
							</div>
						{/if}
					</div>
				</div>
	
				<div class="w-96 ">
					<h3 class="text-lg">More Stories</h3>
	
					<div>
						{#each data.more as word}
							<div class="my-3">
								{#if word.coverImage}
									<img style="height:100px" src={word.coverImage} alt="" />
								{/if}
								<a class="hover:no-underline" href={`/blog/${word.id}`}>
									{word.title}
								</a>
								<p>1 min read</p>
							</div>
							<hr />
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

