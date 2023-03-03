<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	// import Prism from 'svelte-prism';

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
	const tableName = $page.params.table;
	const spaceName = $page.params.space;
	const table = data?.table;
	console.log(table);
</script>

<div class="my-3 mx-6  flex  text-2xl text-gray-500">
	<p class="mr-2">
		{spaceName}
	</p>
	/
	<b class="text-3xl ml-2">{tableName}</b>
</div>

<div class="mt-3 px-6">
	<Breadcrumb>
		<BreadcrumbItem>Home</BreadcrumbItem>
		<BreadcrumbItem>Api</BreadcrumbItem>
		<BreadcrumbItem>
			{spaceName}
		</BreadcrumbItem>
		<BreadcrumbItem>
			{tableName}
		</BreadcrumbItem>
		<BreadcrumbItem>Rest</BreadcrumbItem>
	</Breadcrumb>
</div>
{#if !data?.space?.apiChannel}
	<div class="my-6 mx-6">
		<Alert>
			<p><b>Unauthorized</b></p>
			<p class="my-3">API has been disabled in this platform</p>
			<a class="hover:underline" href={`/spaces/${spaceName}`}>Enable</a>
		</Alert>
	</div>
{/if}

{#if !data?.table?.columns?.length && data?.space?.apiChannel}
	<div class="my-6 mx-6">
		<Alert>
			<p><b>Configuration error</b></p>
			<p class="my-3">Missing schema</p>
			<a class="hover:underline" href={`/base/${spaceName}/${tableName}/schema/create`}
				>Add schema</a
			>
		</Alert>
	</div>
{/if}

{#if data?.table?.columns?.length && data?.space?.apiChannel}
	<div class="mt-6 px-6">
		<Card class="text-left" size="xl" padding="xl">
			<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">Find Many</h5>
			<p class="text-lg my-3">Endpoint: <b>{`/api/${tableName}`}</b></p>
			<Tabs>
				<TabItem open title="cURL" />
				<TabItem title="JS">
					<div class="mb-4">Vanilla js</div>
					<!-- <Prism language="javascript">
						{`test('Check title', async () => {
							const title = await firstWindow.title();
							expect(title).toBe('MEMENTO - Svelte, TailwindCSS, Electron and TypeScript');
						});`}
					</Prism> -->
				</TabItem>
				<TabItem title="PY" />
				<TabItem title="Rust" />
				<TabItem title="PHP" />
				<TabItem title="C#" />
				<TabItem title="Java" />
			</Tabs>
			<!-- <div class="my-3">
				<Toggle>Disable</Toggle>
			</div> -->
			<div>
				<!-- <p class="mb-3">Allowed filters</p>

				<div class="grid grid-cols-4 gap-4 ">
					<Checkbox>Limit</Checkbox>
					<Checkbox>Skip</Checkbox>
					{#each table?.columns?.filter((item) => item.type !== 'password') ?? [] as column}
						<div>
							<Checkbox>
								{column.name}
							</Checkbox>
						</div>
					{/each}
				</div> -->
			</div>
			<div class="mt-3">
				<p class="mb-3">Require permissions</p>
				{#each data?.table?.requiredPermission ?? [] as permission}
					<div>
						<Checkbox bind:value={permission.value} bind:checked={permission.checked} disabled>
							{permission.name}
						</Checkbox>
					</div>
				{/each}
				<!-- <div class="my-3">
					<hr />
				</div>
				{#each data?.permissions ?? [] as column}
					<div>
						<Checkbox>
							{column.name}
						</Checkbox>
					</div>
				{/each} -->
			</div>
		</Card>
	</div>
	<div class="mt-6 px-6">
		<Card class="text-left" size="xl" padding="xl">
			<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">Find First</h5>
			<p class="text-lg my-3">Endpoint: <b>{`/api/${tableName}`}</b></p>
			<Tabs>
				<TabItem open title="cURL" />
				<TabItem title="JS" />
				<TabItem title="PY" />
				<TabItem title="Rust" />
				<TabItem title="PHP" />
				<TabItem title="C#" />
				<TabItem title="Java" />
			</Tabs>
			<!-- <div class="my-3">
				<Toggle>Disable</Toggle>
			</div> -->
			<!-- <div>
				<div class="grid grid-cols-4 gap-4 ">
					{#each table?.columns?.filter((item) => item.type !== 'password') ?? [] as column}
						<div>
							<Checkbox>
								{column.name}
							</Checkbox>
						</div>
					{/each}
				</div>
			</div> -->
			<div class="mt-3">
				<p class="mb-3">Require permissions</p>
				{#each data?.table?.requiredPermission ?? [] as permission}
					<div>
						<Checkbox bind:value={permission.value} bind:checked={permission.checked} disabled>
							{permission.name}
						</Checkbox>
					</div>
				{/each}
			</div>
		</Card>
	</div>

	<div class="mt-6 px-6">
		<Card class="text-left" size="xl" padding="xl">
			<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">Find Unique</h5>
			<p class="text-lg my-3">Endpoint: <b>{`/api/${tableName}`}</b></p>
			<Tabs>
				<TabItem open title="cURL" />
				<TabItem title="JS" />
				<TabItem title="PY" />
				<TabItem title="Rust" />
				<TabItem title="PHP" />
				<TabItem title="C#" />
				<TabItem title="Java" />
			</Tabs>
			<!-- <div class="my-3">
				<Toggle>Disable</Toggle>
			</div> -->
			<div>
				<!-- <p class="mb-3">Allowed filters</p>

				<div class="grid grid-cols-4 gap-4 ">
					{#each table?.columns?.filter((item) => item.type !== 'password') ?? [] as column}
						<div>
							<Checkbox>
								{column.name}
							</Checkbox>
						</div>
					{/each}
				</div> -->
			</div>
			<div class="mt-3">
				<p class="mb-3">Require permissions</p>
				{#each data?.table?.requiredPermission ?? [] as permission}
					<div>
						<Checkbox bind:value={permission.value} bind:checked={permission.checked} disabled>
							{permission.name}
						</Checkbox>
					</div>
				{/each}
			</div>
		</Card>
	</div>

	<div class="mt-6 px-6">
		<Card class="text-left" size="xl" padding="xl">
			<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">Update</h5>
			<p class="text-lg my-3">Endpoint: <b>{`/api/${tableName}/:id`}</b></p>
			<Tabs>
				<TabItem open title="cURL" />
				<TabItem title="JS" />
				<TabItem title="PY" />
				<TabItem title="Rust" />
				<TabItem title="PHP" />
				<TabItem title="C#" />
				<TabItem title="Java" />
			</Tabs>
			<!-- <div class="my-3">
				<Toggle>Disable</Toggle>
			</div> -->
			<div>
				<!-- <p class="mb-3">Allowed filters</p>

				<div class="grid grid-cols-4 gap-4 ">
					{#each table?.columns?.filter((item) => item.type !== 'password') ?? [] as column}
						<div>
							<Checkbox>
								{column.name}
							</Checkbox>
						</div>
					{/each}
				</div> -->
			</div>
			<div class="mt-3">
				<p class="mb-3">Require permissions</p>
				{#each data?.table?.requiredPermission ?? [] as permission}
					<div>
						<Checkbox bind:value={permission.value} bind:checked={permission.checked} disabled>
							{permission.name}
						</Checkbox>
					</div>
				{/each}
			</div>
		</Card>
	</div>

	<div class="mt-6 px-6">
		<Card class="text-left" size="xl" padding="xl">
			<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">Delete</h5>
			<p class="text-lg my-3">Endpoint: <b>{`/api/${tableName}`}</b></p>
			<Tabs>
				<TabItem open title="cURL" />
				<TabItem title="JS" />
				<TabItem title="PY" />
				<TabItem title="Rust" />
				<TabItem title="PHP" />
				<TabItem title="C#" />
				<TabItem title="Java" />
			</Tabs>
			<!-- <div class="my-3">
				<Toggle>Disable</Toggle>
			</div> -->
			<div>
				<!-- <p class="mb-3">Allowed filters</p>

				<div class="grid grid-cols-4 gap-4 ">
					{#each table?.columns?.filter((item) => item.type !== 'password') ?? [] as column}
						<div>
							<Checkbox>
								{column.name}
							</Checkbox>
						</div>
					{/each}
				</div> -->
			</div>
			<div class="mt-3">
				<p class="mb-3">Require permissions</p>
				{#each data?.table?.requiredPermission ?? [] as permission}
					<div>
						<Checkbox bind:value={permission.value} bind:checked={permission.checked} disabled>
							{permission.name}
						</Checkbox>
					</div>
				{/each}
			</div>
		</Card>
	</div>
{/if}
