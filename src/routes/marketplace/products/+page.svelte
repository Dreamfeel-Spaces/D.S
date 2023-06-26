<script>
  import { page } from "$app/stores";
</script>

<div class="flex justify-center items-center">
  <div
    class="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full"
  >
    <div class="flex flex-col jusitfy-center items-center space-y-10">
      <div class="flex flex-col justify-center items-center">
        <h1
          class="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800 dark:text-white"
        >
          Shop By Category
        </h1>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full"
      >
        {#each $page.data.categories as category}
          <div
            class="relative group flex justify-center items-center h-full w-full"
          >
            <img
              class="object-center object-cover h-full w-full"
              src={category.media[0].url}
              alt="girl"
            />
            <a
              href="/categories/{category.title}"
              class="dark:bg-gray-800 text-center dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
              >{category.title}</a
            >
            <div
              class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<div class="mx-auto container px-6 xl:px-0 py-12">
  <div class="flex flex-col">
    <div class="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
      {#each $page.data.products as product}
        <div
          class="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 sm:p-28 py-36 px-10 flex justify-center items-center"
        >
          <img
            class="group-hover:opacity-60 transition duration-500"
            src="https://i.ibb.co/q79KfQr/pexels-pixabay-276583-removebg-preview-1.png"
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
        </div>
      {/each}
    </div>
  </div>
</div>
