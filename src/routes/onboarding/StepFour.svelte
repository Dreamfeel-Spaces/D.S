<script lang="ts">
	interface Data {
		nextImage: Function;
		previousImage: Function;
	}

	import { Radio } from 'flowbite-svelte';
	let whoAmi = 'front_end_developer';
	export let data: Data;
	console.log(data);
</script>

<div class=" pt-9 mt-4 px-6">
	<div class="text-center border-gray-800  min-h-100">
		<p class="text-3xl text-gray-900  dark:text-gray-50 ">What do you want to build today?</p>
		<p class="mt-6">We'll help you get started based on your responses. .</p>
		<p class="mb-4 font-semibold text-gray-900 dark:text-white">
			Technology <span class="capitalize">{whoAmi}</span>
		</p>
		<ul
			class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
		>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="svelte">Business site</Radio>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="vue js">Ecommerce store</Radio>
			</li>
			<li><Radio class="p-3" bind:group={whoAmi} value="react">Portfolio</Radio></li>
			<li><Radio class="p-3" bind:group={whoAmi} value="angular">Blog</Radio></li>
			<li><Radio class="p-3" bind:group={whoAmi} value="angular">Institution site</Radio></li>
			<li><Radio class="p-3" bind:group={whoAmi} value="angular">Other</Radio></li>
		</ul>
	</div>
</div>
