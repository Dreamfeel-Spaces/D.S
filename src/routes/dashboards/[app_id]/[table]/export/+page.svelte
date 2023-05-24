<script>
	import { Heading, P, Button, Card } from 'flowbite-svelte';
	import SpaceCsv from '../overview/SpaceCSV.svelte';
	import SpaceJson from '../overview/SpaceJSON.svelte';
</script>

<div>
	<SpaceCsv dataExport columns={[]} />
	<SpaceJson dataExport />
</div>
