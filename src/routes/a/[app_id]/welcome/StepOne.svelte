<script lang="ts">
	import { Radio, Button } from 'flowbite-svelte';
	let whoAmi = '';
	import { page } from '$app/stores';
</script>

<form method="post" action="?/stepOne" class=" pt-9 mt-4 px-6 ">
	<div class="text-center border-gray-800  min-h-100">
		<p class="text-3xl text-gray-900  dark:text-gray-50 ">
			What best describes your role in {$page.data?.space?.name}?
		</p>
		<p class="my-6">We'll help you get started based on your responses.</p>
		<ul
			class="w-full dark:text-gray-50 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
		>
			<li>
				<Radio class="p-3" bind:group={whoAmi} required value="fullstack_developer"
					>Fullstack Developer</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} required value="frontend_developer"
					>Frontend Developer</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} required value="backend_developer"
					>Backend Developer</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} required value="designer">Product Designer</Radio>
			</li>
			<li><Radio class="p-3" bind:group={whoAmi} required value="marketer">Marketer</Radio></li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} required value="entreprenuer">Entreprenuer</Radio>
			</li>
			<li><Radio class="p-3" bind:group={whoAmi} required value="angular">Other</Radio></li>
		</ul>
		<div class="mt-9">
			<input bind:value={whoAmi} name="whoAmi" type="hidden" />
			<Button disabled={!whoAmi} class="w-full" type="submit">Continue</Button>
		</div>
	</div>
</form>
