<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import {
		Card,
		Breadcrumb,
		BreadcrumbItem,
		Toggle,
		Tabs,
		TabItem,
		Button,
		Checkbox,
		Alert
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import Request from '../[table]/api/Request.svelte';
	const spaceName = $page.params.space;
</script>

<div class="my-3 mx-6  flex justify-between text-3xl text-gray-500">
	<p>
		{spaceName}
	</p>
</div>

<div class="mt-3 px-6">
	<Breadcrumb>
		<BreadcrumbItem>Home</BreadcrumbItem>
		<BreadcrumbItem>Api</BreadcrumbItem>
		<BreadcrumbItem>
			{spaceName}
		</BreadcrumbItem>
		<BreadcrumbItem>Rest Auth</BreadcrumbItem>
	</Breadcrumb>
</div>
{#if !data?.space?.apiChannel}
	<div class="px-6">
		<Alert class="mt-6">
			<p><b>Unauthorized</b></p>
			<p class="my-3">Rest API disabled for this space.</p>
			<a class="hover:underline" href={`/spaces/${spaceName}?tab=channels`}
				>Click to enable in channels</a
			>
		</Alert>
	</div>
{/if}
{#if data?.space?.apiChannel}
	<div class="mt-6 px-6">
		<Card class="text-left" size="xl" padding="xl">
			<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">Signup</h5>
			<p class="text-lg my-3">Endpoint: <b>{`/api/signup`}</b></p>
			<Tabs>
				<TabItem open title="Simulate">
					<Request
						table={{
							columns: [
								{
									name: 'email',
									type: 'email'
								},
								{
									name: 'name',
									type: 'string'
								},
								{
									name: 'password',
									type: 'password'
								}
							]
						}}
						action="signup"
						url={`${$page.url.origin}/api/auth/register/`}
						method={'post'}
					/>
				</TabItem>
				<TabItem title="cURL" />
				<TabItem title="JS" />
				<TabItem title="PY" />
				<TabItem title="Rust" />
				<TabItem title="PHP" />
				<TabItem title="C#" />
				<TabItem title="Java" />
			</Tabs>

			<!-- <div class="mt-3">
				<p class="mb-3">Require permissions</p>
				{#each data?.permissions ?? [] as column}
					<div>
						<Checkbox>
							{column.name}
						</Checkbox>
					</div>
				{/each}
			</div> -->
			<!-- <Button class="mt-3">Update preferences</Button> -->
		</Card>
	</div>

	<div class="mt-6 px-6">
		<Card class="text-left" size="xl" padding="xl">
			<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">Signin</h5>
			<p class="text-lg my-3">Endpoint: <b>{`/api/signin`}</b></p>
			<Tabs>
				<TabItem open title="Simulate">
					<Request
						table={{
							columns: [
								{
									name: 'email',
									type: 'email'
								},
								{
									name: 'password',
									type: 'password'
								}
							]
						}}
						action="signin"
						url={`${$page.url.origin}/api/auth/register/`}
						method={'post'}
					/>
				</TabItem>
				<TabItem title="cURL" />
				<TabItem title="JS" />
				<TabItem title="PY" />
				<TabItem title="Rust" />
				<TabItem title="PHP" />
				<TabItem title="C#" />
				<TabItem title="Java" />
			</Tabs>
			<!-- <div class="my-3">
				<Toggle>Disable</Toggle>
			</div>

			<div class="mt-3">
				<p class="mb-3">Require permissions</p>
				{#each data?.permissions ?? [] as column}
					<div>
						<Checkbox>
							{column.name}
						</Checkbox>
					</div>
				{/each}
			</div>
			<Button class="mt-3">Update preferences</Button> -->
		</Card>
	</div>
{/if}
