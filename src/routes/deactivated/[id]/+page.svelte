<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Alert } from 'flowbite-svelte';
	export let form: any;
</script>

<div>
	{#if data?.space?.deactivated}
		<div class="px-6 mt-9">
			{#if form?.success}
				<Alert>
					<b>Space reactivated</b>
					<p class="my-3">Your space is now active</p>
					<a rel="external" href={`/spaces/${form?.data?.appId}`}>Go to admin </a>
				</Alert>
			{:else}
				<Alert>
					<b>Space deactivated</b>
					<p class="my-3">
						This space will nolonger be visible, and will be deleted after 14days. To reactivate or
						avoid deletion, you will have to send an email to support@dreamfeel.io
					</p>

					<form method="post">
						<button>Reactivate</button>
					</form>
				</Alert>
			{/if}
		</div>
	{/if}
</div>
