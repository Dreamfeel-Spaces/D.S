<script lang="ts">
	interface Data {
		nextImage: Function;
		previousImage: Function;
	}
	import { Radio, Button } from 'flowbite-svelte';
	let whoAmi = '';
</script>

<form action="?/stepTwo" method="post" class="px-6">
	<div class="text-center border-gray-800  min-h-100">
		<p class="text-3xl text-gray-900  dark:text-gray-50 ">Who will you be creating apps for ?</p>
		<p class="my-6">We'll help you get started based on your responses. .</p>
		<ul
			class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
		>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="freelance_client"
					>Clients, as a freelancer</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="freelance_agency"
					>Clients, as part of an agency</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="my_company">The company I work for</Radio>
			</li>
			<li><Radio class="p-3" bind:group={whoAmi} value="my_business">My Bussiness</Radio></li>
			<li>
				<Radio class="p-3" bind:group={whoAmi} value="my_org">My Institution/Organization</Radio>
			</li>
			<li><Radio class="p-3" bind:group={whoAmi} value="myself">Myself</Radio></li>
		</ul>
		<div class="mt-9">
			<input bind:value={whoAmi} name="whoAmi" type="hidden" />
			<Button disabled={!whoAmi} class="w-full" type="submit">Continue</Button>
		</div>
	</div>
</form>
