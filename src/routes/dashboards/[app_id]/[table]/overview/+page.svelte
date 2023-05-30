<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	export let data: PageData;
	import {
		Tabs,
		TabItem,
		Breadcrumb,
		BreadcrumbItem,
		Checkbox,
		Button,
		Accordion,
		AccordionItem,
		Table,
		TableHead,
		TableBody,
		TableBodyRow,
		TableHeadCell,
		Input,
		NumberInput,
		Select,
		TableBodyCell,
		Alert,
		Card,
		P,
		A,
		Hr
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import DateTimeInput from '$lib/components/DateTimeInput.svelte';
	import ReportModal from './ReportModal.svelte';
	import ChartModal from './ChartModal.svelte';
	import SpaceChart from './SpaceChart.svelte';
	import FormModal from './FormModal.svelte';
	import ShareformModal from './ShareformModal.svelte';
	import SpaceCsv from './SpaceCSV.svelte';
	import SpaceJson from './SpaceJSON.svelte';
	import Request from '../../../../rest/[app_id]/[table]/endpoints/Request.svelte';
	const spaceName = $page.params['app_id'];
	const tableName = $page.params.table;
	let activeTab = $page.url.searchParams.get('tab') ?? 'reports';
	const activeSpace = data.myapps.find((app) => app.appId === spaceName);
	export let form: any;
	let selectedOptions: any = {};
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	onMount(() => {
		invalidateAll();
	});
</script>

<!-- <div>
	<div class="my-3 text-2xl text-gray-500 px-6 flex justify-between">
		<div class="flex-1">
			<Breadcrumb>
				<BreadcrumbItem>Home</BreadcrumbItem>
				<BreadcrumbItem>Dashboards</BreadcrumbItem>
				<BreadcrumbItem>
					{spaceName}
				</BreadcrumbItem>
				<BreadcrumbItem>{tableName}</BreadcrumbItem>
				<BreadcrumbItem>Overview</BreadcrumbItem>
			</Breadcrumb>
		</div>
	</div>
</div> -->

<section class="container max-auto max-w">
	<div class="xl min-h-full rounded-xl dark:bg-black">
		<div class=" p-3 overflow-auto ">
			<Tabs>
				<TabItem
					open={activeTab === 'reports'}
					on:click={() => goto('?tab=reports')}
					title="Reports"
				>
					<ReportModal columns={data.columns} />
					{#if form?.reportSuccess}
						Report has been saved
					{/if}
					<div class="pt-4 pr-4">
						{#if form?.shareReportSuccess}
							<Alert>
								<p>
									Report has been shared with {form?.data?.sharedWith}
								</p>
								<p>Link to report: {`${$page.url.origin}/reports/${form?.data.id}`}</p>
								<a target="blank" href={`/reports/${form?.data?.id}`}>View report</a>
							</Alert>
						{/if}
						{#if !data.reports?.length}
							<div class="flex items-center text-center self-center  ">
								<P class="mb-3 flex text-justify flex-wrap "
									>With reports you can query and group your data together onto an easy to
									manipulate tables. You can create events and perform tasks on these tables, share,
									generate charts, get AI powered analytics and insights on the reports.<A />
								</P>
							</div>
							<Alert class="mt-1 my-20" accent>You havent added any reports</Alert>
						{/if}
					</div>

					<div class="relative overflow-x-auto">
						<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead
								class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
							>
								<tr>
									<th scope="col" class="px-6 py-3"> Name </th>
									<th scope="col" class="px-6 py-3"> Description </th>
									<th scope="col" class="px-6 py-3"> Share </th>
									<th scope="col" class="px-6 py-3"> View </th>
								</tr>
							</thead>
							<tbody>
								{#each data.reports as report}
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{report.name}
										</th>
										<td class="px-6 py-4"> {report?.description} ?? - </td>
										<td class="px-6 py-4">
											<ShareformModal
												type="report"
												tab="reports"
												title={report.name}
												description={report.description}
												itemId={report.id}
												reports={data.reports}
												tables={data.space.tables}
												permissions={data.permissions}
											/>
										</td>
										<td class="px-6 py-4">
											<a
												href={`/dashboards/${$page.data.space.appId}/${$page.params.table}/overview/r/${report.id}`}
												class="text-sm font-medium "
											>
												View
											</a>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</TabItem>
				<TabItem
					open={activeTab === 'charts'}
					on:click={() => goto('?tab=charts', { invalidateAll: true })}
					title="Analytics"
				>
					<ChartModal columns={data.columns} />
					{#if !data.charts.length}
						<div class="lg:px-6 max-w-xl">
							<P class="my-3  text-justify"
								>Visualize your API data with rich interactive graphs. Generate insights and
								analytics with AI and visualize with charts.
							</P>
							<Alert accent class="my-9">You haven't added any charts</Alert>
						</div>
					{/if}
					<div class="mt-3 grid lg:grid-cols-2 grid-cols-1 gap-2">
						{#each data.charts as chart}
							<Card draggable size="lg">
								<div class="text-2xl text-gray-500">
									<SpaceChart rows={data.rows} {chart} />
								</div>
							</Card>
						{/each}
					</div>
					<Hr class="mb-4" />
				</TabItem>
				<TabItem open={activeTab === 'forms'} on:click={() => goto('?tab=forms')} title="Forms">
					<FormModal columns={data.columns} />
					{#if form?.formSuccess}
						Form has been saved
					{/if}

					{#if form?.shareFormSuccess}
						<div>
							<Alert>
								<p>
									Form has been shared with {form?.data?.sharedWith}
								</p>
								<p>Link to form: {`${$page.url.origin}/forms/${form?.data.id}`}</p>
								<a target="blank" href={`/forms/${form?.data?.id}`}>View form</a>
							</Alert>
						</div>
					{/if}

					{#if form?.miniFormUpdateSuccess}
						<div>Record updated</div>
					{/if}
					{#if !data.forms.length}
						<div class=" lg:px-6 max-w-xl">
							<P class="mb-4 text-justify"
								>Need to collect some data? Create create forms and share with a specific any one or
								pick a specific role. Generate mini forms to quicky modify parts of a data object.</P
							>
							<Alert accent class="my-16">You haven't added any forms</Alert>
						</div>
					{/if}
					<!-- 

					<svelte:fragment slot="header">
									<div>
										<p>
											{form.name}
										</p>
										<p>
											{#each form.SQT as sq}
												<a
													rel="external"
													target="blank"
													class="text-xs text-blue-600 underline"
													href={`/forms/${sq.id}`}>{sq.title}</a
												>
											{/each}
										</p>
									</div>
								</svelte:fragment>
								<div class="flex justify-between">
									<div class="text-small text-gray-500">{form.description}</div>
									<ShareformModal
										type="form"
										tab="forms"
										title={form.name}
										description={form.description}
										itemId={form.id}
										reports={data.reports}
										tables={data.space.tables}
										permissions={data.permissions}
									/>
								</div> -->

					<div class="relative overflow-x-auto">
						<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead
								class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
							>
								<tr>
									<th scope="col" class="px-6 py-3"> Name </th>
									<th scope="col" class="px-6 py-3" />
									<th scope="col" class="px-6 py-3" />
									<th scope="col" class="px-6 py-3" />
								</tr>
							</thead>
							<tbody>
								{#each data.forms as form}
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{form?.name}
										</th>
										<td class="px-6 py-4" />
										<td class="px-6 py-4">
											<ShareformModal
												type="form"
												tab="forms"
												title={form.name}
												description={form.description}
												itemId={form.id}
												reports={data.reports}
												tables={data.space.tables}
												permissions={data.permissions}
											/>
										</td>
										<td class="px-6 py-4">
											<a
												href={`/dashboards/${$page.data.space.appId}/${$page.params.table}/overview/f/${form.id}`}
												>View</a
											>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</TabItem>
				<!-- <TabItem open={activeTab === 'actions'} on:click={() => goto('?tab=actions')} title="Actions">
					<div class="text-center lg:px-6">
						<Heading class="my-12" tag="h6">Actions</Heading>
						<P class="my-3"
							>Attach custom events to this collection. An action can be set to run when an action is
							created, read, updated or deleted or when a specific property changes. Actions can send
							mails/sms, update records, save files e.t.c...
						</P>
						<Alert accent class="my-9">Requires a PRO plan.</Alert>
						<Hr />
					</div></TabItem
				> -->
				<!-- <TabItem open={activeTab === 'import'} on:click={() => goto('?tab=import')} title="Import">
					<div class="text-center lg:px-6">
						<Heading class="my-12" tag="h6">Import data</Heading>
						<P class="my-3"
							>Import your existing data, Import as CSV, JSON or import directly from your existing API.</P
						>
					</div>
					<div class="mt-3 grid gap-4 mb-4 grid-cols-2">
						<SpaceCsv columns={data.columnns} />
						<SpaceJson />
					</div>
					<Card size="xl">
						<P tag="h6">Import from URL</P>
						<Request clone />
					</Card>
				</TabItem> -->
				<!-- <TabItem open={activeTab === 'export'} on:click={() => goto('?tab=export')} title="Export">
					<div class="text-center lg:px-6">
						<Heading class="my-12" tag="h6">Export data</Heading>
					</div>
					<div class="mt-3 grid gap-4 grid-cols-2">
						<SpaceCsv dataExport columns={data.columnns} />
						<SpaceJson dataExport />
						<Card>
							<P>Print as...</P>
							<Button class="mt-3" disabled>Update print settings and print</Button>
						</Card>
					</div>
				</TabItem> -->
			</Tabs>
		</div>
	</div>
</section>
