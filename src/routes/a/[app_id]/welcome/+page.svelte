<!-- Carousel.svelte -->
<script lang="ts">
	//@ts-nocheck

	import { Card } from 'flowbite-svelte';

	import { page } from '$app/stores';

	import StepOne from './StepOne.svelte';
	import StepTwo from './StepTwo.svelte';
	import StepThree from './StepThree.svelte';
	import StepFour from './StepFour.svelte';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let props;

	export let data: PageData;

	export let images: any[] = [StepOne, StepTwo, StepThree, StepFour, StepFour];
	let currentImageIndex = data.onboarding?.step;
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

	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	onMount(() => {
		invalidateAll();
	});
</script>

<div class="container">
	<Card class="w-full" size="xl">
		<div class=" dark:text-gray-50  ">
			<div>
				<div class="carousel  ">
					{#each images as image, i}
						<div class="carousel-item {i === currentImageIndex ? 'visible' : 'hidden'}">
							<svelte:component this={image} {...props} />
							<!-- <p>{image.caption}</p> -->
						</div>
					{/each}
				</div>
			</div>
		</div>
	</Card>
</div>

<style>
	.carousel {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 500px;
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
