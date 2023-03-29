<script lang="ts">
	//@ts-nocheck
	import { Card, Button, Checkbox } from 'flowbite-svelte';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	export let dataExport = false;
	export let rows: any = [];
	export let columns: any = [];
	import { page } from '$app/stores';

	import UploadCsv from 'upload-csv-svelte';

	function downloadHandler() {
		csvGenerator(
			rows,
			columns.filter((col) => col.checked).map((column) => column.name),
			columns.filter((col) => col.checked).map((column) => column.name),
			`${$page.params?.id}-${$page.params.table}.csv`
		);
	}

	function downloadTemplate() {
		console.log(columns);
		csvGenerator(
			[],
			columns.filter((col) => col.checked).map((column) => column.name),
			columns.filter((col) => col.checked).map((column) => column.name),
			`${$page.params?.id}-${$page.params.table}-template.csv`
		);
	}

	export const csvGenerator = (totalData, actualHeaderKey, headerToShow, fileName) => {
		let data = totalData || null;
		if (data == null || !data.length) {
			return null;
		}
		let columnDelimiter = ',';
		let lineDelimiter = '\n';
		let keys = headerToShow;
		let result = '';
		result += keys.join(columnDelimiter);
		result += lineDelimiter;
		data.forEach(function (item) {
			let ctr = 0;
			actualHeaderKey.forEach(function (key) {
				if (ctr > 0) result += columnDelimiter;
				if (Array.isArray(item[key])) {
					let arrayItem = item[key] && item[key].length > 0 ? '"' + item[key].join(',') + '"' : '-';
					result += arrayItem;
				} else if (typeof item[key] == 'string') {
					let strItem = item[key] ? '"' + item[key] + '"' : '-';
					result += strItem ? strItem.replace(/\s{2,}/g, ' ') : strItem;
				} else {
					let strItem = item[key] + '';
					result += strItem ? strItem.replace(/,/g, '') : strItem;
				}

				ctr++;
			});
			result += lineDelimiter;
		});

		if (result == null) return;

		var blob = new Blob([result]);
		if (navigator.msSaveBlob) {
			// IE 10+
			navigator.msSaveBlob(blob, exportedFilenmae);
		} else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
			var hiddenElement = window.document.createElement('a');
			hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(result);
			hiddenElement.target = '_blank';
			hiddenElement.download = fileName;
			hiddenElement.click();
		} else {
			let link = document.createElement('a');
			if (link.download !== undefined) {
				// Browsers that support HTML5 download attribute
				var url = URL.createObjectURL(blob);
				link.setAttribute('href', url);
				link.setAttribute('download', fileName);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	};
</script>

<Card>
	<div class="flex mb-6 ">
		{#if dataExport}
			<div class="flex-1">Download csv</div>
		{:else}
			<div class="flex-1">Upload csv</div>
		{/if}

		{#if !dataExport}
			<div>
				<button on:click={downloadTemplate}>Download template</button>
			</div>
		{/if}
	</div>
	{#if !dataExport}
		<UploadCsv onUpload={(file) => console.log('this is the parsed file: ', file)} />
	{/if}
	{#if dataExport}
		<div class="mt-4">
			{#each columns as column}
				<div class="mb-3">
					<Checkbox bind:checked={column.checked} bind:value={column.checked}
						>{column.name}</Checkbox
					>
				</div>
			{/each}
		</div>
	{/if}
	{#if dataExport}
		<Button disabled={!columns.filter((col) => col.checked)} on:click={downloadHandler} class="mt-3"
			>Download</Button
		>{:else}
		<Button disabled={!columns.filter((col) => col.checked)} on:click={downloadHandler} class="mt-3"
			>Upload</Button
		>
	{/if}
</Card>
