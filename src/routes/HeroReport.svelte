<script lang="ts">
	//@ts-nocheck
	import { Table, TableHead, TableHeadCell, ListPlaceholder, Alert } from 'flowbite-svelte';
</script>

<div>
	<Table>
		<TableHead>
			<TableHeadCell class="text-gray-500" align="right" colspan={3}>
				Demo / Students/ All
			</TableHeadCell>
		</TableHead>

		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Age</TableHeadCell><TableHeadCell>Class</TableHeadCell>
		</TableHead>
	</Table>
	<ListPlaceholder size="xl" />
	<div class="mt-2 text-xs">
		Create reports from custom queries and use to generate documents, share or store on the cloud.
	</div>
</div>
