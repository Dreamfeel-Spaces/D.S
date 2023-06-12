<script lang="ts">
	import { page } from '$app/stores';
	import {
		Card,
		BreadcrumbItem,
		Accordion,
		AccordionItem,
		List,
		Listgroup,
		ListgroupItem,
		Button,
		Alert,
		ImagePlaceholder
	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { recentlyViewed } from '$lib/wsstore';
	export let data: PageData;
	const uis = data.space?.spaceUis ?? [];
	export let form: any;
	onMount(() => {
		recentlyViewed.set({ [$page.url.pathname]: $page, ...$recentlyViewed });
	});
</script>

{#if !uis.length}
	<div class="container">
		<Card size="xl" class="w-full min-h-108 flex self-center">
			<div class="my-9 text-center">
				<div>No UIS have been added</div>
				<div class="mt-9 ">
					<a class="hover:underline" href={`/editor/${$page.params['app_id']}/create`}>
						<Button>Add UI Group</Button></a
					>
				</div>
			</div>
		</Card>
	</div>
{/if}

{#if form?.defaultUiSuccess}
	<div class="my-6">
		<Alert accent dismissable>UI version has been updated!</Alert>
	</div>
{/if}

<div class="container">
	<div class="grid gap-3 lg:grid-cols-2  overflow-auto ">
		{#each uis as ui}
			<div
				class="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-black dark:border-gray-700"
			>
				<div class="flex items-center justify-between mb-4">
					<h5 class="text-xl flex font-bold leading-none text-gray-900 dark:text-white">
						{#if ui?.spaceUIVersion.find((item) => item.id === data?.space?.uiVid)}
							<span class=" pl-1 dark:text-green-500">
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
						{/if}
					</h5>
					<div class="flex">
						<a
							href={`/editor/${$page.data.space.appId}/versions/${ui.id}/create`}
							class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
						>
							Add version
						</a>
					</div>
				</div>
				<div class="dark:bg-gray-800 mr-3 flex justify-center mb-2 rounded ">
					<img
						class="rounded-xl object-contain"
						alt="UI Screenshot"
						src={'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png'}
					/>
				</div>

				<div class="w-full">
					<List size="xl" position="inside">
						<Listgroup>
							{#each ui.spaceUIVersion as version}
								<ListgroupItem
									size="xl"
									class="w-full"
									href={`/editor/${$page.params['app_id']}/${version.id}/${
										version.pages.find((page) => page.path === '/')?.id ?? version.pages[0]?.id
									}`}
								>
									<div class="flex justify-between ">
										<div class="flex" style="align-items:center">
											<a rel="external" href={`/editor/${$page.params['app_id']}/${version.id}`}
												>Version {version.version}</a
											>
										</div>
										<form action="?/setDefaultUI" method="post">
											<input id="id" value={version.id} name="id" type="hidden" />
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

											<a
												rel="external"
												href={`/editor/${$page.params['app_id']}/${version.id}/${
													version.pages.find((page) => page.path === '/')?.id ??
													version.pages[0]?.id
												}`}
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
										</form>
									</div>
								</ListgroupItem>
							{/each}
						</Listgroup>
					</List>
				</div>
			</div>
		{/each}
	</div>
</div>
