<!-- Carousel.svelte -->
<script lang="ts">
	//@ts-nocheck

	import { Button } from 'flowbite-svelte';

	import { page } from '$app/stores';

	const onboarding = ($page.data?.space?.onboarding ?? [])[0];

	import StepOne from './StepOne.svelte';
	import StepTwo from './StepTwo.svelte';
	import StepThree from './StepThree.svelte';
	import StepFour from './StepFour.svelte';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';

	let props;

	// StepOne = () => {
	// 	component = StepOne;
	// 	props = { nextImage, previousImage };
	// };

	export let images: any[] = [StepOne, StepTwo, StepThree, StepFour];
	let currentImageIndex = onboarding?.step || 0;
	let timerId;

	function nextImage() {
		let currIndex = (currentImageIndex + 1) % images.length;
		if (currIndex === images.length - 1) goto('/onboarding/new');
		else currentImageIndex = currIndex;
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
		if (!paused) {
			if (timerId) clearInterval(timerId);
			timerId = setInterval(nextImage, interval);
		}
	}

	function stopAutoSlide() {
		if (timerId) clearInterval(timerId);
	}

	// onMount(() => {
	// 	startAutoSlide(10000);
	// });

	// onDestroy(() => {
	// 	stopAutoSlide();
	// });

	function handlePause() {
		paused = !paused;
	}
</script>

<div class="dark:bg-black  dark:text-gray-50  min-h-112">
	<div class="lg:px-80">
		<div class="carousel  ">
			{#each images as image, i}
				<div class="carousel-item h-72 {i === currentImageIndex ? 'visible' : 'hidden'}">
					<svelte:component this={image} {...props} />
					<!-- <p>{image.caption}</p> -->
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.carousel {
		min-height: 800px;
		position: relative;
		overflow: auto;
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
