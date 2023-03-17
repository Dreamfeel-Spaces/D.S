<script>
	import { Card, Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
</script>

<div class="grid grid-cols-4 pt-20 gap-3 min-h-112 dark:bg-gray-900 dark:text-white px-12">
	<div>
		<Card class="min-h-20">
			Blank site
			<p class="my-9">Start from a blank canvas — and build exactly what you’re envisioning.</p>
			<Button on:click={() => goto(`/a/demo`)} size="xs">Select</Button>
			<div class="mt-4 flex justify-between">
				<a href="/">Learn more</a>
				<a href="/">Preview</a>
			</div>
		</Card>
	</div>
</div>
