<script lang="ts">
	import { browser } from '$app/environment';
	import type { Chart } from 'chart.js';
	import '@fontsource/merriweather';
	import { onDestroy, onMount } from 'svelte';
	import { FY2021 } from '$lib/chart.json';
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';

	let chartType = 'line';

	let barChartElement: HTMLCanvasElement;

	let lineChartElement: HTMLCanvasElement;

	let readsChartElement: HTMLCanvasElement;

	let sliderInput: { value: any };

	const chartData = {
		labels: $page.data.apiCount.map((item: { month: any }) => item.month),
		datasets: [
			{
				label: chartType,
				data: $page.data.apiCount.map((item: { count: any }) => item.count),
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

	const chart2Data = {
		labels: $page.data.groupedCounts.map((item: { label: any }) => item.label),
		datasets: [
			{
				label: chartType,
				data: $page.data.groupedCounts.map((item: { count: any }) => item.count),
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

	const chart3Data = {
		labels: $page.data.groupedCounts.map((item: { label: any }) => item.label),
		datasets: [
			{
				label: chartType,
				data: $page.data.groupedCounts.map((item: { count: any }) => item.count),
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

	let interval: any;

	let monthlyBarChart: any;

	onMount(async () => {
		const { Chart, registerables } = await import('chart.js');
		Chart.register(...registerables);

		if (browser && !monthlyBarChart) {
			monthlyBarChart = new Chart(barChartElement, {
				type: chartType as any,
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						x: {
							grid: {
								color: 'hsl(43 100% 52% / 10%)'
							},
							ticks: { color: 'hsl(43 100% 52% )' }
						}
					}
				}
			});

			new Chart(readsChartElement, {
				type: 'bar',
				data: chart3Data,
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

			new Chart(lineChartElement, {
				type: 'doughnut',
				data: chart2Data,
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
			// interval = setInterval(() => {
			// 	let types = ['pie', 'bar', 'line'];
			// 	chartType = types[Math.ceil(Math.random() * types.length)];
			// 	console.log(chartType);
			// }, 4000);
		}
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	import DoubleRangeSlider from './RangeSlider.svelte';
	import { useEffect } from '$lib/wsstore/hooks';

	let barStart: number;
	let barEend: number;

	let reqMethodStart: any;
	let reqMethodEnd: any;

	let tableReadSTart: number;
	let tableReadEnd: number;

	useEffect(
		() => {
			let length = $page.data.apiCount.map((item: { month: any }) => item.month).length - 1;
			let start = Math.round(barStart * length);
			let end = Math.round(barEend * length);
			let validData = $page.data.apiCount.filter((item: any, i: number) => {
				return i >= start && i <= end;
			});
			if (monthlyBarChart) {
				monthlyBarChart.data.datasets[0].data = validData.map((v: { count: any }) => v.count);
				monthlyBarChart.data.labels = validData.map((v: { month: any }) => v.month);
				monthlyBarChart?.update();
			}
		},
		() => [barStart, barEend]
	);
</script>

<main class="main-container2 grid grid-cols-1 lg:grid-cols-2 gap-4 ">
	<div class="dark:bg-gray-900 p-6 rounded-xl">
		<div class="text-xl max-h-72 pb-6">Monthly requests</div>
		<div class="px-9 mb-4">
			<DoubleRangeSlider bind:start={barStart} bind:end={barEend} />
		</div>
		<section class="">
			<canvas bind:this={barChartElement} />
		</section>

		<div />
	</div>
	<div class="dark:bg-gray-900 p-6 rounded-xl">
		<div>
			<div class="text-xl mb-3">By Request Method</div>
			<div class="px-9 mb-4">
				<DoubleRangeSlider bind:start={reqMethodStart} bind:end={reqMethodEnd} />
			</div>
			<section class=" max-h-64 flex pb-6 justify-center">
				<canvas bind:this={lineChartElement} />
			</section>
		</div>
	</div>
</main>

<div class="dark:bg-gray-900 p-6 rounded-xl mt-5">
	<div>
		<div class="text-xl mb-3">Table reads</div>
		<div class="px-9 mb-4">
			<DoubleRangeSlider bind:start={tableReadSTart} bind:end={tableReadEnd} />
		</div>
		<section class=" h-100 flex justify-center">
			<canvas bind:this={readsChartElement} />
		</section>
	</div>
</div>
