<script>
	import Map from '../../../routes/dashboards/[app_id]/Map.svelte';
	import logo from '$lib/assets/beta-logo.png';
	import { Avatar } from 'flowbite-svelte';
</script>

<section>
	<div
		class="pt-2 px-4 md:px-6 2xl:px-0 2xl:mx-auto 2xl:container flex justify-center items-center"
	>
		<div class="flex justify-between items-center w-full">
			<div class="flex flex-col justify-start items-start">
				<div class="mt-2 flex flex-row justify-end items-center space-x-3">
					<img src={logo} width="48" alt="" />
					<!-- <p class="text-xl font-semibold leading-normal text-gray-800 dark:text-white">
						feelDelivery
					</p> -->
					<!-- <p class="text-base leading-4 text-gray-600 mt-2 dark:text-gray-400">(00 products)</p> -->
				</div>
			</div>

			<div class="flex gap-2">
				<button
					disabled
					class="hover:text-gray-500 cursor-not-allowed text-gray-600 bg-gray-100 py-3.5 px-3 rounded-sm flex flex-row justify-center items-center space-x-3 dark:bg-gray-800 dark:bg-gray-700"
				>
					<svg
						class="dark:text-gray-300"
						width="24"
						height="16"
						viewBox="0 0 24 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 14.6452V9.33875"
							stroke="currentColor"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M4 6.30645V1"
							stroke="currentColor"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 14.6452V7.82263"
							stroke="currentColor"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 4.79032V1"
							stroke="currentColor"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M20 14.6452V10.8549"
							stroke="currentColor"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M20 7.82258V1"
							stroke="currentColor"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M1 9.33875H7"
							stroke="currentColor"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M9 4.79028H15"
							stroke="currentColor"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M17 10.8549H23"
							stroke="currentColor"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<p class="hidden md:block text-sm leading-none dark:text-gray-300">Filters</p>
				</button>
				<Avatar />
			</div>
		</div>
	</div>

	<Map zoom={7} />
</section>
