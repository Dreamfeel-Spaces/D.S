<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		document.addEventListener('mousemove', (data) => {
			const { clientX, clientY } = data;
			// console.log(clientX, clientY);
		});
	});
</script>

<!-- <div style="z-index: 9999;" class="p-28 rounded-full bg-gray-600 absolute ">
	kjhgcfxdfcgvhbjnkml,;.
</div> -->
