<script lang="ts">
	export let form: any;
	import { Button, Alert, Card, Heading } from 'flowbite-svelte';
</script>

<div class="container">
	<Card size="xl">
		<div style="align-items: center;" class="min-h-100 flex align-center text-center self-center">
			<div>
				<Heading tag="h4">New ui version</Heading>
				{#if form?.success}
					<div class="mt-9">
						<Alert>New ui version has been number: {form?.data?.version} added</Alert>
					</div>
				{/if}

				<div class="px-6">
					<form method="post">
						<Button class="w-full mt-4" type="submit">Create new version</Button>
					</form>
				</div>
			</div>
		</div>
	</Card>
</div>
