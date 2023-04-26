<script lang="ts">
	import { Card, Heading } from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<section class="container">
	<Card size="xl">
		<div class="min-h-100">
			<Heading tag="h4">{$page.data?.space?.name} Wallet</Heading>

			<section class="flex items-center justify-center  text-gray-800 py-10 ">
				<!-- Component Start -->
				<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl">
					<!-- Tile 1 -->
					<div class="flex items-center p-4 bg-white  rounded">
						<div
							class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded"
						>
							<svg
								class="w-6 h-6 fill-current text-green-700"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="flex-grow flex flex-col ml-4">
							<span class="text-xl font-bold">$8,430</span>
							<div class="flex items-center justify-between">
								<span class="text-gray-500">Incoming 30 days</span>
								<span class="text-green-500 text-sm font-semibold ml-2">+12.6%</span>
							</div>
						</div>
					</div>

					<!-- Tile 2 -->
					<div class="flex items-center p-4 bg-white rounded">
						<div
							class="flex flex-shrink-0 items-center justify-center bg-red-200 h-16 w-16 rounded"
						>
							<svg
								class="w-6 h-6 fill-current text-red-700"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="flex-grow flex flex-col ml-4">
							<span class="text-xl font-bold">$211</span>
							<div class="flex items-center justify-between">
								<span class="text-gray-500">Expenses 30 days</span>
								<span class="text-red-500 text-sm font-semibold ml-2">-8.1%</span>
							</div>
						</div>
					</div>

					<!-- Tile 3 -->
					<div class="flex items-center p-4 bg-white rounded">
						<div
							class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded"
						>
							<svg
								class="w-6 h-6 fill-current text-green-700"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="flex-grow flex flex-col ml-4">
							<span class="text-xl font-bold">$14,900</span>
							<div class="flex items-center justify-between">
								<span class="text-gray-500">$Current Balance</span>
								<span class="text-green-500 text-sm font-semibold ml-2">+28.4%</span>
							</div>
						</div>
					</div>
				</div>
				<!-- Component End  -->
			</section>

			<div class="flex gap-4">
				<div class="flex z-20 items-center">
					<div class="space-y-2">
						<div
							class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110"
						>
							<img
								class="relative object-cover w-full h-full rounded-xl"
								src="https://i.imgur.com/kGkSg1v.png"
							/>

							<div class="w-full px-8 absolute top-8">
								<div class="flex justify-between">
									<div class="">
										<p class="font-light">Name</p>
										<p class="font-medium tracking-widest">Karthik P</p>
									</div>
									<img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
								</div>
								<div class="pt-1">
									<p class="font-light">Card Number</p>
									<p class="font-medium tracking-more-wider">4642 3489 9867 7632</p>
								</div>
								<div class="pt-6 pr-6">
									<div class="flex justify-between">
										<div class="">
											<p class="font-light text-xs">Valid</p>
											<p class="font-medium tracking-wider text-sm">11/15</p>
										</div>
										<div class="">
											<p class="font-light text-xs text-xs">Expiry</p>
											<p class="font-medium tracking-wider text-sm">03/25</p>
										</div>

										<div class="">
											<p class="font-light text-xs">CVV</p>
											<p class="font-bold tracking-more-wider text-sm">···</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="relative flex-1 overflow-x-auto shadow-md sm:rounded-lg">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
							<tr>
								<th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800"> ID </th>
								<th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800"> Type </th>
								<th scope="col" class="px-6 py-3"> Date </th>
								<th scope="col" class="px-6 py-3"> Amnt </th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-gray-200 dark:border-gray-700">
								<th
									scope="row"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
								>
									123456
								</th>
								<td class="px-6 py-4"> Incoming </td>
								<td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
									{new Date().getDate() +
										' / ' +
										new Date().getMonth() +
										' / ' +
										new Date().getFullYear()}
								</td>
								<td class="px-6 py-4"> $2999 </td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</Card>
</section>
