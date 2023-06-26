<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="text-black mx-auto text-center py-4">
  <ol>
    <li  class="hover:underline"  ><a href="/categories">   All</a></li>
    {#each $page.data.categories as category}
      <li><a class="hpver:underline" href="/categories/{category.title}">{category.title}</a></li>
    {/each}
  </ol>
</div>
