<script lang="ts">
	//@ts-nocheck
	import logo from '../assets/logo.png';
	export let form: any;
	import { onMount } from 'svelte';
	export let data: any;
	import { Alert, Button, Card, Avatar } from 'flowbite-svelte';

	import Cursort from './Cursort.svelte';
	import HeroCarousel from './HeroCarousel.svelte';
</script>

<Cursort />

{#if form?.feedbackSuccess}
	<Alert dismissable class="mx-6 mt-2">
		<div class="m4-9">Your feedback has been received, thank you.</div>
	</Alert>
{/if}

<div class="snappy  dark:bg-gray-900">
	<section class="bg-neutral-100 rounded-br-full rounded-bl-3xl  dark:bg-gray-900">
		<div
			class="grid  max-w-screen xl:px-28 2xl:px-[13rem]  4xl:px-[20rem] 2xl:py-32   	 px-4 py-8  mx-auto   lg:gap-8 xl:gap-0 lg:py-9 lg:grid-cols-12"
		>
			<div class="mr-auto md:pt-9 lg:pt-2 self-center min-h-105 lg:col-span-7">
				<h1
					class="max-w-xl  mt-9 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-700 dark:text-white"
				>
					The Ultimate No-Code Framework to Bring Your Vision to Life!
				</h1>
				<div class="inline-flex rounded-full">
					<a
						href="javascript:void(0)"
						class="border-primary bg-primary text-black hover:bg-primary hover:border-primary inline-flex items-center justify-center rounded-l-full border py-[10px] px-[12px] text-center text-base font-semibold dark:text-white transition-all hover:text-white sm:py-3 sm:px-6"
					>
						<span class="pr-2 text-green-500">
							<svg
								fill="currentColor"
								class="text-green-500"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" /></svg
							>
						</span>
						Datasource
					</a>
					<a
						href="javascript:void(0)"
						class="border-light border-r hover:bg-primary hover:border-primary inline-flex items-center justify-center border-y py-[10px] px-[12px] text-center text-sm font-semibold text-black transition-all hover:text-white dark:text-white sm:py-3 sm:px-6 sm:text-base"
					>
						<span class="pr-2 text-green-500">
							<svg
								fill="currentColor"
								class="text-green-500"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" /></svg
							>
						</span>
						UI Builder
					</a>
					<a
						href="javascript:void(0)"
						class="border-light hover:bg-primary hover:border-primary inline-flex items-center justify-center border-y py-[10px] px-[12px] text-center text-sm font-semibold text-black transition-all hover:text-white dark:text-white sm:py-3 sm:px-6 sm:text-base"
					>
						<span class="pr-2 text-green-500">
							<svg
								fill="currentColor"
								class="text-green-500"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" /></svg
							>
						</span>
						Rest API
					</a>

					<a
						href="javascript:void(0)"
						class="border-light dark:text-white hover:bg-primary hover:border-primary inline-flex items-center justify-center rounded-r-full border py-[10px] px-[12px] text-center text-sm font-semibold text-black transition-all hover:text-white sm:py-3 sm:px-6 sm:text-base"
					>
						<span class="pr-2 text-green-500">
							<svg
								fill="currentColor"
								class="text-green-500"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 96 960 960"
								width="24"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" /></svg
							>
						</span>
						Dashboards
					</a>
				</div>
				<br />
				<div class="pt-8">
					<Button class="mr-3" size="lg" href="/early-access" gradient color="pinkToOrange">
						Early Access
						<svg
							class="w-5 h-5 ml-2 -mr-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						>
					</Button>
					<a target="blank" href="/a/demo">
						<Button size="lg" gradient color="purpleToBlue">Live Demo</Button>
					</a>
				</div>
			</div>
			<div class="lg:mt-1 lg:col-span-5 lg:pt-1 sm:pt-28">
				<Card
					padding="sm"
					class=" h-100 min-h-100 max-h-100 mt-2  rounded-b-3xl rounded-t-3xl "
					size="xl"
				>
					<HeroCarousel />
				</Card>
			</div>
		</div>
	</section>
</div>

<section class="bg-white dark:bg-gray-900">
	<div
		class="py-8 px-4 xl:px-28 2xl:px-[13rem]  4xl:px-[20rem] 2xl:py-32  mx-auto max-w-screen  sm:py-16 lg:px-6"
	>
		<div class="max-w-screen mb-8 lg:mb-16">
			<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-700 dark:text-white">
				Designed for fast moving teams, like yours
			</h2>
			<p class="text-gray-500 sm:text-xl dark:text-gray-400">
				Here at Dreamfeel we focus on the heavy-lifting with the tools you'll ever require, the
				stability, so you can focus on more on the innovation, and iterate faster.
			</p>
		</div>
		<div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
			<div>
				<div
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-pink-100 lg:h-12 lg:w-12 dark:bg-pink-900"
				>
					<svg
						class="w-5 h-5 text-pink-600 lg:w-6 lg:h-6 dark:text-pink-300"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<h3 class="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
				<p class="text-gray-500 dark:text-gray-400">
					Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit
					your marketing goals every month with our marketing plan.
				</p>
			</div>
			<div>
				<div
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-pink-100 lg:h-12 lg:w-12 dark:bg-pink-900"
				>
					<svg
						class="w-5 h-5 text-pink-600 lg:w-6 lg:h-6 dark:text-pink-300"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
						/></svg
					>
				</div>
				<h3 class="mb-2 text-xl font-bold dark:text-white">Legal</h3>
				<p class="text-gray-500 dark:text-gray-400">
					Protect your organization, devices and stay compliant with our structured workflows and
					custom permissions made for you.
				</p>
			</div>
			<div>
				<div
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-pink-100 lg:h-12 lg:w-12 dark:bg-pink-900"
				>
					<svg
						class="w-5 h-5 text-pink-600 lg:w-6 lg:h-6 dark:text-pink-300"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
							clip-rule="evenodd"
						/><path
							d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
						/></svg
					>
				</div>
				<h3 class="mb-2 text-xl font-bold dark:text-white">Business Automation</h3>
				<p class="text-gray-500 dark:text-gray-400">
					Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new
					templates to help you get started.
				</p>
			</div>
			<div>
				<div
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-pink-100 lg:h-12 lg:w-12 dark:bg-pink-900"
				>
					<svg
						class="w-5 h-5 text-pink-600 lg:w-6 lg:h-6 dark:text-pink-300"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
						/><path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<h3 class="mb-2 text-xl font-bold dark:text-white">Finance</h3>
				<p class="text-gray-500 dark:text-gray-400">
					Audit-proof software built for critical financial operations like month-end close and
					quarterly budgeting.
				</p>
			</div>
			<div>
				<div
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-pink-100 lg:h-12 lg:w-12 dark:bg-pink-900"
				>
					<svg
						class="w-5 h-5 text-pink-600 lg:w-6 lg:h-6 dark:text-pink-300"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
						/></svg
					>
				</div>
				<h3 class="mb-2 text-xl font-bold dark:text-white">Enterprise Design</h3>
				<p class="text-gray-500 dark:text-gray-400">
					Craft beautiful, delightful experiences for both marketing and product with real
					cross-company collaboration.
				</p>
			</div>
			<div>
				<div
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-pink-100 lg:h-12 lg:w-12 dark:bg-pink-900"
				>
					<svg
						class="w-5 h-5 text-pink-600 lg:w-6 lg:h-6 dark:text-pink-300"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<h3 class="mb-2 text-xl font-bold dark:text-white">Operations</h3>
				<p class="text-gray-500 dark:text-gray-400">
					Keep your company’s lights on with customizable, iterative, and structured workflows built
					for all efficient teams and individual.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-4 mx-auto  max-w-screen xl:px-28 text-center lg:py-16 lg:px-6">
		<div class="mx-auto max-w-screen-sm">
			<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-pink-700 dark:text-white">
				Testimonials
			</h2>
			<p class="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
				Explore the whole collection of open-source web components and elements built with the
				utility classes from Tailwind
			</p>
		</div>
		<div class="grid mb-8 lg:mb-12 lg:grid-cols-2">
			<figure
				class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700"
			>
				<blockquote class="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						Speechless with how easy this was to integrate
					</h3>
					<p class="my-4">
						"I recently tried out Dreamfeel Spaces Pro, and I have to say, I was blown away by how
						easy it was to integrate with my application. Unlike most other platforms, I didn't have
						to struggle with messy code or clunky templates - everything was intuitive and
						straightforward. Plus, the customization options are fantastic - I was able to theme my
						app exactly how I wanted it without any hassle. Overall, I'm really impressed with
						Dreamfeel Spaces Pro and would highly recommend it to anyone looking for a flexible and
						user-friendly low-code platform.
					</p>
					<p class="my-4">If you care for your time, I hands down would go with this."</p>
				</blockquote>
				<figcaption class="flex justify-center items-center space-x-3">
					<Avatar border />
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>Mike</div>
						<div class="text-sm font-light text-gray-500 dark:text-gray-400">Beta tester</div>
					</div>
				</figcaption>
			</figure>
			<figure
				class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700"
			>
				<blockquote class="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						Solid foundation for any project
					</h3>
					<p class="my-4">
						"Dreamfeel Spaces Pro is a game-changer when it comes to building robust web
						applications. Unlike other solutions that require you to start from scratch or work with
						messy templates, Dreamfeel Spaces Pro provides a complete set of tools to help you build
						and deploy scalable, secure, and high-performance apps in record time. With easy-to-use
						datasources and website builders, you can create custom APIs, dashboards, and websites
						in just minutes. Plus, with built-in authentication and AI-assisted schema generation,
						you can be confident that your apps will be secure and optimized from day one. Whether
						you're building an e-commerce site, a social network, or anything in between, Dreamfeel
						Spaces Pro gives you the power to create amazing web apps that are tailored to your
						needs.
					</p>
				</blockquote>
				<figcaption class="flex justify-center items-center space-x-3">
					<Avatar border />
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>Robert Macharia</div>
						<div class="text-sm font-light text-gray-500 dark:text-gray-400">
							Freelance Developer
						</div>
					</div>
				</figcaption>
			</figure>
			<figure
				class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 lg:border-b-0 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700"
			>
				<blockquote class="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						Mindblowing workflow and variants
					</h3>
					<p class="my-4">
						"As a designer who primarily works in the browser, I've used Figma for a while now, but
						I recently came across Dreamfeel Spaces and I have to say, I'm blown away. With the
						built-in website builder and use of Tailwind CSS, designing responsive and great-looking
						websites has never been easier. The platform provides a solid foundation with its
						pre-designed UI components and templates, and the ability to integrate with scalable
						REST APIs makes development much faster. Overall, Dreamfeel Spaces has streamlined my
						design process and made it much more efficient
					</p>
				</blockquote>
				<figcaption class="flex justify-center items-center space-x-3">
					<Avatar border />
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>Jese Leos</div>
						<div class="text-sm font-light text-gray-500 dark:text-gray-400">
							Software Developer
						</div>
					</div>
				</figcaption>
			</figure>
			<figure
				class="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700"
			>
				<blockquote class="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						Efficient Collaborating
					</h3>
					<p class="my-4">
						"Whether you're a seasoned developer or a novice designer, Dreamfeel Spaces makes it
						easy to create fast prototypes and test your ideas quickly. The intuitive interface and
						extensive library of design elements mean you can quickly build custom designs that fit
						your needs. With Dreamfeel Spaces, you have access to a wide range of examples that can
						be used to create a prototype for your team in no time. .
					</p>
					<p class="my-4">
						The combination of Dreamfeel Spaces and Tailwind CSS makes for a powerful platform that
						can be used to create beautiful, scalable web designs with ease."
					</p>
				</blockquote>
				<figcaption class="flex justify-center items-center space-x-3">
					<Avatar border />
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>Caleb Otieno</div>
						<div class="text-sm font-light text-gray-500 dark:text-gray-400">
							Project Manager / Beta tester
						</div>
					</div>
				</figcaption>
			</figure>
		</div>
		<!-- <div class="text-center">
			<a
				href="/"
				class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
				>Show more...</a
			>
		</div> -->
	</div>
</section>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
		<h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
			Frequently asked questions
		</h2>
		<div
			class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2"
		>
			<div>
				<div class="mb-10">
					<h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
						<svg
							class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/></svg
						>
						What do you mean by "Figma assets"?
					</h3>
					<p class="text-gray-500 dark:text-gray-400">
						You will have access to download the full Figma project including all of the pages, the
						components, responsive pages, and also the icons, illustrations, and images included in
						the screens.
					</p>
				</div>
				<div class="mb-10">
					<h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
						<svg
							class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/></svg
						>
						What does "lifetime access" exactly mean?
					</h3>
					<p class="text-gray-500 dark:text-gray-400">
						Once you have purchased either the design, code, or both packages, you will have access
						to all of the future updates based on the roadmap, free of charge.
					</p>
				</div>
				<div class="mb-10">
					<h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
						<svg
							class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/></svg
						>
						How does support work?
					</h3>
					<p class="text-gray-500 dark:text-gray-400">
						We're aware of the importance of well qualified support, that is why we decided that
						support will only be provided by the authors that actually worked on this project.
					</p>
					<p class="text-gray-500 dark:text-gray-400">
						Feel free to <a
							href="/"
							class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
							target="_blank"
							rel="noreferrer">contact us</a
						> and we'll help you out as soon as we can.
					</p>
				</div>
				<div class="mb-10">
					<h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
						<svg
							class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/></svg
						>
						I want to build more than one project. Is that allowed?
					</h3>
					<p class="text-gray-500 dark:text-gray-400">
						You can use Windster for an unlimited amount of projects, whether it's a personal
						website, a SaaS app, or a website for a client. As long as you don't build a product
						that will directly compete with Windster either as a UI kit, theme, or template, it's
						fine.
					</p>
					<p class="text-gray-500 dark:text-gray-400">
						Find out more information by <a
							href="/"
							class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
							>reading the license</a
						>.
					</p>
				</div>
			</div>
			<div>
				<div class="mb-10">
					<h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
						<svg
							class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/></svg
						>
						What does "free updates" include?
					</h3>
					<p class="text-gray-500 dark:text-gray-400">
						The free updates that will be provided is based on the <a
							href="/"
							class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
							>roadmap</a
						> that we have laid out for this project. It is also possible that we will provide extra
						updates outside of the roadmap as well.
					</p>
				</div>
				<div class="mb-10">
					<h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
						<svg
							class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/></svg
						>
						What does the free version include?
					</h3>
					<p class="text-gray-500 dark:text-gray-400">
						The <a
							href="/"
							class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
							>free version</a
						> of Windster includes a minimal style guidelines, component variants, and a dashboard page
						with the mobile version alongside it.
					</p>
					<p class="text-gray-500 dark:text-gray-400">
						You can use this version for any purposes, because it is open-source under the MIT
						license.
					</p>
				</div>
				<div class="mb-10">
					<h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
						<svg
							class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/></svg
						>
						What is the difference between Windster and Tailwind UI?
					</h3>
					<p class="text-gray-500 dark:text-gray-400">
						Although both Windster and Tailwind UI are built for integration with Tailwind CSS, the
						main difference is in the design, the pages, the extra components and UI elements that
						Windster includes.
					</p>
					<p class="text-gray-500 dark:text-gray-400">
						Additionally, Windster is a project that is still in development, and later it will
						include both the application, marketing, and e-commerce UI interfaces.
					</p>
				</div>
				<div class="mb-10">
					<h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
						<svg
							class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/></svg
						>
						Can I use Windster in open-source projects?
					</h3>
					<p class="text-gray-500 dark:text-gray-400">
						Generally, it is accepted to use Windster in open-source projects, as long as it is not
						a UI library, a theme, a template, a page-builder that would be considered as an
						alternative to Windster itself.
					</p>
					<p class="text-gray-500 dark:text-gray-400">
						With that being said, feel free to use this design kit for your open-source projects.
					</p>
					<p class="text-gray-500 dark:text-gray-400">
						Find out more information by <a
							href="/"
							class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
							>reading the license</a
						>.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
		<div class="mx-auto max-w-screen-sm text-center">
			<h2
				class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-700 dark:text-white"
			>
				Get started for free
			</h2>
			<p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
				No credit card required.
			</p>
			<a href="/accounts">
				<Button size="xl" gradient color="pinkToOrange">Get started for free</Button>
			</a>
		</div>
	</div>
</section>

<section class="text-gray-600 dark:bg-gray-900 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-12">
			{#each data.posts as post}
				<div class="p-12 md:w-1/2 flex flex-col items-start">
					<span
						class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest"
						>CATEGORY</span
					>
					<h2
						class="sm:text-3xl dark:text-gray-50 text-2xl title-font font-medium text-gray-900 mt-4 mb-4"
					>
						{post.title}
					</h2>
					<p class="leading-relaxed mb-8  dark:text-gray-50">
						{@html post.content}
					</p>
					<div
						class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full"
					>
						<a
							rel="external"
							href={`/blog/${post.slug}`}
							class="text-indigo-500 inline-flex items-center"
							>Learn More<svg
								class="w-4 h-4 ml-2"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg
							></a
						><span
							class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
							><svg
								class="w-4 h-4 mr-1"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								viewBox="0 0 24 24"
								><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
									cx="12"
									cy="12"
									r="3"
								/></svg
							>1.2K</span
						><span class="text-gray-400 inline-flex items-center leading-none text-sm"
							><svg
								class="w-4 h-4 mr-1"
								stroke="currentColor"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								viewBox="0 0 24 24"
								><path
									d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
								/></svg
							>6</span
						>
					</div>
					<a href="/" class="inline-flex items-center"
						><img
							alt="blog"
							src="https://dummyimage.com/104x104"
							class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
						/><span class="flex-grow flex flex-col pl-4"
							><span class="title-font font-medium text-gray-900">Holden Caulfield</span><span
								class="text-gray-400 text-xs tracking-widest mt-0.5">UI DEVELOPER</span
							></span
						></a
					>
				</div>
			{/each}
		</div>
	</div>
</section>

<div class="dark:bg-gray-900">
	<div class="container dark:bg-gray-900 pb-24 px-6 -pt-20 mx-auto">
		<section class="mb-32 text-gray-800">
			<div
				class="relative overflow-hidden bg-no-repeat bg-cover"
				style="background-position: 50%; background-image: url('https://mdbootstrap.com/img/new/textures/full/284.jpg'); height: 300px;"
			/>
			<div class="container text-gray-800 px-4 md:px-12">
				<Card padding="xl" size="xl">
					<div class="flex flex-wrap">
						<div class="grow-0 shrink-0 basis-auto w-full xl:w-5/12 px-3 lg:px-6 mb-12 xl:mb-0">
							<form action="/feedback" method="post">
								<div class="form-group mb-6">
									<input
										required
										type="text"
										class="form-control block
                  w-full
                  px-3

                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
				  dark:bg-gray-700
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										id="exampleInput7"
										name="name"
										placeholder="Name"
									/>
								</div>
								<div class="form-group mb-6">
									<input
										required
										name="email"
										type="email"
										class="form-control block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
				  dark:bg-gray-700
				  focus:bg-white focus:border-blue-600 focus:outline-none"
										id="exampleInput8"
										placeholder="Email address"
									/>
								</div>
								<div class="form-group mb-6">
									<textarea
										required
										name="message"
										class="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
				  dark:bg-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
										id="exampleFormControlTextarea13"
										rows="3"
										placeholder="Message"
									/>
								</div>
								<div class="form-group form-check text-center mb-6">
									<input
										type="checkbox"
										class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-pink-600 checked:border-pink-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
										id="exampleCheck87"
										checked
									/>
									<label class="form-check-label inline-block text-gray-800" for="exampleCheck87"
										>Send me a copy of this message</label
									>
								</div>
								<button
									type="submit"
									class="inline-flex w-full items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-900"
								>
									Send message
								</button>
							</form>
						</div>
						<div class="grow-0 shrink-0 basis-auto w-full xl:w-7/12">
							<div class="flex flex-wrap">
								<div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
									<div class="flex items-start">
										<div class="shrink-0">
											<div
												class="p-4 bg-pink-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
											>
												<svg
													aria-hidden="true"
													focusable="false"
													data-prefix="fas"
													data-icon="headset"
													class="w-5 text-white"
													role="img"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path
														fill="currentColor"
														d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
													/>
												</svg>
											</div>
										</div>
										<div class="grow ml-6">
											<p class="font-bold mb-1">Technical support</p>
											<p class="text-gray-500">support@dreamfeel.me</p>
											<!-- <p class="text-gray-500">+1 234-567-89</p> -->
										</div>
									</div>
								</div>
								<div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
									<div class="flex items-start">
										<div class="shrink-0">
											<div
												class="p-4 bg-pink-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
											>
												<svg
													aria-hidden="true"
													focusable="false"
													data-prefix="fas"
													data-icon="dollar-sign"
													class="w-3 text-white"
													role="img"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 288 512"
												>
													<path
														fill="currentColor"
														d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
													/>
												</svg>
											</div>
										</div>
										<div class="grow ml-6">
											<p class="font-bold mb-1">Sales questions</p>
											<p class="text-gray-500">sales@dreamfeel.me</p>
											<!-- <p class="text-gray-500">+1 234-567-89</p> -->
										</div>
									</div>
								</div>
								<div class="mb-12 md:mb-0 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
									<div class="flex align-start">
										<div class="shrink-0">
											<div
												class="p-4 bg-pink-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
											>
												<svg
													aria-hidden="true"
													focusable="false"
													data-prefix="fas"
													data-icon="newspaper"
													class="w-5 text-white"
													role="img"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 576 512"
												>
													<path
														fill="currentColor"
														d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"
													/>
												</svg>
											</div>
										</div>
										<div class="grow ml-6">
											<p class="font-bold mb-1">Press</p>
											<p class="text-gray-500">press@dreamfeel.me</p>
											<!-- <p class="text-gray-500">+1 234-567-89</p> -->
										</div>
									</div>
								</div>
								<div class="grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
									<div class="flex align-start">
										<div class="shrink-0">
											<div
												class="p-4 bg-pink-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
											>
												<svg
													aria-hidden="true"
													focusable="false"
													data-prefix="fas"
													data-icon="bug"
													class="w-5 text-white"
													role="img"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path
														fill="currentColor"
														d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"
													/>
												</svg>
											</div>
										</div>
										<div class="grow ml-6">
											<p class="font-bold mb-1">Bug report</p>
											<p class="text-gray-500">bugs@dreamfeel.me</p>
											<!-- <p class="text-gray-500">+1 234-567-89</p> -->
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</section>
	</div>
</div>

<footer style="backdrop-filter:blur(30px)" class="p-4 md:p-8 lg:p-10  dark:bg-gray-900 bg-gray-900">
	<div class="mx-auto max-w-screen-xl text-center">
		<a
			href="/"
			class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<div class="text-center">
				<div class="flex justify-center">
					<img src={logo} loading="lazy" width="40%" alt="" />
				</div>
				<p class="text-gray-600">Dreamfeel Spaces</p>
			</div>
		</a>
		<p class="my-6 text-gray-500 dark:text-gray-400">
			API Infrastructure, Data and file storage, Payment, 3rd party integrations, rich dashboard,
			Web and platform native components.
		</p>
		<ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
			<li>
				<a href="/" class="mr-4 hover:underline md:mr-6 ">About</a>
			</li>
			<li>
				<a href="/" class="mr-4 hover:underline md:mr-6">Premium</a>
			</li>
			<li>
				<a href="/" class="mr-4 hover:underline md:mr-6 ">Campaigns</a>
			</li>
			<li>
				<a href="/" class="mr-4 hover:underline md:mr-6">Blog</a>
			</li>
			<li>
				<a href="/" class="mr-4 hover:underline md:mr-6">Affiliate Program</a>
			</li>
			<li>
				<a href="/" class="mr-4 hover:underline md:mr-6">FAQs</a>
			</li>
			<li>
				<a href="/" class="mr-4 hover:underline md:mr-6">Contact</a>
			</li>
		</ul>
		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
			>© {new Date().getFullYear()} <a href="/" class="hover:underline">Dreamfeel Spaces</a>. All
			Rights Reserved.</span
		>
	</div>
</footer>

