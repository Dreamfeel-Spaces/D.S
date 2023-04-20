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
	let activeTab = $page.url.searchParams.get('tab') ?? 'apikeys';
	let password = '';
	let confirmPassword = '';
</script>

<div class="flex min-h-112">
	<div class="flex-1" style="max-height:85vh; overflow:auto">
		<div class="px-6 mt-3">
			<Breadcrumb>
				<BreadcrumbItem href="/" rel="external">Home</BreadcrumbItem>
				<BreadcrumbItem href="/spaces" rel="external">Spaces</BreadcrumbItem>
				<BreadcrumbItem rel="external" href={`/spaces/${data?.space?.appId}`}
					>{data.space.name}</BreadcrumbItem
				>
				<BreadcrumbItem disabled>Admin</BreadcrumbItem>
			</Breadcrumb>
			<Tabs class="mt-4">
				<!-- <TabItem
					open={activeTab === 'channels'}
					on:click={() => goto('?tab=channels')}
					title="Dashboards"
				>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						<b>Chann</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</p>
					<div class="flex mb-6">
						<div class="flex-1" />
						<div class="mt-9">
							<DashboardDialog permissions={data.space.permissions} />
						</div>
					</div>
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
				</TabItem> -->
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
							<a rel="external" href={`/preferences/${data?.space?.appId}/apikeys`}>
								<Button size="xs" pill gradient>Add Api Key</Button></a
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
							{#each data.space.users as admin}
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

				<TabItem
					open={activeTab === 'rules'}
					on:click={() => goto('?tab=rules')}
					title="Authorization"
				>
					<div class="flex">
						<div class="flex-1" />
						<RuleDialog />
						<!-- <div class="mx-3">
							<PermissionDialog />
						</div> -->
					</div>
					<Accordion class="mt-6">
						<AccordionItem>
							<svelte:fragment slot="header">Roles</svelte:fragment>
							{#each data?.space?.permissions ?? [] as permission}
								<Card size="xl">
									<div class="flex justify-between">
										<div>
											<p class="text-l">
												{permission.name}
											</p>
											<small>{permission.description}</small>
										</div>

										<CloseButton />
									</div>
								</Card>
								{#if !data?.space?.permissions.length}
									<div>No permissions have been added</div>
								{/if}
							{/each}
						</AccordionItem>
						<AccordionItem>
							<svelte:fragment slot="header">Providers</svelte:fragment>
							<div class="mt-3">
								<Card size="xl">
									<p>Auth providers</p>
									<div class="mt-6">
										<Select />
									</div>
								</Card>
							</div>
						</AccordionItem>
						<AccordionItem>
							<svelte:fragment slot="header">Token Options</svelte:fragment>
							<div class="mt-3">
								<Card size="xl">
									<p>Auth providers</p>
									<div class="mt-6">
										<Select />
									</div>
								</Card>
							</div>
						</AccordionItem>
					</Accordion>
				</TabItem>

				<TabItem
					open={activeTab === 'settings'}
					on:click={() => goto('?tab=settings')}
					title="Settings"
				>
					{#if form?.passwordUpdate}
						<p>Password updated</p>
					{/if}
					<div class="mt-9">
						{#if form?.apiUpdateSuccess}
							<div class="my-9">
								<Alert>Channels have been updated</Alert>
							</div>
						{/if}
						<Accordion>
							<!-- <AccordionItem>
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
										<div class="ml-2">Channels</div>
									</div>
								</svelte:fragment>
								<div class="my-9">
									<form method="POST" action="?/updateChannels&tab=settings">
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
							</AccordionItem> -->

							<AccordionItem>
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
										<div class="ml-2">Mail</div>
									</div>
								</svelte:fragment>
							</AccordionItem>
							<AccordionItem>
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
										<div class="ml-2">SMS</div>
									</div>
								</svelte:fragment>
							</AccordionItem>
							<AccordionItem>
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
										<div class="ml-2">Storage (files/media)</div>
									</div>
								</svelte:fragment>
							</AccordionItem>
							<AccordionItem>
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
										<div class="ml-2">Payment providers</div>
									</div>
								</svelte:fragment>
							</AccordionItem>
							<AccordionItem>
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
										<div class="ml-2">Logistics providers</div>
									</div>
								</svelte:fragment>
							</AccordionItem>
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
										<div class="ml-2">Password</div>
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
	<div
		class="w-36 dark:bg-gray-900 dark:text-gray-50  ml-2  pl-4 mr-20  hidden md:block lg:block rounded align-middle  h-72"
	>
		<div>
			<div class="mt-20">
				<a class="hover:underline text-blue" rel="external" href={`/rest/${$page.params["app_id"]}`}
					>Collections API</a
				>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" rel="external" href={`/dashboards/${$page.params["app_id"]}`}
					>Dashboard</a
				>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" rel="external" href={`/editor/${$page.params["app_id"]}`}
					>UI Builder</a
				>
			</div>
			<div class="mt-6">
				<a class="hover:underline text-blue" rel="external" href={`/${$page.params["app_id"]}`}>Website</a>
			</div>
		</div>
	</div>
</div>
