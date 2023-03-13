<script>
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
	import logo from '../../assets/logo.png';
</script>

<section class=" dark:bg-gray-900">
	<div class="grid grid-cols-2 gap-2 ">
		<div class="py-8 px-4  text-center max-w-screen-xl   lg:py-16 bg-gray-200">
			<div style="align-items:center" class="flex justify-center min-h-108 ">
				<div>
					<img src={logo} loading="lazy" alt="" />
					<p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl s dark:text-gray-400">
						Dreamfeel Spaces
					</p>
				</div>
			</div>
		</div>
		<div>
			<div class="px-6">
				<div class="grid grid-cols-4  mt-9 gap-3">
					{#each apps as app}
						<a rel="external" href={`/spaces/${app.appId}`}>
							<Card class="text-center">
								<div>
									{app.name}
								</div>
								<div class="text-xs">@{app.name}</div>
							</Card>
						</a>
					{/each}
					<a href="/spaces/create">
						<Card class="text-center">
							<div>+</div>
							<div class="text-xs">Create new</div>
						</Card>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
