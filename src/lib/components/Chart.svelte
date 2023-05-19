<script lang="ts">
	import { browser } from '$app/environment';
	import '@fontsource/merriweather';
	import { onDestroy, onMount } from 'svelte';
	import { Card, Select } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { useEffect } from '$lib/wsstore/hooks';
	import RangeSlider from '../../routes/rest/[app_id]/RangeSlider.svelte';
	import autocolors from 'chartjs-plugin-autocolors';

	export let chartType = 'pie';
	export let title = 'Chart Title';
	export let subtitle = 'Chart description...';
	let chartElement: HTMLCanvasElement;

	export let items = [{ label: '', value: '' }];

	const chartData = {
		labels: items.map((item) => item.label),
		datasets: [
			{
				label: items.map((item) => item.label),
				data: items.map((item) => item.value),
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

	let chart: any;

	async function createCharts() {
		const { Chart, registerables } = await import('chart.js');
		Chart.register(...registerables);

		if (browser && !chart) {
			let options = {
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {},
				chartArea: {
					backgroundColor: 'rgba(0, 0, 0, 0.1)' // Set the desired background color here
				}
			};
			if (chartType === 'pie' || chartType === 'doughnut') {
				options.scales = {
					x: {
						display: false
					},
					y: {
						display: false
					}
				};
				// options.plugins.legend = {};
			} else {
				options.scales = {
					x: {
						grid: {
							color: 'hsl(43 100% 52% / 10%)'
						},
						ticks: { color: 'hsl(43 100% 52% )' }
					}
				};
			}

			chart = new Chart(chartElement, {
				type: chartType as any,
				//@ts-ignore
				plugins: [autocolors],
				data: chartData,
				options
			});
		}
	}

	onMount(async () => {
		createCharts();
	});

	onDestroy(() => {
		chart = null;
	});

	let startDrag: number;
	let stopDrag: number;

	useEffect(
		() => {
			let length = items.length - 1;
			let start = Math.round(startDrag * length);
			let end = Math.round(stopDrag * length);
			let validData = items.filter((item: any, i: number) => {
				return i >= start && i <= end;
			});
			if (chart) {
				chart.data.datasets[0].data = validData.map((v) => v.value);
				chart.data.labels = validData.map((v) => v.label);
				chart?.update();
			}
		},
		() => [startDrag, stopDrag]
	);

	async function recreateCharts() {
		if (chart) {
			chart.destroy();
			const { Chart, registerables } = await import('chart.js');
			Chart.register(...registerables);
			const plugins = [autocolors];
			let options = {
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true
					},
					autocolors
				},
				scales: {}
			};

			if (chartType === 'pie' || chartType === 'doughnut') {
				// Remove both X-axis and Y-axis configurations for pie and doughnut charts
				options = {
					plugins: {
						legend: {
							display: true
						},
						tooltip: {
							enabled: true
						},
						autocolors
					},
					layout: {
						padding: 0
					}
				};
			} else {
				options = {
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							enabled: true
						},
						autocolors
					},
					scales: {
						x: {
							display: true,
							grid: {
								color: 'hsl(43 100% 52% / 10%)'
							},
							ticks: { color: 'hsl(43 100% 52%)' }
						},
						y: {
							display: true,
							grid: {
								color: 'hsl(43 100% 52% / 10%)'
							},
							ticks: { color: 'hsl(43 100% 52%)' }
						}
					}
				};
			}

			chart = new Chart(chartElement, {
				type: chartType as any,
				data: chartData,
				options
			});
		}
	}

	useEffect(
		() => {
			recreateCharts();
		},
		() => [chartType]
	);
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-autocolors"></script>
</svelte:head>

<main class="main-container bg-gray-200 relative pt-4  mt-9 rounded-lg mx-3  gap-4 p-2">
	<div>
		<div class="flex bg-gray-300 justify-between p-3 rounded-t-xl">
			<div>
				<div class="text-xl 4xl:text-4xl">{title}</div>
				<p class="4xl:text-3xl">{subtitle}</p>
			</div>
			<div>
				<Select
					size="sm"
					bind:value={chartType}
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
		<RangeSlider bind:start={startDrag} bind:end={stopDrag} />
		<!-- <div class="py-4 px-9 flex gap-3 bg-gray-300">
			{$page.data.groupedUsers.map((item => item.month)[
				Math.round(signupStart * $page.data.groupedUsers.map((item) => item.month).length)
			] ??
				$page.data.groupedUsers[-1] ??
				''}
			{$page.data.groupedUsers.map((item: { month: any; }) => item.month)[
				Math.round(signupEnd * ($page.data.groupedUsers.map((item => item.month).length - 1))
			] ?? ''}
		</div> -->
		<section
			class="flex max-h-80 h-80 justify-center bg-gray-400 pt-9 z-40 back backdrop-blur-2xl   p-3 rounded-b-xl -center"
		>
			<canvas bind:this={chartElement} />
		</section>
	</div>
</main>
