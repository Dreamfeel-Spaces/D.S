<script>
	import { page } from '$app/stores';
	import axios from 'axios';
	import { Card, Button } from 'flowbite-svelte';
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
	<div class="md:f items-start justify-cdenter pB-12 2xl:px-2 md:px-6 px-4">
		<div class="">
			<div class="border-b flex  border-gray-200 pb-6">
				<h1
					class="lg:text-2xl flex-1 text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2"
				>
					{$page?.data?.space?.name}
				</h1>
				<div>
					<Button
						outline
						size="xs"
						class="relative"
						rel="noreferrer"
						target="_blank"
						href="{$page.url.protocol}//{$page.params.d}.{$page.url.host}"
					>
						<svg
							class="absolute -top-1  -right-2"
							xmlns="http://www.w3.org/2000/svg"
							height="18"
							fill="currentColor"
							viewBox="0 96 960 960"
							width="18"
							><path
								d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h279v60H180v600h600V597h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60V319L382 717Z"
							/></svg
						>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							height="18"
							viewBox="0 -960 960 960"
							width="18"
							><path
								d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-43-61v-82q-35 0-59-26t-24-61v-44L149-559q-5 20-7 39.5t-2 39.5q0 130 84.5 227T437-141Zm294-108q22-24 38.5-51t28-56.5q11.5-29.5 17-60.5t5.5-63q0-106-58-192.5T607-799v18q0 35-24 61t-59 26h-87v87q0 17-13.5 28T393-568h-83v88h258q17 0 28 13t11 30v127h43q29 0 51 17t30 44Z"
							/></svg
						>
					</Button>
				</div>
			</div>

			<div class="py-4 border-b border-gray-200 flex items-center justify-between">
				<p class="text-base leading-4 text-gray-800 dark:text-gray-300">Your Role:</p>
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
			<a
				href="/dashboards/{$page.params.d}"
				class="dark:bg-white my-6 dark:text-gray-900 dark:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none"
			>
				Dashboards
			</a>
			<a
				href="/a/{$page.params.d}"
				class="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none"
			>
				Admin Console
			</a>
			<a
				href="/rest/{$page.params.d}"
				class="dark:bg-white mt-6 dark:text-gray-900 dark:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none"
			>
				API & Data
			</a>
			<a
				href="/editor/{$page.params.d}"
				class="dark:bg-white mt-6 dark:text-gray-900 dark:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none"
			>
				UI Builder
			</a>
			<a
				href="{$page.url.protocol}//pos.{$page.url.host}"
				class="dark:bg-white mt-6 dark:text-gray-900 dark:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none"
			>
				POS
			</a>
		</div>
	</div>
</Card>
