<script>
	//@ts-nocheck
	import {
		Button,
		Card,
		Heading,
		Hr,
		Label,
		Modal,
		Select,
		Checkbox,
		Input,
		Alert,
		Toggle
	} from 'flowbite-svelte';
	let hidden = true;
	let addEnv = 'sandbox';
	let payModalOpen = false;
	let simOpen = false;
	export let form;
	import { page } from '$app/stores';
	import PayBtn from '$lib/cbd/pay/PayBtn.svelte';
	let secrets = $page.data.secrets;
	let viewEnv = 'sandbox';
	let checkoutPrice = 1;
	let checkoutPlan = 'Nyati';
</script>

<Modal bind:open={simOpen} class="w-full space-y-3">
	<div slot="header" class="text-lg">Simulate</div>
	<Label>
		Amount
		<Input bind:value={checkoutPrice} required />
	</Label>
	<Label>
		Plan
		<Input bind:value={checkoutPlan} required />
	</Label>
	<div class="text-center text-3xl">Checkout with</div>
	<PayBtn {checkoutPrice} {checkoutPlan} />
</Modal>

<form method="post">
	<Modal bind:open={payModalOpen} class="w-full space-y-3">
		<div slot="header" class="text-lg">Generate Credentials</div>
		<Label>
			Name
			<Input name="name" required />
		</Label>
		<Label>
			Environment
			<Select
				name="env"
				bind:value={addEnv}
				items={[
					{ name: 'Live', value: 'live' },
					{ name: 'Sandbox', value: 'sandbox' }
				]}
			/>
		</Label>
		<div slot="footer">
			<Button type="submit">Generate</Button>
		</div>
	</Modal>
</form>
<Card class="w-full" size="xl">
	<div class="h-100">
		{#if form?.success}
			<div class="my-3">
				<Alert dismissable accent>Nice, Credentials have been saved!</Alert>
			</div>
		{/if}
		<div class="flex justify-between">
			<div>
				<Heading tag="h6">Dreamfeel Pay</Heading>
			</div>

			<div class="flex gap-3">
				<Button on:click={() => (simOpen = true)}>Simulate</Button>
				<Button on:click={() => (payModalOpen = true)}>Add credentials</Button>
			</div>
		</div>
		<Hr />
		<div class="space-y-36">
			<div class="w-max-md  mt-4">
				<Label>
					Environment
					<Select
						bind:value={viewEnv}
						items={[
							{ name: 'Live', value: 'live' },
							{ name: 'Sandbox', value: 'sandbox' }
						]}
					/>
				</Label>
			</div>
		</div>
		<Heading tag="h6" class="mt-9">Credentials</Heading>
		<div class="relative overflow-x-auto mt-4">
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="px-6 py-3"> Name </th>
						<th scope="col" class="px-6 py-3"> Consumer key </th>
						<th scope="col" class="px-6 py-3"> Consumer secret </th>
						<th scope="col" class="px-6 py-3"> Hidden </th>
					</tr>
				</thead>
				<tbody>
					{#each secrets?.filter((v) => v.env === viewEnv) as secret}
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								{secret.name}
							</th>
							<td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								{#if secret.hidden}
									••••••••••
								{:else}
									{secret.key}
								{/if}
							</td>
							<td class="px-6 py-4">
								{#if secret.hidden}
									••••••••••
								{:else}
									{secret.secret}
								{/if}
							</td>
							<td class="px-6 py-4">
								<Toggle bind:value={secret.hidden} bind:checked={secret.hidden} />
								<!-- {#if secret.hidden}
									<button on:click={() => (secret = { ...secret, hidden: false })}>
										<svg
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
											height="24"
											viewBox="0 96 960 960"
											width="24"
											><path
												d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"
											/></svg
										>
									</button>
								{:else}
									<button on:click={() => (secret = { ...secret, hidden: true })}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="24"
											fill="currentColor"
											viewBox="0 96 960 960"
											width="24"
											><path
												d="m629 637-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650 556q0 22-5.5 43.5T629 637Zm129 129-40-40q49-36 85.5-80.5T857 556q-50-111-150-175.5T490 316q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485 256q143 0 261.5 81.5T920 556q-26 64-67 117t-95 93Zm58 226L648 827q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40 556q20-52 55.5-101.5T182 360L56 234l42-43 757 757-39 44ZM223 402q-37 27-71.5 71T102 556q51 111 153.5 175.5T488 796q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z"
											/></svg
										></button
									>
								{/if} -->
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if !secrets?.filter((v) => v.env === viewEnv).length}
				<div class="text-center mt-5 ">
					<p class="text-lg">No payment credentials have been added to Dreamfeel Pay</p>
				</div>
			{/if}
		</div>
	</div>
</Card>
