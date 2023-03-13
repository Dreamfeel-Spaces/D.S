<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	export let data: PageData;
	// import Prism from 'svelte-prism';

	import {
		Card,
		Breadcrumb,
		BreadcrumbItem,
		Accordion,
		Tabs,
		TabItem,
		AccordionItem,
		Checkbox,
		Alert,
		Input,
		Label,
		Button
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import Request from './Request.svelte';
	const tableName = $page.params.table;
	const spaceName = $page.params.space;
	const table = data?.table;
	const origin = $page.url.origin;
</script>

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

<div>
	{#if data?.table?.columns?.length && data?.space?.apiChannel}
		<div class="mt-6 px-6  overflow-auto">
			<Card class="text-left" size="xl" padding="xl">
				<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">CREATE</h5>
				<div class="text-right mb-6">
					<div>
						<pre>
							{`${origin}/api/records/${tableName}`}
						</pre>
						<div>POST</div>
					</div>
				</div>
				<Tabs>
					<TabItem open title="Simulate">
						<Request
							{table}
							action="create"
							url={`${origin}/api/records/${tableName}`}
							method={'get'}
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

		<div class="mt-6 px-6  overflow-auto">
			<Card class="text-left" size="xl" padding="xl">
				<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">Find Many</h5>
				<div class="text-right mb-6">
					<div>
						<pre>
							{`${origin}/api/records/${tableName}`}
						</pre>
						<div>GET</div>
					</div>
				</div>
				<Tabs>
					<TabItem open title="Simulate">
						<Request action="find_many" url={`${origin}/api/records/${tableName}`} method={'get'} />
					</TabItem>
					<TabItem title="cURL" />
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
				<Accordion>
					<AccordionItem>
						<svelte:fragment slot="header">
							<p class="mb-3">Permissions</p>
						</svelte:fragment>
						{#each data?.permissions.map((perm, index) => {
							const withVals = data.table.requiredPermission.find((i) => perm.name === i.name);
							return { ...perm, ...withVals };
						}) ?? [] as permission}
							<div>
								<Checkbox bind:value={permission.value} bind:checked={permission.checked} disabled>
									{permission.name}
								</Checkbox>
							</div>
						{/each}
					</AccordionItem>
				</Accordion>
				<div class="mt-3">
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
				<h5 class="mb-2 text-3xl font-bold text-gray-600 dark:text-white">Find Unique</h5>
				<div class="text-right">
					<pre>
						{`${origin}/api/records/${tableName}/:id`}
					</pre>
					<div>GET</div>
				</div>
				<Tabs>
					<TabItem open title="Simulate">
						<Request
							action="find_unique"
							singleItem
							url={`${origin}/api/records/${tableName}`}
							method={'get'}
							table={data?.table}
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

				<div />
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
				<div class="text-right">
					<pre>
						{`${origin}/api/records/${tableName}/:id`}
					</pre>
					<div>DELETE</div>
				</div>
				<Tabs>
					<TabItem open title="Simulate">
						<Request
							action="delete"
							singleItem
							url={`${origin}/api/records/${tableName}`}
							method={'get'}
							table={data?.table}
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

				<div />
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
</div>
