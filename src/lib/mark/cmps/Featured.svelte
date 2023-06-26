<script lang="ts">
  import { page } from "$app/stores";

  let featuredProduct = $page.data.categories.find((p: any) => {
    return p.id === $page.data.config.LANDING_PAGE.featuredItem;
  });

</script>

{#if featuredProduct}
  <div class="lg:px-20 md:px-6 px-4 md:py-12 py-8">
    <div class="lg:flex items-center justify-between">
      <div class="lg:w-1/3">
        <h1
          class="text-4xl font-semibold leading-9 text-gray-800 dark:text-white"
        >
          {featuredProduct.title}
        </h1>
        <p class="text-base leading-6 mt-4 text-gray-600 dark:text-gray-100">
          {featuredProduct.description}
        </p>
        <a
          href="/categories/{featuredProduct.title}"
          aria-label="view catalogue"
          class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:outline-none mt-6 md:mt-8 text-base font-semibold leading-none text-gray-800 dark:text-white flex items-center hover:underline"
        >
          View Catalogue
          <img
            class="ml-2 mt-1 dark:hidden"
            src={"https://tuk-cdn.s3.amazonaws.com/can-uploader/feature-VI-svg1.svg"}
            alt="arrow"
          />
          <img
            class="ml-2 mt-1 hidden dark:block"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature-VI-svg1dark.svg"
            alt="arrow"
          />
        </a>
      </div>
      <div class="lg:w-7/12 lg:mt-0 mt-8">
        <div class="w-full h-full bg-red-200">
          <img
            src={featuredProduct.media[0].url}
            alt="apartment design"
            class="w-full sm:block hidden"
          />
          <img
            src={featuredProduct.media[0].url}
            alt="apartment design"
            class="sm:hidden block w-full"
          />
        </div>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 lg:gap-8 gap-6 lg:mt-8 md:mt-6 mt-4"
        >
          <img
            src={featuredProduct.media[1].url}
            class="w-full h-48"
            alt="kitchen"
          />
          <img
            src={featuredProduct.media[2].url}
            class="w-full h-48 object-cover"
            alt="sitting room"
          />
        </div>
      </div>
    </div>
  </div>
{/if}

{#if !featuredProduct}
  <div class="lg:px-20 md:px-6 px-4 md:py-12 py-8">
    <div class="lg:flex items-center justify-between">
      <div class="lg:w-1/3">
        <h1
          class="text-4xl font-semibold leading-9 text-gray-800 dark:text-white"
        >
          Featured Item
        </h1>
        <p class="text-base leading-6 mt-4 text-gray-600 dark:text-gray-100">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          illum amet impedit minima laborum obcaecati numquam. Earum aspernatur
          ad mollitia odit voluptas beatae voluptatibus laborum quo nisi
          asperiores, ea dolore?
        </p>
        <a
          href="/dashboard/settings"
          aria-label="view catalogue"
          class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:outline-none mt-6 md:mt-8 text-base font-semibold leading-none text-gray-800 dark:text-white flex items-center hover:underline"
        >
          Update featured item
          <img
            class="ml-2 mt-1 dark:hidden"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature-VI-svg1.svg"
            alt="arrow"
          />
          <img
            class="ml-2 mt-1 hidden dark:block"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/feature-VI-svg1dark.svg"
            alt="arrow"
          />
        </a>
      </div>
      <div class="lg:w-7/12 lg:mt-0 mt-8">
        <div class="w-full h-full bg-red-200">
          <img
            src={"https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png"}
            alt="apartment design"
            class="w-full sm:block hidden"
          />
          <img
            src={"https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png"}
            alt="apartment design"
            class="sm:hidden block w-full"
          />
        </div>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 lg:gap-8 gap-6 lg:mt-8 md:mt-6 mt-4"
        >
          <img
            src={"https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png"}
            class="w-full"
            alt="kitchen"
          />
          <img
            src={"https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png"}
            class="w-full"
            alt="sitting room"
          />
        </div>
      </div>
    </div>
  </div>
{/if}
