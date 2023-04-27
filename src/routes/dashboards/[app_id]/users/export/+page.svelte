<script>
	import { Heading, P, Button, Card } from 'flowbite-svelte';
	import SpaceCsv from '../../[table]/overview/SpaceCSV.svelte';
	import SpaceJson from '../../[table]/overview/SpaceJSON.svelte';
</script>

<div class="mt-3 grid gap-4 grid-cols-3">
	<SpaceCsv dataExport columns={[]} />
	<SpaceJson dataExport />
	<Card>
		<P>Print as...</P>
		<Button class="mt-16" disabled>Print as</Button>
	</Card>
	<Card>
		<P>Print as...</P>
		<Button class="mt-16" disabled>More options</Button>
	</Card>
</div>
