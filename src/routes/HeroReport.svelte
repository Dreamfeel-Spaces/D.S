<script lang="ts">
	//@ts-nocheck
	import { Table, TableHead, TableHeadCell, ListPlaceholder, Alert } from 'flowbite-svelte';
</script>

<div>
	<div class="flex mb-6">
		<small class="flex-1">Create and instantly share/store/print data reports</small>
	</div>
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
	<ListPlaceholder />
</div>
