<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
	let appId = $page.params.id;
	const app = apps.find((app: any) => app.appId === appId);
</script>

<section class=" grid  grid-cols-2  dark:bg-gray-900">
	<div style="align-items:center" class="bg-gray-200  flex justify-center min-h-108">
		<div>
			<h1
				class="mb-4 text-4xl px-16 font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
			>
				{app?.name}
			</h1>
			<p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16  dark:text-gray-400">
				Here at Dreamfeel we focus on markets where technology, innovation, and capital can unlock
				long-term value and drive economic growth.
			</p>
		</div>
	</div>

	<div class="py-8 px-4  max-w-screen-xl flex self-center  lg:py-16 ">
		<div
			class=" 
			"
		>
			<Button gradient rel="external" href={`/dashboards/${appId}`}>
				Dashboards
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
			</Button>

			<Button gradient rel="external" href={`/base/${appId}`}>
				REST API
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
			</Button>

			<Button gradient rel="external" href={`/editor/${appId}`}>
				UI Builder
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
			</Button>

			<Button gradient color="purpleToPink" rel="external" href={`/spaces/${appId}`}>
				Settings
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
			</Button>
		</div>
	</div>
</section>
