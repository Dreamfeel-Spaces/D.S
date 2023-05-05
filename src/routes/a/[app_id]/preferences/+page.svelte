<script lang="ts">
	//@ts-nocheck
	import {
		Tabs,
		TabItem,
		Checkbox,
		Button,
		Select,
		Alert,
		Accordion,
		AccordionItem,
		Input,
		Fileupload,
		Dropzone,
		Modal,
		Radio
	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let space = data.space ?? { apiChannel: false, uploadProvider: '' };
	export let form;
	import { Hr, Card, CloseButton } from 'flowbite-svelte';
	import AdminModal from '$lib/components/AdminModal.svelte';
	import RuleDialog from './RuleDialog.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import countries, { getFlagEmoji } from '$lib/wsstore/countries';
	let activeTab = $page.url.searchParams.get('tab') ?? 'apikeys';
	import { Drawer, A } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import Checkout from '$lib/components/Checkout.svelte';

	let hidden8 = true;
	let plan = 'starter';
	let transitionParamsBottom = {
		y: 320,
		duration: 200,
		easing: sineIn
	};

	let selectedCountry = 'KE';
	let paymode = 'mpesa';
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	import { browser } from '$app/environment';
</script>

<Drawer
	placement="bottom"
	width="w-full"
	transitionType="fly"
	transitionParams={transitionParamsBottom}
	bind:hidden={hidden8}
	id="sidebar8"
>
	<div class="max-h-100 overflow-auto">
		<div class="flex items-center">
			<h5
				id="drawer-label"
				class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
			>
				<svg
					class="w-5 h-5 mr-2"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>Subscription plan
			</h5>
			<CloseButton on:click={() => (hidden8 = true)} class="mb-4 dark:text-white" />
		</div>
		<div>
			<div>
				<div class="text-5xl my-3 dark:text-gray-200 text-center">
					<span class="text-xl">Order Amount: </span> $0
				</div>
				<div class=" my-3 dark:text-gray-200 text-center">
					<span class="text-sm">Selected plan: </span> Chui
				</div>

				<div class="flex justify-center my-4">
					<Radio value="mpesa" bind:group={paymode}>M-PESA</Radio>
					<Radio value="more" bind:group={paymode} class="ml-3">More Options</Radio>
				</div>

				{#if paymode === 'more'}
					<div class="grid justify-center">
						<div class="w  c w-96 ">
							<Checkout />
						</div>
					</div>
				{/if}
				{#if paymode === 'mpesa'}
					<div class="flex justify-center">
						<div class="w  c w-96 ">
							<div class="pl-16">
								<img
									width="81%"
									src="https://res.cloudinary.com/dreamnerd/image/upload/v1683269032/MicrosoftTeams-image-removebg-preview_uw9vqw.png"
									alt=""
								/>
							</div>
							<Input />
							<Button class="my-6 w-full">Send payment request</Button>
						</div>
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
						<div class="text-2xl dark:text-gray-100  my-2">Plan</div>
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
									Best option for personal use.
								</p>
								<div class="flex justify-center items-baseline my-8">
									<span class="mr-2 text-5xl font-extrabold">0</span>
									<span class="text-gray-500 dark:text-gray-400">/month</span>
								</div>
								<!-- List -->
								<ul role="list" class="mb-8 space-y-4 text-left">
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
									<span class="mr-2 text-5xl font-extrabold">$99</span>
									<span class="text-gray-500 dark:text-gray-400" dark:text-gray-400>/month</span>
								</div>
								<!-- List -->
								<ul role="list" class="mb-8 space-y-4 text-left">
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
									<span class="mr-2 text-5xl font-extrabold">$799</span>
									<span class="text-gray-500 dark:text-gray-400">/month</span>
								</div>
								<!-- List -->
								<ul role="list" class="mb-8 space-y-4 text-left">
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
									}}
									class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
									>Get started</button
								>
							</div>
						</div>
					</div>
				</div>
				<Hr class="my-6" />
				<form>
					<div class="space-y-12 max-w-screen-xl lg:px-6">
						<div class="border-b border-gray-900/10 pb-1">
							<h2 class=" text-2xl mb-3 font-semibold leading-7 dark:text-white text-gray-900">
								Space Profile
							</h2>
							<p>User Interfaces</p>
							<Hr />
							<div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
												name="username"
												id="username"
												autocomplete="username"
												class="block border-0 flex-1  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
												type="text"
												name="username"
												id="username"
												autocomplete="username"
												class="block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder={$page.data.space?.appId}
											/>
										</div>
									</div>
								</div>

								<div class="sm:col-span-4">
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
										for="about"
										class="block   dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Description</label
									>
									<div class="mt-2">
										<textarea
											id="about"
											name="about"
											rows="3"
											class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
									<div class="mt-2 flex items-center gap-x-3">
										<Fileupload />
									</div>
								</div>

								<div class="col-span-full">
									<label
										for="cover-photo"
										class="block dark:text-gray-200 text-sm font-medium leading-6 text-gray-900"
										>Cover photo</label
									>
									<div
										class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
									>
										<Dropzone />
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
											type="text"
											name="street-address"
											id="street-address"
											autocomplete="street-address"
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
											autocomplete="address-level1"
											class="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div class="sm:col-span-2">
									<label
										for="postal-code"
										class="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
										>ZIP / Postal code</label
									>
									<div class="mt-2">
										<input
											type="text"
											name="postal-code"
											id="postal-code"
											autocomplete="postal-code"
											class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
						</div>

						<div class="border-b border-gray-900/10 pb-12">
							<h2 class="text-base font-semibold dark:text-gray-100 leading-7 text-gray-900">
								Notifications
							</h2>
							<p class="mt-1 text-sm leading-6 dark:text-gray-100 text-gray-600">
								We'll always let you know about important changes, but you pick what else you want
								to hear about.
							</p>

							<div class="mt-10 space-y-10">
								<fieldset>
									<legend class="text-sm font-semibold dark:text-gray-100 leading-6 text-gray-900"
										>By Email</legend
									>
									<div class="mt-6 space-y-6">
										<!-- <div class="relative flex gap-x-3">
											<div class="flex h-6 items-center">
												<input
													id="comments"
													name="comments"
													type="checkbox"
													class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
												/>
											</div>
											<div class="text-sm leading-6">
												<label for="comments" class="font-medium text-gray-900">Comments</label>
												<p class="text-gray-500">
													Get notified when someones posts a comment on a posting.
												</p>
											</div>
										</div>
										<div class="relative flex gap-x-3">
											<div class="flex h-6 items-center">
												<input
													id="candidates"
													name="candidates"
													type="checkbox"
													class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
												/>
											</div>
											<div class="text-sm leading-6">
												<label for="candidates" class="font-medium dark:text-gray-100 text-gray-900">Candidates</label>
												<p class="text-gray-500">
													Get notified when a candidate applies for a job.
												</p>
											</div>
										</div> -->
										<div class="relative dark:text-gray-100 flex gap-x-3">
											<div class="flex h-6 items-center">
												<input
													id="offers"
													name="offers"
													type="checkbox"
													class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
												/>
											</div>
											<div class="text-sm leading-6">
												<label for="offers" class="dark:text-gray-100 font-medium text-gray-900"
													>Offers</label
												>
												<p class="text-gray-500 dark:text-gray-100">
													Get notified when a candidate accepts or rejects an offer.
												</p>
											</div>
										</div>
									</div>
								</fieldset>
								<!-- <fieldset>
									<legend class="text-sm font-semibold leading-6 text-gray-900"
										>Push Notifications</legend
									>
									<p class="mt-1 text-sm leading-6 text-gray-600">
										These are delivered via SMS to your mobile phone.
									</p>
									<div class="mt-6 space-y-6">
										<div class="flex items-center gap-x-3">
											<input
												id="push-everything"
												name="push-notifications"
												type="radio"
												class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>
											<label
												for="push-everything"
												class="block text-sm font-medium leading-6 text-gray-900">Everything</label
											>
										</div>
										<div class="flex items-center gap-x-3">
											<input
												id="push-email"
												name="push-notifications"
												type="radio"
												class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>
											<label
												for="push-email"
												class="block text-sm font-medium leading-6 text-gray-900"
												>Same as email</label
											>
										</div>
										<div class="flex items-center gap-x-3">
											<input
												id="push-nothing"
												name="push-notifications"
												type="radio"
												class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>
											<label
												for="push-nothing"
												class="block text-sm font-medium leading-6 text-gray-900"
												>No push notifications</label
											>
										</div>
									</div>
								</fieldset> -->
							</div>
						</div>
					</div>

					<div class="mt-6 flex items-center justify-end gap-x-6">
						<button
							type="submit"
							class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>Update</button
						>
					</div>
				</form>
			</Card>
		</div>
	</div>
</div>
