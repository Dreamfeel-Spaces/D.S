<script>
	import dreamfeelPayLOgo from '$lib/assets/pay-transparent.png';
	import payFav from '$lib/assets/pay-fav.png';
	import { A, Button, Card, Hr, Input, Label, Modal, Radio, Select } from 'flowbite-svelte';
	let moreDetailModal = false;
	let paymethod = 'mobile_money';
</script>

<svelte:head>
	<title>Dreamfeel Pay</title>
	<link rel="icon" href={payFav} />
</svelte:head>

<Modal bind:open={moreDetailModal} class="w-full">
	<h6 class="text-lg" slot="header">Order details</h6>
	<div slot="footer" class="flex justify-between">
		<div>TOTAL TO PAY</div>
		<div>KES: 3000</div>
	</div>
</Modal>

<section class="bg-gray-100 min-h-screen pb-20">
	<nav class="bg-white border-gray-200 dark:bg-gray-900">
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<span class="flex items-center">
				<img loading="lazy" src={dreamfeelPayLOgo} class=" h-8 mr-3" alt="Flowbite Logo" />
			</span>
		</div>
	</nav>
	<div class="flex justify-center pt-3">
		<div class="max-w-lg space-y-7 w-1/2">
			<Card size="xl">
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
									width="18"><path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" /></svg
								></span
							></Button
						>
					</div>
				</div>
				<Hr class="my-4" />
				<div class="flex text-xl justify-between">
					<h6>TOTAL TO PAY</h6>
					<h6>KES: 3000</h6>
				</div>
			</Card>
			<div class="flex text-lg justify-between">
				<p>Choose a payment method</p>
			</div>
			<Card size="xl">
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
			<Card size="xl">
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
			<Card size="xl">
				<Radio disabled value="flexi" bind:group={paymethod}>Flexi</Radio>
			</Card>
			<Button class="w-full">Pay now KES: 3000</Button>
			<hr />
			<div>
				<span class="font-bold"> Please note: </span>
				Dreamfeel Pay will never ask you for your password, PIN, CVV or full card details over the phone
				or via email. Need help? <A>Contact us</A>
			</div>
		</div>
	</div>
</section>
