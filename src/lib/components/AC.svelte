<script>
	//@ts-nocheck
	import Country from './Country.svelte';
	import { icons } from '../assets/json.json';
	import { A, Input } from 'flowbite-svelte';
	import { tableIcon } from '$lib/wsstore';
	import { useEffect } from '$lib/wsstore/hooks';

	/* FILTERING countres DATA BASED ON INPUT */
	let filteredIcons = [];
	// $: console.log(filteredCountries)

	const filterCountries = () => {
		let storageArr = [];
		if (inputValue) {
			icons.forEach((icon) => {
				if (icon.name.toLowerCase().startsWith(inputValue.toLowerCase())) {
					storageArr = [...storageArr, makeMatchBold(icon.name)];
				}
			});
		}
		filteredIcons = storageArr;
	};

	let searchInput;
	let inputValue = $tableIcon;

	$: if (!inputValue) {
		filteredIcons = [];
		hiLiteIndex = null;
	}

	const clearInput = () => {
		inputValue = '';
		searchInput.focus();
	};

	const setInputVal = (countryName) => {
		inputValue = removeBold(countryName);
		tableIcon.set(inputValue);
		filteredIcons = [];
		hiLiteIndex = null;
		document.querySelector('#country-input').focus();
	};

	useEffect(
		() => {
			inputValue = $tableIcon;
		},
		() => [$tableIcon]
	);

	const submitValue = () => {
		if (inputValue) {
			console.log(`${inputValue} is submitted!`);
			setTimeout(clearInput, 1000);
		} else {
			alert("You didn't type anything.");
		}
	};

	const makeMatchBold = (str) => {
		// replace part of (country name === inputValue) with strong tags
		let matched = str.substring(0, inputValue.length);
		let makeBold = `<strong>${matched}</strong>`;
		let boldedMatch = str.replace(matched, makeBold);
		return boldedMatch;
	};

	const removeBold = (str) => {
		return str.replace(/<(.)*?>/g, '');
	};

	let hiLiteIndex = null;
	$: hiLitedCountry = filteredIcons[hiLiteIndex];

	const navigateList = (e) => {
		if (e.key === 'ArrowDown' && hiLiteIndex <= filteredIcons.length - 1) {
			hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
		} else if (e.key === 'ArrowUp' && hiLiteIndex !== null) {
			hiLiteIndex === 0 ? (hiLiteIndex = filteredIcons.length - 1) : (hiLiteIndex -= 1);
		} else if (e.key === 'Enter') {
			setInputVal(filteredIcons[hiLiteIndex]);
		} else {
			return;
		}
	};
</script>

<svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault={submitValue}>
	<div class="flex space-x-3">
		<div class="flex items-center">
			{#if $tableIcon}
				<span class="material-symbols-outlined"> {$tableIcon} </span>
			{/if}
		</div>
		<Input
			class="w-full"
			id="country-input"
			type="text"
			placeholder="Search icon"
			bind:this={searchInput}
			bind:value={inputValue}
			on:input={filterCountries}
		/>
	</div>

	<div class="text-right">
		<A href="https://fonts.google.com/icons" target="blank">Full list of icons</A>
	</div>

	{#if filteredIcons.length > 0}
		<ul id="autocomplete-items-list">
			{#each filteredIcons as country, i}
				<Country
					itemLabel={country}
					highlighted={i === hiLiteIndex}
					on:click={() => setInputVal(country)}
				/>
			{/each}
		</ul>
	{/if}
</form>
<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<style>
	#autocomplete-items-list {
		position: relative;
		margin: 0;
		padding: 0;
		top: 0;
		border: 1px solid #ddd;
		background-color: #ddd;
	}
</style>
