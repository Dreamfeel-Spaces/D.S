<script lang="ts">
	import { browser } from '$app/environment';
	import { CloseButton } from 'flowbite-svelte';
	import { FY2021 as satisfactionData2021 } from '$lib/chart.json';
	import '@fontsource/merriweather';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';

	export let rows: any = [];

	export let chart: any = {};

	const fields = chart.fields.map((field: any) => field.field);

	const formattedRows = rows.map((row: any) => {
		return fields.reduce(
			(prev: any, curr: any) => ({
				...prev,
				[curr.name]: curr.type === 'number' ? parseInt(row[curr.name]) : row[curr.name]
			}),
			{}
		);
	});

	let label = chart.labelKey;
	let value = chart.valueKey;

	Chart.register(...registerables);

	let barChartElement: HTMLCanvasElement;

	const chartData = {
		labels: formattedRows.map((row: any) => row[label]),
		datasets: [
			{
				label: chart?.name,
				data: formattedRows.map((row: any) => row[value]),
				backgroundColor: [
					'hsl(347 38% 49%)',
					'hsl(346 65% 63%)',
					'hsl(346 49% 56%)',
					'hsl(346 89% 70%)',
					'hsl(346 90% 76%)',
					'hsl(346 90% 73%)',
					'hsl(346 89% 79%)',
					'hsl(346 89% 85%)',
					'hsl(347 89% 82%)',
					'hsl(346 90% 88%)',
					'hsl(347 87% 94%)',
					'hsl(347 91% 91%)',
					'hsl(346 87% 97%)'
				],
				borderColor: ['hsl(43 100% 52%)'],
				borderRadius: 4,
				borderWidth: 2
			}
		]
	};

	onMount(() => {
		if (browser) {
			new Chart(barChartElement, {
				type: chart.type,
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						// x: {
						// 	grid: {
						// 		color: 'hsl(43 100% 52% / 10%)'
						// 	},
						// 	ticks: { color: 'hsl(43 100% 52% )' }
						// },
					}
				}
			});
		}
	});
</script>

<main class="main-container">
	<div class="flex mb-6">
		<small class="flex-1">{chart.name}</small>
		<form method="POST" action="?/deleteChart&tab=charts">
			<input name="id" value={chart.id} type="hidden" />
			<button type="submit">x</button>
		</form>
	</div>
	<section  class="max-h-64 flex justify-center" >
		<canvas bind:this={barChartElement} />
	</section>
	<div class="mt-3 text-xs">
		<hr class="mb-2"  />
		- {chart?.description}
	</div>
</main>
