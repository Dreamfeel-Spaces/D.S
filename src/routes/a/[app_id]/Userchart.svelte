<script lang="ts">
	import { browser } from '$app/environment';
	import '@fontsource/merriweather';
	import { onDestroy, onMount } from 'svelte';
	import { Card, Select } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { useEffect } from '$lib/wsstore/hooks';
	import RangeSlider from '../../rest/[app_id]/RangeSlider.svelte';
	import Chart from '$lib/components/Chart.svelte';

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

	let signupChart: any;
	let sessionChart: any;

	async function createCharts() {
		const { Chart, registerables } = await import('chart.js');
		Chart.register(...registerables);

		if (browser && !sessionChart) {
			const autocolors = window['chartjs-plugin-autocolors'];
			sessionChart = new Chart(lineChartElement, {
				type: 'line',
				data: chart2Data,
				plugins: [autocolors],
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
		}
		if (browser && !signupChart) {
			const autocolors = window['chartjs-plugin-autocolors'];
			signupChart = new Chart(barChartElement, {
				type: chartType as any,
				plugins: [autocolors],
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
						x: {
							grid: {
								color: 'hsl(43 100% 52% / 10%)'
							},
							ticks: { color: 'hsl(43 100% 52% )' }
						}
					}
				}
			});
		}
	}

	onMount(async () => {
		createCharts();
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	let signupStart: number;
	let signupEnd: number;

	let sessionStart: number;
	let sessionEnd: number;

	useEffect(
		() => {
			let length = $page.data.groupedUsers.map((item: { month: any }) => item.month).length - 1;
			let start = Math.round(signupStart * length);
			let end = Math.round(signupEnd * length);
			let validData = $page.data.groupedUsers.filter((item, i) => {
				return i >= start && i <= end;
			});
			if (signupChart) {
				signupChart.data.datasets[0].data = validData.map((v) => v.count);
				signupChart.data.labels = validData.map((v) => v.month);
				signupChart?.update();
			}
		},
		() => [signupStart, signupEnd]
	);

	useEffect(
		() => {
			let length = $page.data.groupedSessions.map((item: { month: any }) => item.month).length - 1;
			let start = Math.round(sessionStart * length);
			let end = Math.round(sessionEnd * length);
			let validData = $page.data.groupedSessions.filter((item, i) => {
				return i >= start && i <= end;
			});
			if (sessionChart) {
				sessionChart.data.datasets[0].data = validData.map((v) => v.count);
				sessionChart.data.labels = validData.map((v) => v.month);
				sessionChart?.update();
			}
		},
		() => [sessionStart, sessionEnd]
	);

	let signupChartType = 'line';
	let sessionsChartsType = 'line';

	useEffect(
		() => {
			if (signupChart) {
				signupChart.config.type = signupChartType;
				signupChart.update();
			}
		},
		() => [signupChartType]
	);

	useEffect(
		() => {
			if (sessionChart) {
				sessionChart.config.type = sessionsChartsType;
				sessionChart.update();
			}
		},
		() => [sessionsChartsType]
	);
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-autocolors"></script>
</svelte:head>

<div class="grid lg:grid-cols-2 gap-3">
	<div>
		<Chart
			items={$page.data.groupedUsers.map((item) => ({ label: item.month, value: item.count }))}
			chartType="line"
			subtitle="Accounts created per month"
			title="User Signups"
		/>
	</div>
	<div>
		<Chart
			items={$page.data.groupedSessions.map((item) => ({ label: item.month, value: item.count }))}
			chartType="line"
			subtitle="Sessions every month"
			title="Sessions"
		/>
	</div>

	<div>
		<Chart
			items={$page.data.groupedSessions.map((item) => ({ label: item.month, value: item.count }))}
			chartType="bar"
			subtitle="Conversion rate"
			title="Conversion rate"
		/>
	</div>
	<div>
		<Chart
			items={$page.data.groupedSessions.map((item) => ({ label: item.month, value: item.count }))}
			chartType="line"
			subtitle="Sales"
			title="Sales over time"
		/>
	</div>
</div>

<!-- <section>
	<div>
		<div class=" py-9 mx-4 mt-9 pt-3 rounded-lg bg-gray-200 text-center px-8">
			<div class="text-xl 4xl:text-4xl">Revenue</div>
			<p class="t 4xl:text-4xl">Monthly revenue</p>
			<div class="my-4 px-9">
				<RangeSlider />
			</div>
			<div class="mt-3 text-xs bg-gray-499">
				<section
					class="flex h-72 4xl:max-h-[69rem] 4xl:h-[69rem] py-4 rounded-lg max-h-72 bg-gray-400 justify-center"
				>
					<canvas bind:this={walletChartElement} />
				</section>
			</div>
		</div>
	</div>
</section> -->
