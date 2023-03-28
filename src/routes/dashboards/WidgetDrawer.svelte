<script lang="ts" >
	import { page } from '$app/stores';
	import {
		Modal,
		CloseButton,
		Radio,
		Input,
		SidebarGroup,
		SidebarItem,
		SidebarDropdownWrapper,
		MegaMenu,
		DarkMode,
		Select,
		Button
	} from 'flowbite-svelte';
	const space = $page?.data?.space;
	import { sineIn } from 'svelte/easing';
	let hidden2 = false;
	let transitionParams = {
		x: 320,
		duration: 200,
		easing: sineIn
	};
	let collection = '';
	export let tables: any[] = [];
</script>

<Button on:click={() => (hidden2 = true)} gradient color="pinkToOrange" pill size="xs"
	>Add widget</Button
>

<Modal class="w-full text-left" bind:open={hidden2} id="sidebar2">
	<div slot="header" class="flex items-center">
		<div class="flex">
			<a href="/">
				<p class="text-xl text-gray-700 mt-1">
					{$page.data.space.name}
				</p>
			</a>
		</div>
	</div>

	<div>
		<form action="">
			<div class="flex">
				<Radio value={''} name="widetType">Chart</Radio>
				<Radio class="ml-3" value={''} name="widetType">Report</Radio>
				<Radio class="ml-3" value={''} name="widetType">Form</Radio>
				<Radio class="ml-3" value={''} name="widetType">Map</Radio>
			</div>
		</form>

		<div class="mt-6">
			<Select
				bind:value={collection}
				items={tables.map((table) => ({
					name: table.name,
					value: table.id
				}))}
				placeholder="Create from collection"
			/>
		</div>
		<Button disabled class="w-full mt-9">Submit</Button>
	</div>
</Modal>
