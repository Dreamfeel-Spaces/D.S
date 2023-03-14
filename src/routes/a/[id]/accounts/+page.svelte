<script lang="ts">
	import logo from '../../../../assets/logo.png';
	import { Input, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import DemoCredentials from './DemoCredentials.svelte';

	const appId = $page.params.id;
	const isDemo = appId === 'demo';

	export let data: PageData;
</script>

{#if !data.spaceSession}
	<div class="grid lg:grid-cols-2 gap-3">
		<div class="min-h-99  hidden self-center lg:flex text-center  overflow-auto">
			<div>
				<img src={logo} loading="lazy" alt="" />
				<p>Dreamfeel Spaces</p>
			</div>
		</div>
		<div class="px-6  min-h-100 overflow-auto bg-gray-200 mx-3 pt-3 pb-20">
			{#if isDemo}
				<div class="flex justify-end">
					<DemoCredentials />
				</div>
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
