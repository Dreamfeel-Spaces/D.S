<script lang="ts">
	import {
		Button,
		Heading,
		ImagePlaceholder,
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="h-screen dark:bg-gray-900 gap-3 p-6 dark:text-white grid lg:grid-cols-2">
	<div>
		<div class="flex gap-2">
			<svg
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 96 960 960"
				width="24"
				><path
					d="M70 936q-12.75 0-21.375-8.675Q40 918.649 40 905.825 40 893 48.625 884.5T70 876h820q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 936H70Zm70-120q-24 0-42-18t-18-42V276q0-24 18-42t42-18h680q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680V276H140v480Zm0 0V276v480Z"
				/></svg
			>
			<Heading tag="h5">{$page.data.ui.name}</Heading>
		</div>
		<div  class="flex" >
			<div >
				{#if $page.data.ui?.spaceUIVersion.find((item) => item.id === data?.space?.uiVid)}
					<Button pill gradient color="green" size="xs" class=" mt-1 fle">
						<svg
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							height="18"
							viewBox="0 96 960 960"
							width="18"
							><path
								d="M430 974q-72-9-134.5-43t-108-86.5Q142 792 116 723.5T90 576q0-88 41.5-168T243 266H121v-60h229v229h-60V306q-64 51-102 121.5T150 576q0 132 80 225.5T430 913v61Zm-7-228L268 591l42-42 113 113 227-227 42 42-269 269Zm187 200V717h60v129q64-52 102-122t38-148q0-132-80-225.5T530 239v-61q146 18 243 129t97 269q0 88-41.5 168T717 886h122v60H610Z"
							/></svg
						> <span class="ml-1 text-sm"> Active </span>
					</Button>
				{/if}
			</div>
		</div>
		<div class="mt-5">
			<ImagePlaceholder />
		</div>
	</div>
	<div class="space-y-6">
		<div class="flex justify-end  gap-6">
			<div class="flex items-center">
				<div>
					<a
						href={`/editor/${$page.data.space.appId}/versions/${$page.data.ui.id}/create`}
						class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
					>
						Add version
					</a>
				</div>
			</div>
			<Button on:click={() => history.back()}>Go Back</Button>
		</div>

		<section>
			<div class="relative overflow-x-auto">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
					>
						<tr>
							<th scope="col" class="px-6 py-3"> Version </th>
							<th scope="col" class="px-6 py-3"> Updated </th>
							<th scope="col" class="px-6 py-3"> Publish </th>
							<th scope="col" class="px-6 py-3"> Edit </th>
						</tr>
					</thead>
					<tbody>
						{#each $page.data.ui.spaceUIVersion as version}
							<tr class="bg-white dark:bg-gray-800">
								<th
									scope="row"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{version.version}. {version.name ?? version.version}
								</th>
								<td class="px-6 py-4">
									x {version.dateCreated}
								</td>

								<td class="px-6 py-4">
									<Button
										pill
										type="submit"
										gradient
										color={data?.space?.uiVid === version.id ? 'green' : 'blue'}
										outline={data?.space?.uiVid !== version.id}
										size="xs"
										>{#if data?.space?.uiVid === version.id}
											<span class="px-4">
												<svg
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg"
													height="15"
													viewBox="0 96 960 960"
													width="15"
													><path
														d="M430 974q-72-9-134.5-43t-108-86.5Q142 792 116 723.5T90 576q0-88 41.5-168T243 266H121v-60h229v229h-60V306q-64 51-102 121.5T150 576q0 132 80 225.5T430 913v61Zm-7-228L268 591l42-42 113 113 227-227 42 42-269 269Zm187 200V717h60v129q64-52 102-122t38-148q0-132-80-225.5T530 239v-61q146 18 243 129t97 269q0 88-41.5 168T717 886h122v60H610Z"
													/></svg
												>
											</span>
										{:else}
											<span class="px-3">
												<svg
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg"
													height="13"
													viewBox="0 96 960 960"
													width="15"
													><path
														d="M450 896V525L330 645l-43-43 193-193 193 193-43 43-120-120v371h-60ZM160 459V316q0-24 18-42t42-18h520q24 0 42 18t18 42v143h-60V316H220v143h-60Z"
													/></svg
												>
											</span>
										{/if}
									</Button>
								</td>
								<td class="px-6 py-4">
									<a
										rel="external"
										href={`/editor/${$page.params['app_id']}/${version.id}`}
									>
										<Button pill outline gradient size="xs">
											<span class="px-3">
												<svg
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg"
													height="15"
													viewBox="0 96 960 960"
													width="15"
													><path
														d="M215 939q-33.835 0-66.917-11.5Q115 916 90 890q35-12 50-35t15-62q0-43.75 30.676-74.375Q216.353 688 260.176 688 304 688 334.5 718.625T365 793q0 64-43.5 105T215 939Zm0-60q35 0 62.5-25t27.5-61q0-20-12.5-32.5T260 748q-20 0-32.5 12.5T215 793q0 39-8.5 57.5T175 873q6 1 20 3.5t20 2.5Zm230-177-90-95 376-376q14-14 31-14.5t32 14.5l29 29q15 15 14.5 32.5T823 324L445 702Zm-185 91Z"
													/></svg
												>
											</span>
										</Button>
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	</div>
</div>
