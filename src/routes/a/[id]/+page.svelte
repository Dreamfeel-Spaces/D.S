<script lang="ts">
	import { Alert, Button, Tabs, TabItem } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
	let appId = $page.params.id;
	const app = (apps ?? []).find((app: any) => app.appId === appId);
</script>

<section class=" lg:px-48 lg:grid-cols-2  dark:bg-gray-900 max-h-99 overflow-auto">
	<div style="align-items:center " class=" flex justify-center pt-">
		<div>
			<h1
				class="mb-4 text-4xl px-16 font-extrabold tracking-tight leading-none text-gray-600 md:text-5xl lg:text-6xl dark:text-white"
			>
				{app?.name}
			</h1>
		</div>
	</div>

	<div class=" px-4  pt-3 max-w-screen-xl ">
		<div>
			<Tabs>
				<TabItem open title="Home">
					<div>
						<Alert class="mb-6">
							<p class="text-lg font-extrabold">Preferences</p>
							<p class="my-3">
								Configure space channels, payment providers, file storage, add administrators
							</p>
							<Button size="xs" gradient rel="external" href={`/spaces/${appId}`}>
								Update Preferences
								<svg
									class="ml-2 -mr-1 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/></svg
								>
							</Button>
						</Alert>
						<Alert class="mb-6">
							<p class="text-lg font-extrabold">Collections</p>
							<p class="my-3">Add collections schema, configure RESTful API's</p>
							<Button size="xs" gradient rel="external" href={`/base/${appId}`}>
								Collections API
								<svg
									class="ml-2 -mr-1 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/></svg
								>
							</Button>
						</Alert>

						<Alert class="mb-4">
							<p class="text-lg font-extrabold">Dashboards</p>
							<p class="my-3">Add/manage collection data, create custom reports</p>
							<Button size="xs" gradient rel="external" href={`/dashboards/${appId}`}>
								Dashboards
								<svg
									class="ml-2 -mr-1 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/></svg
								>
							</Button>
						</Alert>

						<Alert class="mb-6">
							<p class="text-lg font-extrabold">Editor <span class="text-xs">(preview)</span></p>
							<p class="my-3">Add/manage collection data, create custom reports</p>
							<Button size="xs" gradient rel="external" href={`/editor/${appId}`}>
								UI editor
								<svg
									class="ml-2 -mr-1 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/></svg
								>
							</Button>
						</Alert>
					</div>
				</TabItem>
				<!-- <TabItem title="Config" /> -->
			</Tabs>
		</div>
	</div>
</section>
