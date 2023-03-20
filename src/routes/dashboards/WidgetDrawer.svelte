<script>
	import { page } from '$app/stores';
	import {
		Drawer,
		CloseButton,
		Radio,
		Input,
		SidebarGroup,
		SidebarItem,
		SidebarDropdownWrapper,
		MegaMenu,
		DarkMode,
		Avatar,
		Button,
	} from 'flowbite-svelte';
	const space = $page?.data?.space;
	import { sineIn } from 'svelte/easing';
	let hidden2 = true;
	let transitionParams = {
		x: 320,
		duration: 200,
		easing: sineIn
	};
</script>

<Button on:click={() => (hidden2 = false)} gradient color="pinkToOrange" pill size="xs"
	>Add widget</Button
>

<Drawer
	placement="right"
	transitionType="fly"
	{transitionParams}
	bind:hidden={hidden2}
	id="sidebar2"
>
	<div class="flex items-center">
		<div class="flex">
			<a href="/">
				<p class="text-xl text-gray-700 mt-1">
					{$page.data.space.name}
				</p>
			</a>
		</div>
		<CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
	</div>

	<div>
		<form action="">
			<div class="flex justify-evenly">
				<Radio value={''} name="widetType">Chart</Radio>
				<Radio value={''} name="widetType">Report</Radio>
				<Radio value={''} name="widetType">Form</Radio>
				<Radio value={''} name="widetType">Map</Radio>
			</div>
		</form>
	</div>
</Drawer>
