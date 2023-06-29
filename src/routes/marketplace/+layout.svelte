<script>
	import { basket } from '$lib/mark/cart';
	import logo from '$lib/assets/beta-logo.png';
	import { Drawer } from 'flowbite-svelte';
	import CategoryList from './CategoryList.svelte';
	const toggleSearch = () => {
		document.getElementById('searchInput').classList.toggle('hidden');
	};
	const mdOptionsToggle = () => {
		document.getElementById('md-searchbar').classList.toggle('hidden');
		document.getElementById('md-searchbar').classList.toggle('flex');
	};
	const openMenu = () => {
		document.getElementById('mobile-menu').classList.remove('hidden');
	};
	const closeMenu = () => {
		document.getElementById('mobile-menu').classList.add('hidden');
	};

	let drawerHidden = true;
</script>

<Drawer hidden={drawerHidden}>
	<CategoryList />
</Drawer>

<div class="bg-gray-300 min-h-screen">
	<nav class="bg-white px-4 py-2 fixed  shadow-lg w-screen z-50 gap-2 md:flex ">
		<div class="flex flex-1 md:block justify-between">
			<!-- <button
        on:click={() => (drawerHidden = false)}
        class="md:hidden flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48"
          ><path
            d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"
          /></svg
        >
      </button> -->
			<a class="flex gap-2" href="/">
				<img width={'50'} src={logo} alt="" />
				<div class="flex items-center">
					<p class="text-xl">Marketplace</p>
				</div>
			</a>
			<!-- <a href="/marketplace/cart" class="md:hidden relative flex items-center">
        <div
          class="absolute bg-primary-700 right-1 top-0 text-white px-2 font-extra-bold rounded-full"
        >
          {Object.keys($basket).length}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48"
          ><path
            d="M220-80q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h110v-10q0-63 43.5-106.5T480-880q63 0 106.5 43.5T630-730v10h110q24 0 42 18t18 42v520q0 24-18 42t-42 18H220Zm0-60h520v-520H630v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T570-570v-90H390v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T330-570v-90H220v520Zm170-580h180v-10q0-38-26-64t-64-26q-38 0-64 26t-26 64v10ZM220-140v-520 520Z"
          /></svg
        >
      </a> -->
		</div>

		<div class="flex gap-6">
			<div class="flex-1  hidden md:block  w-56  ">
				<div class=" pt-1">
					<div class="mb-3">
						<div class="relative mb-4 flex   flex-wrap ">
							<input
								type="search"
								class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
								placeholder="Search"
								aria-label="Search"
								aria-describedby="button-addon1"
							/>

							<button
								class="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
								type="button"
								id="button-addon1"
								data-te-ripple-init
								data-te-ripple-color="light"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-5 w-5"
								>
									<path
										fill-rule="evenodd"
										d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="hidden lg:flex relative items-center">
				<div class="absolute bg-red-700 right-1 top-0 text-white px-2 font-extra-bold rounded-full">
					{Object.keys($basket).length}
				</div>
				<a
					href="/marketplace/checkout"
					aria-label="go to cart"
					class="w-6 text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36"
						><path
							d="M220-80q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h110v-10q0-63 43.5-106.5T480-880q63 0 106.5 43.5T630-730v10h110q24 0 42 18t18 42v520q0 24-18 42t-42 18H220Zm0-60h520v-520H630v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T570-570v-90H390v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T330-570v-90H220v520Zm170-580h180v-10q0-38-26-64t-64-26q-38 0-64 26t-26 64v10ZM220-140v-520 520Z"
						/></svg
					>
				</a>
			</div>
		</div>
	</nav>

	<!-- 
<div>
  <div>
    <div class="relative">
      <div
        id="md-searchbar"
        class="bg-white dark:bg-black hidden lg:hidden py-5 px-6 items-center justify-between"
      >
        <div class="flex items-center space-x-3 text-gray-800 dark:text-white">
          <div>
            <img
              class="dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg2.svg"
              alt="search"
            />
            <img
              class="dark:block hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg2dark.svg"
              alt="search"
            />
          </div>
          <input
            type="text"
            placeholder="Search for products"
            class="text-sm leading-none dark:text-gray-300 dark:bg-black text-gray-600 focus:outline-none"
          />
        </div>
        <div class="space-x-6">
          <button
            aria-label="view favourites"
            class="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            <img
              class="w-5 dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg3.svg"
              alt="favourites"
            />
            <img
              class="w-5 dark:block hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg3dark.svg"
              alt="favourites"
            />
          </button>
          <button
            aria-label="go to cart"
            class="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            <img
              class="w-5 dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg4.svg"
              alt="bag"
            />
            <img
              class="w-5 dark:block hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg4dark.svg"
              alt="bag"
            />
          </button>
        </div>
      </div>
      <div class="dark:bg-black bg-gray-50 px-6 py-9">
        <div class="container mx-auto flex items-center justify-between">
          <a
            href="/marketplace/"
            class="md:w-2/12 cursor-pointer text-gray-800 dark:text-white"
            aria-label="the Crib."
          >
            <img
              class="dark:hidden"
              src="https://res.cloudinary.com/dreamnerd/image/upload/c_mpad,w_81/v1686050718/WhatsApp_Image_2023-05-30_at_16.31.53-removebg-preview_yriqka_uhxqdc.png"
              alt="logo"
            />
            <img
              class="dark:block hidden"
              src="https://res.cloudinary.com/dreamnerd/image/upload/c_mpad,w_81/v1686050718/WhatsApp_Image_2023-05-30_at_16.31.53-removebg-preview_yriqka_uhxqdc.png"
              alt="logo"
            />
          </a>
          <ul
            class="hidden w-8/12 md:flex items-center justify-center space-x-8"
          >
            <li>
              <a
                href="/marketplace/categories"
                class="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                >All</a
              >
            </li>
            {#each $page.data.categories as category}
              <li>
                <a
                  href="/marketplace/categories/{category.title}"
                  class="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  >{category.title}</a
                >
              </li>
            {/each}
          </ul>

          <div
            class="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8"
          >
            <div class="hidden lg:flex items-center space-x-4 xl:space-x-8">
              <div class="absolute dark:text-white">
                {Object.keys($basket).length}
              </div>
              <a
                href="/marketplace/checkout"
                aria-label="go to cart"
                class="w-6 text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <img
                  class=" dark:hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg4.svg"
                  alt="bag"
                />
                <img
                  class=" dark:block hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg4dark.svg"
                  alt="bag"
                />
              </a>
            </div>

            <div class="flex lg:hidden">
              <button
                aria-label="show options"
                onclick="mdOptionsToggle()"
                class="text-black dark:text-white dark:hover:text-gray-300 hidden md:flex focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
              >
                <img
                  class=" dark:hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg5.svg"
                  alt="toggler"
                />
                <img
                  class=" dark:block hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg5dark.svg"
                  alt="toggler"
                />
              </button>
              <div class="relative" />
              <a
                href="/marketplace/checkout"
                aria-label="open menu"
                class="text-black flex dark:text-white dark:hover:text-gray-300 md:hidden focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
              >
                {Object.keys($basket).length}
                <img
                  class="w-5 dark:hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg4.svg"
                  alt="bag"
                />
                <img
                  class="w-5 dark:block hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg4dark.svg"
                  alt="bag"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        id="mobile-menu"
        class="hidden absolute dark:bg-black z-10 inset-0 md:hidden bg-white flex flex-col h-screen w-full"
      >
        <div
          class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 p-4"
        >
          <div class="flex items-center space-x-3">
            <div>
              <img
                class="dark:hidden"
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg2.svg"
                alt="search"
              />
              <img
                class="dark:block hidden"
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg2dark.svg"
                alt="search"
              />
            </div>
            <input
              type="text"
              placeholder="Search for products"
              class="text-sm dark:bg-black text-gray-600 placeholder-gray-600 dark:placeholder-gray-300 focus:outline-none"
            />
          </div>

          <button
            on:click={closeMenu}
            aria-label="close menu"
            class="focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
          >
            <img
              class="dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg6.svg"
              alt="cross"
            />
            <img
              class="dark:block hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg6dark.svg"
              alt="cross"
            />
          </button>
        </div>
        <div class="mt-6 p-4">
          <ul class="flex flex-col space-y-6">
            {#each $page.data.categories as category}
              <li>
                <a
                  href="/marketplace/categories/{category.title}"
                  class="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  >{category.title}</a
                >
              </li>
            {/each}
          </ul>
        </div>
        <div class="h-full flex items-end">
          <ul
            class="flex flex-col space-y-8 bg-gray-50 w-full py-10 p-4 dark:bg-gray-800"
          >
            <li>
              <a
                href="javascript:void(0)"
                class="dark:text-white text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
              >
                <div>
                  <img
                    class="w-5 dark:hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg4.svg"
                    alt="bag"
                  />
                  <img
                    class="w-5 dark:block hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/navigation-I-svg4dark.svg"
                    alt="bag"
                  />
                </div>
                <p class="text-base">Cart</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div> -->
	<div class="dark:bg-orange-300  pt-24 dark:text-white min-h-screen">
		<slot />
	</div>
</div>
