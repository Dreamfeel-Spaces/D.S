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
		Card
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
	const spaceName = $page.params.id;
	const tableName = $page.params.table;
	let activeTab = $page.url.searchParams.get('tab') ?? 'reports';
	const activeSpace = data.myapps.find((app) => app.appId === spaceName);
	export let form: any;
	let selectedOptions: any = {};
</script>

<div>
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
</div>

<div class="px-6 max-h-99 overflow-auto">
	<Tabs>
		<TabItem open={activeTab === 'reports'} on:click={() => goto('?tab=reports')} title="Reports">
			<ReportModal columns={data.columns} />
			{#if form?.reportSuccess}
				Report has been saved
			{/if}
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
				<div class="my-12">No reports have been added</div>
			{/if}
			<Accordion size="xs" class="mt-3">
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
									<TableHeadCell class="text-gray-500" align="right" colspan={report.columns.length}
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
											<span class="text-xs text-gray-500">{new Date()} - {report.description}</span>
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
			<div class="mt-3 grid lg:grid-cols-2 grid-cols-1 gap-2">
				{#if !data.charts.length}
					<div class="mb-12">No charts have been added</div>
				{/if}
				{#each data.charts as chart}
					<Card draggable size="lg">
						<div class="text-2xl text-gray-500">
							<SpaceChart rows={data.rows} {chart} />
						</div>
					</Card>
				{/each}
			</div>
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
				<div class="my-12">No forms have been added</div>
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
		<TabItem open={activeTab === 'import'} on:click={() => goto('?tab=import')} title="Import">
			<div>Import data</div>
			<div class="mt-3 grid gap-4 grid-cols-2">
				<SpaceCsv columns={data.columnns} />
				<SpaceJson />
			</div>
		</TabItem>
	</Tabs>
</div>
