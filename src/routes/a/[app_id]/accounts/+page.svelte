<script lang="ts">
	//@ts-nocheck
	import logo from '../../../../assets/logo.png';
	import { Input, Button, Alert, Label, A } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import DemoCredentials from './DemoCredentials.svelte';
	import { passwordResetDialog } from '$lib/wsstore';

	const space = $page.data.space;

	const appId = $page.params['app_id'];
	const isDemo = appId === 'demo';

	export let data: PageData;
	export let form: any;
</script>

<section>
	<div class="flex flex-col px-6  mx-auto items-center lg:py-0">
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Sign in to your {space.name} account
				</h1>
				{#if isDemo}
					<div class=" text-left text-xs ">
						<Alert accent>
							<div>
								<span class="font-bold"> Live demo </span>
								<DemoCredentials />
							</div>
						</Alert>
					</div>
				{/if}
				<form class="space-y-4 md:space-y-6" action="?/signin" method="POST">
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Your email</label
						>
						<input
							type="email"
							name="username"
							id="email"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="name@company.com"
							required
						/>
					</div>
					<div>
						<label
							for="password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label
						>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-start">
							<div class="flex items-center h-5">
								<input
									id="remember"
									aria-describedby="remember"
									type="checkbox"
									class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
									required=""
								/>
							</div>
							<div class="ml-3 text-sm">
								<label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
							</div>
						</div>
						<a
							disabled
							href="reset-pass"
							class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Forgot password?</a
						>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>Sign in</button
					>
				</form>
			</div>
		</div>
	</div>
</section>

<!-- {#if !data.spaceSession}
	<div class="gap-3">
		<div class="px-6  min-h-100 overflow-auto mx-3 pt-3 pb-20">
			
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
						<A rel="external" href={`/a/${$page.params['app_id']}/accounts/reset-pass`}
							>I forgot my password</A
						>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if} -->

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
