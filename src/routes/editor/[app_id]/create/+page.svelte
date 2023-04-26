<script lang="ts">
	import { Input, Button, Alert, P, Card } from 'flowbite-svelte';
	export let form: any;
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	onMount(() => {
		invalidateAll();
	});
</script>

<div class="container">
	<Card size="xl" >
		<div class="px-6 py-6 mb-20">
			{#if form?.success}
				<Alert>
					<b>Ui saved</b>
					<div>
						<a rel="external" href={`/editor/${$page.params['app_id']}/${form?.data?.version?.id}/`}
							>Open in builder</a
						>
					</div></Alert
				>
			{/if}

			<form method="POST" class="mt-9">
				<P class="mb-9" for="name">Name</P>
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
	</Card>
</div>
