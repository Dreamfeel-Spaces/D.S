<script lang="ts">
	//@ts-nocheck
	import { Tabs, TabItem, Checkbox, Button, Select, Alert } from 'flowbite-svelte';
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
		TableHeadCell
	} from 'flowbite-svelte';
	import AdminModal from '$lib/components/AdminModal.svelte';
</script>

<div class="mx-9 mt-6">
	<Tabs>
		<TabItem open title="Channels">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Channels:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua.
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
		<TabItem title="API Keys">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua.
			</p>
			{#if data.space.apiChannel}
				<div class="mt-6">
					<a rel="external" href={`/spaces/${data?.space?.id}/apikeys`}>Create new Api Key</a>
				</div>

				<div class="mt-9">
					{#if !data?.space?.apiKeys.length}
						<p class="text-sm mb-6 text-gray-500 dark:text-gray-400">
							<b>Sorry:</b> No API Keys have been generated for this space.
						</p>
					{/if}
					{#each data?.space?.apiKeys ?? [] as key}
						<div class="mb-6 text-gray-500">
							<p><b>Encrypted Key:</b> {key.key}</p>
							<p><b>Date Created:</b> {key.dateCreated}</p>
							<p><b>Expires:</b> {key.expires ?? 'Not set'}</p>
							<p><b>Created by:</b> {key.createdBy?.name}</p>
							<Button class="my-2 w-full">Delete</Button>
							<hr />
						</div>
					{/each}
				</div>
			{:else}
				<div class="mt-9">
					<Alert class="bg-green">
						Your apps's api has been disabled. Please enable REST API in channels and try again
					</Alert>
				</div>
			{/if}
		</TabItem>
		<TabItem title="Config vars">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua.
			</p>
			<div class="my-6">
				<a href={`/spaces/${data?.space?.id}/config-vars`}>Add</a>
			</div>

			{#each data?.space?.configVars ?? [] as item}
				<div class="mb-6 text-gray-500">
					<p class="text-lg"><b>{item.key}:</b> {item.value}</p>
					<Button class="my-2 w-full">Delete</Button>
					<hr />
				</div>
			{/each}
		</TabItem>
		<TabItem title="Media/Files">
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
		<TabItem title="Admins">
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
					<TableHeadCell>ID</TableHeadCell>
					<TableHeadCell>Email</TableHeadCell>
					<TableHeadCell>Date added</TableHeadCell>
					<TableHeadCell>Date updated</TableHeadCell>
				</TableHead>
				<TableBody class="divide-y">
					{#each data.space.admins as admin}
						<TableBodyRow>
							<TableBodyCell>{admin.user?.id}</TableBodyCell>
							<TableBodyCell>{admin?.user?.email}</TableBodyCell>
							<TableBodyCell>{admin?.createdAt ?? ''}</TableBodyCell>
							<TableBodyCell>{admin?.updatedAt ?? ''}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</TabItem>
		<TabItem title="Mail">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua.
			</p>
		</TabItem>
	</Tabs>
</div>
