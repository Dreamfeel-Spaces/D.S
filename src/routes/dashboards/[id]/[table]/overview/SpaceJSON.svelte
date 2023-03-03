<script lang="ts">
	//@ts-nocheck
	import { Card, Button, Checkbox } from 'flowbite-svelte';
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	export let dataExport = false;
	export let rows: any = [];
	export let columns: any = [];
	import { page } from '$app/stores';

	function downloadHandler() {
		csvGenerator(rows, `${$page.params?.id}-${$page.params.table}.json`);
	}

	export const csvGenerator = (totalData, fileName) => {
		let data = totalData || null;
		if (data == null || !data.length) {
			return null;
		}

		const formattedRows = {
			count: rows.length,
			space: $page.params.id,
			collection: $page.params.table,
			data: rows.map((row) => {
				const rData = row.tableData.reduce((prev, curr) => {
					return { ...prev, [curr.name]: curr.data };
				}, {});
				delete row['spaceTableId'];
				delete row['name'];
				delete row['tableData'];
				return { ...row, ...rData };
			})
		};

		var blob = new Blob([JSON.stringify(formattedRows)]);
		if (navigator.msSaveBlob) {
			// IE 10+
			navigator.msSaveBlob(blob, exportedFilenmae);
		} else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
			var hiddenElement = window.document.createElement('a');
			hiddenElement.href = 'data:text/json;charset=utf-8,' + encodeURI(result);
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
			<div class="flex-1">Download JSON</div>
		{:else}
			<div class="flex-1">Upload JSON</div>
		{/if}

		
	</div>
	{#if !dataExport}
		<input type="file" />
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
	<Button disabled={!columns.filter((col) => col.checked)} on:click={downloadHandler} class="mt-3"
		>Save</Button
	>
</Card>
