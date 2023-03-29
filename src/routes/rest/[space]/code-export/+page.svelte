<script lang="ts">
	import { Tabs, TabItem, Button, Select } from 'flowbite-svelte';
	let jsORM = '';
</script>

<Tabs class="mt-9">
	<TabItem open title="Node.js">
		<Tabs class="mt-9">
			<TabItem open title="Expressjs">
				<div class="my-4">Generate Express API code from your schema.</div>
				<dv class="mb-6">
					<label for="orm">ORM</label>
					<Select
						name="orm"
						id="orm"
						bind:value={jsORM}
						items={[
							{ name: 'TypeORM', value: 'typeorm' },
							{ name: 'Prisma', value: 'prisma' }
						]}
					/>
				</dv>

				<Button class="mt-9" >Generate code</Button>
			</TabItem>
			<TabItem  title="Fastify">
				<div class="my-4">Generate Express API code from your schema.</div>
				<Button>Generate code</Button>
			</TabItem>
			<TabItem  title="Nestjs">
				<div class="my-4">Generate Express API code from your schema.</div>
				<Button>Generate code</Button>
			</TabItem>
		</Tabs>
	</TabItem>
</Tabs>
