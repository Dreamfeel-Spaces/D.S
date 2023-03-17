export const prerender = false;
export const ssr = false;
export const csr = true;


// <script>
// import { onMount } from 'svelte';

// let Thing;

// const sleep = ms => new Promise(f => setTimeout(f, ms));

// onMount(async () => {
//     await sleep(1000); // simulate network delay
//     Thing = (await import('./Thing.svelte')).default;
// });
// </script>

// <svelte:component this={Thing} answer={42}>
// <p>some slotted content</p>
// </svelte:component>