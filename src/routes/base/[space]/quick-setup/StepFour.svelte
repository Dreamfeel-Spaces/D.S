<script lang="ts">
	interface Data {
		nextImage: Function;
		previousImage: Function;
	}

	import { Radio, Button, Input } from 'flowbite-svelte';
	let whoAmi = '';
</script>

<form action="?/stepFour" method="post" class=" pt-9 mt-4 px-6">
	<div class="text-center border-gray-800  min-h-100">
		<p class="text-3xl text-gray-900  dark:text-gray-50 ">What do you want to build today?</p>
		<p class="my-6">We'll help you get started based on your responses. .</p>
		<ul
			class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
		>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="business_site">Business site</Radio>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="ecommerce_store">Ecommerce store</Radio>
			</li>
			<li><Radio class="p-3" bind:group={whoAmi} value="portfolio">Portfolio</Radio></li>
			<li><Radio class="p-3" bind:group={whoAmi} value="blog">Blog</Radio></li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="institution"
					>Institution/Organizational site</Radio
				>
			</li>
			<li><Radio class="p-3" bind:group={whoAmi} value="other">Other</Radio></li>
		</ul>

		{#if whoAmi === 'other'}
			<div class="mt-4">
				<Input placeholder="Specify other" required name="other" />
			</div>
		{/if}
		<div class="mt-6">
			<input value={JSON.stringify(whoAmi)} name="whoAmi" type="hidden" />
			<Button disabled={!whoAmi} class="w-full" type="submit">Continue</Button>
		</div>
		<div class="mt-6">
			<input value={JSON.stringify(whoAmi)} name="whoAmi" type="hidden" />
			<Button disabled={!whoAmi} class="w-full" type="submit">Skip</Button>
		</div>
	</div>
</form>
