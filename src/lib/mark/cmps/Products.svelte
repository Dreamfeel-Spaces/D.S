<script lang="ts">
  import { page } from "$app/stores";
  import { basket } from "$lib/mark/cart";
  function addToBasket(product) {
    basket.set({
      ...$basket,
      [product.id]: product,
    });
  }
</script>

<div class="mx-auto container px-6 xl:px-0 py-12">
  <div class="flex flex-col">
    <!-- <div class="flex flex-col justify-center">
        <div class="relative">
          <img
            class="hidden sm:block w-full"
            src="https://i.ibb.co/HxXSY0j/jason-wang-Nx-Awry-Abt-Iw-unsplash-1-1.png"
            alt="sofa"
          />
          <img
            class="sm:hidden w-full"
            src="https://i.ibb.co/B6qwqPT/jason-wang-Nx-Awry-Abt-Iw-unsplash-1.png"
            alt="sofa"
          />
          <div
            class="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start"
          >
            <p class="text-3xl sm:text-4xl font-semibold leading-9 text-white">
              Range Comfort Sofas
            </p>
          </div>
        </div>
      </div> -->
    <div class="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
      {#each $page.data.products as product}
        <a
          href="/products/{product.id}"
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
                {product.price}
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
    <div class="flex justify-end items-end mt-12">
      <div class="flex flex-row items-center justify-center space-x-8">
        <button
          class="text-base leading-none text-gray-800 dark:text-white border-b-2 border-transparent focus:outline-none focus:border-gray-800"
        >
          <p>1</p>
        </button>
        <button
          class="text-base leading-none text-gray-800 dark:text-white border-b-2 border-transparent focus:outline-none focus:border-gray-800"
        >
          <p>2</p>
        </button>
        <button
          class="text-base leading-none text-gray-800 dark:text-white border-b-2 border-transparent focus:outline-none focus:border-gray-800"
        >
          <p>3</p>
        </button>
        <button class="flex justify-center items-center">
          <img
            class="dark:hidden"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg4.svg"
            alt="next"
          />
          <img
            class="hidden dark:block"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg4dark.svg"
            alt="next"
          />
        </button>
      </div>
    </div>
  </div>
</div>
