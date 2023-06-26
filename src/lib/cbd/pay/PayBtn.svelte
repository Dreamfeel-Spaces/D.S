<script lang="ts">
	import { browser } from '$app/environment';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { initDreamfeelPay } from './script';

	export let checkoutPlan: string;
	export let checkoutPrice: number = 1;

	let items: any = [
		{
			itemId: checkoutPlan,
			name: checkoutPlan,
			pricePerItem: checkoutPrice,
			deliveryStatus: 'pending',
			delivered: new Date()
		}
	];

	let loading = false;

	onMount(() => {
		loading = true;
		if (browser) {
			setTimeout(() => {
				initDreamfeelPay	({
					CLIENT_ID: 'sENfiAPqCybl6LRNg6tUVNvDaLHtPEpr',
					CLIENT_SECRET: 'bdc91ac48177dd7321ad8daff76e8f46f8c5a0adbd407276d30b0169f9d43fbe'
				}).then(async (dPay) => {
					console.log(dPay);
					dPay.Buttons().onApprove(() => console.log('hehe'));
					const identifier = await dPay.createOrder({ items, amount: checkoutPrice });
					dPay.renderBtn('#dreamfeel-pay-button', identifier);
				});
				loading = false;
			}, 100);
		}
	});
</script>

<svelte:head>
	<!-- <script defer src="script.js"></script> -->
	<!-- <script defer src="https://cdn.dreamfeel.me/packages/pay_js/0.0.1"></script> -->
</svelte:head>

{#if loading}
	<div class="flex justify-center">
		<Spinner />
	</div>
{/if}
<div class="flex justify-center">
	<div class="bg-white rounded w-72 flex justify-center" id="dreamfeel-pay-button" />
</div>

<style>
	#dreamfeel-pay-button {
		margin: 30px 0;
		padding: 2px;
	}
</style>
