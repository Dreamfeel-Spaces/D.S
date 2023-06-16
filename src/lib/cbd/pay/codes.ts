export const svelteCode = (hostname: string) => `<script>
import { onMount } from 'svelte'
</script>

<svelte:head>
<script src="http://cdn.${hostname}/packages/pay_js/0.X.X" on:load={() => console.log('script:load') }\>\</script>
</svelte:head>

<h1>Hello {name}!</h1>`;
