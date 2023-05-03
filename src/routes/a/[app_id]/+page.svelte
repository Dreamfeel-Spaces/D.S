<script>
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { Card, Heading } from 'flowbite-svelte';

	import { onMount } from 'svelte';

	let hasCompletedWalkthrough = true;

	onMount(() => {
		// // Check if the user has completed the walkthrough before
		// hasCompletedWalkthrough = Boolean(sessionStorage.getItem('walkthroughCompleted'));

		// if (!hasCompletedWalkthrough) {
		// 	// Show the walkthrough
		// 	showWalkthrough();
		// }
	});

	function showWalkthrough() {
		// Show the Walkthrough component
		hasCompletedWalkthrough = true;
	}

	function handleWalkthroughComplete() {
		sessionStorage.setItem('walkthroughCompleted', 'true');
	}
</script>


<section class="container">
	<Card class="min-h-100" size="xl">
		<Heading class="ml-3" tag="h4">Home</Heading>
		<div class="flex flex-wrap pb-52">
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
				<div class="bg-green-600 border rounded shadow p-2">
					<div class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<i class="fa fa-wallet fa-2x fa-fw fa-inverse" />
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">Total Revenue</h5>
							<h3 class="text-white text-3xl">
								0$<span class="text-green-400"><i class="fas fa-caret-down" /></span>
							</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
				<div class="bg-blue-600 border rounded shadow p-2">
					<div class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<i class="fas fa-users fa-2x fa-fw fa-inverse" />
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">Total Users</h5>
							<h3 class="text-white text-3xl">
								1 <span class="text-blue-400"><i class="fas fa-caret-up" /></span>
							</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
				<div class="bg-orange-600 border rounded shadow p-2">
					<div class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<i class="fas fa-user-plus fa-2x fa-fw fa-inverse" />
						</div>
						<div class="flex-1 text-right pr-1">
							<h5 class="text-white">New Users</h5>
							<h3 class="text-white text-3xl">
								1 <span class="text-orange-400"><i class="fas fa-caret-up" /></span>
							</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
				<div class="bg-purple-600 border rounded shadow p-2">
					<div class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<i class="fas fa-server fa-2x fa-fw fa-inverse" />
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">Server Uptime</h5>
							<h3 class="text-white text-3xl">0 Days</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
				<div class="bg-red-600 border rounded shadow p-2">
					<div class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<i class="fas fa-tasks fa-2x fa-fw fa-inverse" />
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">Collections</h5>
							<h3 class="text-white text-3xl">0 tables</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
				<div class="bg-pink-600 border rounded shadow p-2">
					<div class="flex flex-row items-center">
						<div class="flex-shrink pl-1 pr-4">
							<i class="fas fa-inbox fa-2x fa-fw fa-inverse" />
						</div>
						<div class="flex-1 text-right">
							<h5 class="text-white">User Interfaces</h5>
							<h3 class="text-white text-3xl">
								0 <span class="text-pink-400"><i class="fas fa-caret-up" /></span>
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Card>
</section>
