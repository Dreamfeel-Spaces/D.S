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

	const chartData = {
		labels: $page.data.apiCount.map((item) => item.month),
		datasets: [
			{
				label: chartType,
				data: $page.data.apiCount.map((item) => item.count),
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
		labels: $page.data.groupedCounts.map((item) => item.label),
		datasets: [
			{
				label: chartType,
				data: $page.data.groupedCounts.map((item) => item.count),
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

	onMount(async () => {
		const { Chart, registerables } = await import('chart.js');
		Chart.register(...registerables);

		if (browser) {
			new Chart(barChartElement, {
				type: chartType as any,
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
</script>

<main class="main-container2 grid grid-cols-2 gap-4 ">
	<Card size="lg">
		<div class="text-xl mb-3">Monthly requests</div>
		<section class="">
			<canvas bind:this={barChartElement} />
		</section>
	</Card>
	<Card size="lg">
		<div class="h-72">
			
			<div class="text-xl mb-3">By Request Method</div>
			<section style="max-height:80%" class=" flex justify-center">
				<canvas bind:this={lineChartElement} />
			</section>
		</div>
	</Card>
</main>
