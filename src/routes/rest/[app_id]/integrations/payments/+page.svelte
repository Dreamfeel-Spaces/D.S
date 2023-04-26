<script lang="ts">
	import { Card, Hr, Modal, Button, Select, Input } from 'flowbite-svelte';
	let modalOpen = true;
	let paymentType = '';
</script>

<Modal class="w-full" bind:open={modalOpen}>
	<h5 class="text-lg" slot="header">Add payment providers</h5>
	<div class="mt-4">
		<Select
			bind:value={paymentType}
			items={[
				{ name: 'Safaricom MPESA', value: '' },
				{ name: 'Safaricom MPESA', value: '' },
				{ name: 'Safaricom MPESA', value: '' },
				{ name: 'Safaricom MPESA', value: '' }
			]}
		/>
	</div>
</Modal>

<div class="container">
	<Card size="xl">
		<div class="h-100">
			<div class="flex">
				<h6 class="text-xl flex-1 ">Payment providers</h6>
				<Button
					on:click={() => {
						modalOpen = true;
					}}>Add Providers</Button
				>
			</div>
			<Hr />
			<div class="h-72 flex justify-center">
				<p>No payment providers have been added to this space</p>
			</div>
		</div>
	</Card>
</div>
