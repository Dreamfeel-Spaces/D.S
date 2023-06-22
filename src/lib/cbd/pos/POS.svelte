<script lang="ts">
	//@ts-nocheck

	import posLogo from '$lib/assets/pos-transparent.png';
	import {} from "flowbite-svelte"

	let firstTime = true;
	let receiptModal = false;

	function closeFirstTimeModal() {
		firstTime = false;
	}

	import { products } from './sample.json';
	import './style.css';

	import beepSoundFile from './sound/beep.mp3';
	import clearSoundFile from './sound/button.mp3';

	function playSound(src) {
		const sound = new Audio();
		sound.src = src;
		sound.play();
		// sound.onended = () => delete sound;
	}

	function beep() {
		playSound(beepSoundFile);
	}

	function clear() {
		playSound(clearSoundFile);
	}

	let cart = {};
	function addToCart(item) {
		if (cart[item.id])
			cart = { ...cart, [item.id]: { ...item, cart_qty: (cart[item.id].cart_qty ?? 0) + 1 } };
		else cart = { ...cart, [item.id]: { ...item, cart_qty: 1 } };
		updateChange();
		beep();
	}

	function clearCart() {
		cart = {};
		updateChange();
		clear();
	}

	function incCartQty(item) {
		cart = { ...cart, [item.id]: { ...item, cart_qty: (cart[item.id].cart_qty ?? 0) + 1 } };
		updateChange();
		beep();
	}

	function decCartQty(item) {
		let qty = cart[item.id].cart_qty;
		if (qty === 1) {
			let clone = { ...cart };
			delete clone[item.id];
			cart = clone;
		} else {
			cart = { ...cart, [item.id]: { ...item, cart_qty: (cart[item.id].cart_qty ?? 0) - 1 } };
		}
		if (Object.keys(cart).length === 0) {
			clear();
		} else {
			beep();
		}
		updateChange();
	}

	function numberFormat(number) {
		return (number || '')
			.toString()
			.replace(/^0|\./g, '')
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
	}

	function priceFormat(number) {
		return number ? `KES. ${numberFormat(number)}` : `KES. 0`;
	}

	let totalAmount = 0;
	let change = 0;

	function updateChange() {
		let total = getTotalPrice();
		change = totalAmount - total;
	}

	function addCash(cash) {
		totalAmount = totalAmount + cash;
		updateChange();
		beep();
	}

	function getTotalPrice() {
		let amnt = Object.keys(cart).reduce((prev, curr) => {
			return prev + cart[curr].cart_qty * cart[curr].price;
		}, 0);
		return amnt;
	}

	function updateCash(value) {
		totalAmount = parseFloat(value.replace(/[^0-9]+/g, ''));
	}

	import { page } from '$app/stores';

	let receiptDate = '';
	let receiptNo = '';

	function handleSubmit() {
		receiptModal = true;
		const time = new Date();
		receiptNo = `${$page.data.space?.name}-${Math.round(time.getTime() / 1000)}`;
		receiptDate = dateFormat(time);
	}

	function dateFormat(date) {
		const formatter = new Intl.DateTimeFormat('id', { dateStyle: 'short', timeStyle: 'short' });
		return formatter.format(date);
	}

	function printAndProceed() {
		const receiptContent = document.getElementById('receipt-content');
		const titleBefore = document.title;
		const printArea = document.getElementById('print-area');

		printArea.innerHTML = receiptContent.innerHTML;
		document.title = receiptNo;

		window.print();
		receiptModal = false;

		printArea.innerHTML = '';
		document.title = titleBefore;
		clearEr();
	}

	function clearEr() {
		totalAmount = 0;
		cart = {};
		receiptNo = null;
		receiptDate = null;
		updateChange();
		clear();
	}

	let searchTerm = '';

	function filteredProducts() {
		const rg = searchTerm ? new RegExp(searchTerm, 'gi') : null;
		return products.filter((p) => !rg || p.name.match(rg));
	}

</script>

<svelte:head>
	<title>
		{$page.data.space?.name ?? 'Dreamfeel'} - POS
	</title>
</svelte:head>

<div class="bg-blue-gray-50" x-data="initApp()" x-init="initDatabase()">
	<!-- noprint-area -->
	<div class="hide-print flex flex-row h-screen antialiased text-black-gray-800">
		<!-- left sidebar -->
		<div class="hidden  md:flex flex-row w-auto flex-shrink-0 pl-4 pr-2 py-4">
			<div class="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-gray-200 rounded-3xl">
				<a
					href={$page.data.space ? `/a/${$page.data.space?.appId}` : '/'}
					rel="external"
					class="flex items-center justify-center h-12 w-12 text-black-700 rounded-full"
				>
					<img width="180" src={posLogo} loading="lazy" alt="" />
				</a>
				<ul class="flex flex-col space-y-2 mt-12">
					<li>
						<a href="?" class="flex items-center">
							<span
								class="flex items-center justify-center h-12 w-12 rounded-2xl"
								x-bind:class={`{
                  'hover:bg-cyan-400 text-black-100': activeMenu !== 'pos',
                  'bg-cyan-300 shadow-lg text-white': activeMenu === 'pos',
                }`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
									/>
								</svg>
							</span>
						</a>
					</li>
					<li>
						<a href="?" class="flex items-center">
							<span
								class="flex items-center justify-center text-black-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
									/>
								</svg>
							</span>
						</a>
					</li>
					<li>
						<a href="?" class="flex items-center">
							<span
								class="flex items-center justify-center text-black-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
									/>
								</svg>
							</span>
						</a>
					</li>
					<li>
						<a href="?" class="flex items-center">
							<span
								class="flex items-center justify-center text-black-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl"
							>
								<svg
									class="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</span>
						</a>
					</li>
				</ul>
				<a
					href="https://dreamfeel.me"
					target="blank"
					class="mt-auto flex items-center justify-center text-black-200 hover:text-black-100 h-10 w-10 focus:outline-none"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</a>
			</div>
		</div>

		<!-- page content -->
		<div class="flex-grow lg:flex">
			<!-- store menu -->
			<div class="flex flex-col bg-blue-gray-50 lg:h-full w-full py-4">
				<div class="flex px-2 flex-row relative">
					<div class="absolute left-5 top-3 px-2 py-2 rounded-full bg-gray-300 text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<input
						type="search"
						class="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none"
						placeholder="Search items ..."
						bind:value={searchTerm}
						x-model="keyword"
					/>
					<div
						class="absolute  lg:hidden right-5 top-3 px-2 py-2 rounded-full bg-gray-300 text-white"
					>
						<svg
							class="dark:text-yellow-100"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 96 960 960"
							width="24"
						>
							<path d="M120 816v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
						</svg>
					</div>
				</div>
				<div class="h-full overflow-hidden mt-4">
					<div class="h-full overflow-y-auto px-2">
						<!-- <div
							class="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25"
							x-show="products.length === 0"
						>
							<div class="w-full text-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-24 w-24 inline-block"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
									/>
								</svg>
								<p class="text-xl">
									YOU DON'T HAVE
									<br />
									ANY PRODUCTS TO SHOW
								</p>
							</div>
						</div> -->
						<!-- <div
							class="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25"
							x-show="filteredProducts().length === 0 && keyword.length > 0"
						>
							<div class="w-full text-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-24 w-24 inline-block"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
								<p class="text-xl">
									EMPTY SEARCH RESULT
									<br />
									"<span x-text="keyword" class="font-semibold" />"
								</p>
							</div>
						</div> -->
						<div class="grid grid-cols-2 lg:grid-cols-4 gap-1  lg:gap-4 pb-3">
							{#each searchTerm ? filteredProducts() : products as product}
								<div class="w-full">
									<button
										class="select-none w-full cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg"
										:title="product.name"
										on:click={() => addToCart(product)}
									>
										<img src={product.image} alt={product.name} loading="lazy" />
										<div class="flex pb-3 px-3 text-sm -mt-3">
											<p class="flex-grow truncate mr-1">
												{product.name}
											</p>
											<p class="nowrap font-semibold">
												{priceFormat(product.price)}
											</p>
										</div>
									</button>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
			<!-- end of store menu -->

			<!-- right sidebar -->
			<div class="lg:w-5/12 lg:flex lg:flex-col bg-blue-gray-50 lg:h-full bg-white pr-4 pl-2 py-4">
				<div class="bg-white rounded-3xl flex flex-col h-full shadow">
					<!-- empty cart -->

					{#if Object.keys(cart)?.length === 0}
						<div
							x-show="cart.length === 0"
							class="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-16 inline-block"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							<p>CART EMPTY</p>
						</div>
					{/if}
					<!-- cart items -->
					{#if Object.keys(cart)?.length}
						<div x-show="cart.length > 0" class="flex-1 flex flex-col overflow-auto">
							<div class="h-16 text-center flex justify-center">
								<div class="pl-8 text-left text-lg py-4 relative">
									<!-- cart icon -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 inline-block"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<div
										x-show="getItemsCount() > 0"
										class="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3"
									>
										{Object.keys(cart).length}
									</div>
								</div>
								<div class="flex-grow px-8 text-right text-lg py-4 relative">
									<!-- trash button -->
									<button
										on:click={clearCart}
										class="text-black-gray-300 hover:text-pink-500 focus:outline-none"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 inline-block"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							</div>

							<div class="flex-1 w-full px-4 overflow-auto">
								{#each Object.keys(cart).map((id) => ({ ...cart[id] })) as product}
									<div x-for="item in cart" :key="item.productId">
										<div
											class="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-black-gray-700 py-2 px-2 flex justify-center"
										>
											<img
												loading="lazy"
												src={product.image}
												alt=""
												class="rounded-lg h-10 w-10 bg-white shadow mr-2"
											/>
											<div class="flex-grow">
												<h5 class="text-sm" x-text="item.name">
													{product.name}
												</h5>
												<p class="text-xs block" x-text="priceFormat(item.price)">
													{priceFormat(product.price)}
												</p>
											</div>
											<div class="py-1">
												<div class="w-28 grid grid-cols-3 gap-2 ml-2">
													<button
														on:click={() => decCartQty(product)}
														x-on:click="addQty(item, -1)"
														class="rounded-lg text-center py-1 text-white bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															class="h-6 w-3 inline-block"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M20 12H4"
															/>
														</svg>
													</button>
													<input
														value={product.cart_qty}
														type="text"
														class="bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm"
													/>
													<button
														on:click={() => incCartQty(product)}
														x-on:click="addQty(item, 1)"
														class="rounded-lg text-center py-1 text-white bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															class="h-6 w-3 inline-block"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M12 6v6m0 0v6m0-6h6m-6 0H6"
															/>
														</svg>
													</button>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
					<!-- end of cart items -->

					<!-- payment info -->
					<div class="select-none h-auto w-full text-center pt-3 pb-4 px-4">
						<div class="flex mb-3 text-lg font-semibold text-black-gray-700">
							<div>TOTAL</div>
							<div class="text-right w-full" x-text="">
								{priceFormat(
									Object.keys(cart).reduce((prev, curr) => {
										return prev + cart[curr].cart_qty * cart[curr].price;
									}, 0)
								)}
							</div>
						</div>
						<div class="mb-3 text-black-gray-700 px-3 pt-2 pb-3 rounded-lg bg-blue-gray-50">
							<div class="flex text-lg font-semibold">
								<div class="flex-grow text-left">CASH</div>
								<div class="flex text-right">
									<div class="mr-2">KES</div>
									<input
										value={numberFormat(totalAmount)}
										on:keyup={(event) => updateCash(event.target.value)}
										type="text"
										class="w-28 text-right bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none"
									/>
								</div>
							</div>
							<hr class="my-2" />
							<div class="grid grid-cols-3 gap-2 mt-2">
								{#each [1000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000] as money}
									<div x-for="money in moneys">
										<button
											on:click={() => addCash(money)}
											class="bg-white rounded-lg shadow hover:shadow-lg focus:outline-none inline-block px-2 py-1 text-sm"
											>+<span>{numberFormat(money)} </span></button
										>
									</div>
								{/each}
							</div>
						</div>
						{#if change > 0}
							<div
								x-show="change > 0"
								class="flex mb-3 text-lg font-semibold bg-cyan-50 text-black-gray-700 rounded-lg py-2 px-3"
							>
								<div class="text-black-800">CHANGE</div>
								<div class="text-right flex-grow text-black-600" x-text="priceFormat(change)">
									{priceFormat(numberFormat(change))}
								</div>
							</div>
						{/if}

						{#if change < 0}
							<div
								x-show="change < 0"
								class="flex mb-3 text-lg font-semibold bg-pink-100 text-black-gray-700 rounded-lg py-2 px-3"
							>
								<div class="text-right flex-grow text-pink-600" x-text="priceFormat(change)">
									{priceFormat(numberFormat(change))}
								</div>
							</div>
						{/if}
						{#if change === 0 && Object.keys(cart)?.length > 0}
							<div
								x-show="change == 0 && cart.length > 0"
								class="flex justify-center mb-3 text-lg font-semibold bg-cyan-50 text-black-700 rounded-lg py-2 px-3"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 inline-block"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
									/>
								</svg>
							</div>
						{/if}
						<button
							class={`text-white ${
								change > 0 ? 'bg-cyan-500' : 'bg-blue-gray-200'
							} rounded-2xl text-lg w-full py-3 focus:outline-none`}
							on:click={handleSubmit}
							disabled={change < 0 && Object.keys(cart).length > 0}
						>
							SUBMIT
						</button>
					</div>
					<!-- end of payment info -->
				</div>
			</div>
			<!-- end of right sidebar -->
		</div>

		<!-- modal first time -->

		<!-- {#if firstTime}
			<div
				class="fixed glass w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24"
			>
				<div class="w-96 rounded-3xl p-8 bg-white shadow-xl">
					<div class="text-center">
						<div class="flex justify-center">
							<img
								width="180"
								src="https://dreamfeel.me/_app/immutable/assets/logo-f130689f.png"
								loading="lazy"
								alt=""
							/>
						</div>
						<h3 class="text-center text-2xl mb-8">Configure POS</h3>
					</div>
					<div class="text-left">
						<button
							on:click={closeFirstTimeModal}
							class="text-left w-full mb-3 rounded-xl bg-blue-gray-500 text-white focus:outline-none bg-gray-500 hover:bg-cyan-400 px-4 py-4"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 inline-block -mt-1 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
								/>
							</svg>
							Use existing collection
						</button>
						<button
							on:click={closeFirstTimeModal}
							x-on:click="startBlank()"
							class="text-left w-full mb-3 bg-gray-500 rounded-xl bg-blue-gray-500 text-white focus:outline-none hover:bg-teal-400 px-4 py-4"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 inline-block -mt-1 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
								/>
							</svg>
							USE SAMPLE DATA
						</button>
						<button
							on:click={closeFirstTimeModal}
							x-on:click="startBlank()"
							class="text-left w-full bg-gray-500 rounded-xl bg-blue-gray-500 text-white focus:outline-none hover:bg-teal-400 px-4 py-4"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 inline-block -mt-1 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
								/>
							</svg>
							LEAVE IT EMPTY
						</button>
					</div>
				</div>
			</div>
		{/if} -->

		<!-- modal receipt -->

		{#if receiptModal}
			<div
				x-show="isShowModalReceipt"
				class="fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24"
			>
				<div
					x-show="isShowModalReceipt"
					class="fixed glass w-full h-screen left-0 top-0 z-0"
					x-on:click="closeModalReceipt()"
					x-transition:enter="transition ease-out duration-100"
					x-transition:enter-start="opacity-0"
					x-transition:enter-end="opacity-100"
					x-transition:leave="transition ease-in duration-100"
					x-transition:leave-start="opacity-100"
					x-transition:leave-end="opacity-0"
				/>
				<div
					x-show="isShowModalReceipt"
					class="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10"
					x-transition:enter="transition ease-out duration-100"
					x-transition:enter-start="opacity-0 transform scale-90"
					x-transition:enter-end="opacity-100 transform scale-100"
					x-transition:leave="transition ease-in duration-100"
					x-transition:leave-start="opacity-100 transform scale-100"
					x-transition:leave-end="opacity-0 transform scale-90"
				>
					<div id="receipt-content" class="text-left w-full text-sm p-6 overflow-auto">
						<div class="text-center">
							<img
								src="https://dreamfeel.me/_app/immutable/assets/logo-f130689f.png"
								loading="lazy"
								alt="Tailwind POS"
								width="200"
								class="mb-3 w-8 inline-block"
							/>
							<h2 class="text-xl font-semibold">{$page.data?.space?.name ?? "DEMO"}</h2>
							<p>Dreamfeel Spaces</p>
						</div>
						<div class="flex mt-4 text-xs">
							<div class="flex-grow">
								No: <span x-text="receiptNo">
									{receiptNo}
								</span>
							</div>
							<div x-text="receiptDate">
								{receiptDate}
							</div>
						</div>
						<hr class="my-2" />
						<div>
							<table class="w-full text-xs">
								<thead>
									<tr>
										<th class="py-1 w-1/12 text-center">#</th>
										<th class="py-1 text-left">Item</th>
										<th class="py-1 w-2/12 text-center">Qty</th>
										<th class="py-1 w-3/12 text-right">Subtotal</th>
									</tr>
								</thead>
								<tbody>
									{#each Object.keys(cart).map((id) => ({ ...cart[id] })) as product, index}
										<tr>
											<td class="py-2 text-center" x-text="index+1">
												{index + 1}
											</td>
											<td class="py-2 text-left">
												<span x-text="item.name">{product.name}</span>
												<br />
												<small x-text="priceFormat(item.price)">
													{priceFormat(product.price)}
												</small>
											</td>
											<td class="py-2 text-center" x-text="item.qty">
												{product.cart_qty}
											</td>
											<td class="py-2 text-right" x-text="priceFormat(item.qty * item.price)">
												{priceFormat(product.cart_qty * product.price)}
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
						<hr class="my-2" />
						<div>
							<div class="flex font-semibold">
								<div class="flex-grow">TOTAL</div>
								<div x-text="priceFormat(getTotalPrice())">
									{priceFormat(
										Object.keys(cart).reduce((prev, curr) => {
											return prev + cart[curr].cart_qty * cart[curr].price;
										}, 0)
									)}
								</div>
							</div>
							<div class="flex text-xs font-semibold">
								<div class="flex-grow">PAY AMOUNT</div>
								<div x-text="priceFormat(cash)">
									{priceFormat(totalAmount)}
								</div>
							</div>
							<hr class="my-2" />
							<div class="flex text-xs font-semibold">
								<div class="flex-grow">CHANGE</div>
								<div x-text="priceFormat(change)">
									{priceFormat(change)}
								</div>
							</div>
						</div>
					</div>
					<div class="p-4 w-full">
						<button
							class="bg-cyan-500 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none"
							on:click={printAndProceed}>PROCEED</button
						>
						<button
							class="bg-red-500 mt-3 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none"
							on:click={() => (receiptModal = false)}>Cancel</button
						>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<!-- end of noprint-area -->

	<div id="print-area" class="print-area" />
</div>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #cfd8dc;
		border-radius: 5px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #b0bec5;
		border-radius: 5px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #90a4ae;
	}

	.nowrap {
		white-space: nowrap;
	}

	.glass {
		background-color: rgba(100, 120, 130, 0.6);
		backdrop-filter: blur(10px);
	}

	table td {
		vertical-align: top;
	}

	#receipt-content {
		max-height: 70vh;
	}

	@media print {
		.hide-print {
			display: none !important;
		}
		.print-area {
			display: block;
		}
	}
</style>
