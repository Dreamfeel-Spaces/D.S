<script>
	// @ts-nocheck

	export let data = { posts: [], more: [], rest: [] };

	const hasPosts = Boolean(data.posts.length);

	export let form = {};

	import { Button } from 'flowbite-svelte';
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
		<h1
			class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
		>
			Our stories
		</h1>
		<p
			class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>
			Here at Flowbite we focus on markets where technology, innovation, and capital can unlock
			long-term value and drive economic growth.
		</p>
		<div
			class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
		>
			<a
				href="/blog/new"
				class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
			>
				Add post
			</a>
		</div>
		<div class="lg:px-64">
			<form method="POST">
				<label for="email" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
					>Search</label
				>
				<div class="relative">
					<input
						id="email"
						type="email"
						name="email"
						class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-3xl mt-6 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Enter email address"
						required
					/>
					<button
						type="submit"
						class="text-white rounded-3xl absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Subscribe</button
					>
				</div>
			</form>
		</div>
	</div>
</section>

{#if form?.success}
	<div class="p-3 my-4 bg-green-200 rounded-xl lg:mx-96">
		<p>Subscription successful. You will receive updates via email.</p>
	</div>
{/if}
<div>
	{#if !hasPosts}
		<div
			style="min-height: 69vh;"
			class="h-full mt-20 text-center flex justify-center align-middle "
		>
			<div>
				<p>Sorry, but no stories have been added. Please check again later</p>
			</div>
		</div>
	{/if}

	<div class="grid sm:grid-cols-1 mt-9 lg:grid-cols-4 md:grid-cols-2 gap-4 lg:mx-20 mb-36">
		{#each data.posts as post}
			<a
				class="text-black rounded-2xl  bg-blue-300 "
				style="text-decoration:none"
				href={`/blog/${post.slug}`}
			>
				<div
					style="min-height:100px; max-height:100px; overflow:hidden"
					class="bg-blue-200 p-3  rounded-t-2xl cursor-pointer"
				>
					<h6 class="text-lg">{post.title}</h6>
				</div>
				<div class="flex justify-between p-2 ">
					<p>1 min read</p>
					<p><a href={`/blog/${post.slug}`}>View post</a></p>
				</div></a
			>
		{/each}
	</div>
	{#if data.more.length}
		<div class="flex">
			<div class="lg:mx-20 mt-9 flex-1">
				<p class="text-2xl mb-3">More stories</p>
				{#each data.more as post}
					<div class="bg-blue-200 mb-4 p-3 rounded-lg cursor-pointer">
						<a class="text-black" style="text-decoration:none" href={`/blog/${post.id}`}>
							<div class="flex">
								<div class="flex-1">
									<h6 class="text-lg">{post.title}</h6>
									<p>1 min read</p>
								</div>
								{#if post.coverImage}
									<img src={post.coverImage} style="height:144px" alt="kjnbhv" />
								{/if}
							</div>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
