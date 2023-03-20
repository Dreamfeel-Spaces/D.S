<script>
	import {
		Card,
		Button,
		Accordion,
		AccordionItem,
		List,
		Listgroup,
		ListgroupItem,
		ImagePlaceholder
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';
</script>

<div class="py-9 text-center text-3xl dark:text-gray-100">
	<p>Pick a starting point</p>
</div>

<div class="grid pb-20 grid-cols-3 gap-3 min-h-112 dark:bg-gray-900 dark:text-white px-12">
	<div>
		<Card class="min-h-20">
			<ImagePlaceholder />
			Blank site
			<p class="my-9">Start from a blank canvas — and build exactly what you’re envisioning.</p>
			<Button on:click={() => goto(`/a/demo`)} size="xs">Select</Button>
			<div class="mt-4 flex justify-between">
				<a href="/">Learn more</a>
				<a href="/">Preview</a>
			</div>
			<Accordion class="mt-4">
				<AccordionItem>
					<svelte:fragment slot="header">Features</svelte:fragment>
					<p class="text-2xl">No features selected</p>
					<p>
						Setup everything from scratch, create your own API schema, pick and choose integrated
						services, and build your own custom UI and dashboards
					</p>
				</AccordionItem>
			</Accordion>
		</Card>
	</div>
	<div>
		<Card class="min-h-20">
			<ImagePlaceholder />
			Ecommerce site
			<p class="my-9">Start from a blank canvas — and build exactly what you’re envisioning.</p>
			<Button disabled on:click={() => goto(`/a/demo`)} size="xs">Select</Button>
			<div class="mt-4 flex justify-between">
				<a href="/">Learn more</a>
				<a href="/">Preview</a>
			</div>
			<Accordion  class="mt-4">
				<AccordionItem disabled>
					<svelte:fragment slot="header">Features</svelte:fragment>
					<List>
						<Listgroup>
							<ListgroupItem>Built in e-commerce schema</ListgroupItem>
							<ListgroupItem>Product focused prebuilt dashboards</ListgroupItem>
							<ListgroupItem>E-commerce UI template</ListgroupItem>
							<ListgroupItem>Cart and basket recovery</ListgroupItem>
							<ListgroupItem>Built in marketing</ListgroupItem>
						</Listgroup>
					</List>
				</AccordionItem>
			</Accordion>
		</Card>
	</div>
	<div class="h-full">
		<Card class="min-h-20">
			<ImagePlaceholder />
			Business site
			<p class="my-9">Start from a blank canvas — and build exactly what you’re envisioning.</p>
			<Button disabled on:click={() => goto(`/a/demo`)} size="xs">Select</Button>
			<div class="mt-4 flex justify-between">
				<a href="/">Learn more</a>
				<a href="/">Preview</a>
			</div>
			<Accordion  size="xs" class="mt-4">
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
	<div class="h-full">
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
</div>
