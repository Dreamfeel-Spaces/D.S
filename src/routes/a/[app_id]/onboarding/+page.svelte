<script lang="ts">
	import { Button, Heading, Hr, A } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import axios from 'axios';
	import { goto } from '$app/navigation';
</script>

<div class="container">
	<Heading tag="h6">Pick a starting point</Heading>
	<Hr />
	<div class="flex flex-col space-y-8  text-center">
		<div class="text-cente mt-20 r">
			<Button href="/a/{$page.params.app_id}/templates">Start from a template</Button>
		</div>
		<div class="text-center">
			<A href="/a/{$page.params.app_id}">Get started on a blank canves</A>
		</div>
	</div>
</div>
