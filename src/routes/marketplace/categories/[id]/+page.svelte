<script>
  import { page } from "$app/stores";
  console.log($page.data.category);
</script>

<div
  class="py-2 px-4 md:px-6 2xl:px-0 2xl:mx-auto 2xl:container flex justify-center items-center"
>
  <div class="flex justify-between items-center w-full">
    <div class="flex flex-col justify-start items-start">
      <p class="text-sm leading-none text-gray-600 dark:text-gray-300">
        home - watches
      </p>
      <div class="mt-2 flex flex-row justify-end items-center space-x-3">
        <p
          class="text-2xl font-semibold leading-normal text-gray-800 dark:text-white"
        >
          {$page.data.category?.title}
        </p>
        <p class="text-base leading-4 text-gray-600 mt-2 dark:text-gray-400">
          (0{$page.data.category.products.length} products)
        </p>
      </div>
    </div>

    <button
      class="hover:text-gray-500 text-gray-600 bg-gray-100 py-3.5 px-3 rounded-sm flex flex-row justify-center items-center space-x-3 dark:bg-gray-800 dark:bg-gray-700"
    >
      <svg
        class="dark:text-gray-300"
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 14.6452V9.33875"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4 6.30645V1"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 14.6452V7.82263"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 4.79032V1"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 14.6452V10.8549"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 7.82258V1"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 9.33875H7"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 4.79028H15"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 10.8549H23"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <p class="hidden md:block text-sm leading-none dark:text-gray-300">
        Filters
      </p>
    </button>
  </div>
</div>

<div class="mx-auto container px-6 xl:px-0 py-12">
  <div class="flex flex-col">
    <div class="flex flex-col justify-center">
      <div class="relative ">
        <img
          class="hidden h-64 rounded-xl sm:block w-full"
          src={$page.data.category?.media[0].url}
          alt="sofa"
        />
        <img
          class="sm:hidden w-full"
          src={$page.data.category?.media[0].url}
          alt="sofa"
        />
        <div
          class="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start"
        >
          <p class="text-3xl sm:text-4xl font-semibold leading-9 text-white">
            {$page.data.category?.title}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="mx-auto container px-6 xl:px-0 py-12">
    <div class="flex flex-col">
      <div class="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
        {#each $page.data.category.products as product}
          <a
            href="/marketplace/products/{product.id}"
            class="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 sm:p-28 py-36 px-10 flex justify-center items-center"
          >
            <img
              class="group-hover:opacity-60 transition duration-500"
              src={product.media[0].url}
              alt="sofa-2"
            />
            <div
              class="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2"
            >
              <div>
                <p
                  class="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600 dark:text-white"
                >
                  {product.title}
                </p>
              </div>
              <div>
                <p
                  class="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800 dark:text-white"
                >
                  KES. {product.price ?? 0}
                </p>
              </div>
            </div>
            <div
              class="group-hover:opacity-60 transition duration-500 absolute bottom-8 right-8 flex justify-start items-start flex-row space-x-2"
            >
              <button
                class="bg-white border rounded-full focus:bg-gray-800 border-gray-600 p-1.5"
              />
              <button
                class="bg-white border rounded-full focus:bg-gray-800 border-gray-600 p-1.5"
              />
            </div>
            <div
              class="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500"
            >
              <button>
                <img
                  class="dark:hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg1.svg"
                  alt="add"
                />
                <img
                  class="hidden dark:block"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg1dark.svg"
                  alt="add"
                />
              </button>
              <button>
                <img
                  class="dark:hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg2.svg"
                  alt="view"
                />
                <img
                  class="hidden dark:block"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg2dark.svg"
                  alt="view"
                />
              </button>
              <button>
                <img
                  class="dark:hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg3.svg"
                  alt="like"
                />
                <img
                  class="hidden dark:block"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg3dark.svg"
                  alt="like"
                />
              </button>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>
