<script lang="ts">
	//@ts-nocheck
	import logo from '../../../../assets/logo.png';
	import { Input, Button, Alert, Label, A } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import DemoCredentials from './DemoCredentials.svelte';
	import { passwordResetDialog } from '$lib/wsstore';

	const appId = $page.params["app_id"];
	const isDemo = appId === 'demo';

	export let data: PageData;
	export let form: any;
</script>

{#if !data.spaceSession}
	<div class="grid lg:grid-cols-2 gap-3">
		<div class="min-h-99  hidden self-center lg:flex text-center  overflow-auto">
			<div>
				<img src={logo} loading="lazy" alt="" />
				<p>Dreamfeel Spaces</p>
			</div>
		</div>
		<div class="px-6  min-h-100 overflow-auto mx-3 pt-3 pb-20">
			{#if isDemo}
				<div class="flex justify-end">
					<DemoCredentials />
				</div>
			{/if}
			<div class="mt-9">
				<form action="?/signin" method="POST">
					<p class="text-3xl text-gray-600 mb-9">
						Sign in to {#if isDemo}
							Demo
						{:else}
							{$page.data.space?.name}
						{/if}
					</p>

					{#if form?.error}
						<div class="my-4">
							<Alert dismissable class="bg-red-200 text-red-500"><b>An error occured</b></Alert>
						</div>
					{/if}
					<div>
						<Label class-="text-2xl dark:text-gray-100" for="username">Username</Label>
						<Input
							type="email"
							placeholder="Your username or email"
							required
							name="username"
							class="mt-2"
							id="username"
						/>
					</div>
					<div class="my-6">
						<Label class-="text-2xl dark:text-gray-100" for="password">Password</Label>
						<Input
							placeholder="Your password"
							required
							type="password"
							class="mt-2"
							name="password"
							id="password"
						/>
					</div>
					<Button type="submit" class="w-full">Login</Button>
					<div class="mt-3">
						<A rel="external" href={`/a/${$page.params["app_id"]}/accounts/reset-pass`}
							>I forgot my password</A
						>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

{#if data.spaceSession}
	<div class="flex justify-center dark:text-white text-center">
		<div>
			<div class="my-9">
				<p class="text-3xl mb-4">Your {appId} Account</p>
				<p>{data.spaceSession.user?.username}</p>
				<p>{data.spaceSession.user?.role}</p>
			</div>

			<form method="post" class="flex flex-col gap-4" action="?/signout">
				<Button type="button" on:click={() => passwordResetDialog.set({ open: true })}
					>Reset Password</Button
				>
				<Button type="submit">Sign Out</Button>
			</form>
		</div>
	</div>
{/if}
