<script>
	import { page } from '$app/stores';
	import axios from 'axios';
	import { Card, Spinner } from 'flowbite-svelte';
	let saving = false;

	async function handleSave() {
		try {
			saving = true;
			const response = await axios.put(
				`/a/${$page.params.app_id}/templates/${$page.params.id}/install`
			);
			if (response.data) {
				saving = false;
				alert('Template saved');
			}
		} catch (e) {
			saving = false;
			alert('An error occured');
		}
	}
</script>

<Card size="xl">
	<div class="md:flex items-start justify-cdenter py-12 2xl:px-2 md:px-6 px-4">
		<div class="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
			<img
				class="w-full"
				alt=" of a girl posing"
				src="https://res.cloudinary.com/dreamnerd/image/upload/v1683813200/Screenshot_from_2023-05-11_16-51-40_drnmo8.png"
			/>
			<img
				class="mt-6 w-full"
				alt=" of a girl posing"
				src="https://res.cloudinary.com/dreamnerd/image/upload/v1683813519/Screenshot_from_2023-05-11_16-58-12_wqiwrn.png"
			/>
		</div>
		<div class="md:hidden">
			<img
				class="w-full"
				alt=" of a girl posing"
				src="https://i.ibb.co/QMdWfzX/component-image-one.png"
			/>
			<div class="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
				<img
					alt="-tag-one"
					class="md:w-48 md:h-48 w-full"
					src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
				/>
				<img
					alt="-tag-one"
					class="md:w-48 md:h-48 w-full"
					src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
				/>
				<img
					alt="-tag-one"
					class="md:w-48 md:h-48 w-full"
					src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
				/>
				<img
					alt="-tag-one"
					class="md:w-48 md:h-48 w-full"
					src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
				/>
			</div>
		</div>
		<div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
			<div class="border-b border-gray-200 pb-6">
				<p class="text-sm leading-none text-gray-600 dark:text-gray-300 ">Free template</p>
				<h1
					class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2"
				>
					{$page?.data?.space?.name}
				</h1>
			</div>
			<div class="py-4 border-b border-gray-200 flex items-center justify-between">
				<p class="text-base leading-4 text-gray-800 dark:text-gray-300">Colours</p>
				<div class="flex items-center justify-center">
					<p class="text-sm leading-none text-gray-600 dark:text-gray-300">
						Smoke Blue with red accents
					</p>
					<div
						class="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer"
					/>
					<img
						class="dark:hidden"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2.svg"
						alt="next"
					/>
					<img
						class="hidden dark:block"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2dark.svg"
						alt="next"
					/>
				</div>
			</div>
			<div class="py-4 border-b border-gray-200 flex items-center justify-between">
				<p class="text-base leading-4 text-gray-800 dark:text-gray-300">Category</p>
				<div class="flex items-center justify-center">
					<p class="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
						{$page.data.space?.tempCat}
					</p>

					<img
						class="dark:hidden"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2.svg"
						alt="next"
					/>
					<img
						class="hidden dark:block"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2dark.svg"
						alt="next"
					/>
				</div>
			</div>
			<button
				disabled
				on:click={handleSave}
				class="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none"
			>
				{#if !saving}
					Install template
				{:else}
					<Spinner class="mr-3" />
					Installing template...
				{/if}
			</button>
			<button
				class="dark:bg-white mt-6 dark:text-gray-900 dark:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none"
			>
				Create new project
			</button>
			<div>
				<p
					class="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7"
				>
					It is a long established fact that a reader will be distracted by thereadable content of a
					page when looking at its layout. The point of usingLorem Ipsum is that it has a
					more-or-less normal distribution of letters.
				</p>
				<p class="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
					Product Code: 8BN321AF2IF0NYA
				</p>
				<p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Length: 13.2 inches</p>
				<p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Height: 10 inches</p>
				<p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Depth: 5.1 inches</p>
				<p class="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">
					Composition: 100% calf leather, inside: 100% lamb leather
				</p>
			</div>
			<div>
				<div class="border-t border-b py-4 mt-7 border-gray-200">
					<div data-menu class="flex justify-between items-center cursor-pointer">
						<p class="text-base leading-4 text-gray-800 dark:text-gray-300">Shipping and returns</p>
						<button
							class="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
							role="button"
							aria-label="show or hide"
						>
							<img
								class="transform dark:hidden"
								src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4.svg"
								alt="dropdown"
							/>
							<img
								class="transform hidden dark:block"
								src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4dark.svg"
								alt="dropdown"
							/>
						</button>
					</div>
					<div
						class="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300"
						id="sect"
					>
						You will be responsible for paying for your own shipping costs for returning your item.
						Shipping costs are nonrefundable
					</div>
				</div>
			</div>
			<div>
				<div class="border-b py-4 border-gray-200">
					<div data-menu class="flex justify-between items-center cursor-pointer">
						<p class="text-base leading-4 text-gray-800 dark:text-gray-300">Contact us</p>
						<button
							class="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
							role="button"
							aria-label="show or hide"
						>
							<img
								class="transform dark:hidden"
								src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4.svg"
								alt="dropdown"
							/>
							<img
								class="transform hidden dark:block"
								src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4dark.svg"
								alt="dropdown"
							/>
						</button>
					</div>
					<div
						class="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300"
						id="sect"
					>
						If you have any questions on how to return your item to us, contact us.
					</div>
				</div>
			</div>
		</div>
	</div>
</Card>
