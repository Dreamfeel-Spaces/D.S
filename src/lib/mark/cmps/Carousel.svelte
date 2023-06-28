<script>
  import { page } from "$app/stores";
  import { Button, ImagePlaceholder } from "flowbite-svelte";
  let defaultTransform = 0;
  function goNext() {
    defaultTransform = defaultTransform - 398;
    var slider = document.getElementById("slider");
    if (Math.abs(defaultTransform) >= slider.scrollWidth / 1.7)
      defaultTransform = 0;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
  }
  function goPrev() {
    var slider = document.getElementById("slider");
    if (Math.abs(defaultTransform) === 0) defaultTransform = 0;
    else defaultTransform = defaultTransform + 398;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
  }
  let items = ($page.data.config.LANDING_PAGE.carouselItems ?? []).map(
    (item) => {
      let cat = $page.data.categories.find((cat) => cat.id === item);
      return cat;
    }
  );
</script>

{#if items.length}
  <div
    class="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4"
  >
    <div class="w-full relative flex items-center justify-center">
      <button
        on:click={goPrev}
        aria-label="slide backward"
        class="absolute z-30 left-0 ml-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
      >
        <svg
          class="dark:text-gray-900"
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1L1 7L7 13"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
        <div
          id="slider"
          class="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
        >
          {#each items as category}
            <a
              href="/categories/{category.title}"
              class="flex flex-shrink-0 relative w-full sm:w-auto"
            >
              <img
                src={category.media[0]?.url}
                alt="black chair and white table"
                class=" h-96 object-cover"
              />
              <div class="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                <h2
                  class="lg:text-xl dark:text-white leading-4 text-base lg:leading-5 text-white"
                >
                  {category.title}
                </h2>
                <div class="flex h-full items-end pb-6">
                  <!-- <h3
                    class="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900"
                  >
                    {category.description}
                  </h3> -->
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
      <button
        on:click={goNext}
        aria-label="slide forward"
        class="absolute z-30 right-0 mr-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        id="next"
      >
        <svg
          class="dark:text-gray-900"
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L7 7L1 13"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
{/if}
{#if !items.length}
  <div class="w-full bg-gray-200 rounded-xl">
    <div class="bg-gray-400 rounded-xl relative z-0">
      <div
        class="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4"
      >
        <div class="w-full relative flex items-center justify-center">
          <button
            on:click={goPrev}
            aria-label="slide backward"
            class="absolute z-30 left-0 ml-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
          >
            <svg
              class="dark:text-gray-900"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1L1 7L7 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div
            class="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden"
          >
            <div
              id="slider"
              class="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
            >
              {#each [1, 2, 3, 4] as category}
                <div class="flex flex-shrink-0 relative w-full sm:w-auto">
                  <img
                    src={"https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png"}
                    alt="black chair and white table"
                    class="object-contain h-96 w-96 object-center"
                  />
                  <div
                    class="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6"
                  >
                    <h2
                      class="lg:text-xl leading-4 text-base lg:leading-5 text-white dark:text-gray-900"
                    >
                      Catalog {category}
                    </h2>
                    <div class="flex h-full items-end pb-6">
                      <h3
                        class="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900"
                      >
                        Catalog {category} desc
                      </h3>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          <button
            on:click={goNext}
            aria-label="slide forward"
            class="absolute z-30 right-0 mr-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            id="next"
          >
            <svg
              class="dark:text-gray-900"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L1 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        class="absolute backdrop-blur-sm bg-white/30 inset-0 flex justify-center items-center z-10"
      >
        <div class="text-center">
          <p class="text-2xl mb-4 font-bold text-white">
            No collections have been added to the carousel!
          </p>
          <!-- <Button href="/dashboard/settings">Update Collections</Button> -->
        </div>
      </div>
    </div>
  </div>
{/if}
