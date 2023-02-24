<script lang="ts">
	//@ts-nocheck
	import { components, variants } from '$lib/coltypes/components';
	import { Button, Modal, Label, Input, Select } from 'flowbite-svelte';
	import ComponentPreview from './ComponentPreview.svelte';
	let formModal = false;
	let component = { ...components[0] };
	const _variants: any = variants[component.value] ?? [];
	const variant: any = _variants.find((v) => v === component.variant);
	let vz = { variant: variant };
	export let pageIndex = '';
</script>

<div class="text-end">
	<Button on:click={() => (formModal = true)}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
			/><path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
			/></svg
		>
		{'Add component'}
	</Button>
</div>
<Modal bind:open={formModal} size="lg" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="?/createComponent" method="POST">
		<input type="hidden" name="page" value={pageIndex} />
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Add component</h3>
		<Label class="space-y-2">
			<span>Component type</span>
			<Select name="type" id="type" bind:value={component.value} items={[...components]} />
		</Label>
		<Label class="space-y-2">
			<span>Variant</span>
			<Select
				name="variant"
				id="variant"
				bind:value={vz.variant}
				items={(_variants ?? []).map((va) => ({
					name: va,
					value: va
				}))}
			/>
		</Label>
		<ComponentPreview component={{ ...component, variant: vz.variant }} />
		<Label class="space-y-2">
			<span>Name</span>
			<Input name="name" id="name" placeholder="Name" required />
		</Label>
		<Label class="space-y-2">
			<span>Icon link</span>
			<Input placeholder="Icon" id="icon" name="icon" required />
		</Label>
		<Label class="space-y-2">
			<span>Classnames</span>
			<Input placeholder="Classnames" id="classNames" name="classNames" required />
		</Label>
		<Button type="submit" class="w-full1">Save</Button>
	</form>
</Modal>
