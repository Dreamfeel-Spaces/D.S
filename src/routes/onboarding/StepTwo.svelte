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
		<p class="text-3xl text-gray-900  dark:text-gray-50 ">
			Who will you be building websites for ?
		</p>
		<p class="mt-6">We'll help you get started based on your responses. .</p>
		<p class="mb-4 font-semibold text-gray-900 dark:text-white">
			Technology <span class="capitalize">{whoAmi}</span>
		</p>
		<ul
			class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
		>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="svelte">Clients, as a freelancer</Radio>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="vue js">Clients, as part of an agency</Radio>
			</li>
			<li><Radio class="p-3" bind:group={whoAmi} value="react">The company I work for</Radio></li>
			<li><Radio class="p-3" bind:group={whoAmi} value="angular">My Bussiness</Radio></li>
			<li><Radio class="p-3" bind:group={whoAmi} value="angular">My Institution</Radio></li>
			<li><Radio class="p-3" bind:group={whoAmi} value="angular">Myself</Radio></li>
		</ul>
	</div>
</div>
