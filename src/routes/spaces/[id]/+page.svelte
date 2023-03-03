<script lang="ts">
	//@ts-nocheck
	import {
		Tabs,
		TabItem,
		Checkbox,
		Button,
		Select,
		Alert,
		Accordion,
		AccordionItem,
		Input
	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let space = data.space ?? { apiChannel: false, uploadProvider: '' };
	export let form;
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Breadcrumb,
		BreadcrumbItem,
		Card,
		CloseButton
	} from 'flowbite-svelte';
	import AdminModal from '$lib/components/AdminModal.svelte';
	import RuleDialog from './RuleDialog.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DashboardDialog from './DashboardDialog.svelte';
	let activeTab = $page.url.searchParams.get('tab') ?? 'channels';
	let password = '';
	let confirmPassword = '';
</script>

<div class="my-3 mx-9  text-3xl text-gray-500">
	{space?.name}
</div>

<div class="flex">
	<div class="flex-1" style="max-height:85vh; overflow:auto">
		<div class="px-6 mt-3">
			<Breadcrumb>
				<BreadcrumbItem>Home</BreadcrumbItem>
				<BreadcrumbItem>Spaces</BreadcrumbItem>
				<BreadcrumbItem>Item</BreadcrumbItem>
				<BreadcrumbItem disabled>Admin</BreadcrumbItem>
			</Breadcrumb>
			<Tabs class="mt-4">
				<TabItem
					open={activeTab === 'channels'}
					on:click={() => goto('?tab=channels')}
					title="Channels"
				>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						<b>Channels:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua.
					</p>

					<div class="my-9">
						<form method="POST" action="?/updateChannels">
							{#if form?.apiUpdateSuccess}
								<div class="my-9">
									<Alert>Channels have been updated</Alert>
								</div>
							{/if}
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
				<TabItem
					open={activeTab === 'apikeys'}
					on:click={() => goto('?tab=apikeys')}
					title="API Keys"
				>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						<b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</p>
					{#if data.space.apiChannel}
						<div class="mt-6 text-right">
							<a
								class="px-3 bg-blue-800 text-white py-3 rounded-xl "
								rel="external"
								href={`/spaces/${data?.space?.appId}/apikeys`}>Add Api Key</a
							>
						</div>

						<div class="mt-9">
							{#if !data?.space?.apiKeys.length}
								<p class="text-sm mb-6 text-gray-500 dark:text-gray-400">
									<b>Sorry:</b> No API Keys have been generated for this space.
								</p>
							{/if}
							<Accordion>
								{#each data?.space?.apiKeys ?? [] as key}
									<AccordionItem>
										<svelte:fragment slot="header">
											{key.name}
										</svelte:fragment>

										<div class="mb-6 text-gray-500">
											<p><b>Name:</b> {key.name}</p>
											<p><b>Requests:</b> {key.hits}</p>
											<p><b>Encrypted Key:</b> {key.key}</p>
											<p><b>Date Created:</b> {key.dateCreated}</p>
											<p><b>Expires:</b> {key.expires ?? 'Not set'}</p>
											<p><b>Created by:</b> {key.createdBy?.name}</p>
											<form action="?/deleteApiKey&tab=apikeys" method="post">
												<input name="id" id="id" value={key.id} type="hidden" />
												<Button type="submit" class="my-2 w-full">Delete</Button>
											</form>
											<hr />
										</div>
									</AccordionItem>
								{/each}
							</Accordion>
						</div>
					{:else}
						<div class="mt-9">
							<Alert class="bg-green">
								Your apps's api has been disabled. Please enable REST API in channels and try again
							</Alert>
						</div>
					{/if}
				</TabItem>
				<!-- <TabItem title="Config vars">
					<p class="text-sm text-gray-500 dark:text-gray-400">
						<b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</p>
					<div class="my-6">
						<a href={`/spaces/${data?.space?.appId}/config-vars`}>Add</a>
					</div>
		
					{#each data?.space?.configVars ?? [] as item}
						<div class="mb-6 text-gray-500">
							<p class="text-lg"><b>{item.key}:</b> {item.value}</p>
							<Button class="my-2 w-full">Delete</Button>
							<hr />
						</div>
					{/each}
				</TabItem> -->
				<TabItem
					open={activeTab === 'files'}
					on:click={() => goto('?tab=files')}
					title="Media/Files"
				>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						<b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</p>
					<div class="my-6">
						<Select
							bind:value={space.uploadProvider}
							items={[
								{
									name: 'AWS',
									value: 'aws'
								},
								{
									name: 'Cloudinary (images only)',
									value: 'cloudinary'
								},
								{
									name: 'Azure',
									value: 'azure'
								}
							]}
						/>
					</div>
					<Button class="w-full">Save</Button>
				</TabItem>
				<TabItem open={activeTab === 'admins'} on:click={() => goto('?tab=admins')} title="Admins">
					<p class="text-sm text-gray-500 dark:text-gray-400">
						<b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</p>
					{#if form?.adminSuccess}
						<div class="my-9">
							<Alert>
								{#if form.emailSent}
									Admin has been invited via email
								{:else}
									Admin has been added. Invite email sent
								{/if}
							</Alert>
						</div>
					{/if}
					<div class="mt-9">
						<AdminModal />
					</div>
					<Table class="mt-6">
						<TableHead>
							<TableHeadCell>Email</TableHeadCell>
							<TableHeadCell>Date added</TableHeadCell>
							<TableHeadCell>Date updated</TableHeadCell>
							<TableHeadCell>Status</TableHeadCell>
						</TableHead>
						<TableBody class="divide-y">
							{#each data.space.admins as admin}
								<TableBodyRow>
									<TableBodyCell>{admin?.username}</TableBodyCell>
									<TableBodyCell>{new Date(admin?.dateCreated) ?? ''}</TableBodyCell>
									<TableBodyCell>{admin?.updatedAt ?? ''}</TableBodyCell>
									<TableBodyCell
										>{admin.status === 'pending-confirmation' ? 'Pending' : 'Active'}</TableBodyCell
									>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</TabItem>
				<TabItem open={activeTab === 'mail'} on:click={() => goto('?tab=mail')} title="Mail">
					<p class="text-sm text-gray-500 dark:text-gray-400">
						<b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</p>
				</TabItem>
				<TabItem
					open={activeTab === 'rules'}
					on:click={() => goto('?tab=rules')}
					title="Permissions"
				>
					<div class="flex">
						<div class="flex-1" />
						<RuleDialog />
						<!-- <div class="mx-3">
							<PermissionDialog />
						</div> -->
					</div>
					<div class="mt-3">
						{#each data?.space?.permissions ?? [] as permission}
							<Card size="xl">
								<div class="flex justify-between">
									<p class="text-l">
										{permission.name}
									</p>
									<CloseButton />
								</div>
							</Card>
						{/each}

						{#if !data?.space?.permissions.length}
							<div>No permissions have been added</div>
						{/if}
					</div>
				</TabItem>
				<TabItem
					open={activeTab === 'authentication'}
					on:click={() => goto('?tab=authentication')}
					title="Authentication"
				>
					<Card size="xl">
						<p>Auth providers</p>
						<div class="mt-6">
							<Select />
						</div>
					</Card>
					<Card class="mt-3" size="xl">
						<p>Token options</p>
						<div class="mt-6">
							<Select />
						</div>
					</Card>
				</TabItem>
				<TabItem
					open={activeTab === 'settings'}
					on:click={() => goto('?tab=settings')}
					title="Settings"
				>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						<b>Deactivate:</b> Once deactivated, the space will be activated again after 14days. You
						can request reactivation by sending an email.
					</p>

					{#if form?.passwordUpdate}
						<p>Password updated</p>
					{/if}
					<div class="mt-9">
						<Accordion>
							<AccordionItem header="oij">
								<svelte:fragment slot="header">
									<div class="flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
											/></svg
										>
										<div class="ml-2">Administrator password</div>
									</div>
								</svelte:fragment>
								<div class="my-6">Set super admin password for authorization in spaces API.</div>

								<form method="post" action="?/updatePassword&tab=settings">
									<div class="mb-4">
										<Input
											name="password"
											id="password"
											bind:value={password}
											placeholder="Input new password"
											type="password"
										/>
									</div>
									<div class="mb-4">
										<Input
											bind:value={confirmPassword}
											placeholder="Confirm new password"
											type="password"
											name="confirmPassword"
											id="confirmPassword"
										/>
									</div>
									{#if password && confirmPassword && password !== confirmPassword}
										<small>Passwords do not match</small>
									{/if}
									<div>
										<Button type="submit" class="w-full">Save</Button>
									</div>
								</form>
							</AccordionItem>
						</Accordion>
						<Card size="xl">
							<div class="flex">
								<div class="text-2xl flex-1 text-gray-500">Dashboards</div>
								<div>
									<DashboardDialog permissions={data.space.permissions} />
								</div>
							</div>
							<hr class="my-2" />
							<Accordion>
								<AccordionItem header="oij">
									<svelte:fragment slot="header">
										<div class="flex">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
												/></svg
											>
											<div class="ml-2">Default</div>
										</div>
									</svelte:fragment>
									<div>
										<Checkbox disabled value={'true'} checked={true}>Space Owner</Checkbox>
										{#each data?.space?.permissions ?? [] as permission}
											<Checkbox class="mb-3">{permission.name}</Checkbox>
										{/each}
										<Button>Update</Button>
									</div>
								</AccordionItem>
								{#each data?.space?.dashboards ?? [] as dashboard}
									<AccordionItem header="oij">
										<svelte:fragment slot="header">
											<div class="flex">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-6 h-6"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
													/></svg
												>
												<div class="ml-2">{dashboard.name}</div>
											</div>
										</svelte:fragment>
										<div>
											<Checkbox disabled value={true} checked={true}>Space Owner</Checkbox>
											<Checkbox>Admin</Checkbox>
											{#each data?.space?.permissions ?? [] as permission}
												<Checkbox class="mb-3">{permission.name}</Checkbox>
											{/each}
											<Button>Update</Button>
										</div>
									</AccordionItem>
								{/each}
							</Accordion>
						</Card>
					</div>

					{#if form?.requireConfirmation}
						<Alert>
							<b> Confirm deletion </b>
							<form method="post" action="?/deleteSpace">
								<input
									type="hidden"
									name="confirmedSpaceDeletion"
									id="confirmedSpaceDeletion"
									value="true"
								/>
								<button>Delete</button>
							</form>
						</Alert>
					{/if}
					<form method="post" action="?/deleteSpace">
						<Button type="submit" class="w-full mt-9">Deactivate space</Button>
					</form>
				</TabItem>
			</Tabs>
		</div>
	</div>
	<div class="w-48  border mr-4  hidden md:flex lg:flex rounded align-middle justify-center h-72">
		<div>
			<div class="mt-20">
				<a class="hover:underline text-blue" href={`/base/${$page.params.id}`}>Collections API</a>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" href={`/dashboards/${$page.params.id}`}>Dashboard</a>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" href={`/editor/${$page.params.id}`}>UI Builder</a>
			</div>
		</div>
	</div>
</div>
