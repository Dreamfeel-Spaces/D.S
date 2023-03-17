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
			How comfortable are you with HTML and CSS?
		</p>
		<p class="mt-6">We'll help you get started based on your responses. .</p>
		<p class="mb-4 font-semibold text-gray-900 dark:text-white">
			Technology <span class="capitalize">{whoAmi}</span>
		</p>
		<ul
			class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
		>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="svelte">I'm unfamiliar with HTML/CSS</Radio>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="vue js"
					>I'm familiar with HTML/CSS, but I've never coded
				</Radio>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="react">I've coded part of a website</Radio>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="angular">I've coded a full website</Radio>
			</li>
		</ul>
	</div>
</div>
