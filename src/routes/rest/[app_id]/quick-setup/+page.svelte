<!-- Carousel.svelte -->
<script lang="ts">
	//@ts-nocheck

	import { page } from '$app/stores';

	const onboarding = ($page.data?.space?.onboarding ?? [])[0];

	import StepZero from './StepZero.svelte';
	import StepOne from './StepOne.svelte';
	import StepThree from './StepTwo.svelte';
	import StepTwo from './StepThree.svelte';
	import StepFour from './StepFour.svelte';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let props;

	// StepOne = () => {
	// 	component = StepOne;
	// 	props = { nextImage, previousImage };
	// };

	export let images: any[] = [StepZero, StepTwo, StepOne, StepThree, StepFour];
	let currentImageIndex = data.setup?.step;
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

	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	onMount(() => {
		invalidateAll();
	});
</script>

<div class="dark:bg-gray-900  dark:text-gray-50 mt-9">
	<div class="">
		<div class="carousel  ">
			{#each images as image, i}
				<div class="carousel-item  {i === currentImageIndex ? 'visible' : 'hidden'}">
					<svelte:component this={image} {...props} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.carousel {
		position: relative;
		overflow: auto;
	}

	.carousel-item {
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
