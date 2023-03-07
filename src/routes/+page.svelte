<script lang="ts">
	import heroImage from '../assets/hero.png';
	export let form: any;
	import { Alert } from 'flowbite-svelte';
</script>

{#if form?.feedbackSuccess}
	<Alert dismissable class="mx-6 mt-2">
		<div class="m4-9">Your feedback has been received, thank you.</div>
	</Alert>
{/if}

<!-- <section class="mb-40">
	<div class="px-6 py-12 md:px-12 text-gray-800 text-center lg:text-left">
		<div class="container mx-auto xl:px-32">
			<div class="grid lg:grid-cols-2  items-center">
				<div class="md:mt-12 lg:mt-0 mb-12 lg:mb-0">
					<div
						class="block rounded-lg lg:-mt-60 shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
						style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px);"
					>
						<h1 class="text-4xl  md:text-5xl xl:text-6xl font-bold tracking-tight mb-12">
							<span class="text-blue-600">Build, refine</span> and make your <br /><span
								class="text-blue-600">brand visible</span
							>
						</h1>
						<a
							class="inline-block px-7 py-3 mb-2 md:mb-0 md:mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
							href="/spaces/create"
							rel="external"
							role="button">Get started</a
						>
						<a
							class="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
							href="/spaces/demo"
							role="button">Live demo</a
						>
					</div>
				</div>
				<div class="md:mb-12 lg:mb-0">
					<img src={heroImage} class="w-full rounded-lg shadow-lg" alt="Hero" />
				</div>
			</div>
		</div>
	</div>
</section> -->

<section class="bg-white dark:bg-gray-900">
	<div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
		<div class="mr-auto place-self-center lg:col-span-7">
			<h1
				class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-700 dark:text-white"
			>
				The No Code Platform for software companies
			</h1>
			<p
				class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
			>
				From realtime APIs, fully rich customizable dashboards, interactive website builder and
				countless integration, including with native device technology companies around the world
				use Dreamfeel.ai to build blazingly fast apps.
			</p>
			<a
				href="/signup"
				class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
			>
				Get started
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
			</a>
			<a
				target="blank"
				href="http://demo.localhost:5173"
				class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
			>
				Live demo
			</a>
		</div>
		<div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
			<img src={heroImage} alt="mockup" loading="lazy" />
		</div>
	</div>
</section>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
		<div class="max-w-screen-md mb-8 lg:mb-16">
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
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
				>
					<svg
						class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
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
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
				>
					<svg
						class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
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
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
				>
					<svg
						class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
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
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
				>
					<svg
						class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
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
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
				>
					<svg
						class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
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
					class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
				>
					<svg
						class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
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

<div class="container my-24 px-6 mx-auto">
	<!-- Section: Design Block -->
	<section class="mb-32 text-gray-800 background-radial-gradient">
		<style>
			.background-radial-gradient {
				background-color: hsl(218, 41%, 15%);
				background-image: radial-gradient(
						650px circle at 0% 0%,
						hsl(218, 41%, 35%) 15%,
						hsl(218, 41%, 30%) 35%,
						hsl(218, 41%, 20%) 75%,
						hsl(218, 41%, 19%) 80%,
						transparent 100%
					),
					radial-gradient(
						1250px circle at 100% 100%,
						hsl(218, 41%, 45%) 15%,
						hsl(218, 41%, 30%) 35%,
						hsl(218, 41%, 20%) 75%,
						hsl(218, 41%, 19%) 80%,
						transparent 100%
					);
			}
		</style>

		<div class="px-6 py-12 md:px-12 text-center lg:text-left">
			<div class="container mx-auto">
				<div class="grid lg:grid-cols-2 gap-12 flex items-center">
					<div class="mt-12 lg:mt-0">
						<h1
							class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
							style="color: hsl(218, 81%, 95%)"
						>
							Are you ready <br /><span style="color: hsl(218, 81%, 75%)">for an adventure?</span>
						</h1>
						<p class="text-lg" style="color: hsl(218, 81%, 95%)">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officia consequatur
							adipisci tenetur repudiandae rerum quos.
						</p>
					</div>
					<div class="mb-12 lg:mb-0">
						<div
							class="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden rounded-lg shadow-lg"
							style="padding-top: 56.25%"
						>
							<!-- svelte-ignore a11y-missing-attribute -->
							<iframe
								class="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 w-full h-full"
								src="https://www.youtube.com/embed/vlDzYIIOYmM?enablejsapi=1&amp;origin=https%3A%2F%2Fmdbootstrap.com"
								allowfullscreen={true}
								data-gtm-yt-inspected-2340190_699="true"
								id="240632615"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Section: Design Block -->
</div>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
		<div class="mx-auto max-w-screen-sm">
			<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
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
						"I recently got my hands on Flowbite Pro, and holy crap, I'm speechless with how easy
						this was to integrate within my application. Most templates are a pain, code is
						scattered, and near impossible to theme.
					</p>
					<p class="my-4">
						Flowbite has code in one place and I'm not joking when I say it took me a matter of
						minutes to copy the code, customise it and integrate within a Laravel + Vue application.
					</p>
					<p class="my-4">If you care for your time, I hands down would go with this."</p>
				</blockquote>
				<figcaption class="flex justify-center items-center space-x-3">
					<img
						class="w-9 h-9 rounded-full"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
						alt="profile picture"
					/>
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>Bonnie Green</div>
						<div class="text-sm font-light text-gray-500 dark:text-gray-400">
							Developer at Open AI
						</div>
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
						"FlowBite provides a robust set of design tokens and components based on the popular
						Tailwind CSS framework. From the most used UI components like forms and navigation bars
						to the whole app screens designed both for desktop and mobile, this UI kit provides a
						solid foundation for any project.
					</p>
					<p class="my-4">
						Designing with Figma components that can be easily translated to the utility classes of
						Tailwind CSS is a huge timesaver!"
					</p>
				</blockquote>
				<figcaption class="flex justify-center items-center space-x-3">
					<img
						class="w-9 h-9 rounded-full"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
						alt="profile picture"
					/>
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>Roberta Casas</div>
						<div class="text-sm font-light text-gray-500 dark:text-gray-400">
							Lead designer at Dropbox
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
						"As someone who mainly designs in the browser, I've been a casual user of Figma, but as
						soon as I saw and started playing with FlowBite my mind was 🤯.
					</p>
					<p class="my-4">
						Everything is so well structured and simple to use (I've learnt so much about Figma by
						just using the toolkit).
					</p>
					<p class="my-4">
						Aesthetically, the well designed components are beautiful and will undoubtedly level up
						your next application."
					</p>
				</blockquote>
				<figcaption class="flex justify-center items-center space-x-3">
					<img
						class="w-9 h-9 rounded-full"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
						alt="profile picture"
					/>
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>Jese Leos</div>
						<div class="text-sm font-light text-gray-500 dark:text-gray-400">
							Software Engineer at Facebook
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
						"This is a very complex and beautiful set of elements. Under the hood it comes with the
						best things from 2 different worlds: Figma and Tailwind.
					</p>
					<p class="my-4">
						You have many examples that can be used to create a fast prototype for your team."
					</p>
				</blockquote>
				<figcaption class="flex justify-center items-center space-x-3">
					<img
						class="w-9 h-9 rounded-full"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
						alt="profile picture"
					/>
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>Joseph McFall</div>
						<div class="text-sm font-light text-gray-500 dark:text-gray-400">CTO at Google</div>
					</div>
				</figcaption>
			</figure>
		</div>
		<div class="text-center">
			<a
				href="#"
				class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
				>Show more...</a
			>
		</div>
	</div>
</section>

<!-- <section class="mb-32 text-gray-800 text-center lg:text-left">
	<div class="md:px-6 py-12 ">
		<div class="container mx-auto xl:px-32">
			<div class="grid lg:grid-cols-2  items-center">
				<div class="md:mt-12 lg:mt-0 mb-12 lg:mb-0">
					<div
						class="relative block rounded-lg shadow-lg px-6 pt-12 pb-6 md:px-12 lg:-mr-14"
						style="
                  background: hsla(0, 0%, 100%, 0.55);
                  backdrop-filter: blur(30px);
                  z-index: 1;
                "
					>
						<h2 class="text-3xl font-bold mb-6">Why is it so great?</h2>
						<p class="text-gray-500 mb-6">
							Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis malesuada.
							Aenean gravida magna orci, non efficitur est porta id. Donec magna diam.
						</p>

						<div class="grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
							<div class="mb-6">
								<p class="flex items-center">
									<svg
										class="w-4 h-4 mr-2 text-gray-900"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										/>
									</svg>Support 24/7
								</p>
							</div>

							<div class="mb-6">
								<p class="flex items-center">
									<svg
										class="w-4 h-4 mr-2 text-gray-900"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										/>
									</svg>Analytics
								</p>
							</div>

							<div class="mb-6">
								<p class="flex items-center">
									<svg
										class="w-4 h-4 mr-2 text-gray-900"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										/>
									</svg>Components
								</p>
							</div>
							<div class="mb-6">
								<p class="flex items-center">
									<svg
										class="w-4 h-4 mr-2 text-gray-900"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										/>
									</svg>Updates
								</p>
							</div>

							<div class="mb-6">
								<p class="flex items-center">
									<svg
										class="w-4 h-4 mr-2 text-gray-900"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										/>
									</svg>Reports
								</p>
							</div>

							<div class="mb-6">
								<p class="flex items-center">
									<svg
										class="w-4 h-4 mr-2 text-gray-900"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										/>
									</svg>Mobile
								</p>
							</div>
							<div class="mb-6">
								<p class="flex items-center">
									<svg
										class="w-4 h-4 mr-2 text-gray-900"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										/>
									</svg>Modules
								</p>
							</div>

							<div class="mb-6">
								<p class="flex items-center">
									<svg
										class="w-4 h-4 mr-2 text-gray-900"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										/>
									</svg>Blocks
								</p>
							</div>

							<div class="mb-6">
								<p class="flex items-center">
									<svg
										class="w-4 h-4 mr-2 text-gray-900"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										/>
									</svg>Templates
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="md:mb-12 lg:mb-0">
					<img
						src="https://mdbootstrap.com/img/new/ecommerce/vertical/121.jpg"
						class="w-full rounded-lg shadow-lg rotate-lg-6"
						alt=""
					/>
				</div>
			</div>
		</div>
	</div>
</section> -->

<div class="container my-24 px-6 mx-auto">
	<!-- Section: Design Block -->
	<section class="mb-32 text-gray-800">
		<style>
			#pricing-block-5 {
				height: 300px;
				padding-top: 55px;
			}

			@media (min-width: 992px) {
				#pricing-block-5 {
					height: 400px;
					padding-top: 80px;
				}
			}
			.background-radial-gradient {
				background-color: hsl(218, 41%, 15%);
				background-image: radial-gradient(
						650px circle at 0% 0%,
						hsl(218, 41%, 35%) 15%,
						hsl(218, 41%, 30%) 35%,
						hsl(218, 41%, 20%) 75%,
						hsl(218, 41%, 19%) 80%,
						transparent 100%
					),
					radial-gradient(
						1250px circle at 100% 100%,
						hsl(218, 41%, 45%) 15%,
						hsl(218, 41%, 30%) 35%,
						hsl(218, 41%, 20%) 75%,
						hsl(218, 41%, 19%) 80%,
						transparent 100%
					);
			}
		</style>

		<div id="pricing-block-5" class="background-radial-gradient text-center text-white">
			<h2 class="text-3xl font-bold text-center mb-12">Pricing</h2>
		</div>

		<div class="grid lg:grid-cols-3 px-6 md:px-12 xl:px-32" style="margin-top: -200px">
			<div class="p-0 py-12">
				<div
					class="block rounded-lg shadow-lg bg-white h-full lg:rounded-tr-none lg:rounded-br-none"
				>
					<div class="p-6 border-b border-gray-300 text-center">
						<p class="uppercase mb-4 text-sm">
							<strong>Basic</strong>
						</p>
						<h3 class="text-2xl mb-6">
							<strong>$ 129</strong>
							<small class="text-gray-500 text-sm">/year</small>
						</h3>

						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full"
							style="background-color: hsl(0, 0%, 95%)"
							data-mdb-ripple="true"
							data-ripple-color="primary"
						>
							Buy
						</button>
					</div>
					<div class="p-6">
						<ol class="list-inside">
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Unlimited updates
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Git repository
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>npm installation
							</li>
						</ol>
					</div>
				</div>
			</div>

			<div class="p-0">
				<div class="block rounded-lg shadow-lg bg-white h-full z-10">
					<div class="p-6 border-b border-gray-300 text-center">
						<p class="uppercase mb-4 text-sm">
							<strong>Enterprise</strong>
						</p>
						<h3 class="text-2xl mb-6">
							<strong>$ 499</strong>
							<small class="text-gray-500 text-sm">/year</small>
						</h3>

						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
						>
							Buy
						</button>
					</div>
					<div class="p-6">
						<ol class="list-inside">
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Unlimited updates
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Git repository
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>npm installation
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Code examples
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Premium snippets
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Premium support
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Drag&amp;Drop builder
							</li>
						</ol>
					</div>
				</div>
			</div>

			<div class="p-0 py-12">
				<div
					class="block rounded-lg shadow-lg bg-white h-full lg:rounded-tl-none lg:rounded-bl-none"
				>
					<div class="p-6 border-b border-gray-300 text-center">
						<p class="uppercase mb-4 text-sm">
							<strong>Advanced</strong>
						</p>
						<h3 class="text-2xl mb-6">
							<strong>$ 299</strong>
							<small class="text-gray-500 text-sm">/year</small>
						</h3>

						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full"
							style="background-color: hsl(0, 0%, 95%)"
							data-mdb-ripple="true"
							data-ripple-color="primary"
						>
							Buy
						</button>
					</div>
					<div class="p-6">
						<ol class="list-inside">
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Unlimited updates
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Git repository
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>npm installation
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Code examples
							</li>
							<li class="mb-4 flex items-center">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="check"
									class="text-green-600 w-4 h-4 mr-2"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
									/>
								</svg>Premium snippets
							</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Section: Design Block -->
</div>

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
							href="#"
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
							href="#"
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
							href="#"
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
							href="#"
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
							href="#"
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
				class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white"
			>
				Start your free trial today
			</h2>
			<p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
				Try Flowbite Platform for 30 days. No credit card required.
			</p>
			<a
				href="#"
				class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
				>Free trial for 30 days</a
			>
		</div>
	</div>
</section>

<div class="container my-24 px-6 mx-auto">
	<section class="mb-32 text-gray-800">
		<div
			class="relative overflow-hidden bg-no-repeat bg-cover"
			style="background-position: 50%; background-image: url('https://mdbootstrap.com/img/new/textures/full/284.jpg'); height: 300px;"
		/>
		<div class="container text-gray-800 px-4 md:px-12">
			<div
				class="block rounded-lg shadow-lg py-10 md:py-12 px-2 md:px-6"
				style="margin-top: -100px; background: hsla(0, 0%, 100%, 0.8); backdrop-filter: blur(30px);"
			>
				<div class="flex flex-wrap">
					<div class="grow-0 shrink-0 basis-auto w-full xl:w-5/12 px-3 lg:px-6 mb-12 xl:mb-0">
						<form action="?/feedback" method="post">
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
									class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
									id="exampleCheck87"
									checked
								/>
								<label class="form-check-label inline-block text-gray-800" for="exampleCheck87"
									>Send me a copy of this message</label
								>
							</div>
							<button
								type="submit"
								class="
                w-full
                px-6
                py-2.5
                bg-blue-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out">Send</button
							>
						</form>
					</div>
					<div class="grow-0 shrink-0 basis-auto w-full xl:w-7/12">
						<div class="flex flex-wrap">
							<div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
								<div class="flex items-start">
									<div class="shrink-0">
										<div
											class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
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
										<p class="text-gray-500">support@example.com</p>
										<p class="text-gray-500">+1 234-567-89</p>
									</div>
								</div>
							</div>
							<div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
								<div class="flex items-start">
									<div class="shrink-0">
										<div
											class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
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
										<p class="text-gray-500">sales@example.com</p>
										<p class="text-gray-500">+1 234-567-89</p>
									</div>
								</div>
							</div>
							<div class="mb-12 md:mb-0 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
								<div class="flex align-start">
									<div class="shrink-0">
										<div
											class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
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
										<p class="text-gray-500">press@example.com</p>
										<p class="text-gray-500">+1 234-567-89</p>
									</div>
								</div>
							</div>
							<div class="grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
								<div class="flex align-start">
									<div class="shrink-0">
										<div
											class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
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
										<p class="text-gray-500">bugs@example.com</p>
										<p class="text-gray-500">+1 234-567-89</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<div class="container my-24 px-6 mx-auto">
	<!-- Section: Design Block -->
	<section class="mb-32 text-gray-800 text-center md:text-left">
		<div class="grid md:grid-cols-2 gap-6">
			<div class="mb-6 md:mb-0">
				<h2 class="text-3xl font-bold mb-6">
					Trusted by 2,000,000+ <br />
					<u class="">developers and designers</u>
				</h2>
				<p class="text-gray-500 mb-6">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, quas?
				</p>

				<a
					class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb-2 md:mr-2"
					href="#!"
					role="button"
					data-mdb-ripple="true"
					data-mdb-ripple-color="light">Pre-order now</a
				>
			</div>

			<div class="mb-6 md:mb-0">
				<div class="grid grid-cols-2 gap-6">
					<div class="mb-12">
						<img
							src="https://mdbootstrap.com/img/Photos/new-templates/landing-page/logo6-1.png"
							class="grayscale px-6"
							alt="Nasa - logo"
						/>
					</div>

					<div class="mb-12">
						<img
							src="https://mdbootstrap.com/img/Photos/new-templates/landing-page/logo5-1.png"
							class="grayscale px-6"
							alt="Amazon - logo"
						/>
					</div>

					<div class="mb-12">
						<img
							src="https://mdbootstrap.com/img/Photos/new-templates/landing-page/logo3-1.png"
							class="grayscale px-6"
							alt="Nike - logo"
						/>
					</div>

					<div class="mb-12">
						<img
							src="https://mdbootstrap.com/img/Photos/new-templates/landing-page/logo4-1.png"
							class="grayscale px-6"
							alt="Ikea - logo"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Section: Design Block -->
</div>

<footer class="p-4 md:p-8 lg:p-10 bg-gray-800">
	<div class="mx-auto max-w-screen-xl text-center">
		<a
			href="#"
			class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<svg class="mr-2 h-8" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M25.2696 13.126C25.1955 13.6364 24.8589 14.3299 24.4728 14.9328C23.9856 15.6936 23.2125 16.2264 22.3276 16.4114L18.43 17.2265C17.8035 17.3575 17.2355 17.6853 16.8089 18.1621L14.2533 21.0188C13.773 21.5556 13.4373 21.4276 13.4373 20.7075C13.4315 20.7342 12.1689 23.9903 15.5149 25.9202C16.8005 26.6618 18.6511 26.3953 19.9367 25.6538L26.7486 21.7247C29.2961 20.2553 31.0948 17.7695 31.6926 14.892C31.7163 14.7781 31.7345 14.6639 31.7542 14.5498L25.2696 13.126Z"
					fill="url(#paint0_linear_11430_22515)"
				/><path
					d="M23.5028 9.20133C24.7884 9.94288 25.3137 11.0469 25.3137 12.53C25.3137 12.7313 25.2979 12.9302 25.2694 13.1261L28.0141 14.3051L31.754 14.5499C32.2329 11.7784 31.2944 8.92561 29.612 6.65804C28.3459 4.9516 26.7167 3.47073 24.7581 2.34097C23.167 1.42325 21.5136 0.818599 19.8525 0.486816L17.9861 2.90382L17.3965 5.67918L23.5028 9.20133Z"
					fill="url(#paint1_linear_11430_22515)"
				/><path
					d="M1.5336 11.2352C1.5329 11.2373 1.53483 11.238 1.53556 11.2358C1.67958 10.8038 1.86018 10.3219 2.08564 9.80704C3.26334 7.11765 5.53286 5.32397 8.32492 4.40943C11.117 3.49491 14.1655 3.81547 16.7101 5.28323L17.3965 5.67913L19.8525 0.486761C12.041 -1.07341 4.05728 3.51588 1.54353 11.2051C1.54233 11.2087 1.53796 11.2216 1.5336 11.2352Z"
					fill="url(#paint2_linear_11430_22515)"
				/><path
					d="M19.6699 25.6538C18.3843 26.3953 16.8003 26.3953 15.5147 25.6538C15.3402 25.5531 15.1757 25.4399 15.0201 25.3174L12.7591 26.8719L10.8103 30.0209C12.9733 31.821 15.7821 32.3997 18.589 32.0779C20.7013 31.8357 22.7995 31.1665 24.7582 30.0368C26.3492 29.1191 27.7 27.9909 28.8182 26.7195L27.6563 23.8962L25.7762 22.1316L19.6699 25.6538Z"
					fill="url(#paint3_linear_11430_22515)"
				/><path
					d="M15.0201 25.3175C14.0296 24.5373 13.4371 23.3406 13.4371 22.0588V21.931V11.2558C13.4371 10.6521 13.615 10.5494 14.1384 10.8513C13.3323 10.3864 11.4703 8.79036 9.17118 10.1165C7.88557 10.858 6.8269 12.4949 6.8269 13.978V21.8362C6.8269 24.775 8.34906 27.8406 10.5445 29.7966C10.6313 29.874 10.7212 29.9469 10.8103 30.0211L15.0201 25.3175Z"
					fill="url(#paint4_linear_11430_22515)"
				/><path
					d="M28.6604 5.49565C28.6589 5.49395 28.6573 5.49532 28.6589 5.49703C28.9613 5.83763 29.2888 6.23485 29.6223 6.68734C31.3648 9.05099 32.0158 12.0447 31.4126 14.9176C30.8093 17.7906 29.0071 20.2679 26.4625 21.7357L25.7761 22.1316L28.8181 26.7195C34.0764 20.741 34.09 11.5388 28.6815 5.51929C28.6789 5.51641 28.67 5.50622 28.6604 5.49565Z"
					fill="url(#paint5_linear_11430_22515)"
				/><path
					d="M7.09355 13.978C7.09354 12.4949 7.88551 11.1244 9.17113 10.3829C9.34564 10.2822 9.52601 10.1965 9.71002 10.1231L9.49304 7.38962L7.96861 4.26221C5.32671 5.23364 3.1897 7.24125 2.06528 9.83067C1.2191 11.7793 0.75001 13.9294 0.75 16.1888C0.75 18.0243 1.05255 19.7571 1.59553 21.3603L4.62391 21.7666L7.09355 21.0223V13.978Z"
					fill="url(#paint6_linear_11430_22515)"
				/><path
					d="M9.71016 10.1231C10.8817 9.65623 12.2153 9.74199 13.3264 10.3829L13.4372 10.4468L22.3326 15.5777C22.9566 15.9376 22.8999 16.2918 22.1946 16.4392L22.7078 16.332C23.383 16.1908 23.9999 15.8457 24.4717 15.3428C25.2828 14.4782 25.5806 13.4351 25.5806 12.5299C25.5806 11.0468 24.7886 9.67634 23.503 8.93479L16.6911 5.00568C14.1436 3.53627 11.0895 3.22294 8.29622 4.14442C8.18572 4.18087 8.07756 4.2222 7.96875 4.26221L9.71016 10.1231Z"
					fill="url(#paint7_linear_11430_22515)"
				/><path
					d="M20.0721 31.8357C20.0744 31.8352 20.0739 31.8332 20.0717 31.8337C19.6252 31.925 19.1172 32.0097 18.5581 32.0721C15.638 32.3978 12.7174 31.4643 10.5286 29.5059C8.33986 27.5474 7.09347 24.7495 7.09348 21.814L7.09347 21.0222L1.59546 21.3602C4.1488 28.8989 12.1189 33.5118 20.0411 31.8421C20.0449 31.8413 20.0582 31.8387 20.0721 31.8357Z"
					fill="url(#paint8_linear_11430_22515)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_11430_22515"
						x1="20.8102"
						y1="23.9532"
						x2="23.9577"
						y2="12.9901"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#1724C9" /><stop offset="1" stop-color="#1C64F2" /></linearGradient
					>
					<linearGradient
						id="paint1_linear_11430_22515"
						x1="28.0593"
						y1="10.5837"
						x2="19.7797"
						y2="2.33321"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#1C64F2" /><stop offset="1" stop-color="#0092FF" /></linearGradient
					>
					<linearGradient
						id="paint2_linear_11430_22515"
						x1="16.9145"
						y1="5.2045"
						x2="4.42432"
						y2="5.99375"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#0092FF" /><stop offset="1" stop-color="#45B2FF" /></linearGradient
					>
					<linearGradient
						id="paint3_linear_11430_22515"
						x1="16.0698"
						y1="28.846"
						x2="27.2866"
						y2="25.8192"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#1C64F2" /><stop offset="1" stop-color="#0092FF" /></linearGradient
					>
					<linearGradient
						id="paint4_linear_11430_22515"
						x1="8.01881"
						y1="15.8661"
						x2="15.9825"
						y2="24.1181"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#1724C9" /><stop offset="1" stop-color="#1C64F2" /></linearGradient
					>
					<linearGradient
						id="paint5_linear_11430_22515"
						x1="26.2004"
						y1="21.8189"
						x2="31.7569"
						y2="10.6178"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#0092FF" /><stop offset="1" stop-color="#45B2FF" /></linearGradient
					>
					<linearGradient
						id="paint6_linear_11430_22515"
						x1="6.11387"
						y1="9.31427"
						x2="3.14054"
						y2="20.4898"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#1C64F2" /><stop offset="1" stop-color="#0092FF" /></linearGradient
					>
					<linearGradient
						id="paint7_linear_11430_22515"
						x1="21.2932"
						y1="8.78271"
						x2="10.4278"
						y2="11.488"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#1724C9" /><stop offset="1" stop-color="#1C64F2" /></linearGradient
					>
					<linearGradient
						id="paint8_linear_11430_22515"
						x1="7.15667"
						y1="21.5399"
						x2="14.0824"
						y2="31.9579"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#0092FF" /><stop offset="1" stop-color="#45B2FF" /></linearGradient
					>
				</defs>
			</svg>
			Flowbite
		</a>
		<p class="my-6 text-gray-500 dark:text-gray-400">
			Open-source library of over 400+ web components and interactive elements built for better web.
		</p>
		<ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
			<li>
				<a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
			</li>
			<li>
				<a href="#" class="mr-4 hover:underline md:mr-6">Premium</a>
			</li>
			<li>
				<a href="#" class="mr-4 hover:underline md:mr-6 ">Campaigns</a>
			</li>
			<li>
				<a href="#" class="mr-4 hover:underline md:mr-6">Blog</a>
			</li>
			<li>
				<a href="#" class="mr-4 hover:underline md:mr-6">Affiliate Program</a>
			</li>
			<li>
				<a href="#" class="mr-4 hover:underline md:mr-6">FAQs</a>
			</li>
			<li>
				<a href="#" class="mr-4 hover:underline md:mr-6">Contact</a>
			</li>
		</ul>
		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
			>© 2021-2022 <a href="#" class="hover:underline">Flowbite™</a>. All Rights Reserved.</span
		>
	</div>
</footer>

<!-- Container for demo purpose -->
<style>
	@media (min-width: 992px) {
		.rotate-lg-6 {
			transform: rotate(6deg);
		}
	}
</style>
