<script lang="ts">
	import { Button, Card, Heading, Input, Modal, Alert } from 'flowbite-svelte';
	import { page } from '$app/stores';
	let walletOPen = false;
	export let form;
</script>

<form method="post">
	<Modal bind:open={walletOPen} class="w-full">
		<Heading slot="header" tag="h6">Create Wallet</Heading>
		<Input name="name" required placeholder="Wallet name" />
		<Button type="submit" slot="footer">Save</Button>
	</Modal>
</form>

<section class="container">
	<Card size="xl">
		<div class="min-h-100">
			<div class="flex ">
				<Heading class="flex-1"  tag="h4">Wallets</Heading>
				<Button on:click={() => (walletOPen = true)}>Create Wallet</Button>
			</div>

			{#if form?.success}
				<Alert accent dismissable class="my-5">Wallet created!</Alert>
			{/if}
			{#if !$page.data.wallets.length}
				<div class="text-center min-h-100 flex justify-center items-center">
					<div class="text-center space-y-6">
						<Heading tag="h5">No Wallet has been created</Heading>
						<Button on:click={() => (walletOPen = true)}>Create Wallet</Button>
					</div>
				</div>
			{/if}
			<div class="flex gap-4">
				{#each $page.data.wallets as wallet}
					<a href="/a/{$page.data.space.appId}/wallets/{wallet.id}" class="flex z-20 items-center">
						<div class="space-y-2">
							<div
								class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110"
							>
								<!-- svelte-ignore a11y-missing-attribute -->
								<img
									class="relative object-cover w-full h-full rounded-xl"
									src="https://i.imgur.com/kGkSg1v.png"
								/>

								<div class="w-full px-8 absolute top-8">
									<div class="flex justify-between">
										<div class="">
											<p class="font-light">Name</p>
											<p class="font-medium tracking-widest">{wallet.name}</p>
										</div>
										<!-- svelte-ignore a11y-missing-attribute -->
										<img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
									</div>
									<div class="pt-1">
										<p class="font-light">Wallet ID</p>
										<p class="font-medium tracking-more-wider">{wallet.id}</p>
									</div>
									<div class="pt-6 pr-6">
										<div class="flex justify-between">
											<div class="">
												<p class="font-light text-xs">Issued</p>
												<p class="font-medium tracking-wider text-sm">
													{new Date(wallet.createdAt).getMonth()}/{new Date(
														wallet.createdAt
													).getFullYear()}
												</p>
											</div>
											<div class="">
												<p class="font-light text-xs text-xs">Expiry</p>
												<p class="font-medium tracking-wider text-sm">-/-</p>
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
					</a>
				{/each}
			</div>
		</div>
	</Card>
</section>
