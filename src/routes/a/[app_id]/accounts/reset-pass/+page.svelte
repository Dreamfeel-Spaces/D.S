<script lang="ts">
	import { Heading, Input, Button, Alert, P } from 'flowbite-svelte';
	import { page } from '$app/stores';
	export let form: any;
</script>

<div class="text-center pt-20">
	<Heading>Password reset</Heading>

	<div class="lg:px-72 ">
		<form method="post">
			<P class="mt-4"
				>An email with password reset instruction will be sent to this email, if a {$page.data.space
					.name} account is associated with it</P
			>
			{#if form?.error}
				<Alert accent class="mt-4">An error occured</Alert>
			{/if}
			<div class="mt-9">
				<Input
					required
					type="email"
					placeholder={`Your email address / username for ${$page.data.space.name}`}
				/>
				<Button type="submit" class="w-full mt-5">Submit</Button>
			</div>
		</form>
	</div>
</div>
