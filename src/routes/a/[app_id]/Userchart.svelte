<script lang="ts">
	import { browser } from '$app/environment';
	import '@fontsource/merriweather';
	import { onDestroy, onMount } from 'svelte';
	import { Card, Select } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { useEffect } from '$lib/wsstore/hooks';
	import RangeSlider from '../../rest/[app_id]/RangeSlider.svelte';

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
			let length = $page.data.groupedSessions.map((item: { month: any }) => item.month).length - 1;
			let start = Math.round(signupStart * length);
			let end = Math.round(signupEnd * length);
			let validData = $page.data.groupedSessions.filter((item, i) => {
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

<main
	class="main-container bg-gray-200 relative pt-4 4xl:grid-cols-1  mt-9 rounded-lg mx-3 grid lg:grid-cols-2 grid-cols-1 gap-4 p-2"
>
	<div>
		<div class="flex bg-gray-300 justify-between p-3 rounded-t-xl">
			<div>
				<div class="text-xl 4xl:text-4xl">Signups</div>
				<p class="4xl:text-3xl">Monthly user signup</p>
			</div>
			<div>
				<Select
					size="sm"
					bind:value={signupChartType}
					items={[
						{ name: 'Bar', value: 'bar' },
						{ name: 'Line', value: 'line' },
						{ name: 'Pie', value: 'pie' },
						{ name: 'Doughnut', value: 'doughnut' },
						{ name: 'Scatter', value: 'scatter' }
					]}
				/>
			</div>
		</div>
		<div class="py-4 px-9 flex gap-3 bg-gray-300">
			{$page.data.groupedSessions.map((item) => item.month)[
				Math.round(signupStart * $page.data.groupedSessions.map((item) => item.month).length)
			]}
			<RangeSlider bind:start={signupStart} bind:end={signupEnd} />
			{$page.data.groupedSessions.map((item) => item.month)[
				Math.round(signupEnd * ($page.data.groupedSessions.map((item) => item.month).length - 1))
			]}
		</div>
		<section
			class="flex bg-gray-400 pt-2 z-40 back backdrop-blur-2xl   p-3 rounded-b-xl justify-center"
		>
			<canvas bind:this={barChartElement} />
		</section>
	</div>

	<div class="bg-gray-300 pt-3 rounded-t-xl ">
		<div class="flex px-3">
			<div class="flex-1">
				<div class="text-xl 4xl:text-4xl">Sessions</div>
				<p class="4xl:text-3xl">Monthly sessions</p>
			</div>
			<div>
				<Select
					size="sm"
					bind:value={sessionsChartsType}
					items={[
						{ name: 'Bar', value: 'bar' },
						{ name: 'Line', value: 'line' },
						{ name: 'Pie', value: 'pie' },
						{ name: 'Doughnut', value: 'doughnut' },
						{ name: 'Scatter', value: 'scatter' }
					]}
				/>
			</div>
		</div>

		<div class="my-4 px-9 flex gap-3">
			{$page.data.groupedSessions.map((item) => item.month)[
				Math.round(sessionStart * $page.data.groupedSessions.map((item) => item.month).length)
			]}
			<RangeSlider bind:start={sessionStart} bind:end={sessionEnd} />
			{$page.data.groupedSessions.map((item) => item.month)[
				Math.round(sessionEnd * ($page.data.groupedSessions.map((item) => item.month).length - 1))
			]}
		</div>

		<div class="mt-3 text-xs">
			<section
				class="flex bg-gray-400 pt-2 z-40 back backdrop-blur-2xl   rounded-b-xl justify-center"
			>
				<canvas bind:this={lineChartElement} />
			</section>
		</div>
	</div>
</main>

<section>
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
</section>
