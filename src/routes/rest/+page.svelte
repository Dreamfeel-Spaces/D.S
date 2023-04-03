<script>
	import { Card, Avatar, Heading, P } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
</script>

<section class=" min-h-112 pb-72 lg:px-48 dark:bg-gray-900">
	<div class="py-8 px-4 mx-auto max-w-screen-xl">
		<Heading class="mb-4">REST APIs</Heading>
		<P class="text-lg"
			>You have view / test /update rights to these Spaces' REST APIs. Select a space app to get
			started.</P
		>
	</div>
	<div class="px-6">
		<div class="grid grid-cols-4  gap-3">
			{#each apps as app}
				<a rel="external" href={`/rest/${app.appId}`}>
					<Card  class="text-center">
						<div class="flex mb-2 justify-center">
							<Avatar size="lg" src="/" />
						</div>
						<div>
							{app.name}
						</div>
						<div class="text-xs">@{app.appId}</div>
					</Card>
				</a>
			{/each}
			<a class="h-full" rel="external" href={`/spaces/create`}>
				<Card class="h-full text-center flex self-center">
					<div class="text-center h-full flex self-center w-full">
						<div>
							<div>+</div>
							<div class="text-xs">Create space</div>
						</div>
					</div>
				</Card>
			</a>
		</div>
	</div>
</section>
