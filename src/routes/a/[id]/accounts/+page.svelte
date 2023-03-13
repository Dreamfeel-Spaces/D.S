<script lang="ts">
	import { Alert, Input, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	const appId = $page.params.id;
	const isDemo = appId === 'demo';
	export let data: PageData;
	import logo from '../../../../assets/logo.png';
</script>

{#if !data.spaceSession}
	<div class="grid grid-cols-2 gap-3">
		<div class="min-h-99 self-center flex text-center  overflow-auto">
			<div>
				<img src={logo} loading="lazy" alt="" />
				<p>Dreamfeel Spaces</p>
			</div>
		</div>
		<div class="px-6 min-h-112 overflow-auto bg-gray-200 mx-3 pt-3 pb-20">
			<div>
				<p class="text-4xl text-gray-700">{appId}</p>
				<p class="my-3">Login required</p>
			</div>
			{#if isDemo}
				<Alert>
					<div class="mb-2">Test credentials</div>
					<ul>
						<li>Username: <b>admin@company.mail</b></li>
						<li>Password: <b>testPass123</b></li>
					</ul>
					<hr />
					<div class="mt-3">
						<a class="hover:underline" href="/spaces/create">Create a new space instead</a>
					</div>
				</Alert>
			{/if}
			<div class="mt-9">
				<form action="?/signin" method="POST">
					<div>
						<label for="username">Username</label>
						<Input required name="username" class="mt-2" id="username" />
					</div>
					<div class="my-6">
						<label for="password">Password</label>
						<Input required type="password" class="mt-2" name="password" id="password" />
					</div>
					<Button type="submit" class="w-full">Login</Button>
				</form>
			</div>
		</div>
	</div>
{/if}

{#if data.spaceSession}
	<div class="flex justify-center">
		<form method="post" action="?/signout">
			<Button type="submit">Sign Out</Button>
		</form>
	</div>
{/if}
