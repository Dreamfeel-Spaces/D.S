<script lang="ts">
	import type { PageData } from './$types';
	import { Input, Button } from 'flowbite-svelte';
	export let data: PageData;
	export let form: any;
	let item: any = data.item;
</script>

<div class="text-center text-lg mt-9">
	<p>Update record</p>
</div>

{#if form?.success}
	<div class="my-3">Record update successful</div>
{/if}
<form method="POST" class="mt-3 mx-9">
	{#each Object.keys(data?.item ?? {}) as key}
		{#if !['required', 'multiple', 'rel', 'type', 'data'].includes(key)}
			<div class="mb-4 mx-12">
				<label for={key}>{key}</label>
				<Input required={data?.item?.required} id={key} name={key} bind:value={item[key]} />
			</div>
		{/if}
	{/each}
	<div class="mx-20">
		<Button class="w-full" type="submit">Update</Button>
	</div>
</form>
