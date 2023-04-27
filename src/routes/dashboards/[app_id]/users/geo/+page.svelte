<script lang="ts">
	//@ts-nocheck
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { Card } from 'flowbite-svelte';

	let mapElement;
	let map;

	export let zoom = 2;

	export let position = [0.0236, 37.9062];

	let dark = true;

	const mapBoxToken =
		'pk.eyJ1IjoiZHJlYW1uZXJkIiwiYSI6ImNrenJkZnoxbzB1M2MzMWxnbTd1OHVmOGUifQ.rIafsHzLmqot_MysT57B3Q';

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet.map(mapElement).setView(position, zoom);

			leaflet
				.tileLayer(
					`https://api.mapbox.com/styles/v1/mapbox/${
						dark ? 'dark' : 'light'
					}-v9/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`,
					{
						attribution:
							'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					}
				)
				.addTo(map);

			leaflet.marker(position).addTo(map).bindPopup('Users geo dist will appear here').openPopup();
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<main>
	<Card size="xl">
		<p class="text-xl mb-4 text-gray-600">Live Sessions by location</p>
		<div bind:this={mapElement} />
	</Card>
</main>

<style>
	@import 'leaflet/dist/leaflet.css';
	main div {
		height: 460px;
	}
</style>
