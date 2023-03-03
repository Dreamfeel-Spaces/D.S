<script lang="ts">
	import { Input, Button, Alert } from 'flowbite-svelte';
	export let form: any;
	import { page } from '$app/stores';
</script>

<div class="px-6 py-6">
	{#if form?.success}
		<Alert>
			<b>Ui saved</b>
			<div>
				<a rel="external" href={`/editor/${$page.params.id}/${form?.data?.version?.id}/`}
					>Open in builder</a
				>
			</div></Alert
		>
	{/if}

	<form method="POST">
		<label for="name">Name</label>
		<Input
			placeholder="i.e Default, main, promo etc.."
			required
			name="name"
			type="text"
			id="property"
		/>
		<Button class="w-full mt-3" type="submit">Save</Button>
	</form>
</div>
