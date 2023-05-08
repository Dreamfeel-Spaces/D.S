<script lang="ts">
	//@ts-nocheck
	// import Pos from '$lib/cbd/pos/POS.svelte';
	import { page } from '$app/stores';
	import {
		Button,
		Card,
		Label,
		Modal,
		Select,
		Checkbox,
		Input,
		Radio,
		Alert
	} from 'flowbite-svelte';
	let modalOpen = false;
	let posCollections = $page.data.collections;
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	import { browser } from '$app/environment';
	import { useEffect } from '$lib/wsstore/hooks';
	let selectedCollection = '';
	let taxable = false;
	let quantityTrackable = false;
	let type = 'physical';
	let columns = [];
	useEffect(
		() => {
			if (selectedCollection) {
				let tb = $page.data.space.tables.find((table) => table.id === selectedCollection);
				columns = tb.columns;
			}
		},
		() => [selectedCollection]
	);

	export let form;
</script>

<form method="post">
	<Modal bind:open={modalOpen} class="w-full">
		<h5 slot="header">Add Products/Services</h5>
		<div class="space-y-6">
			<div>
				<p class="text-lg mb-3">Collection</p>
				<Label>
					<span> Select collection </span>
					<Select
						bind:value={selectedCollection}
						items={$page.data.space.tables.map((item) => ({ name: item.name, value: item.id }))}
					/>
				</Label>
			</div>
			{#if selectedCollection}
				<div>
					<p class="text-lg mb-3">Info</p>
					<Label>
						<span>Items title </span>
						<Select
							required
							name="collection"
							items={columns.map((item) => ({ name: item.name, value: item.id }))}
						/>
					</Label>
				</div>
				<div>
					<p class="text-lg mb-3">Media</p>
					<Label>
						<span>Items Media </span>
						<Select
							required
							name="images"
							items={columns.map((item) => ({ name: item.name, value: item.name }))}
						/>
					</Label>
				</div>
				<div>
					<p class="text-lg mb-3">Pricing</p>
					<div class="flex grid-cols-2 gap-3 mb-3">
						<Label class="w-full">
							<span> Price </span>
							<Select
								required
								name="price"
								items={columns.map((item) => ({ name: item.name, value: item.name }))}
							/>
						</Label>
						<Label class="w-full">
							<span> Compare at price </span>
							<Select
								required
								name="compareAtPrice"
								items={columns.map((item) => ({ name: item.name, value: item.name }))}
							/>
						</Label>
					</div>
					<Checkbox bind:value={taxable} bind:checked={taxable}>
						<span> Charge tax on this product </span>
					</Checkbox>
					<hr class="my-2" />
					<div class="flex justify-between">
						<Label>
							<span> Cost per item </span>
							<Input name="costPerItem" required type="number" />
						</Label>
						<div>
							Profit
							<p>0</p>
						</div>
						<div>
							Margin
							<p>0%</p>
						</div>
					</div>
				</div>

				<div class="space-y-4">
					<p class="text-lg mb-3 ">Inventory</p>
					<Checkbox bind:checked={quantityTrackable}>
						<span>Track Quantity </span>
					</Checkbox>
					{#if quantityTrackable}
						<Label>
							<span> Quantity Column </span>
							<Select
								class="mt-2"
								required
								name="quantityColumn"
								items={columns.map((item) => ({ name: item.name, value: item.name }))}
							/>
						</Label>
						<Checkbox name="continueSellingOutOfStock">
							<span> Continue selling even when out of stock </span>
						</Checkbox>
						<Checkbox name="hasBarcode">
							<span>This product has SKU or barcode </span>
						</Checkbox>
						<div class="flex grid-cols-2 gap-3 mb-3">
							<Label class="w-full">
								<span> SKU - Stock keeping unit </span>
								<Select
									name="skuCol"
									class="mt-2"
									items={columns.map((item) => ({ name: item.name, value: item.name }))}
								/>
							</Label>
							<Label class="w-full">
								<span> Barcode </span>
								<Select
									name="barcodeCol"
									class="mt-2"
									items={columns.map((item) => ({ name: item.name, value: item.name }))}
								/>
							</Label>
						</div>
					{/if}
				</div>

				<div class="space-y-4">
					<p class="text-lg mb-3 ">Shipping</p>
					<input type="hidden" name="type" value={type} />
					<div>
						<Radio value="physical" bind:group={type}>Physical product</Radio>
					</div>
					<div>
						<Radio value="service" bind:group={type}>Digital product or service</Radio>
					</div>
				</div>
			{/if}
		</div>
		<div slot="footer">
			<Button type="submit">Save</Button>
		</div>
	</Modal>
</form>
<Card size="xl">
	<div class="min-h-100 h-100">
		<div class="flex gap-3 justify-between text-lg">
			<div class="flex-1">POS Settings</div>
			<Button size="xs" target="blank" href="{$page.url.protocol}//pos.{$page.url.host}"
				>Open POS <span class="ml-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="18"
						fill="currentColor"
						viewBox="0 96 960 960"
						width="18"
						><path
							d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h279v60H180v600h600V597h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60V319L382 717Z"
						/></svg
					>
				</span>
			</Button>
			<Button on:click={() => (modalOpen = true)} size="xs">Add Products/Services</Button>
		</div>

		{#if form?.success}
			<div class="my-4">
				<Alert accent dismissable>Saved</Alert>
			</div>
		{/if}
		<div class="flex-1">Collections</div>
		{#if $page.data?.collections?.length}
			<div class="flex flex-wrap">
				{#each $page.data?.collections as col}
					<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
						<div class="bg-green-600 border rounded shadow p-2">
							<div class="flex flex-row items-center">
								<div class="flex-shrink pl-1 pr-4">
									<!-- <svg
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 96 960 960"
										width="24"
										><path
											d="M640 636q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM200 856V296v560Zm0 80q-33 0-56.5-23.5T120 856V296q0-33 23.5-56.5T200 216h560q33 0 56.5 23.5T840 296v100h-80V296H200v560h560V756h80v100q0 33-23.5 56.5T760 936H200Zm320-160q-33 0-56.5-23.5T440 696V456q0-33 23.5-56.5T520 376h280q33 0 56.5 23.5T880 456v240q0 33-23.5 56.5T800 776H520Zm280-80V456H520v240h280Z"
										/></svg
									> -->
								</div>
								<div class="flex-1 text-right">
									<h5 class="text-white">{col?.collection?.name}</h5>
									<h3 class="text-white text-3xl">
										{col.collection?.rows?.length ?? 0}<span class="text-green-400"><i class="fas fa-caret-down" /></span>
									</h3>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div />
			<div class="flex justify-center">
				{#if browser}
					<LottiePlayer
						src="https://assets2.lottiefiles.com/private_files/lf30_yleyheeo.json"
						autoplay={true}
						loop={true}
						controls={false}
						renderer="svg"
						background="transparent"
						height={300}
						width={300}
					/>
				{/if}
			</div>
			<div class="text-center">
				<p class="text-lg">Add your collections</p>
				<p>
					Update and configure your product/services collections so as to start selling from your
					POS
				</p>
				<Button class="mt-4" on:click={() => (modalOpen = true)} size="xs"
					>Update Products/Services</Button
				>
			</div>
		{/if}
	</div>
</Card>
