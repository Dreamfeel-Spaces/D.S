<script lang="ts">
	//@ts-nocheck
	import { Card, Button, Alert, Avatar } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import DemoCredentials from './DemoCredentials.svelte';
	import { passwordResetDialog } from '$lib/wsstore';
	import logo from '$lib/assets/beta-logo.png';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	const space = $page.data.space;

	const appId = $page.params['app_id'];
	const isDemo = appId === 'demo';

	export let data: PageData;
	export let form: any;

	let logging = false;
	let loginSuccess = false;
	let loginError = false;

	async function handlePasswordLessLogin() {
		try {
			logging = true;
			loginError = false;
			const response = await axios.post(`/a/svr/${$page.params.app_id}`);
			if (response) {
				goto(`/a/${$page.params.app_id}`, { invalidateAll: true }).then(() => {
					window.location.reload();
				});
			}
		} catch (error) {
			loginError = true;

			logging = false;
		}
	}

	// import { onMount } from 'svelte';
	// onMount(() => {
	// 	recentlyViewed.set({ [$page.url.pathname]: $page, ...$recentlyViewed });
	// });
</script>

<div class="hidden">
	<!-- <DarkMode/> -->
</div>

<svelte:head>
	<title>{space?.name}</title>
</svelte:head>

{#if !data.spaceSession?.user?.id}
	<section class="w dark:bg-black min-w-min">
		<div size="lg" class="w-full text-gray-800  mt-9 lg:py-0">
			<div
				class="w-full bg-white rounded-lg shadow dark:border md:mt-0  dark:mt-1 xl:p-0 dark:bg-black dark:border-gray-700"
			>
				<div class="p-6    space-y-2 md:space-y-3  sm:p-8">
					{#if true}
						<div class=" flex {isDemo ? 'justify-between' : 'justify-center'} text-xs ">
							<div>
								{#if space?.icon?.startsWith('http')}
									<Avatar
										rounded={false}
										size="lg"
										class="bg-transparent dark:bg-transparent"
										src={space?.icon}
									/>
								{:else}
									<Avatar
										rounded={false}
										size="lg"
										class="bg-transparent dark:bg-transparent"
										src={logo}
									/>
								{/if}
							</div>
							{#if isDemo}
								<div>
									<DemoCredentials />
								</div>
							{/if}
						</div>
					{/if}

					<h1
						class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
					>
						{space.name}
					</h1>
					{#if form?.error || loginError}
						<Alert dismissable size="xs" accent>{form?.data?.msg || 'An error occured'}</Alert>
					{/if}
					<h1
						class="text-xl font-bold text-center mt-9 leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white "
					>
						Sign in to {space?.name}
					</h1>
					{#if $page.data.session}
						<div class="flex justify-center">
							<button
								on:click={handlePasswordLessLogin}
								disabled={logging}
								class="dark:bg-white my-6 px-4 gap-3 rounded-xl font-extrabold shadow dark:text-gray-900 dark:hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 mx-20 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-b py-4 hover:bg-gray-700 focus:outline-none"
							>
								<img width={30} src={$page.data.session?.user?.image ?? logo} alt="" />
								{#if logging}
									<span> Logging in... </span>
								{:else}
									<span> Login as {$page.data.session?.user?.name} </span>
								{/if}
							</button>
						</div>
						<div class="text-center dark:text-white font-bold">-OR-</div>
					{/if}

					<form class="space-y-4 md:space-y-6" action="?/signin" method="POST">
						<div>
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
			<footer class="footer px-4 py-2">
				<div class="footer-content">
					<p class="text-xs my-3 text-gray-600 text-center">
						Powered by <a rel="external" target="blank" href="/">Dreamfeel Spaces</a>
					</p>
					<p class="text-xs my-3 text-gray-600 text-center">
					 <a rel="external" target="blank" href="/create">Create your space</a>
					</p>
				</div>
			</footer>
		</div>
	</section>
{/if}

{#if data.spaceSession?.user?.id}
	<Card size="lg" class="flex m-2 dark:bg-black dark:text-white">
		<div>
			<div class="my-9">
				<div class="flex justify-end">
					<Button on:click={() => passwordResetDialog.set({ open: true })} gradient size="xs"
						>Update</Button
					>
				</div>
				<div class="flex justify-center">
					<Avatar size="xl" />
				</div>
				<p class="mb-4">Profile</p>
				<p class="text-xl">Name: <span class="font-bold">{data.spaceSession.user?.name}</span></p>
				<p class="my-3 text-xl">
					Email : <span class="font-bold">{data.spaceSession.user?.username}</span>
				</p>
				<p class="text-xl">Role : {data.spaceSession.user?.role?.name}</p>
			</div>

			<form method="post" class="flex flex-col gap-4" action="?/signout">
				<Button type="submit">Sign Out</Button>
			</form>
		</div>
	</Card>
{/if}
