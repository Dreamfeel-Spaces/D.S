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
		Heading,
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
	<Card size="xl">
		<div class=" p-3 overflow-auto ">
			<Tabs>
				<TabItem
					open={activeTab === 'reports'}
					on:click={() => goto('?tab=reports')}
					title="Query Reports"
				>
					<ReportModal columns={data.columns} />
					{#if form?.reportSuccess}
						Report has been saved
					{/if}
					<div class="px-4">
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
							<div class="flex items-center text-center self-center  max-w-xl">
								<P class="mb-3 flex text-justify flex-wrap "
									>With reports you can query and group your data together onto an easy to
									manipulate tables. You can create events and perform tasks on these tables, share,
									generate charts, get AI powered analytics and insights on the reports.<A />
								</P>
							</div>
							<Alert class="mt-1 my-20" accent>You havent added any reports</Alert>
						{/if}
					</div>

					<Accordion size="xs" class="mt-3 mb-48">
						{#each data.reports as report}
							<AccordionItem size="xs">
								<svelte:fragment slot="header">
									<div>
										{report.name}
										<div class="text-xs my-3 text-gray-500">{report.description}</div>
										{#each report.SQT as sq}
											<a
												rel="external"
												target="blank"
												class="text-xs text-blue-600 underline"
												href={`/reports/${sq.id}`}>{sq.title}</a
											>
										{/each}
									</div>
								</svelte:fragment>
								<div class="flex justify-between">
									<div>
										<a href="/">Print</a>
									</div>
									<div>
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
									</div>
								</div>

								<div class={` w-full justify-center`}>
									<Table shadow class="mt-20" striped={true}>
										<TableHead>
											<TableHeadCell
												class="text-gray-500"
												align="right"
												colspan={report.columns.length}
												>{'>'} {data.space.name} / {data?.table?.name} / {report?.name}
											</TableHeadCell>
										</TableHead>

										<TableHead>
											<TableHeadCell colspan={report.columns.length}>
												{#each report.charts ?? [] as chart}
													<div class="text-2xl text-gray-500">
														<SpaceChart
															noDelete
															rows={report.rows}
															chart={{ ...chart, fields: report.fields, name: '', description: '' }}
														/>
													</div>
												{/each}
											</TableHeadCell>
										</TableHead>

										<TableHead>
											{#each report.columns as column, index}
												<TableHeadCell
													align={`${
														index + 1 === report.columns.length && report.columns.length > 1
															? 'right'
															: ''
													}`}>{column.name}</TableHeadCell
												>
											{/each}
										</TableHead>
										<TableBody class="divide-y">
											{#each report.rows as row}
												<TableBodyRow>
													{#each report.columns as column, index}
														<TableBodyCell
															align={`${
																index + 1 === report.columns.length && report.columns.length > 1
																	? 'right'
																	: ''
															}`}>{row[column.name]}</TableBodyCell
														>
													{/each}
												</TableBodyRow>
											{/each}

											<TableBodyRow>
												<TableBodyCell colspan={report.columns.length}>
													<span class="text-xs text-gray-500"
														>{new Date()} - {report.description}</span
													>
												</TableBodyCell>
											</TableBodyRow>
										</TableBody>
									</Table>
								</div>
								<form class="mt-4" action="?/deleteReport&tab=reports" method="POST">
									<input type="hidden" name="id" value={report.id} />
									<Button type="submit" class="w-full">Delete</Button>
								</form>
							</AccordionItem>
						{/each}
					</Accordion>
				</TabItem>
				<TabItem
					open={activeTab === 'charts'}
					on:click={() => goto('?tab=charts', { invalidateAll: true })}
					title="Charts"
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

					<Accordion class="mt-3">
						{#each data.forms as form}
							<AccordionItem>
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
								</div>
								<form action="?/saveMiniform&tab=forms" method="POST">
									<input type="hidden" value={form.id} name="form-id" id="form-id" />
									<input type="hidden" value={form.isUpdate} name="isUpdate" id="isUpdate" />
									{#if form.isUpdate}
										<div class="mt-6">
											<label for="record-id">Item</label>
											<Select
												name="record-id"
												placeholder="Select item to update"
												id="record-id"
												bind:value={selectedOptions['record-id']}
												items={data.rows.map((row) => ({
													name: row[data.table.displayName],
													value: row.id
												}))}
											/>
										</div>
									{/if}
									{#each form.columns ?? [] as column}
										<div class="my-6">
											{#if column.type !== 'toggle'}
												<label for={column.name}>{column.name}</label>
											{/if}
											{#if column.type === 'string'}
												<Input id={column.name} name={column.name} />
											{/if}
											{#if column.type === 'number'}
												<NumberInput id={column.name} name={column.name} />
											{/if}

											{#if column.type === 'image'}
												<FileDropzone />
											{/if}
											{#if column.type === 'file'}
												<FileDropzone />
											{/if}
											{#if column.type === 'datetime'}
												<DateTimeInput />
											{/if}
											{#if column.type === 'select'}
												<Select
													name={column.name}
													id={column.name}
													class="mt-2"
													items={column.options.map((option) => ({
														name: option.label,
														value: option.value
													}))}
													bind:value={selectedOptions[column?.name]}
												/>
											{/if}
											{#if column.type === 'toggle'}
												<Checkbox
													id={column.name}
													bind:value={selectedOptions[column.name]}
													bind:checked={selectedOptions[column.name]}
													name={column.name}>{column.name}</Checkbox
												>
											{/if}
											{#if column.type === 'email'}
												<Input type="email" id={column.name} name={column.name} />
											{/if}
											{#if column.type === 'phone'}
												<Input type="number" id={column.name} name={column.name} />
											{/if}
											{#if column.type === 'password'}
												<Input type="password" id={column.name} name={column.name} />
											{/if}

											{#if column.type === 'rel'}
												<Select
													placeholder={`Choose (${column.name})`}
													name={column.name}
													id={column.name}
													class="mt-2"
													items={column.options.map((option) => ({
														name: option.label,
														value: option.value
													}))}
													bind:value={selectedOptions[column?.name]}
												/>
											{/if}
										</div>
									{/each}
									<div>
										<Button class="mt-4 w-full" type="submit">Save</Button>
									</div>
								</form>
								<form class="mt-4" action="?/deleteForm&tab=forms" method="POST">
									<input type="hidden" name="id" value={form.id} />
									<Button type="submit" class="w-full">Delete</Button>
								</form>
							</AccordionItem>
						{/each}
					</Accordion>
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
	</Card>
</section>
