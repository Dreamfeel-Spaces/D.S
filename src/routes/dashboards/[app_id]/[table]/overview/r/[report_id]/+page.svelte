<script lang="ts">
	//@ts-nocheck
	export let data;
	import {
		Table,
		TableHead,
		TableBody,
		TableBodyRow,
		TableHeadCell,
		TableBodyCell,
		Card,
		Button
	} from 'flowbite-svelte';
	let selectedOptions: any = {};
	import SpaceChart from '../../SpaceChart.svelte';
	let report = data.report;

	function printAndProceed() {
		const receiptContent = document.getElementById('print-content');
		const titleBefore = document.title;
		const printArea = document.getElementById('print-area');

		printArea.innerHTML = receiptContent.innerHTML;
		document.title = report.name;

		window.print();
		receiptModal = false;

		printArea.innerHTML = '';
		document.title = titleBefore;
	}
</script>

<div class="container">
	<div class="dark:bg-gray-900 pt-3  rounded-xl">
		<div class="overflow-auto hide-print min-h-112 px-6 pb-20 ">
			<div class="flex">
				<h1 class="text-4xl flex-1 dark:text-gray-200">{data?.space?.name}</h1>
				<div class="p-2 flex gap-3">
					<Button on:click={printAndProceed} size="xs">Print</Button>
					<Button on:click={() => history.back()} size="xs">Back</Button>
				</div>
			</div>
			<span class="text-xs text-gray-500">{new Date()} - {report.description}</span>

			<div id="print-content" class={` w-full justify-center`}>
				<Table class="mt-4">
					<TableHead>
						<TableHeadCell class="text-gray-500" align="right" colspan={report.columns.length}
							>{'>'} {data?.space?.name} / {report?.table?.name} / {report?.name}
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
		</div>

		<div id="print-area" class="print-area" />
	</div>
</div>
