<script>
	import { Heading, P, Button, Card } from 'flowbite-svelte';
	import Request from '../../../../rest/[app_id]/[table]/endpoints/Request.svelte';
	import SpaceCsv from '../overview/SpaceCSV.svelte';
	import SpaceJson from '../overview/SpaceJSON.svelte';
</script>

<div class="mt-3 grid gap-4 mb-4 grid-cols-3">
	<SpaceCsv columns={[]} />
	<SpaceJson />
	<Card>
		<P>Import pdf</P>
		<Button class="mt-16" disabled>PDF</Button>
	</Card>
</div>
<Card size="xl">
	<P tag="h6">Import from URL</P>
	<Request clone />
</Card>
