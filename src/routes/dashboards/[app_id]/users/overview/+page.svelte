<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	export let data: PageData;
	import {
		Tabs,
		TabItem,
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
		Card,
		Alert
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import DateTimeInput from '$lib/components/DateTimeInput.svelte';
	import ReportModal from '../../[table]/overview/ReportModal.svelte';
	import ChartModal from '../../[table]/overview/ChartModal.svelte';
	import SpaceChart from '../../[table]/overview/SpaceChart.svelte';
	import FormModal from '../../[table]/overview/FormModal.svelte';
	import UserReportModal from './UserReportModal.svelte';
	const spaceName = $page.params['app_id'];
	let activeTab = $page.url.searchParams.get('tab') ?? 'reports';
	const activeSpace = data.myapps.find((app) => app.appId === spaceName);
	export let form: any;
	let selectedOptions: any = {};

	let userReports = [];
	let userCharts = [];
	let userForms = [];

	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	import { browser } from '$app/environment';

	let controlsLayout = [
		// 'previousFrame',
		// 'playpause',
		// 'stop',
		// 'nextFrame',
		// 'progress',
		// 'frame',
		// 'loop',
		// 'spacer',
		// 'background',
		// 'snapshot',
		// 'zoom',
		// 'info'
	];
</script>

<div class="px-6 pt-6">
	<Tabs>
		<TabItem open={activeTab === 'reports'} on:click={() => goto('?tab=reports')} title="Reports">
			<UserReportModal columns={data.columns} />
			{#if form?.reportSuccess}
				Report has been saved
			{/if}
			{#if !userReports?.length}
				<div class="mt-3  min-w-screen w-[56rem] text-center" accent>
					<div class="flex justify-center">
						{#if browser}
							<LottiePlayer
								src="https://assets7.lottiefiles.com/packages/lf20_tcmtbsEfLD.json"
								autoplay={true}
								loop={true}
								controls={true}
								renderer="svg"
								background="transparent"
								height={300}
								width={300}
								{controlsLayout}
							/>
						{/if}
					</div>
					<div class="text-2xl">Query reports</div>
					<div class="my-2">No reports have been added</div>
				</div>
			{/if}
			<Accordion size="xs" class="mt-3">
				{#each data.reports as report}
					<AccordionItem size="xs">
						<svelte:fragment slot="header">
							<div>
								{report.name}
								<div class="text-xs my-3 text-gray-500">{report.description}</div>
							</div>
						</svelte:fragment>
						<div class="flex justify-between">
							<div>
								<a href="/">Print</a>
								<a class="ml-4" href="/">Share</a>
								<a class="ml-4" href="/">Export as</a>
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
			title="Analytics"
		>
			<ChartModal columns={data.columns} />
			{#if !userCharts?.length}
				<div class="mt-3 w-[56rem] text-center" accent>
					<div class="flex justify-center">
						{#if browser}
							<LottiePlayer
								src="https://assets8.lottiefiles.com/packages/lf20_9gjl3xik.json"
								autoplay={true}
								loop={true}
								controls={true}
								renderer="svg"
								background="transparent"
								height={300}
								width={300}
								{controlsLayout}
							/>
						{/if}
					</div>
					<div class="text-2xl">Charts</div>
					<div class="my-2">No charts have been added</div>
				</div>
			{/if}
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

			{#if form?.miniFormUpdateSuccess}
				<div>Record updated</div>
			{/if}

			{#if !userForms?.length}
				<div class="mt-3 w-[56rem] text-center" accent>
					<div class="flex justify-center">
						{#if browser}
							<LottiePlayer
								src="https://assets2.lottiefiles.com/packages/lf20_tpa51dr0.json"
								autoplay={true}
								loop={true}
								controls={true}
								renderer="svg"
								background="transparent"
								height={300}
								width={300}
								{controlsLayout}
							/>
						{/if}
					</div>
					<div class="text-2xl">Charts</div>
					<div class="my-2">No charts have been added</div>
				</div>
			{/if}
			<Accordion class="mt-3">
				{#each data.forms as form}
					<AccordionItem>
						<svelte:fragment slot="header">
							{form.name}
						</svelte:fragment>
						<div>
							<div class="text-small text-gray-500">{form.description}</div>
						</div>
						<form action="?/saveMiniform&tab=forms" method="POST">
							<input type="hidden" value={form.id} name="form-id" id="form-id" />
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
		<!-- <TabItem open={activeTab === 'import'} on:click={() => goto('?tab=import')} title="Import">
			<div>Import data</div>
			<div class="mt-3 grid gap-4 grid-cols-2">
				<SpaceCsv />
				<SpaceJson />
			</div>
		</TabItem> -->
	</Tabs>
</div>
