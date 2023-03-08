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

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-12">
			<div class="p-12 md:w-1/2 flex flex-col items-start">
				<span
					class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest"
					>CATEGORY</span
				>
				<h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
					Roof party normcore before they sold out, cornhole vape
				</h2>
				<p class="leading-relaxed mb-8">
					Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal portland. VHS man braid
					palo santo hoodie brunch trust fund. Bitters hashtag waistcoat fashion axe chia unicorn.
					Plaid fixie chambray 90's, slow-carb etsy tumeric. Cray pug you probably haven't heard of
					them hexagon kickstarter craft beer pork chic.
				</p>
				<div
					class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full"
				>
					<a class="text-indigo-500 inline-flex items-center"
						>Learn More<svg
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg
						></a
					><span
						class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
						><svg
							class="w-4 h-4 mr-1"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							viewBox="0 0 24 24"
							><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
								cx="12"
								cy="12"
								r="3"
							/></svg
						>1.2K</span
					><span class="text-gray-400 inline-flex items-center leading-none text-sm"
						><svg
							class="w-4 h-4 mr-1"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							viewBox="0 0 24 24"
							><path
								d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
							/></svg
						>6</span
					>
				</div>
				<a class="inline-flex items-center"
					><img
						alt="blog"
						src="https://dummyimage.com/104x104"
						class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
					/><span class="flex-grow flex flex-col pl-4"
						><span class="title-font font-medium text-gray-900">Holden Caulfield</span><span
							class="text-gray-400 text-xs tracking-widest mt-0.5">UI DEVELOPER</span
						></span
					></a
				>
			</div>
			<div class="p-12 md:w-1/2 flex flex-col items-start">
				<span
					class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest"
					>CATEGORY</span
				>
				<h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
					Pinterest DIY dreamcatcher gentrify single-origin coffee
				</h2>
				<p class="leading-relaxed mb-8">
					Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal portland. VHS man braid
					palo santo hoodie brunch trust fund. Bitters hashtag waistcoat fashion axe chia unicorn.
					Plaid fixie chambray 90's, slow-carb etsy tumeric.
				</p>
				<div
					class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full"
				>
					<a class="text-indigo-500 inline-flex items-center"
						>Learn More<svg
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg
						></a
					><span
						class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
						><svg
							class="w-4 h-4 mr-1"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							viewBox="0 0 24 24"
							><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
								cx="12"
								cy="12"
								r="3"
							/></svg
						>1.2K</span
					><span class="text-gray-400 inline-flex items-center leading-none text-sm"
						><svg
							class="w-4 h-4 mr-1"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							viewBox="0 0 24 24"
							><path
								d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
							/></svg
						>6</span
					>
				</div>
				<a class="inline-flex items-center"
					><img
						alt="blog"
						src="https://dummyimage.com/103x103"
						class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
					/><span class="flex-grow flex flex-col pl-4"
						><span class="title-font font-medium text-gray-900">Alper Kamu</span><span
							class="text-gray-400 text-xs tracking-widest mt-0.5">DESIGNER</span
						></span
					></a
				>
			</div>
		</div>
	</div>
</section>
<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			<div class="p-4 md:w-1/3">
				<div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
					<img
						class="lg:h-48 md:h-36 w-full object-cover object-center"
						src="https://dummyimage.com/720x400"
						alt="blog"
					/>
					<div class="p-6">
						<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
							CATEGORY
						</h2>
						<h1 class="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>
						<p class="leading-relaxed mb-3">
							Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled
							waistcoat.
						</p>
						<div class="flex items-center flex-wrap ">
							<a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
								>Learn More<svg
									class="w-4 h-4 ml-2"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg
								></a
							><span
								class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
								><svg
									class="w-4 h-4 mr-1"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									viewBox="0 0 24 24"
									><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
										cx="12"
										cy="12"
										r="3"
									/></svg
								>1.2K</span
							><span class="text-gray-400 inline-flex items-center leading-none text-sm"
								><svg
									class="w-4 h-4 mr-1"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									viewBox="0 0 24 24"
									><path
										d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
									/></svg
								>6</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="p-4 md:w-1/3">
				<div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
					<img
						class="lg:h-48 md:h-36 w-full object-cover object-center"
						src="https://dummyimage.com/721x401"
						alt="blog"
					/>
					<div class="p-6">
						<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
							CATEGORY
						</h2>
						<h1 class="title-font text-lg font-medium text-gray-900 mb-3">The 400 Blows</h1>
						<p class="leading-relaxed mb-3">
							Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled
							waistcoat.
						</p>
						<div class="flex items-center flex-wrap">
							<a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
								>Learn More<svg
									class="w-4 h-4 ml-2"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg
								></a
							><span
								class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
								><svg
									class="w-4 h-4 mr-1"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									viewBox="0 0 24 24"
									><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
										cx="12"
										cy="12"
										r="3"
									/></svg
								>1.2K</span
							><span class="text-gray-400 inline-flex items-center leading-none text-sm"
								><svg
									class="w-4 h-4 mr-1"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									viewBox="0 0 24 24"
									><path
										d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
									/></svg
								>6</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="p-4 md:w-1/3">
				<div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
					<img
						class="lg:h-48 md:h-36 w-full object-cover object-center"
						src="https://dummyimage.com/722x402"
						alt="blog"
					/>
					<div class="p-6">
						<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
							CATEGORY
						</h2>
						<h1 class="title-font text-lg font-medium text-gray-900 mb-3">Shooting Stars</h1>
						<p class="leading-relaxed mb-3">
							Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled
							waistcoat.
						</p>
						<div class="flex items-center flex-wrap ">
							<a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
								>Learn More<svg
									class="w-4 h-4 ml-2"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg
								></a
							><span
								class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
								><svg
									class="w-4 h-4 mr-1"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									viewBox="0 0 24 24"
									><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
										cx="12"
										cy="12"
										r="3"
									/></svg
								>1.2K</span
							><span class="text-gray-400 inline-flex items-center leading-none text-sm"
								><svg
									class="w-4 h-4 mr-1"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									viewBox="0 0 24 24"
									><path
										d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
									/></svg
								>6</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			<div class="p-4 lg:w-1/3">
				<div
					class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
				>
					<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
						CATEGORY
					</h2>
					<h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
						Raclette Blueberry Nextious Level
					</h1>
					<p class="leading-relaxed mb-3">
						Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled
						waistcoat.
					</p>
					<a class="text-indigo-500 inline-flex items-center"
						>Learn More<svg
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg
						></a
					>
					<div
						class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"
					>
						<span
							class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
							><svg
								class="w-4 h-4 mr-1"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								viewBox="0 0 24 24"
								><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
									cx="12"
									cy="12"
									r="3"
								/></svg
							>1.2K</span
						><span class="text-gray-400 inline-flex items-center leading-none text-sm"
							><svg
								class="w-4 h-4 mr-1"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								viewBox="0 0 24 24"
								><path
									d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
								/></svg
							>6</span
						>
					</div>
				</div>
			</div>
			<div class="p-4 lg:w-1/3">
				<div
					class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
				>
					<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
						CATEGORY
					</h2>
					<h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
						Ennui Snackwave Thundercats
					</h1>
					<p class="leading-relaxed mb-3">
						Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled
						waistcoat.
					</p>
					<a class="text-indigo-500 inline-flex items-center"
						>Learn More<svg
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg
						></a
					>
					<div
						class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"
					>
						<span
							class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
							><svg
								class="w-4 h-4 mr-1"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								viewBox="0 0 24 24"
								><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
									cx="12"
									cy="12"
									r="3"
								/></svg
							>1.2K</span
						><span class="text-gray-400 inline-flex items-center leading-none text-sm"
							><svg
								class="w-4 h-4 mr-1"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								viewBox="0 0 24 24"
								><path
									d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
								/></svg
							>6</span
						>
					</div>
				</div>
			</div>
			<div class="p-4 lg:w-1/3">
				<div
					class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
				>
					<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
						CATEGORY
					</h2>
					<h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
						Selvage Poke Waistcoat Godard
					</h1>
					<p class="leading-relaxed mb-3">
						Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled
						waistcoat.
					</p>
					<a class="text-indigo-500 inline-flex items-center"
						>Learn More<svg
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg
						></a
					>
					<div
						class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"
					>
						<span
							class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
							><svg
								class="w-4 h-4 mr-1"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								viewBox="0 0 24 24"
								><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
									cx="12"
									cy="12"
									r="3"
								/></svg
							>1.2K</span
						><span class="text-gray-400 inline-flex items-center leading-none text-sm"
							><svg
								class="w-4 h-4 mr-1"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								viewBox="0 0 24 24"
								><path
									d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
								/></svg
							>6</span
						>
					</div>
				</div>
			</div>
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
