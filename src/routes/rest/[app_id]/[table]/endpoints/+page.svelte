<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	import Request from './Request.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	let action = 'create';

	import {
		Card,
		Tabs,
		TabItem,
		Alert,
		Select
	} from 'flowbite-svelte';
	import Code from '../../../../Code.svelte';
	const origin = $page.url.origin;
	export let me = 'Brian Odida';
</script>



<!-- {#if !data?.table?.columns?.length && data?.space?.apiChannel}
	<div class="my-6 mx-6">
		<Alert>
			<p><b>Configuration error</b></p>
			<p class="my-3">Missing schema</p>
			<a class="hover:underline" href={`/rest/${$page.params['app_id']}/${$page.params.table}`}
				>Add schema</a
			>
		</Alert>
	</div>
{/if} -->

<div class="p-4">
	<!-- {#if data?.table?.columns?.length && data?.space?.apiChannel} -->
		<div class="overflow-auto">
			<div class="flex">
				<div>
					<Select
						bind:value={action}
						items={[
							{ name: 'Create', value: 'create' },
							{ name: 'Find Many', value: 'find_many' },
							{ name: 'Find Unique', value: 'find_unique' },
							{ name: 'Find First', value: 'find_first' },
							{ name: 'Update', value: 'update' },
							{ name: 'Delete', value: 'delete' }
						].map((item) => ({ ...item, name: `${item.name} ${$page.params.table}` }))}
						placeholder="Choose	 an action"
					/>
				</div>
				<div class="flex-1 text-right">
					<Code
						code={`// Http method: POST
var ${$page.params.table}CreateUrl = "${origin}/api/records/${$page.params.table}"`}
					/>
				</div>
			</div>
			<Card class="text-left" size="xl">
				<div>
					<div>
						<div />
					</div>
				</div>
				<Tabs>
					<TabItem open title="Simulate">
						<Request
							tables={data?.tables}
							{action}
							url={`${origin}/api/records/${$page.params.table}`}
							method={'get'}
						/>
					</TabItem>
					<TabItem title="cURL" />
					<TabItem title="JS">
						<Code
							code={`
// SDK
import {Space} from "dreamfeel-sdk"
const exampleSpace = new Space()
const examples = await exampleSpace.find()
console.log(examples)

// Fetch
fetch("${$page.url.origin}/api/examples")
  .then((response) => response.json())
  .then((data) => console.log(data));

//  Axios
try{
	const response = await axios.get("/exampes")
	console.log(response.data)
}catch(e){
	// ...
}

					`}
						/>
					</TabItem>
					<TabItem title="PY">
						<Code
							code={`
// SDK
import dreamfeel_spaces
items = dreamfeel_spaces.find("items", {take:10})
print(items)
							
// requets				
import requests
items = requests.get('${$page.url.origin}/api/examples')
print(items)
							`}
						/>
					</TabItem>
					<TabItem title="Rust" />
					<TabItem title="PHP" />
					<TabItem title="C#" />
					<TabItem title="Java">
						<Code
							language="clike"
							code={`
Url url = new URL("http://example.com");
HttpURLConnection con = (HttpURLConnection) url.openConnection();
con.setRequestMethod("GET"); 
`}
						/>
					</TabItem>
					<TabItem title="CLI" />
					<TabItem title="Svelte" />
					<TabItem title="React" />
					<TabItem title="Angular" />
					<TabItem title="Vue" />
					<TabItem title="Angular" />
				</Tabs>
			</Card>
		</div>

		
	<!-- {/if} -->
</div>
