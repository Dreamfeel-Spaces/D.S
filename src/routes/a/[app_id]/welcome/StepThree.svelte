<script lang="ts">
	interface Data {
		nextImage: Function;
		previousImage: Function;
	}

	import { Checkbox as Radio, Button } from 'flowbite-svelte';
	let whoAmi: any = {};
</script>

<form action="?/stepThree" method={'post'} class="px-6">
	<div class="text-center border-gray-800  min-h-100">
		<p class="text-3xl text-gray-900  dark:text-gray-50 ">How comfortable are you with Coding?</p>
		<p class="my-3">We'll help you get started based on your responses. .</p>

		<ul
			class="w-full bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
		>
			<li>
				<Radio class="p-3" bind:checked={whoAmi.unfamiliar}>I'm unfamiliar with HTML/CSS</Radio>
			</li>
			<li>
				<Radio class="p-3" bind:checked={whoAmi.farmiliarNoCode}
					>I'm familiar with HTML/CSS, but I've never coded
				</Radio>
			</li>
			<li>
				<Radio class="p-3" bind:checked={whoAmi.codedPart} value="react"
					>I've coded part of a website</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:checked={whoAmi.codedFull} value="angular"
					>I've coded a full website</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:checked={whoAmi.createdApis} value="angular"
					>I've created APIs before</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:checked={whoAmi.workedWithDatabases} value="angular"
					>I've worked with databases</Radio
				>
			</li>
			<li>
				<Radio class="p-3" bind:checked={whoAmi.integratedFull} value="angular"
					>I've integrated a frontend with a backend</Radio
				>
			</li>
			
		</ul>
		<div class="mt-3">
			<input value={JSON.stringify(whoAmi)} name="whoAmi" type="hidden" />
			<Button disabled={!whoAmi} class="w-full" type="submit">Continue</Button>
		</div>
	</div>
</form>
