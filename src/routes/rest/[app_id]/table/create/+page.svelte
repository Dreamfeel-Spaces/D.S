<script lang="ts">
	export let form: any;
	import { page } from '$app/stores';
	const space = $page.params['app_id'];
	import { Alert, Card, BreadcrumbItem, Button, Input } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	onMount(() => {
		if (form?.success) invalidateAll();
	});
</script>

<Card size="xl">
	<div class="min-h-99 h-100 pb-36">
		<div class="flex my-3 pr-6">
			<div class=" flex-1 text-3xl px-6 text-gray-500">
				<b class="mr-2">
					{$page.data.space?.name}
				</b>
			</div>
			<a href={`/rest/${space}`}>Go back</a>
		</div>

		{#if form?.success}
			<div class="my-9 px-6 ">
				<Alert>
					<p class="mb-5"><b>Table created</b></p>
					<a class="hover:underline" href={`/rest/${space}/${form?.data?.name}`}>Add schema</a>
				</Alert>
			</div>
		{/if}

		<form method="post" class="mt-9 mx-3 px-6">
			<div class="mb-6">
				<label class="dark:text-gray-100 text-xl mb-2" for="name">Table name</label>
				<Input
					required
					type="text"
					placeholder="i.e students"
					id="name"
					name="name"
					class="w-full"
				/>
			</div>
			<Button type="submit" class="w-full">Submit</Button>
		</form>
	</div>
</Card>
