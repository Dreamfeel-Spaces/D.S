<script>
	// @ts-nocheck

	export let data = { posts: [] };

	const hasPosts = Boolean(data.posts.length);

	import { page } from '$app/stores';

	const user = $page.data.session?.user;
</script>

<div class="text-center text-3xl mt-6">
	<h1>Your drafts</h1>
</div>

{#if !user}
	<div class="mt-9 text-center text-lg bg-red-200 p-2 rounded-lg outline outline-red-400">
		<p class="my-2">You must be signed in to view this page</p>
		<a href="/auth/signin">Sign in </a>
	</div>
{/if}

{#if user}
	<div>
		{#if !hasPosts}
			<div
				style="min-height: 69vh;"
				class="h-full mt-20 text-center flex justify-center align-middle "
			>
				<div>
					<p>Sorry, but no blog posts have been added</p>
					<br />
					<a href="/blog/new">Add blog post</a>
				</div>
			</div>
		{/if}

		<div class="grid sm:grid-cols-1 mt-9 lg:grid-cols-2 md:grid-cols-2 gap-4 px-20">
			{#each data.posts as post}
				<a class="text-black  " style="text-decoration:none" href={`/blog/${post.slug}`}>
					<div class="bg-blue-200 p-3 rounded-lg cursor-pointer">
						<h6 class="text-lg">{post.title}</h6>
						<p class="mt-2">1 min read</p>
					</div></a
				>
			{/each}
		</div>

		<div />
	</div>
{/if}
