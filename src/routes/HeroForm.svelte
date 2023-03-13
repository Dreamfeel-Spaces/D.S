<script lang="ts">
	//@ts-nocheck
	import { Checkbox, Button, Input, ListPlaceholder } from 'flowbite-svelte';
	let selectedOptions: any = {};
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import DateTimeInput from '$lib/components/DateTimeInput.svelte';
</script>

<div>
	<form method="post">
		<div class="flex mb-6">
			<small class="flex-1">Get started with custom forms</small>
		</div>
		<ListPlaceholder />
		<Button disabled type="submit" class="w-full mt-9">Submit</Button>
	</form>
</div>

<div class="relative bg-gray-300">
	<div class="flex justify-center w-full ">
		<!-- <img loading="lazy" width={112} src={logo} alt="" /> -->
	</div>
</div>
