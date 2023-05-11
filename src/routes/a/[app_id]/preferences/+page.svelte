<script lang="ts">
	//@ts-nocheck
	import { Button, Alert, Modal, Heading, Select, Label } from 'flowbite-svelte';
	export let form;
	import { Hr, Card, CloseButton } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import countries, { getFlagEmoji } from '$lib/wsstore/countries';
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import categories from '$lib/templates/templatecategories.json';

	let category = $page.data.space?.tempCat;
	let items = categories.map((c) => ({ name: c.name, value: c.url }));
	let hidden8 = true;
	let transitionParamsBottom = {
		y: 320,
		duration: 200,
		easing: sineIn
	};

	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	import { browser } from '$app/environment';
	import axios from 'axios';

	let checkoutPlan = 'ndovu';
	let checkoutPrice = 0;

	let checkingOut = false;

	let checkoutSuccess = false;

	async function handlePay() {
		checkingOut = true;
		checkoutSuccess = false;
		const response = await axios.post(`/a/${$page.data.space.appId}/preferences/svr`, {});
		if (response.data) {
			checkingOut = false;
			checkoutSuccess = true;
		}
	}
	//@ts-ingore
	import Dropzone from 'svelte-file-dropzone';
	import { uploadCloudinary } from '$lib/files/upload';
	import PayBtn from '$lib/cbd/pay/PayBtn.svelte';

	let space: any = $page.data.space;
	let spaceMeta: any = $page.data.spaceMeta ?? {};

	let selectedCountry = spaceMeta.country;

	let iconUrl = space?.icon;
	let coverImageUrl = spaceMeta?.coverImage;

	let uploading = false;
	let uploadType = '';

	function handleFilesSelect(e, type) {
		uploadType = type;
		uploading = true;
		const { acceptedFiles, fileRejections } = e.detail;

		uploadCloudinary([{ fileData: acceptedFiles[0], field: 'coverImage' }]).then((data) => {
			if (type === 'icon') iconUrl = data[0].url;
			if (type === 'cover') coverImageUrl = data[0].url;
			uploading = false;
			uploadType = '';
		});
	}

	let makingTemplate = false;
	let templateModal = false;
	let templateSuccess = false;
	let isTemplate = $page.data.space?.template;

	async function handleCreateTemplate() {
		makingTemplate = true;
		templateSuccess = false;
		const response = await axios.put(`/a/${$page.params.app_id}/preferences/svr`, {
			template: !isTemplate,
			category
		});
		if (response.data) {
			makingTemplate = false;
			isTemplate = !isTemplate;
			templateSuccess = true;
		}
	}
</script>

<Drawer
	placement="bottom"
	width="w-full"
	transitionType="fly"
	transitionParams={transitionParamsBottom}
	bind:hidden={hidden8}
	id="sidebar8"
>
	<div class=" max-h-screen overflow-auto">
		<div class="flex items-center">
			<CloseButton on:click={() => (hidden8 = true)} class="mb-4 dark:text-white" />
		</div>

		<div>
			<div>
				{#if checkoutPlan === 'chui'}
					{#if browser}
						<div class="flex justify-center">
							<LottiePlayer
								src="https://assets5.lottiefiles.com/packages/lf20_40dpcS.json"
								autoplay={true}
								loop={true}
								renderer="svg"
								background="transparent"
								height={120}
								width={120}
							/>
						</div>
					{/if}
				{/if}
				{#if checkoutPlan === 'simba'}
					{#if browser}
						<div class="flex justify-center -mt-8 mb-8">
							<LottiePlayer
								src="https://assets8.lottiefiles.com/packages/lf20_ivg4itkc.json"
								autoplay={true}
								loop={true}
								renderer="svg"
								background="transparent"
								height={120}
								width={120}
							/>
						</div>
					{/if}{/if}
				{#if checkoutPlan === 'ndovu'}
					{#if browser}
						<div class="flex justify-center -pt-8">
							<LottiePlayer
								src="https://assets5.lottiefiles.com/packages/lf20_louy1taw.json"
								autoplay={true}
								loop={true}
								renderer="svg"
								background="transparent"
								height={120}
								width={120}
							/>
						</div>
					{/if}
				{/if}
				<div class=" my-3 dark:text-gray-200 text-center">
					{checkoutPlan} <span class="text-sm">plan</span>
				</div>
				<div class="text-5xl my-3 dark:text-gray-200 text-center">
					<span class="text-xl">Order Amount: </span> ${checkoutPrice}
				</div>

				{#if checkoutPlan === 'chui'}
					<div class="flex justify-center">
						<Button on:click={handlePay} class="my-6 "
							>{#if checkingOut}
								Please wait...
							{:else}
								Confirm plan
							{/if}</Button
						>
					</div>
				{:else}
					<div>
						<div class="my-5 text-center">
							<Heading tag="h6">Checkout with</Heading>
						</div>
						<PayBtn {checkoutPlan} {checkoutPrice} />
					</div>
				{/if}
			</div>
		</div>
	</div>
</Drawer>

<div class="flex">
	<div class="flex-1">
		<div>
			<Card size="xl">
				<div>
					<div class=" max-w-screen-xl lg:px-6">
						{#if form?.success}
							<Alert accent dismissable class="my-4">Changes saved!</Alert>
						{/if}
						<div class="text-2xl dark:text-gray-100  my-2">Available plans</div>

						<Hr />
						<div class="space-y-8 mt-3 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
							<!-- Pricing Card -->
							<div
								class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
							>
								{#if browser}
									<div class="flex justify-center -mt-20 mb-20">
										<LottiePlayer
											src="https://assets5.lottiefiles.com/packages/lf20_40dpcS.json"
											autoplay={true}
											loop={true}
											renderer="svg"
											background="transparent"
											height={180}
											width={180}
										/>
									</div>
								{/if}
								<h3 class="mb-4 text-2xl font-semibold">Chui</h3>
								<p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
									Best option for personal projects.
								</p>
								<div class="flex justify-center items-baseline my-8">
									<span class="mr-2 text-5xl font-extrabold">0</span>
									<span class="text-gray-500 dark:text-gray-400">/month</span>
								</div>
								<!-- List -->
								<ul class="mb-8 space-y-4 text-left">
									<li class="flex items-center space-x-3">
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>No setup, or hidden fees</span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Individual configuration</span>
									</li>

									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Team size: <span class="font-semibold">1 developer</span></span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Premium support: <span class="font-semibold">6 months</span></span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Free updates: <span class="font-semibold">6 months</span></span>
									</li>
								</ul>
								<button
									on:click={() => {
										hidden8 = false;
										checkoutPlan = 'chui';
										checkoutPrice = 0;
									}}
									class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-green-900"
									>Active</button
								>
							</div>
							<!-- Pricing Card -->
							<div
								class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
							>
								{#if browser}
									<div class="flex justify-center -mt-8 mb-8">
										<LottiePlayer
											src="https://assets8.lottiefiles.com/packages/lf20_ivg4itkc.json"
											autoplay={true}
											loop={true}
											renderer="svg"
											background="transparent"
											height={180}
											width={180}
										/>
									</div>
								{/if}
								<h3 class="mb-4 text-2xl font-semibold">Simba</h3>
								<p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
									Extended & premium support.
								</p>
								<div class="flex justify-center items-baseline my-8">
									<span class="mr-2 text-5xl font-extrabold">$199</span>
									<span class="text-gray-500 dark:text-gray-400" dark:text-gray-400>/month</span>
								</div>
								<!-- List -->
								<ul class="mb-8 space-y-4 text-left">
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Individual configuration</span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>No setup, or hidden fees</span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Team size: <span class="font-semibold">10 developers</span></span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Premium support: <span class="font-semibold">24 months</span></span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Free updates: <span class="font-semibold">24 months</span></span>
									</li>
								</ul>
								<button
									on:click={() => {
										hidden8 = false;
										checkoutPlan = 'simba';
										checkoutPrice = 699;
									}}
									class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
									>Get started</button
								>
							</div>
							<!-- Pricing Card -->
							<div
								class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
							>
								{#if browser}
									<div class="flex justify-center -pt-8">
										<LottiePlayer
											src="https://assets5.lottiefiles.com/packages/lf20_louy1taw.json"
											autoplay={true}
											loop={true}
											renderer="svg"
											background="transparent"
											height={180}
											width={180}
										/>
									</div>
								{/if}
								<h3 class="mb-4 text-2xl font-semibold">Ndovu</h3>
								<p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
									Best for large scale and enterprise uses.
								</p>
								<div class="flex justify-center items-baseline my-8">
									<span class="mr-2 text-5xl font-extrabold">$699</span>
									<span class="text-gray-500 dark:text-gray-400">/month</span>
								</div>
								<!-- List -->
								<ul class="mb-8 space-y-4 text-left">
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Individual configuration</span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>No setup, or hidden fees</span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Team size: <span class="font-semibold">100+ developers</span></span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Premium support: <span class="font-semibold">36 months</span></span>
									</li>
									<li class="flex items-center space-x-3">
										<!-- Icon -->
										<svg
											class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											/></svg
										>
										<span>Free updates: <span class="font-semibold">36 months</span></span>
									</li>
								</ul>
								<button
									on:click={() => {
										hidden8 = false;
										checkoutPlan = 'ndovu';
										checkoutPrice = 999;
									}}
									class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
									>Get started</button
								>
							</div>
						</div>
					</div>
				</div>
				<Hr class="my-6" />
				<form action="?/updateAppProfile" method="post">
					<div class="space-y-12 max-w-screen-xl lg:px-6">
						<div class="border-b border-gray-900/10 pb-1">
							<h2 class=" text-2xl mb-3 font-semibold leading-7 dark:text-white text-gray-900">
								Space Profile
							</h2>
							<Hr />
							<div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div class="sm:col-span-3">
									<label
										for="name"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Name</label
									>
									<div class="mt-2">
										<div
											class="flex rounded-md shadow-sm px-2 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
										>
											<input
												type="text"
												name="name"
												required
												bind:value={space.name}
												id="name"
												class="block dark:text-gray-200 border-0 flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder={$page.data.space?.name ?? 'App Name'}
											/>
										</div>
									</div>
								</div>
								<div class="sm:col-span-3">
									<label
										for="appId"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>App Id</label
									>
									<div class="mt-2">
										<div
											class="flex rounded-md shadow-sm px-2 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
										>
											<input
												type="text"
												name="appId"
												id="appId"
												bind:value={space.appId}
												class="block dark:text-gray-200 border-0 flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder={$page.data.space?.appId ?? 'App Id'}
											/>
										</div>
									</div>
								</div>
								<div class="sm:col-span-3">
									<label
										for="username"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Subdomain</label
									>
									<div class="mt-2">
										<div
											class="flex rounded-md shadow-sm px-2 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
										>
											<input
												type="text"
												disabled
												name="subdomain"
												value={space.appId}
												id="subdomain"
												class="block border-0 flex-1 dark:text-gray-200  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder={$page.data.space?.appId}
											/>
											<span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
												>.{$page.url.host}</span
											>
										</div>
									</div>
								</div>
								<div class="sm:col-span-3">
									<label
										for="username"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>URL</label
									>
									<div class="mt-2">
										<div
											class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
										>
											<span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
												>{$page.url.origin}/</span
											>
											<input
												disabled
												type="text"
												bind:value={space.appId}
												autocomplete="username"
												class="block dark:text-gray-200 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder={$page.data.space?.appId}
											/>
										</div>
									</div>
								</div>

								<div class="sm:col-span-4">
									<label
										for="domain"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Custom Domain</label
									>
									<div class="mt-2">
										<div
											class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
										>
											<input
												disabled
												type="text"
												name="domain"
												id="domain"
												class="block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder={'www.example.com'}
											/>
										</div>
									</div>
								</div>

								<div class="sm:col-span-6">
									<p>API</p>
									<Hr />
								</div>

								<div class="sm:col-span-3">
									<label
										for="username"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>API base url</label
									>
									<div class="mt-2">
										<div
											class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
										>
											<input
												disabled
												type="text"
												name="username"
												id="username"
												autocomplete="username"
												class="block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder="{$page.url.origin}/api"
											/>
										</div>
									</div>
								</div>

								<div class="sm:col-span-3">
									<label
										for="username"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Domain</label
									>
									<div class="mt-2">
										<div
											class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
										>
											<input
												disabled
												type="text"
												name="username"
												id="username"
												autocomplete="username"
												class="block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder={'www.example.com'}
											/>
										</div>
									</div>
								</div>

								<div class="sm:col-span-6 text-3xl mt-5">
									<p>About space</p>
									<Hr />
								</div>
								<div class="col-span-full">
									<label
										for="description"
										class="block   dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Description</label
									>
									<div class="mt-2">
										<textarea
											bind:value={spaceMeta.description}
											id="description"
											name="description"
											rows="4"
											class="block w-full dark:text-gray-200  bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
									<p class="mt-3 text-sm leading-6 text-gray-300">
										Write a few sentences about your space app.
									</p>
								</div>

								<div class="col-span-full">
									<label
										for="photo"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Logo</label
									>
									<input type="hidden" name="icon" bind:value={iconUrl} />
									<div class="mt-2 flex items-center gap-x-3">
										{#if iconUrl}
											<img width="200" src={iconUrl} alt="" />
										{:else}
											<div class="flex  justify-center items-center dark:text-gray-200">
												No files have been selected
											</div>
										{/if}
										<Dropzone
											accept="image/*"
											multiple={false}
											on:drop={(e) => handleFilesSelect(e, 'icon')}
										/>
										{#if uploading && uploadType === 'icon'}
											Uploading...
										{/if}
									</div>
								</div>

								<div class="col-span-full">
									<label
										for="cover-photo"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Cover photo</label
									>
									<input type="hidden" name="cover" bind:value={coverImageUrl} />

									<div
										class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25"
									>
										{#if coverImageUrl}
											<img width="200" src={coverImageUrl} alt="" />
										{:else}
											<div class="flex  justify-center items-center dark:text-gray-200">
												No files have been selected
											</div>
										{/if}
										<Dropzone
											accept="image/*"
											multiple={false}
											on:drop={(e) => handleFilesSelect(e, 'cover')}
										/>
										{#if uploading && uploadType === 'cover'}
											Uploading...
										{/if}
									</div>
								</div>
							</div>
						</div>

						<div class="sm:col-span-6 text-3xl">
							<p>Address</p>
							<Hr />
						</div>
						<div class="border-b border-gray-900/10">
							<p class="mt-1 text-sm leading-6 text-gray-600">
								Use a permanent address where you can receive mail.
							</p>
							<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div class="sm:col-span-3">
									<label
										for="country"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Country</label
									>
									<div class="mt-2">
										<select
											id="country"
											name="country"
											required
											bind:value={selectedCountry}
											autocomplete="country-name"
											class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
										>
											{#each countries as country}
												<option value={country.code}
													>{getFlagEmoji(country.code)} {country.name}</option
												>
											{/each}
										</select>
									</div>
								</div>

								<div class="col-span-full">
									<label
										for="street-address"
										class="block text-sm dark:text-gray-100 font-medium leading-6 text-gray-900"
										>Street address</label
									>
									<div class="mt-2">
										<input
											required
											bind:value={spaceMeta.StreetAddress}
											type="text"
											name="street"
											id="street"
											autocomplete="street"
											class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div class="sm:col-span-2 sm:col-start-1">
									<label
										for="city"
										class="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
										>City</label
									>
									<div class="mt-2">
										<input
											type="text"
											name="city"
											required
											bind:value={spaceMeta.city}
											id="city"
											autocomplete="address-level2"
											class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div class="sm:col-span-2">
									<label
										for="region"
										class="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
										>State / Province</label
									>
									<div class="mt-2">
										<input
											type="text"
											name="region"
											id="region"
											required
											bind:value={spaceMeta.state}
											autocomplete="address-level1"
											class="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div class="sm:col-span-2">
									<label
										for="postalCode"
										class="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
										>ZIP / Postal code</label
									>
									<div class="mt-2">
										<input
											type="text"
											required
											bind:value={spaceMeta.postalCode}
											name="postalCode"
											id="postalCode"
											autocomplete="postal-code"
											class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="my-6 flex items-center justify-end gap-x-6">
						<button
							type="submit"
							class="rounded-md  bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>Update</button
						>
					</div>

					<hr />
					<div class="my-6 space-y-3">
						<Alert class="bg-red-200 dark:bg-red-200 border-red-500" accent>
							<Heading color="dark" class="text-gray-800 dark:text-gray-800" tag="h6"
								>Public template</Heading
							>
							<Modal class="w-full" open={templateModal}>
								<div slot="header">
									<Heading tag="h6">Template settings</Heading>
								</div>
								<div class="flex justify-center">
									{#if browser && makingTemplate}
										<div class="flex justify-center -pt-8">
											<LottiePlayer
												src="https://assets9.lottiefiles.com/packages/lf20_f0oAgL.json"
												autoplay={true}
												loop={true}
												renderer="svg"
												background="transparent"
												height={120}
												width={120}
											/>
										</div>
									{/if}
									{#if browser && templateSuccess}
										<div class="flex justify-center -pt-8">
											<LottiePlayer
												src="https://assets1.lottiefiles.com/packages/lf20_atippmse.json"
												autoplay={true}
												loop={true}
												renderer="svg"
												background="transparent"
												height={120}
												width={120}
											/>
										</div>
									{/if}
								</div>
								<Label>
									Template category
									<Select bind:value={category} {items} />
								</Label>
								<Button
									color={isTemplate ? 'red' : 'green'}
									on:click={handleCreateTemplate}
									class="mt-3 w-full"
									disabled={makingTemplate}
									>{makingTemplate
										? 'Please wait...'
										: isTemplate
										? 'Remove template'
										: 'Create template'}</Button
								>
							</Modal>
							<Button
								color={isTemplate ? 'red' : 'green'}
								on:click={() => (templateModal = true)}
								class="mt-3"
								>{makingTemplate
									? 'Please wait...'
									: isTemplate
									? 'Remove template'
									: 'Create template'}</Button
							>
						</Alert>
						<Alert class="bg-red-200 dark:bg-red-200 border-red-500" accent>
							<Heading color="dark" class="text-gray-800 dark:text-gray-800" tag="h6"
								>Maintenance mode</Heading
							>
						</Alert>
						<Alert class="bg-red-200 dark:bg-red-200 border-red-500" accent>
							<Heading color="dark" class="text-gray-800 dark:text-gray-800" tag="h6"
								>Deactivate</Heading
							>
						</Alert>
					</div>
				</form>
			</Card>
		</div>
	</div>
</div>
