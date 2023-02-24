<script lang="ts" >
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	const session = $page.data.session;
	const user = session?.user;
	export let form:any
	// export let form: ActionData satisfies {error:boolean};
</script>

<div class="lg:mx-20 mt-5">
	{#if !user}
		<div class="flex justify-end lg:mx-20 mt-3 p-2">
			<button on:click={() => signIn('github')}>Login with github</button>
		</div>
	{/if}
</div>

{#if !user}
	<form class="mt-4" method="post" use:enhance>
		{#if form?.error}
			<div class="notice error">
				{form.error}
			</div>
		{/if}
		<div class="group mb-3">
			<label for="email">Email</label>
			<input type="email" name="email" id="email" required />
		</div>

		<div class="group">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" required />
		</div>

		<div class="submit-container">
			<button type="submit">Login</button>
		</div>
	</form>
	<hr />
	<div class="actions mt-4">
		<a href="/signup">Sign Up</a>
	</div>
{/if}

<div class="lg:mx-20 mt-5">
	{#if user}
		<div class="flex justify-end">
			<div>
				<button on:click={() => signOut()}>Logout</button>
			</div>
		</div>
		<div class="mt-4">
			<p>You are logged in as {user.name}</p>
			<small>
				{user.email}
			</small>
		</div>
	{/if}
</div>
