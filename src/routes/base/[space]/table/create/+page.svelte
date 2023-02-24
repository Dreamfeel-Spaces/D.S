<script lang="ts">
	export let form: any;
	import { page } from '$app/stores';
	const space = $page.params.space;
	import { Alert } from 'flowbite-svelte';
</script>

<div class="px-6 mt-4 text-right">
	<a href={`/base/${space}`}>Go back</a>
</div>

<div class="text-center mt-3 text-lg">Create table</div>

{#if form?.success}
	<div class="my-9 px-6 lg:mx-48">
		<Alert>
			<a href={`/base/${space}/table/${form?.data?.name}/columns/create`}>Add columns</a>
		</Alert>
	</div>
{/if}

<form method="post" class="mt-9 mx-3 lg:mx-20">
	<div class="mb-6">
		<label for="name">Table name</label>
		<input type="text" placeholder="i.e students" id="name" name="name" class="w-full" />
	</div>
	<button>Submit</button>
</form>
