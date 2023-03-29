<script>
	import {
		Card,
		Button,
		Accordion,
		AccordionItem,
		List,
		Listgroup,
		ListgroupItem,
		ImagePlaceholder,
		Toggle
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SelectOption from './SelectOption.svelte';
	const interest = JSON.parse($page.data.space.onboarding[0].stepCoding);
	let showMore = false;
</script>

<div class="py-2 text-center text-3xl dark:text-gray-100">
	<p>Pick a starting point</p>
</div>

<div
	class="grid lg:grid-cols-3 md:grid-cols-2 gap-3  dark:text-white px-4"
>
	<Card size="xl">
		Blank site
		<p class="my-9">Start from a blank canvas — and build exactly what you’re envisioning.</p>
		<SelectOption ctx="blank" />
		<div class="mt-4 flex justify-between">
			<a rel="external" href="/">Learn more</a>
			<a rel="external" href="/">Watch video</a>
		</div>
	</Card>
	{#if interest === 'ecommerce_store' || showMore}
		<Card size="xl" class="min-h-20">
			<div class="flex justify-end">
				<Button color="green" pill gradient size="xs">Authentication included</Button>
			</div>
			<ImagePlaceholder />
			Ecommerce site
			<p class="my-9">Start from a blank canvas — and build exactly what you’re envisioning.</p>
			<SelectOption ctx="ecommerce" />
			<div class="mt-4 flex justify-between">
				<a href="/">Learn more</a>
				<a href="/">Preview</a>
			</div>
		</Card>
	{/if}
	{#if interest === 'business_site' || showMore}
		<Card size="xl" class="min-h-20">
			Business site
			<p class="my-9">Start from a blank canvas — and build exactly what you’re envisioning.</p>
			<SelectOption ctx="business" />
			<div class="mt-4 flex justify-between">
				<a href="/">Learn more</a>
				<a href="/">Preview</a>
			</div>
		</Card>
	{/if}
	<Card class="" size="xl">
		<div style="align-items:center" class="flex self-center h-full">
			<div>
				<Button disabled on:click={() => (showMore = !showMore)}
					>{#if showMore}
						Hide more options
					{:else}
						Show more options{/if}</Button
				>
			</div>
		</div>
	</Card>
	<!-- <Card class="min-h-20">
		<ImagePlaceholder />
		Organition site
		<p class="my-9">Start from a blank canvas — and build exactly what you’re envisioning.</p>
		<Button disabled on:click={() => goto(`/a/demo`)} size="xs">Select</Button>
		<div class="mt-4 flex justify-between">
			<a href="/">Learn more</a>
			<a href="/">Preview</a>
		</div>
		<Accordion size="xs" class="mt-4">
			<AccordionItem disabled>
				<svelte:fragment slot="header">Features</svelte:fragment>
				<List>
					<Listgroup>
						<ListgroupItem>Default</ListgroupItem>
					</Listgroup>
				</List>
			</AccordionItem>
		</Accordion>
	</Card> -->
</div>

<!-- <div >
	<div class="py-9 text-center text-3xl dark:text-gray-100">
		<p>Start from a template</p>
	</div>

	<div
		class="grid pb-20 lg:grid-cols-2 md:grid-cols-2 gap-3  dark:text-white px-12"
	>
		<Card class="min-h-20">
			<ImagePlaceholder />
			Organition site
			<p class="my-9">Start from a blank canvas — and build exactly what you’re envisioning.</p>
			<Button disabled on:click={() => goto(`/a/demo`)} size="xs">Select</Button>
			<div class="mt-4 flex justify-between">
				<a href="/">Learn more</a>
				<a href="/">Preview</a>
			</div>
			<Accordion size="xs" class="mt-4">
				<AccordionItem disabled>
					<svelte:fragment slot="header">Features</svelte:fragment>
					<List>
						<Listgroup>
							<ListgroupItem>Default</ListgroupItem>
						</Listgroup>
					</List>
				</AccordionItem>
			</Accordion>
		</Card>
	</div>
</div> -->
