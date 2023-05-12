<script lang="ts">
	import { browser } from '$app/environment';
	import '@fontsource/merriweather';
	import { onDestroy, onMount } from 'svelte';
	import { FY2021 } from '$lib/chart.json';
	import { Card, Select } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { useEffect } from '$lib/wsstore/hooks';

	let chartType = 'line';

	let barChartElement: HTMLCanvasElement;

	let lineChartElement: HTMLCanvasElement;

	let walletChartElement: HTMLCanvasElement;

	const chartData = {
		labels: $page.data.groupedUsers.map((item: { month: any }) => item.month),
		datasets: [
			{
				label: chartType,
				data: $page.data.groupedUsers.map((item: { count: any }) => item.count),
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
		labels: $page.data.groupedSessions.map((item: { month: any }) => item.month),
		datasets: [
			{
				label: chartType,
				data: $page.data.groupedSessions.map((item: { count: any }) => item.count),
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

	const revenueData = {
		labels: $page.data.groupedSessions.map((item: { month: any }) => item.month),
		datasets: [
			{
				label: chartType,
				data: $page.data.groupedSessions.map((item: { revenue: any }) => null),
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

	async function createCharts() {
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
				type: 'line',
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

			new Chart(walletChartElement, {
				type: 'line',
				data: revenueData,
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
	}

	onMount(async () => {
		createCharts();
	});

	useEffect(
		() => {
			createCharts();
		},
		() => [chartType]
	);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<main class="main-container bg-gray-200 relative pt-4 4xl:grid-cols-1  mt-9 rounded-lg mx-3 grid grid-cols-2 gap-4 p-2">
	<div>
		<div class="flex justify-between">
			<div>
				<div class="text-xl 4xl:text-4xl">Signups</div>
				<p class="4xl:text-3xl" >Monthly user signup</p>
			</div>
			<!-- <div>
				<Select
					placeholder="Type"
					bind:value={chartType}
					items={[
						{ name: 'Pie', value: 'pie' },
						{ name: 'Line', value: 'line' }
					]}
				/>
			</div> -->
		</div>

		<section class="flex bg-gray-300 mt-2 z-40 back backdrop-blur-2xl   p-3 rounded-xl justify-center">
			<canvas bind:this={barChartElement} />
		</section>
	</div>

	<div class=" ">
		<div class="text-xl 4xl:text-4xl">Sessions</div>
		<p class="4xl:text-3xl" >Monthly sessions</p>
		<div class="mt-3 text-xs">
			<section class="flex bg-gray-300 mt-2 z-40 back backdrop-blur-2xl   p-3 rounded-xl justify-center">
				<canvas bind:this={lineChartElement} />
			</section>
			
		</div>
	</div>
</main>

<section>
	<div >
		<div class=" mt-9 mx-6  pt-3 rounded-lg bg-gray-200 text-center px-8">
			<div class="text-xl 4xl:text-4xl">Revenue</div>
			<p class="t 4xl:text-4xl">Monthly revenue</p>
			<div class="mt-3 text-xs">
				<section class="flex h-72 4xl:max-h-[69rem] 4xl:h-[69rem] py-4 rounded-lg max-h-72 bg-gray-300 justify-center">
					<canvas bind:this={walletChartElement} />
				</section>
			</div>
		</div>
	</div>
</section>
