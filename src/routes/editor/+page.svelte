<script>
	import { Card, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import VideoDialog from './VideoDialog.svelte';
	const apps = $page.data.myapps;
</script>

<section class=" dark:bg-gray-900">
	<div class="grid grid-cols-2 gap-2">
		<div class="py-8  min-h-108 px-4 mx-auto max-w-screen-xl  lg:py-16 ">
			<div class="flex">
				<h1
					class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-700 md:text-5xl lg:text-6xl dark:text-white"
				>
					Editor
				</h1>
				<div>
					<Button size="xs" pill>Preview</Button>
				</div>
			</div>
			<p class="my-14 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400">
				Here at Dreamfeel we focus on markets where technology, innovation, and capital can unlock
				long-term value and drive economic growth.
			</p>
			<div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
				<a
					rel="external"
					href="/docs"
					class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-900"
				>
					Learn more
					<svg
						class="ml-2 -mr-1 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</a>
				<VideoDialog />
			</div>
		</div>
		<div>
			<div class="px-6">
				<div class="grid grid-cols-4 text-center  px-6 mt-9 gap-3">
					{#each apps as app}
						<a rel="external" href={`/editor/${app?.appId}`}>
							<Card class="text-center">
								<div>
									{app.name}
								</div>
								<div class="text-xs">@{app.name}</div>
							</Card>
						</a>
					{/each}
					<a rel="external" href={`/spaces/create`}>
						<Card class="text-center">
							<div>+</div>
							<div class="text-xs">Create new</div>
						</Card>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
