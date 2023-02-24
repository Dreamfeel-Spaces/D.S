<script>
	import { enhance } from '$app/forms';
	import { Input, Button } from 'flowbite-svelte';
	export let form = { success: false, data: { id: '' } };
</script>

{#if form?.success}
	<div>form saved!</div>
	<a href={`/space/${form?.data?.id}`}>Detail</a>
{/if}

<div class="lg:mx-36 mt-9  mx-2">
	<form method="POST" use:enhance>
		<div class="mb-6 w-full">
			<label for="name">App ID</label>
			<Input placeholder="Unique app id" class="w-full" id="appId" name="appId" type="text" />
		</div>
		<div class="mb-6 w-full">
			<label for="name">Name</label>
			<Input placeholder="space-name" class="w-full" id="name" name="name" type="text" />
		</div>
		<Button  class="w-full" type="submit"> Save </Button>
	</form>
</div>
