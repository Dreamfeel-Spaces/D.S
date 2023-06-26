<script lang="ts">
  import { page } from "$app/stores";
  import { basket } from "$lib/mark/cart";
  import { Button } from "flowbite-svelte";
  async function addToBasket(product: any) {
    basket.set({ ...$basket, [product.id]: { ...product, quantity: 1 } });
  }
</script>

<div
  class="md:flex gap-5 items-start justify-center py-12 2xl:px-20 md:px-6 px-4"
>
  <div class="xl:w-2/6 lg:w-2/5 w-80 md:block">
    {#each $page.data.product.media as media}
      <img class="w-full" alt=" of a girl posing" src={media.url} />
    {/each}
  </div>

  <div class="xl:w-2/5 md:w-1/2 lg:ml-8 pl-9 md:ml-6 md:mt-0 mt-6">
    <div class="border-b border-gray-200 pb-6">
      <p class="text-sm leading-none text-gray-600 dark:text-gray-300">
        {$page.data.product.category.title}
      </p>
      <h1
        class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2"
      >
        {$page.data.product.title}
      </h1>
    </div>
    <!-- <div
      class="py-4 border-b border-gray-200 flex items-center justify-between"
    >
      <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
        Colours
      </p>
      <div class="flex items-center justify-center">
        <p class="text-sm leading-none text-gray-600 dark:text-gray-300">
          Smoke Blue with red accents
        </p>
        <div
          class="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer"
        />
        <img
          class="dark:hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2.svg"
          alt="next"
        />
        <img
          class="hidden dark:block"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2dark.svg"
          alt="next"
        />
      </div>
    </div> -->
    <!-- <div
      class="py-4 border-b border-gray-200 flex items-center justify-between"
    >
      <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Size</p>
      <div class="flex items-center justify-center">
        <p class="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
          38.2
        </p>

        <img
          class="dark:hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2.svg"
          alt="next"
        />
        <img
          class="hidden dark:block"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2dark.svg"
          alt="next"
        />
      </div>
    </div> -->
    <!-- <button
      class="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none"
    >
      <img
        class="mr-3 dark:hidden"
        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/svg1.svg"
        alt="location"
      />
      <img
        class="mr-3 hidden dark:block"
        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/svg1dark.svg"
        alt="location"
      />
      Check availability in store
    </button> -->
    <div>
      <p
        class="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7"
      >
        {$page.data.product.description}
      </p>
      <p class="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
        Product Price: KES {$page.data.product.price}
      </p>
    </div>
    <div>
      <div class="border-t border-b py-4 mt-7 border-gray-200">
        <div data-menu class="flex justify-between items-center cursor-pointer">
          <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
            Shipping and returns
          </p>
          <button
            class="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
            role="button"
            aria-label="show or hide"
          >
            <img
              class="transform dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4.svg"
              alt="dropdown"
            />
            <img
              class="transform hidden dark:block"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4dark.svg"
              alt="dropdown"
            />
          </button>
        </div>
        <div
          class="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300"
          id="sect"
        >
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are nonrefundable
        </div>
      </div>
    </div>
    <div>
      <div class="border-b py-4 border-gray-200">
        <div data-menu class="flex justify-between items-center cursor-pointer">
          <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
            Contact us
          </p>
          <button
            class="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
            role="button"
            aria-label="show or hide"
          >
            <img
              class="transform dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4.svg"
              alt="dropdown"
            />
            <img
              class="transform hidden dark:block"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4dark.svg"
              alt="dropdown"
            />
          </button>
        </div>
        <div
          class="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300"
          id="sect"
        >
          If you have any questions on how to return your item to us, contact
          us.
        </div>
      </div>
    </div>

    <Button on:click={() => addToBasket($page.data.product)} class="w-full"
      >Add</Button
    >
  </div>
</div>
