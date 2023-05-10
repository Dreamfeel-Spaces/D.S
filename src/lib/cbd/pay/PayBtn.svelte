<script>
	import { browser } from '$app/environment';
	import { Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let loading = false;

	onMount(() => {
		loading = true;
		if (browser) {
			setTimeout(() => {
				initDreamfeelPay({
					CLIENT_ID: 'Your client ID',
					CLIENT_SECRET: 'Your client secret'
				}).then((dPay) => {
					dPay.Buttons();
					dPay.onApprove(() => console.log('hehe'));
					dPay.createOrder({ items: [], amount: [] });
					dPay.renderBtn('#dreamfeel-pay-button');
				});
				loading = false;
			}, 2000);
		}
	});
</script>

<svelte:head>
	<script defer src="https://cdn.dreamfeel.me/packages/pay_js/0.0.1"></script>
</svelte:head>

{#if loading}
	<div class="flex justify-center">
		<Spinner />
	</div>
{/if}
<div class="flex justify-center">
	<div class="bg-white rounded-xl w-72 flex justify-center" id="dreamfeel-pay-button" />
</div>

<style>
	#dreamfeel-pay-button {
		margin: 30px 0;
		padding: 2px;
	}
</style>
