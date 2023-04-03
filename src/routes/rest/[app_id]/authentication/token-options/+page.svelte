<script lang="ts">
	import { Input, Card, Select, Heading, Button } from 'flowbite-svelte';
	let expiry = 'daily';
</script>

<div class="container">
	<Card class="space-y-6" size="xl">
		<Heading tag="h4">Token Options</Heading>
		<div class="grid grid-cols-2 gap-2">
			<div>
				<Input placeholder="Expiry" />
			</div>
			<div><Select items={[{ name: 'Day(s)', value: 'daily' }]} bind:value={expiry} /></div>
		</div>
		<div>
			<Input type="password" placeholder="App secret" />
		</div>
		<Button>Update</Button>
	</Card>
</div>
