<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Card } from 'flowbite-svelte';
</script>

<div class="grid grid-cols-3 gap-3 mt-4 px-6">
	<Card>
		<p>Spaces</p>
		<p>{data.spaces}</p>
		<p>{data.activeSpaces}</p>
		<a href="/admin/spaces">View</a>
	</Card>
	<Card>
		<p>Users</p>
		<p>{data.spaces}</p>
		<p>{data.activeSpaces}</p>
		<a href="/admin/users">view</a>
	</Card>
	<Card>
		<p>Messages</p>
		<p>{data.messages}</p>
		<p>{data.activeSpaces}</p>
		<a href="/admin/users">view</a>
	</Card>
</div>
