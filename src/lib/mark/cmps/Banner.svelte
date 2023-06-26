<script lang="ts">
  import { page } from "$app/stores";

  let bannerProducts = (
    $page.data.config.LANDING_PAGE ?? { bannerItems: [] }
  ).bannerItems?.map((p: any) => {
    return $page.data.products.find((product) => product.id === p);
  });
</script>

{#if bannerProducts?.length}
  <div class="container mx-auto py-9 md:py-12">
    <div class=" space-y-4 md:space-y-">
      <a
        href="/banner_products"
        class=" justify-between bg-gray-50 dark:bg-gray-800 py-6md:py-12"
      >
        <img
          src={($page.data.config.LANDING_PAGE ?? { url: "" }).bannerImage?.url}
          alt=""
          class="w-full"
        />
      </a>
    </div>
  </div>
{/if}

{#if !bannerProducts?.length}
  <div class="container mx-auto py-9 md:py-12 px-4 md:px-6">
    <div
      class="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8"
    >
      <div
        class="flex flex-col md:flex-row items-strech justify-between bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12"
      >
        <div class="flex flex-col justify-center md:w-1/2">
          <h1
            class="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white"
          >
            Banner Product
          </h1>
          <!-- <p class="text-base lg:text-xl text-gray-800 dark:text-white mt-2">
            Save upto <span class="font-bold">50%</span>
          </p> -->
        </div>
        <div class="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
          <img
            src={"https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png"}
            alt=""
            class=""
          />
        </div>
        <a href="/">Configure banner product</a>
      </div>
    </div>
  </div>
{/if}
