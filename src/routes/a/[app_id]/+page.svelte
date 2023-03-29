<script lang="ts">
	import {
		Alert,
		Button,
		Tabs,
		TabItem,
		Checkbox,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		A,
		List,
		Listgroup,
		ListgroupItem
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	const apps = $page.data.myapps;
	const space = $page.data.space;
	let activeTab = $page.url.searchParams.get('tab') ?? 'home';
	import { goto } from '$app/navigation';
	import PermissionDialog from '../../preferences/[app_id]/PermissionDialog.svelte';
	let appId = $page.params["app_id"];
	const onboarding = space.onboarding[0];
	const interest = JSON.parse(onboarding?.stepCoding ?? '');
	export let form: any;
</script>

<section class=" lg:px-9 lg:grid-cols-2  dark:bg-gray-900 max-h-109 overflow-auto">
	<div class=" px-4  pt-3 max-w-screen-xl ">
		<div>
			<Tabs>
				<TabItem open={activeTab === 'home'} on:click={() => goto('?tab=home')} title="Quick start">
					<div>
						<Alert dismissable class="mb-6">
							<p class="text-lg font-extrabold">Collections</p>
							<p class="my-3">Schema and API</p>
							<Button size="xs" gradient rel="external" href={`/base/${space.appId}`}>
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
							<Button size="xs" gradient rel="external" href={`/base/${space.appId}/table/create`}>
								Add Collections
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

						<Alert dismissable class="mb-6">
							<p class="text-lg font-extrabold">Preferences</p>
							<p class="my-3">
								Payments, sms & e-mail, file storage, API Keys, Admin, Authorization, Logistics
								e.t.c
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

						<Alert dismissable class="mb-4 w-full">
							<p class="text-lg font-extrabold">Add data</p>
							<p class="my-3" />
							<div class="grid gap-4 lg:grid-cols-2">
								{#each space.tables.concat({ name: 'users' }) as table}
									<div class="my-4  w-96">
										<div class="mb-2">
											{table.name}
										</div>
										<ul
											class=" w-96 pl-4 dark:text-gray-50 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
										>
											<li>
												<A
													rel="external"
													href={`/dashboards/${space.appId}/${table.name}/overview?tab=import`}
													>Import CSV/JSON</A
												>
											</li>
											<li>
												<A rel="external" href={`/dashboards/${space.appId}/${table.name}/create`}
													>Add manually</A
												>
											</li>
											<li>
												<A
													rel="external"
													href={`/dashboards/${space.appId}/${table.name}/overview?tab=forms`}
													>Create Form link</A
												>
											</li>
											<li>
												<A rel="external" href={`/base/${space.appId}/${table.name}/api`}
													>Rest API</A
												>
											</li>
										</ul>
									</div>
								{/each}
							</div>
						</Alert>

						<Alert dismissable class="mb-4 w-full">
							<p class="text-lg font-extrabold">Insights and analytics</p>
							<p class="my-3" />
							<div class="grid gap-4 lg:grid-cols-2">
								{#each space.tables as table}
									<div class="my-4  w-96">
										<div class="mb-2">
											{table.name}
										</div>
										<ul
											class=" w-96 pl-4 dark:text-gray-50 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
										>
											<li><A href="/">Generate charts</A></li>
											<li><A href="/">Query reports</A></li>
											<li><A href="/">AI Analytics</A></li>
										</ul>
									</div>
								{/each}
							</div>
						</Alert>
						<Alert dismissable class="mb-4 w-full">
							<p class="text-lg font-extrabold">Export data</p>
							<p class="my-3" />
							<div class="grid gap-4 lg:grid-cols-2">
								{#each space.tables as table}
									<div class="my-4  w-96">
										<div class="mb-2">
											{table.name}
										</div>
										<ul
											class=" w-96 pl-4 dark:text-gray-50 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
										>
											<li><A href="/">Export CSV/JSON</A></li>
											<li><A href="/">Export PDF</A></li>
											<li><A href="/">Export Tensorflowjs Model</A></li>
											<li><A href="/">Generate receipts, invoices etc...</A></li>
										</ul>
									</div>
								{/each}
							</div>
						</Alert>
					</div>
				</TabItem>
				<TabItem
					open={activeTab === 'recently_opened'}
					on:click={() => goto('?tab=recently_opened')}
					title="Recently opened"
				>
					{#each JSON.parse($page.data.recentlyOpened) as opened}
						<div class="dark:text-gray-100">
							<A href={`${opened.url}`}>{opened.key} - {opened.app}</A>
						</div>
					{/each}
				</TabItem>
				<TabItem
					open={activeTab === 'domains'}
					on:click={() => goto('?tab=domains')}
					title="Domains"
				>
					<div class="my-9">
						<form method="POST" action="?/updateChannels&tab=domains">
							<Checkbox
								bind:checked={space.apiChannel}
								bind:value={space.apiChannel}
								name="apiChannel"
								id="apiChannel"
								class="mb-4 text-gray-500">Rest API</Checkbox
							>
							<Checkbox
								bind:checked={space.miniAppChannel}
								bind:value={space.miniAppChannel}
								id="miniAppChannel"
								name="miniAppChannel"
								class="mb-4 text-gray-500">Spaces super app</Checkbox
							>
							<Checkbox
								bind:checked={space.subdomainChannel}
								id="subdomainChannel"
								name="subdomainChannel"
								bind:value={space.subdomainChannel}
								class="mb-4 text-gray-500">Spaces Subdomain</Checkbox
							>
							<Checkbox
								bind:checked={space.customDomainChannel}
								bind:value={space.customDomainChannel}
								id="customDomainChannel"
								name="customDomainChannel"
								class="mb-4 text-gray-500">Custom domain</Checkbox
							>
							<Checkbox
								bind:checked={space.standaloneMobileChannel}
								bind:value={space.standaloneMobileChannel}
								id="standaloneMobileChannel"
								name="standaloneMobileChannel"
								class="mb-4 text-gray-500">Standalone mobile</Checkbox
							>
							<Checkbox
								bind:checked={space.standaloneDesktopChannel}
								bind:value={space.standaloneDesktopChannel}
								name="standaloneDesktopChannel"
								id="standaloneDesktopChannel"
								class="mb-4 text-gray-500">Standalone desktop</Checkbox
							>
							<Button type="submit">Update</Button>
						</form>
					</div>
				</TabItem>
				<TabItem title="Roles" open={activeTab === 'roles'} on:click={() => goto('?tab=roles')}>
					<PermissionDialog />

					{#if form?.roleSuccess}
						<div class="dark:text-gray-100">Role has been added</div>
					{/if}

					<Table class="mt-9">
						<TableHead>
							<TableHeadCell>Name</TableHeadCell>
							<TableHeadCell>Role</TableHeadCell>
							<TableHeadCell>Date Added</TableHeadCell>
							<TableHeadCell />
						</TableHead>
						<TableBody>
							{#each space.roles as role}
								<TableBodyRow>
									<TableBodyCell>{role.name}</TableBodyCell>
									<TableBodyCell
										>{#if role.isSuperUser}
											<Button size="xs" pill color="red">
												<span class="text-xs"> SUPER_USER </span>
											</Button>
										{:else}
											<Button size="xs" pill color="blue">
												<span class="text-xs"> {role.name.toUpperCase()}</span>
											</Button>
										{/if}
									</TableBodyCell>
									<TableBodyCell>{role.created}</TableBodyCell>
									<TableBodyCell><a href="/edit">Edit</a></TableBodyCell>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</TabItem>
			</Tabs>
		</div>
	</div>
</section>
