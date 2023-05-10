<script lang="ts">
	import { Button, Card, Heading } from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<section class="container">
	<Card size="xl">
		<div class="min-h-100">
			<div class="flex">
				<Heading class="flex-1" tag="h4">{$page.data?.wallet?.name} Wallet</Heading>
				<form method="post">
					<Button color={$page.data?.wallet?.default ? 'green' : 'blue'} type="submit" size="xs"
						>{$page.data?.wallet?.default ? 'Default wallet' : 'Make Default'}</Button
					>
				</form>
			</div>
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
							<span class="text-xl font-bold"
								>{$page.data.wallet?.defaultCurrency}{$page.data?.incomesTotals ?? 0}</span
							>
							<div class="flex items-center justify-between">
								<span class="text-gray-500">Incoming 30 days</span>
								<span class="text-green-500 text-sm font-semibold ml-2">+0.0%</span>
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
							<span class="text-xl font-bold"
								>{$page.data.wallet?.defaultCurrency}{$page.data?.outcomesTotals ?? 0}</span
							>
							<div class="flex items-center justify-between">
								<span class="text-gray-500">Expenses 30 days</span>
								<span class="text-red-500 text-sm font-semibold ml-2">-0.0%</span>
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
							<span class="text-xl font-bold"
								>{$page.data.wallet?.defaultCurrency}{$page.data.wallet?.balance}</span
							>
							<div class="flex items-center justify-between">
								<span class="text-gray-500">Current Balance</span>
								<span class="text-green-500 text-sm font-semibold ml-2">+0.0%</span>
							</div>
						</div>
					</div>
				</div>
				<!-- Component End  -->
			</section>

			<div class="flex gap-4">
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
							{#each $page.data.transactions as transaction}
								<tr class="border-b border-gray-200 dark:border-gray-700">
									<th
										scope="row"
										class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
									>
										{transaction.identifier}
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
							{/each}
							{#if !$page.data.transactions?.length}
								<tr class="text-center">No transaction data available</tr>
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</Card>
</section>
