<script lang="ts">
	import { browser } from '$app/environment';
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
	import Chart from '$lib/components/Chart.svelte';

	let barStart: number;
	let barEend: number;

	let reqMethodStart: any;
	let reqMethodEnd: any;

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

<div class="grid lg:grid-cols-2">
	<div class="dark:text-black">
		<Chart
			items={$page.data.apiCount.map((item) => ({ label: item.month, value: item.count }))}
			chartType="line"
			subtitle="Api Requests ever month"
			title="API Requests"
		/>
	</div>
	<div class="dark:text-black">
		<Chart
			items={$page.data.groupedReads.map((item) => ({ label: item.label, value: item.count }))}
			chartType="bar"
			subtitle="Number of reads and writes on each table"
			title="Table reads/writes"
		/>
	</div>
	<div class="dark:text-black">
		<Chart
			items={$page.data.groupedCounts.map((item) => ({ label: item.label, value: item.count }))}
			chartType="bar"
			subtitle="Api requests per method"
			title="API Methods"
		/>
	</div>

	<div class="dark:text-black">
		<Chart
			items={$page.data.groupedLogs.map((item) => ({ label: item.month, value: item.count }))}
			chartType="doughnut"
			subtitle="Api requests per method"
			title="API Usage"
		/>
	</div>
</div>
