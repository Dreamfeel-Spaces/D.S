<script>
	//@ts-nocheck

	import { onMount } from 'svelte';

	let latitude = null;
	let longitude = null;

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;
			});
		} else {
			alert('Geolocation is not supported by this browser.');
		}
	};

	onMount(() => {
		getLocation();
	});
</script>
