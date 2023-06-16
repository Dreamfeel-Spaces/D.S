<script>
	import dreamfeelPayLOgo from '$lib/assets/beta-logo.png';
	import payFav from '$lib/assets/pay-fav.png';
	import {
		A,
		Alert,
		Button,
		Card,
		Heading,
		Hr,
		Input,
		Label,
		Modal,
		Radio,
		Select,
		Spinner
	} from 'flowbite-svelte';
	let moreDetailModal = false;
	let paymethod = 'mobile_money';
	import { page } from '$app/stores';
	import axios from 'axios';
	let isActive = Boolean($page.url.searchParams.get('transaction_id'));
	let loading = false;
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

	import { browser } from '$app/environment';

	let error = false;

	async function handleSubmit() {
		error = false;
		try {
			loading = true;
			const response = await axios.put(`/pay`);
			if (response) {
				loading = false;
			}
		} catch (e) {
			error = true;
			loading = false;
		}
	}

	let selectedFlexi = 3;
</script>

<svelte:head>
	<title>feel pay</title>
	<link
		rel="icon"
		href={'https://res.cloudinary.com/dreamnerd/image/upload/v1686721359/feel-pay_yrvuwi.png'}
	/>
</svelte:head>

<Modal class="space-y-3 text-center" bind:open={loading}>
	{#if browser}
		<div class="flex justify-center">
			<LottiePlayer
				src="https://assets7.lottiefiles.com/packages/lf20_guIsVMaYMV.json"
				autoplay={true}
				loop={true}
				controls={false}
				renderer="svg"
				background="transparent"
				height={144}
				width={144}
			/>
		</div>
		<Heading tag="h6">Processing...</Heading>
		<p>Please wait.</p>
	{/if}
</Modal>

<Modal class="space-y-3 text-center" bind:open={error}>
	{#if browser}
		<div class="flex justify-center">
			<LottiePlayer
				src="https://assets5.lottiefiles.com/packages/lf20_TeKg5h.json"
				autoplay={true}
				loop={true}
				controls={false}
				renderer="svg"
				background="transparent"
				height={144}
				width={144}
			/>
		</div>
		<Heading tag="h6">Payment failed</Heading>
		<p>An error occured with your request, please try again later.</p>
	{/if}
</Modal>

<Modal bind:open={moreDetailModal} class="w-full">
	<h6 class="text-lg" slot="header">Order details</h6>

	<div class="relative overflow-x-auto">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3"> Product name </th>
					<th scope="col" class="px-6 py-3"> Quantity </th>

					<th scope="col" class="px-6 py-3"> Price </th>
				</tr>
			</thead>
			<tbody>
				{#each $page.data.transactionRequest?.txnItems ?? [] as item}
					<tr class="bg-white dark:bg-gray-800">
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							{item.name}
						</th>
						<td class="px-6 py-4">
							x {item.quantity}
						</td>

						<td class="px-6 py-4">
							{item.pricePerItem}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div slot="footer" class="flex justify-between">
		<div>TOTAL TO PAY</div>
		<div>KES: {$page.data.transactionRequest?.amount ?? 0}</div>
	</div>
</Modal>

<form class="mx-auto" on:submit|preventDefault={handleSubmit}>
	{#if isActive}
		<nav class="w-  border-b">
			<div class="py-6 md:py-0 container mx-auto px-6 flex items-center justify-between">
				<div class="py-5" aria-label="Home. logo" role="img">
					<img
						width="35%"
						src={'https://res.cloudinary.com/dreamnerd/image/upload/v1686721359/feel-pay_yrvuwi.png'}
						alt="logo"
					/>
				</div>
				<div>
					<button
						class="dark:bg-white rounded sm:block md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-200 focus:text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
					>
						<svg
							aria-haspopup="true"
							aria-label="open Main Menu"
							xmlns="http://www.w3.org/2000/svg"
							class="md:hidden icon icon-tabler icon-tabler-menu"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="#2c3e50"
							fill="none"
							stroke-linecap="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<line x1="4" y1="8" x2="20" y2="8" />
							<line x1="4" y1="16" x2="20" y2="16" />
						</svg>
					</button>
					<div id="menu" class="md:block lg:block hidden">
						<button
							class="dark:bg-white rounded block md:hidden lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-200 focus:text-gray-700 dark:text-gray-200 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6"
						>
							<svg
								aria-label="close main menu"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="#2c3e50"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" />
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
						<!-- <ul
						class="flex text-3xl md:text-base items-center py-3 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20"
					>
						<li
							class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-300 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10"
						>
							<a href="javascript: void(0)">Features</a>
						</li>
	
						<li
							class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-300 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10"
						>
							<a href="javascript: void(0)">Contact</a>
						</li>
					</ul> -->
					</div>
				</div>
			</div>
		</nav>
		<section class="bg-gray-100 min-h-screen  pb-20">
			<div class=" sm:block lg:flex px-6 justify-center pt-3">
				<div class="space-y-6">
					<Card size="lg">
						<div class="flex text-lg justify-between">
							<div class="flex  self-center">
								<p>Order summary</p>
							</div>
							<div>
								<Button on:click={() => (moreDetailModal = true)} size="xs" color="dark"
									>View Details <span class="ml-2"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											height="18"
											viewBox="0 96 960 960"
											width="18"
											><path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" /></svg
										></span
									></Button
								>
							</div>
						</div>
						<Hr class="my-4" />
						<div class="flex text-xl justify-between">
							<h6>TOTAL TO PAY</h6>
							<h6>KES: {$page.data.transactionRequest?.amount}</h6>
						</div>
					</Card>
					<div class="flex text-lg justify-between">
						<p>Choose a payment method</p>
					</div>
					<Card size="lg">
						<div class="space-y-5">
							<Radio value="mobile_money" bind:group={paymethod}>Mobile money</Radio>
							{#if paymethod === 'mobile_money'}
								<div class="space-y-4">
									<Label>
										<span>Select your operator</span>
										<Select
											items={[
												{ name: 'Airtel', value: 'airtel' },
												{ name: 'M-Pesa', value: 'mpesa' }
											]}
										/>
									</Label>
									<div class="grid gap-3 grid-cols-3">
										<div class="col-span-1">
											<Input disabled placeholder="+254" />
										</div>
										<div class="col-span-2">
											<Input placeholder="Phone number" />
										</div>
									</div>
								</div>
							{/if}
						</div>
					</Card>
					<Card size="lg">
						<Radio value="bank_cards" bind:group={paymethod}>Bank Cards</Radio>
						{#if paymethod === 'bank_cards'}
							<!-- component -->
							<!-- Tailwind CSS Playground : https://play.tailwindcss.com/KbKtNzkOBy -->

							<form class="flex flex-wrap gap-3 w-full p-5">
								<label class="relative w-full flex flex-col">
									<span class="font-bold mb-3">Card number</span>
									<input
										class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
										type="text"
										name="card_number"
										placeholder="0000 0000 0000"
									/>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
										/>
									</svg>
								</label>

								<label class="relative flex-1 flex flex-col">
									<span class="font-bold mb-3">Expire date</span>
									<input
										class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
										type="text"
										name="expire_date"
										placeholder="MM/YY"
									/>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</label>

								<label class="relative flex-1 flex flex-col">
									<span class="font-bold flex items-center gap-3 mb-3">
										CVC/CVV
										<span class="relative group">
											<span
												class="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white"
											>
												Hey ceci est une infobulle !</span
											>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
										</span>
									</span>
									<input
										class="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
										type="text"
										name="card_cvc"
										placeholder="&bull;&bull;&bull;"
									/>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</label>
							</form>
						{/if}
					</Card>
					<Card size="lg">
						<Radio value="flexi" bind:group={paymethod}>Flexi</Radio>
						{#if paymethod === 'flexi'}
							<Heading class="my-2" tag="h5">Select installments (Monthly)</Heading>
							<Alert accent>
								Once approved for flexi, you will receive a link via sms/email to complete your
								purchase
							</Alert>
							<div class="grid grid-cols-3 w-full gap-4 flex-wrap   py-4 px-6">
								<button type="button" on:click={() => (selectedFlexi = 3)}>
									<div
										class="max-w-xs  flex {selectedFlexi === 3
											? 'bg-blue-400 border border-blue-600 text-white font-extrabold'
											: 'border border-gray-400 '} flex-col justify-between bg-white dark:bg-gray-800 rounded-lg mb-6 py-5 px-4"
									>
										<div>
											<h4
												class="focus:outline-none text-gray-800 dark:text-gray-100 font-bold mb-3"
											>
												3
											</h4>
											<p class="text-xs">
												KES {Math.round(($page.data.transactionRequest?.amount / 3) * 100) / 100} PM
											</p>
										</div>
									</div>
								</button>
								<button type="button" on:click={() => (selectedFlexi = 6)}>
									<div
										class="max-w-xs {selectedFlexi === 6
											? 'bg-blue-400 border border-blue-600 text-white font-extrabold'
											: 'border border-gray-400 '}   justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4"
									>
										<div>
											<h4
												class="focus:outline-none text-gray-800 dark:text-gray-100 font-bold mb-3"
											>
												6
											</h4>
											<p class="text-xs">
												KES {Math.round(($page.data.transactionRequest?.amount / 6) * 100) / 100} PM
											</p>
										</div>
									</div>
								</button>
								<button type="button" on:click={() => (selectedFlexi = 12)}>
									<div
										class="max-w-xs {selectedFlexi === 12
											? 'bg-blue-400 border border-blue-600 text-white font-extrabold'
											: 'border border-gray-400 '}  flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4"
									>
										<div>
											<h4
												class="focus:outline-none text-gray-800 dark:text-gray-100 font-bold mb-3"
											>
												12
											</h4>
											<p class="text-xs">
												KES {Math.round(($page.data.transactionRequest?.amount / 12) * 100) / 100} PM
											</p>
										</div>
									</div>
								</button>
								<button type="button" on:click={() => (selectedFlexi = 18)}>
									<div
										class="max-w-xs {selectedFlexi === 18
											? 'bg-blue-400 border border-blue-600 text-white font-extrabold'
											: 'border border-gray-400 '}  flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4"
									>
										<div>
											<h4
												class="focus:outline-none text-gray-800 dark:text-gray-100 font-bold mb-3"
											>
												18
											</h4>
											<p class="text-xs">
												KES {Math.round(($page.data.transactionRequest?.amount / 18) * 100) / 100} PM
											</p>
										</div>
									</div>
								</button>
								<button type="button" on:click={() => (selectedFlexi = 24)}>
									<div
										class="max-w-xs {selectedFlexi === 24
											? 'bg-blue-400 border border-blue-600 text-white font-extrabold'
											: 'border border-gray-400 '}  flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4"
									>
										<div>
											<h4
												class="focus:outline-none text-gray-800 dark:text-gray-100 font-bold mb-3"
											>
												24
											</h4>
											<p class="text-xs">
												KES {Math.round(($page.data.transactionRequest?.amount / 24) * 100) / 100} PM
											</p>
										</div>
									</div>
								</button>
								<button type="button" on:click={() => (selectedFlexi = 36)}>
									<div
										class="max-w-xs {selectedFlexi === 36
											? 'bg-blue-400 border border-blue-600 text-white font-extrabold'
											: 'border border-gray-400 '}  flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4"
									>
										<div>
											<h4
												class="focus:outline-none text-gray-800 dark:text-gray-100 font-bold mb-3"
											>
												36
											</h4>
											<p class="text-xs">
												KES {Math.round(($page.data.transactionRequest?.amount / 36) * 100) / 100} PM
											</p>
										</div>
									</div>
								</button>
							</div>
						{/if}
					</Card>
					<Button type="submit" disabled={loading} class="w-full flex gap-3">
						{#if loading} <Spinner /> {/if} Pay now KES: {$page.data.transactionRequest
							?.amount}</Button
					>
					<hr />
					<div>
						<span class="font-bold"> Please note: </span>
						Dreamfeel Pay will never ask you for your password, PIN, CVV or full card details over the
						phone or via email. Need help? <A>Contact us</A>
					</div>
				</div>
			</div>
		</section>
	{/if}
</form>

{#if !isActive}
	<div class="bg-gray-100 min-h-screen dark:bg-black">
		<div class="container mx-auto flex flex-col items-center  pt-12  py-24">
			<div class="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
				<img
					width="200"
					src={'https://res.cloudinary.com/dreamnerd/image/upload/v1686721359/feel-pay_yrvuwi.png'}
					alt=""
				/>
				<h1
					class="text-2xl sm:text-3xl md:text-4xl -mt-6 lg:text-5xl xl:text-6xl text-center text-gray-800 dark:text-white font-black leading-7 md:leading-10"
				>
					The Power to
					<span class="text-yellow-500">accept online payments</span>
					for any of your digital solutions
				</h1>
				<p
					class="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg"
				>
					Easiest way to accept and manage payments on orders on your digital platforms.
				</p>

				<p class="text-gray-400 mt-3">No npm install, no backend required</p>
			</div>
			<div class="flex justify-center items-center">
				<a
					href="{$page.url.origin}/quick-start"
					class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 bg-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-blue-700 py-2 sm:py-4 text-sm"
					>Get Started</a
				>
				<!-- <a
					class="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 bg-transparent transition duration-150 ease-in-out hover:border-blue-600 lg:text-xl lg:font-bold  hover:text-blue-600 rounded border border-blue-700 text-blue-700 px-4 sm:px-10 py-2 sm:py-4 text-sm"
					>Learn more</a
				> -->
			</div>
		</div>
		<footer style="backdrop-filter:blur(30px)" class="p-4 md:p-8 lg:p-10   dark:bg-black">
			<div class="mx-auto max-w-screen-xl text-center">
				<a
					href="https://dreamfeel.me"
					class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<div class="text-center">
						<div class="flex justify-center">
							<img src={dreamfeelPayLOgo} loading="lazy" width="40%" alt="" />
						</div>
					</div>
				</a>

				<p class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
					Chandaria BIIC-Kenyatta University
				</p>

				<!-- <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
					<li>
						<a href="/" class="mr-4 hover:underline md:mr-6 ">About</a>
					</li>
					<li>
						<a href="/" class="mr-4 hover:underline md:mr-6">Premium</a>
					</li>
					<li>
						<a href="/" class="mr-4 hover:underline md:mr-6 ">Campaigns</a>
					</li>
					<li>
						<a href="/" class="mr-4 hover:underline md:mr-6">Blog</a>
					</li>
					<li>
						<a href="/" class="mr-4 hover:underline md:mr-6">Affiliate Program</a>
					</li>
					<li>
						<a href="/" class="mr-4 hover:underline md:mr-6">FAQs</a>
					</li>
					<li>
						<a href="/" class="mr-4 hover:underline md:mr-6">Contact</a>
					</li>
				</ul> -->
				<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
					>© {new Date().getFullYear()} <a href="/" class="hover:underline">Dreamfeel Spaces</a>.
					All Rights Reserved.</span
				>
			</div>
		</footer>
	</div>
{/if}
