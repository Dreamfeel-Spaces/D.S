<script lang="ts">
	//@ts-nocheck
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';

	function getTimeElapsed(startTime) {
    // Calculate the difference between the start time and now
    let timeDiff = new Date().getTime() - startTime.getTime();

    // Convert the time difference into days, hours, minutes, and seconds
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Pad single-digit minutes and seconds with a leading zero if needed
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    // Combine the days, hours, minutes, and seconds into a formatted string
    let timeElapsed = '';
    if (days > 0) {
        timeElapsed += days + ' day(s), ';
    }
    timeElapsed += hours + ':' + minutes + ':' + seconds;

    return timeElapsed;
}

	let elapsed = getTimeElapsed($page.data?.space?.dateCreated);

	let updater;

	onMount(() => {
		updater = setInterval(() => {
			elapsed = getTimeElapsed($page.data?.space?.dateCreated);
		}, 1000);
	});

	onDestroy(() => {
		if (updater) {
			clearInterval(updater);
		}
	});
</script>

{elapsed}
