<script lang="ts">
	import { recentlyViewed } from '$lib/wsstore';
	import { Card, Heading } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import Uptime from '$lib/components/Uptime.svelte';
	import Map from '../../dashboards/[app_id]/Map.svelte';
	import Location from './Location.svelte';
	import Userchart from './Userchart.svelte';
</script>

<Location />

<section class="container">
	<Card size="xl">
		<Heading class="ml-3" tag="h4">Home</Heading>

		{#if Object.keys($recentlyViewed).length}
			<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<caption
						class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
					>
						Recently viewed
						<div class="flex justify-between">
							<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
								Quick links to pages you just viewed
							</p>
							<button on:click={() => recentlyViewed.set({})}> Clear All</button>
						</div>
					</caption>
					<thead
						class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
					>
						<tr>
							<th scope="col" class="px-6 py-3" />
							<th scope="col" class="px-6 py-3">Page</th>
							<th scope="col" class="px-6 py-3"> Url </th>
							<th scope="col" class="px-6 py-3">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.keys($recentlyViewed) as pathname}
							{#if pathname}
								<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{#if pathname.split('/')[1] === 'rest'}
											<svg
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 96 960 960"
												width="24"
												><path
													d="M480 681 375 576l105-105 105 105-105 105Zm-85-294-83-83 168-168 168 168-83 83-85-85-85 85ZM208 744 40 576l168-168 83 83-85 85 85 85-83 83Zm544 0-83-83 85-85-85-85 83-83 168 168-168 168Zm-272 272L312 848l83-83 85 85 85-85 83 83-168 168Z"
												/></svg
											>
										{:else if pathname.split('/')[1] === 'a' && !pathname.includes('pos') && !pathname.includes('roles') && !pathname.includes('accounts') && !pathname.includes('wallet') && !pathname.includes('preferences')}
											<svg
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 96 960 960"
												width="24"
												><path
													d="M690.882 786q25.883 0 44-19Q753 748 753 722.118q0-25.883-18.118-44-18.117-18.118-44-18.118Q665 660 646 678.118q-19 18.117-19 44Q627 748 646 767q19 19 44.882 19ZM689.5 911q33.5 0 60.5-14t46-40q-26-14-51.962-21-25.961-7-54-7-28.038 0-54.538 7-26.5 7-51.5 21 19 26 45.5 40t60 14ZM480 976q-138-32-229-156.5T160 534V295l320-120 320 120v270q-14-7-30-12.5t-30-7.5V337l-260-96-260 96v197q0 76 24.5 140T307 786.5q38 48.5 84 80.5t89 46q6 12 18 27t20 23q-9 5-19 7.5t-19 5.5Zm212.5 0Q615 976 560 920.5T505 789q0-78.435 54.99-133.718Q614.98 600 693 600q77 0 132.5 55.282Q881 710.565 881 789q0 76-55.5 131.5t-133 55.5ZM480 577Z"
												/></svg
											>
										{:else if pathname.split('/')[1] === 'a' && pathname.includes('pos')}
											<svg
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 96 960 960"
												width="24"
												><path
													d="M260 426q-24.75 0-42.375-17.625T200 366V236q0-24.75 17.625-42.375T260 176h440q24.75 0 42.375 17.625T760 236v130q0 24.75-17.625 42.375T700 426H260Zm0-60h440V236H260v130ZM140 976q-24.75 0-42.375-17.625T80 916v-70h800v70q0 24.75-17.625 42.375T820 976H140ZM80 816l145-324q8-16 22.603-26 14.603-10 31.397-10h402q16.794 0 31.397 10Q727 476 735 492l145 324H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z"
												/></svg
											>
										{:else if pathname.split('/')[1] === 'a' && pathname.includes('roles')}
											<svg
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 96 960 960"
												width="24"
												><path
													d="M140 976q-24 0-42-18t-18-42V436q0-24 18-42t42-18h237V236q0-24 18-42t42-18h87q24 0 42 18t18 42v140h236q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680V436H584q0 28-18.5 44T519 496h-78q-27 0-45.5-16T377 436H140v480Zm92-107h239v-14q0-18-9-32t-23-19q-32-11-50-14.5t-35-3.5q-19 0-40.5 4.5T265 744q-15 5-24 19t-9 32v14Zm336-67h170v-50H568v50Zm-214-50q22.5 0 38.25-15.75T408 638q0-22.5-15.75-38.25T354 584q-22.5 0-38.25 15.75T300 638q0 22.5 15.75 38.25T354 692Zm214-63h170v-50H568v50ZM437 436h87V236h-87v200Zm43 240Z"
												/></svg
											>
										{:else if pathname.split('/')[1] === 'a' && pathname.includes('accounts')}
											<svg
												fill="none"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												viewBox="0 0 24 24"
												stroke="currentColor"
												class="h-6 w-6"
											>
												<path
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
										{:else if pathname.split('/')[1] === 'a' && pathname.includes('preferences')}
											<svg
												fill="none"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												viewBox="0 0 24 24"
												stroke="currentColor"
												class="h-6 w-6"
											>
												<path
													d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
												/>
												<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
										{:else if pathname.split('/')[1] === 'a' && pathname.includes('wallet')}
											<svg
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 96 960 960"
												width="24"
												><path
													d="M640 636q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM200 856V296v560Zm0 80q-33 0-56.5-23.5T120 856V296q0-33 23.5-56.5T200 216h560q33 0 56.5 23.5T840 296v100h-80V296H200v560h560V756h80v100q0 33-23.5 56.5T760 936H200Zm320-160q-33 0-56.5-23.5T440 696V456q0-33 23.5-56.5T520 376h280q33 0 56.5 23.5T880 456v240q0 33-23.5 56.5T800 776H520Zm280-80V456H520v240h280Z"
												/></svg
											>
										{:else if pathname.split('/')[1] === 'dashboards'}
											<svg
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												height="24"
												viewBox="0 96 960 960"
												width="24"
												><path
													d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h270V276H180v600Zm330 0h270V575H510v301Zm0-361h270V276H510v239Z"
												/></svg
											>
										{:else if pathname.split('/')[1] === 'editor'}
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
										{:else}
											""
										{/if}
									</th>
									<th
										scope="row"
										class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{pathname.split('/')[1] === 'a'
											? 'Admin Console'
											: pathname.split('/')[1] === 'rest'
											? 'Rest Api'
											: pathname.split('/')[1] === 'dashboards'
											? 'Dashboards'
											: pathname.split('/')[1] === 'editor'
											? 'UI'
											: pathname.split('/')[1]}
									</th>
									<td class="px-6 py-4"> {pathname} </td>
									<td class="px-6 py-4 text-right">
										<a
											href={pathname}
											class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
											>Go to page</a
										>
									</td>
								</tr>
							{/if}
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
		<div class="flex flex-wrap">
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
				<div class="bg-green-600 border rounded shadow p-2">
					<a href="/a/{$page.data.space?.appId}/wallet" class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M640 636q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM200 856V296v560Zm0 80q-33 0-56.5-23.5T120 856V296q0-33 23.5-56.5T200 216h560q33 0 56.5 23.5T840 296v100h-80V296H200v560h560V756h80v100q0 33-23.5 56.5T760 936H200Zm320-160q-33 0-56.5-23.5T440 696V456q0-33 23.5-56.5T520 376h280q33 0 56.5 23.5T880 456v240q0 33-23.5 56.5T800 776H520Zm280-80V456H520v240h280Z"
								/></svg
							>
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">Total Revenue</h5>
							<h3 class="text-white text-3xl">
								0$<span class="text-green-400"><i class="fas fa-caret-down" /></span>
							</h3>
						</div>
					</a>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
				<div class="bg-blue-600 border rounded shadow p-2">
					<a
						href="/dashboards/{$page.data.space?.appId}/users/overview"
						class="flex flex-row items-center"
					>
						<div class="flex-shrink pl-1 pr-4">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M0 816v-53q0-38.567 41.5-62.784Q83 676 150.376 676q12.165 0 23.395.5Q185 677 196 678.652q-8 17.348-12 35.165T180 751v65H0Zm240 0v-65q0-32 17.5-58.5T307 646q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.861-3.5-37.431Q773 696 765 678.727q11-1.727 22.171-2.227 11.172-.5 22.829-.5 67.5 0 108.75 23.768T960 763v53H780Zm-480-60h360v-6q0-37-50.5-60.5T480 666q-79 0-129.5 23.5T300 751v5ZM149.567 646Q121 646 100.5 625.438 80 604.875 80 576q0-29 20.562-49.5Q121.125 506 150 506q29 0 49.5 20.5t20.5 49.933Q220 605 199.5 625.5T149.567 646Zm660 0Q781 646 760.5 625.438 740 604.875 740 576q0-29 20.562-49.5Q781.125 506 810 506q29 0 49.5 20.5t20.5 49.933Q880 605 859.5 625.5T809.567 646ZM480 576q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600 456q0 50-34.5 85T480 576Zm.351-60Q506 516 523 498.649t17-43Q540 430 522.851 413t-42.5-17Q455 396 437.5 413.149t-17.5 42.5Q420 481 437.351 498.5t43 17.5ZM480 756Zm0-300Z"
								/></svg
							>
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">Total Users</h5>
							<h3 class="text-white text-3xl">
								{$page.data.userCount}
								<span class="text-blue-400"><i class="fas fa-caret-up" /></span>
							</h3>
						</div>
					</a>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
				<div class="bg-orange-600 border rounded shadow p-2">
					<div class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M730 656V526H600v-60h130V336h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40 896v-94q0-35 17.5-63.5T108 696q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420 636 478 649.5 536 663 611 696q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587 750q-71-33-120-43.5T360 696q-58 0-107.5 10.5T132 750q-15 7-23.5 21.5T100 802v34Zm260-321q39 0 64.5-25.5T450 425q0-39-25.5-64.5T360 335q-39 0-64.5 25.5T270 425q0 39 25.5 64.5T360 515Zm0-90Zm0 411Z"
								/></svg
							>
						</div>
						<div class="flex-1 text-right pr-1">
							<h5 class="text-white">New Users</h5>
							<h3 class="text-white text-3xl">
								{$page.data.newUsers}
								<span class="text-orange-400"><i class="fas fa-caret-up" /></span>
							</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
				<div class="bg-purple-600 border rounded shadow p-2">
					<div class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M286.882 339Q266 339 251.5 353.618q-14.5 14.617-14.5 35.5Q237 410 251.618 424.5q14.617 14.5 35.5 14.5Q308 439 322.5 424.382q14.5-14.617 14.5-35.5Q337 368 322.382 353.5q-14.617-14.5-35.5-14.5Zm0 414Q266 753 251.5 767.618q-14.5 14.617-14.5 35.5Q237 824 251.618 838.5q14.617 14.5 35.5 14.5Q308 853 322.5 838.382q14.5-14.617 14.5-35.5Q337 782 322.382 767.5q-14.617-14.5-35.5-14.5ZM154 217h651q16 0 25.5 9.5t9.5 25.813V521q0 17.425-9.5 29.213Q821 562 805 562H154q-15 0-24.5-11.787Q120 538.425 120 521V252.313q0-16.313 9.5-25.813T154 217Zm26 60v225h600V277H180Zm-26 353h647q15 0 27 12.5t12 28.527V935q0 20-12 30.5T801 976H159q-16 0-27.5-10.5T120 935V671.027q0-16.027 9.5-28.527T154 630Zm26 60v226h600V690H180Zm0-413v225-225Zm0 413v226-226Z"
								/></svg
							>
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">Server Uptime</h5>
							<h3 class="text-white text-3xl"><Uptime /></h3>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
				<div class="bg-red-600 border rounded shadow p-2">
					<a href="/rest/{$page.data.space?.appId}/" class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M140 896q-23 0-41.5-18.5T80 836V316q0-23 18.5-41.5T140 256h281l60 60h339q23 0 41.5 18.5T880 376H455l-60-60H140v520l102-400h698L833 850q-6 24-22 35t-41 11H140Zm63-60h572l84-340H287l-84 340Zm0 0 84-340-84 340Zm-63-460v-60 60Z"
								/></svg
							>
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">Collections</h5>
							<h3 class="text-white text-3xl">{$page.data.tableCount}</h3>
						</div>
					</a>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
				<div class="bg-pink-600 border rounded shadow p-2">
					<a href="/editor/{$page.data.space?.appId}/" class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
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
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">UI Groups</h5>
							<h3 class="text-white text-3xl">
								{$page.data.uiCount}
								<span class="text-pink-400"><i class="fas fa-caret-up" /></span>
							</h3>
						</div>
					</a>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
				<div class="bg-amber-600 ml-2  border rounded shadow p-2">
					<a href="/rest/{$page.data.space?.appId}/" class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M480 681 375 576l105-105 105 105-105 105Zm-85-294-83-83 168-168 168 168-83 83-85-85-85 85ZM208 744 40 576l168-168 83 83-85 85 85 85-83 83Zm544 0-83-83 85-85-85-85 83-83 168 168-168 168Zm-272 272L312 848l83-83 85 85 85-85 83 83-168 168Z"
								/></svg
							>
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">API Requests</h5>
							<h3 class="text-white text-3xl">
								{$page.data.apiRecords}/10k
								<span class="text-amber-400"><i class="fas fa-caret-up" /></span>
							</h3>
						</div>
					</a>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
				<div class="bg-indigo-600 ml-2  border rounded shadow p-2">
					<a href="/a/{$page.data.space?.appId}/roles" class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"
								><path
									d="M480 681 375 576l105-105 105 105-105 105Zm-85-294-83-83 168-168 168 168-83 83-85-85-85 85ZM208 744 40 576l168-168 83 83-85 85 85 85-83 83Zm544 0-83-83 85-85-85-85 83-83 168 168-168 168Zm-272 272L312 848l83-83 85 85 85-85 83 83-168 168Z"
								/></svg
							>
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">Roles</h5>
							<h3 class="text-white text-3xl">
								{$page.data.roles?.length}
								<span class="text-indigo-400"><i class="fas fa-caret-up" /></span>
							</h3>
						</div>
					</a>
				</div>
			</div>
		</div>
	</Card>
</section>
<Userchart />
<Map />
