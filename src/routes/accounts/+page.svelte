<script>
	import { Button, Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
	import logo from '../../assets/logo.png';
	import { signIn } from '@auth/sveltekit/client';
</script>

{#if !$page.data.session}
	<section class="bg-white dark:bg-gray-900">
		<div class="grid grid-cols-2">
			<div
				style="align-items: center;"
				class="flex justify-center text-center bg-gray-100 min-h-108 text-gray-500 text-2xl overflow-auto"
			>
				<div>
					<img loading="lazy" src={logo} alt="" />
					<p>Dreamfeel Spaces</p>
				</div>
			</div>
			<div class="py-8 px-4 mx-auto max-w-screen-xl  lg:py-16 ">
				<div class="text-center text-4xl mb-9 text-gray-600">
					<h1>Sign in</h1>
				</div>
				<p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16  dark:text-gray-400">
					Here at Dreamfeel Spaces we focus on markets where technology, innovation, and capital can
					unlock long-term value and drive economic growth.
				</p>
				<div class="px-16">
					<button
						on:click={() => signIn('google')}
						class="w-full justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
					>
						Sign in with Google
					</button>
					<div>
						<Button on:click={() => signIn('github')} color="dark" class="w-full mt-9"
							>Sign in with GitHub</Button
						>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if $page.data.session}
	Hehe
{/if}
