<script lang="ts">
	import { Select } from 'flowbite-svelte';
	let role = 'fullstack-developer';
	export let form: any;
</script>

<svelte:head>
	<title>Early Access - Dreamfeel Spaces</title>
</svelte:head>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
		<h2
			class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
		>
			Join the waitlist
		</h2>
		<p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
			Be among the first to explore the limitless possibilities of Dreamfeel Spaces. You will get
			free access, and lifetime benefits and discounts as a beta tester.
		</p>
		{#if form?.error}
			<div
				class="bg-red-100 border my-4 border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<strong class="font-bold">Error!</strong>
				<span class="block sm:inline">An error occured, please try again later. Email address could have already been registered</span>
				<span class="absolute top-0 bottom-0 right-0 px-4 py-3">
					<svg
						class="fill-current h-6 w-6 text-red-500"
						role="button"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						><title>Close</title><path
							d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
						/></svg
					>
				</span>
			</div>
		{/if}
		{#if form?.success}
			<div
				class="bg-teal-100 my-4 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
				role="alert"
			>
				<div class="flex">
					<div class="py-1">
						<svg
							class="fill-current h-6 w-6 text-teal-500 mr-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							><path
								d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
							/></svg
						>
					</div>
					<div>
						<p class="font-bold">Success</p>
						<p class="text-sm">
							You will be notified once Dreamfeel Spaces is available for public testing.
						</p>
					</div>
				</div>
			</div>
		{/if}
		<form method="post" class="space-y-8">
			<div>
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Your email</label
				>
				<input
					type="email"
					id="email"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="email-id@example.mail"
					required
				/>
			</div>

			<div>
				<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Your full name</label
				>
				<input
					type="text"
					id="name"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="John Doe"
					required
				/>
			</div>

			<div>
				<label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Company / Organization</label
				>
				<input
					type="text"
					id="company"
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
				/>
			</div>

			<div>
				<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Your role</label
				>
				<Select
					placeholder="What is your role?"
					value={role}
					required
					items={[
						{ name: 'Fullstack Developer', value: 'fullstack-developer' },
						{ name: 'Backend Developer', value: 'backend-developer' },
						{ name: 'Frontend Developer', value: 'frontend-developer' },
						{ name: 'Web designer', value: 'web-designer' },
						{ name: 'Student', value: 'student' },
						{ name: 'Entreprenuer', value: 'entreprenuer' },
						{ name: 'Other', value: 'other' }
					]}
				/>
			</div>

			<button
				type="submit"
				class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>Submit</button
			>
		</form>
	</div>
</section>
