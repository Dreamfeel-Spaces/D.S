<script lang="ts">
	export let form: any;
	import { page } from '$app/stores';
	const space = $page.params.space;
	import { Alert, Breadcrumb, BreadcrumbItem, Button, Input } from 'flowbite-svelte';
</script>

<div class="flex my-3 pr-6">
	<div class=" flex-1 text-3xl px-6 text-gray-500">
		<b class="mr-2">
			{space}
		</b>
	</div>
	<a href={`/base/${space}`}>Go back</a>
</div>

<div class="flex mt-4 justify-between px-6">
	<Breadcrumb>
		<BreadcrumbItem>Home</BreadcrumbItem>
		<BreadcrumbItem>Space</BreadcrumbItem>
		<BreadcrumbItem>Table</BreadcrumbItem>
		<BreadcrumbItem>Create</BreadcrumbItem>
	</Breadcrumb>
</div>

{#if form?.success}
	<div class="my-9 px-6 ">
		<Alert>
			<p class="mb-5"><b>Table created</b></p>
			<a class="hover:underline" href={`/base/${space}/${form?.data?.name}`}
				>Add schema</a
			>
		</Alert>
	</div>
{/if}

<form method="post" class="mt-9 mx-3 px-6">
	<div class="mb-6">
		<label class="dark:text-gray-100 text-xl mb-2" for="name">Table name</label>
		<Input required type="text" placeholder="i.e students" id="name" name="name" class="w-full" />
	</div>
	<Button type="submit" class="w-full">Submit</Button>
</form>
