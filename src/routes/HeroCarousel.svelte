<!-- Carousel.svelte -->
<script lang="ts">
	//@ts-nocheck

	import HeroRest from './HeroRest.svelte';
	import HeroChart from './HeroChart.svelte';
	import HeroForm from './HeroForm.svelte';
	import HeroReport from './HeroReport.svelte';
	import HeroImg from './HeroImg.svelte';

	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import HeroEditor from './HeroEditor.svelte';
	import { heroSliderPaused } from '$lib/wsstore';

	export let images: any[] = [
		HeroRest,
		HeroChart,
		// HeroForm,
		// HeroReport,
		// HeroImg
		//HeroEditor
	];
	let currentImageIndex = 0;
	let timerId;

	function nextImage() {
		if (!$heroSliderPaused.paused) currentImageIndex = (currentImageIndex + 1) % images.length;
	}

	function previousImage() {
		currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
	}

	const showCarouselItem = (index: number) => {
		if (browser) {
			const carouselItems = document.querySelectorAll('.carousel-item');
			carouselItems.forEach((item, i) => {
				item.classList.toggle('visible', i === index);
				item.classList.toggle('hidden', i !== index);
			});
		}
	};
	showCarouselItem(currentImageIndex);

	$: showCarouselItem(currentImageIndex);

	let paused = false;

	function startAutoSlide(interval) {
		if (timerId) clearInterval(timerId);
		timerId = setInterval(nextImage, interval);
	}

	function stopAutoSlide() {
		if (timerId) clearInterval(timerId);
	}

	onMount(() => {
		startAutoSlide(10000);
	});

	onDestroy(() => {
		stopAutoSlide();
	});

	function handlePause() {
		paused = !paused;
	}
</script>

<div class="carousel">
	{#each images as image, i}
		<div class="carousel-item h-72 {i === currentImageIndex ? 'visible' : 'hidden'}">
			<svelte:component this={image} {handlePause} bind:paused />
			<!-- <p>{image.caption}</p> -->
		</div>
	{/each}
</div>

<!-- <div>
	<button on:click={previousImage}>Previous</button>
	<button on:click={nextImage}>Next</button>
</div> -->
<style>
	.carousel {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 500px;
		position: relative;
		overflow: hidden;
	}

	.carousel-item {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: opacity 0.5s ease;
	}

	.carousel-item.visible {
		opacity: 1;
	}

	.carousel-item.hidden {
		opacity: 0;
	}
</style>
