import { dev } from "$app/environment";

export const prerender = false;
export const ssr = dev;
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


// /** @type {import('./$types').PageServerLoad} */
// export function load() {
//     return {
//       one: Promise.resolve(1),
//       two: Promise.resolve(2),
//       streamed: {
//         three: new Promise((fulfil) => {
//           setTimeout(() => {
//             fulfil(3)
//           }, 1000);
//         })
//       }
//     };
//   }

// <script>
//   /** @type {import('./$types').PageData} */
//   export let data;
// </script>

// <p>
//   one: {data.one}
// </p>
// <p>
//   two: {data.two}
// </p>
// <p>
//   three:
//   {#await data.streamed.three}
//     Loading...
//   {:then value}
//     {value}
//   {:catch error}
//     {error.message}
//   {/await}
// </p>