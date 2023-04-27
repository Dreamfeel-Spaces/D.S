<script lang="ts">
	import { Card, Heading, Button, Toggle } from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Card size="xl">
	<Heading tag="h4">Sessions</Heading>
	<div class="relative overflow-x-auto mt-6 min-h-96 h-100">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3"> User </th>
					<th scope="col" class="px-6 py-3"> Start </th>
					<th scope="col" class="px-6 py-3"> Expiry </th>
					<th scope="col" class="px-6 py-3">Status</th>
					<th scope="col" class="px-6 py-3" />
				</tr>
			</thead>
			<tbody>
				{#each data.sessions as session}
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							{session?.user?.name ?? 'Unkown user'}
						</th>
						<td class="px-6 py-4"> {session?.dateCreated} </td>
						<td class="px-6 py-4"> {session.expires} </td>
						<td class="px-6 py-4"> <Button size="xs" color="red" pill>Inactive</Button> </td>
						<td class="px-6 py-4"> <Toggle /> </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Card>
