<script lang="ts">
	//@ts-nocheck
	export let data;
	import logo from '../../../assets/logo.png';
	import {
		Table,
		TableHead,
		TableBody,
		TableBodyRow,
		TableHeadCell,
		TableBodyCell,
		Card,
		Alert
	} from 'flowbite-svelte';
	let selectedOptions: any = {};
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import DateTimeInput from '$lib/components/DateTimeInput.svelte';
	import SpaceChart from '../../dashboards/[id]/[table]/overview/SpaceChart.svelte';
	let report = data.report;
</script>

<div class="bg-gray-200 h-full overflow-auto min-h-112 px-6 pb-20  lg:px-64 pt-6">
	<h1 class="text-4xl">{data?.space?.name}</h1>
	<span class="text-xs text-gray-500">{new Date()} - {report.description}</span>

	<div class={` w-full justify-center`}>
		<Table class="mt-20">
			<TableHead>
				<TableHeadCell class="text-gray-500" align="right" colspan={report.columns.length}
					>{'>'} {data?.space?.name} / {data?.table?.name} / {report?.name}
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
							index + 1 === report.columns.length && report.columns.length > 1 ? 'right' : ''
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
									index + 1 === report.columns.length && report.columns.length > 1 ? 'right' : ''
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
</div>

<div class="relative bg-gray-300">
	<div class="flex justify-center w-full ">
		<img loading="lazy" width={112} src={logo} alt="" />
	</div>
</div>
