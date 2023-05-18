<script>
	import { tableIcon } from "$lib/wsstore";

	//@ts-nocheck
	export let itemLabel;

	function removeTags(html) {
		const regex = /(<([^>]+)>)/gi;
		return html.replace(regex, '');
	}
	export let highlighted;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<li class="autocomplete-items" class:autocomplete-active={highlighted} on:click>
	<span class="mr-4 ">
		<span class="material-symbols-outlined"> {removeTags(itemLabel)} </span>
	</span>
	{@html itemLabel}
</li>

<style>
	li.autocomplete-items {
		list-style: none;
		border-bottom: 1px solid #d4d4d4;
		z-index: 99;
		/*position the autocomplete items to be the same width as the container:*/
		top: 100%;
		left: 0;
		right: 0;
		padding: 10px;
		cursor: pointer;
		/* background-color: #fff; */
	}

	li.autocomplete-items:hover {
		/*when hovering an item:*/
		background-color: #81921f;
		color: white;
	}

	li.autocomplete-items:active {
		/*when navigating through the items using the arrow keys:*/
		background-color: DodgerBlue !important;
		color: #ffffff;
	}

	.autocomplete-active {
		/*when navigating through the items using the arrow keys:*/
		background-color: DodgerBlue !important;
		color: #ffffff;
	}
</style>
