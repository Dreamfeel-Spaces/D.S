export default function(){
    return`
    <div class="2xl:container 2xl:mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded shadow-lg py-5 px-7">
      <nav class="flex justify-between">
        <div class="flex items-center space-x-3 lg:pr-16 pr-6">
          <img
            class="cursor-pointer dark:bg-white p-1 rounded-full"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg1.svg"
            alt="circle"
          />
          <h2
            class="font-normal text-2xl leading-6 text-gray-800 dark:text-white"
          >
            OvonRueden
          </h2>
        </div>

        <!-- For medium and plus sized devices -->
        <ul class="hidden md:flex flex-auto space-x-2">
          <li
            onclick="selected()"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white bg-indigo-600 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
          >
            Collections
          </li>
          <li
            onclick="selected()"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
          >
            Arts
          </li>
          <li
            onclick="selected()"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
          >
            Space
          </li>
          <li
            onclick="selected()"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
          >
            Game
          </li>
          <li
            onclick="selected()"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
          >
            Utility
          </li>
          <li
            onclick="selected()"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
          >
            Cards
          </li>
        </ul>
        <div class="flex space-x-5 justify-center items-center pl-2">
          <div
            class="relative dark:bg-white rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg2.svg"
              alt="chat"
            />
            <div
              class="animate-ping w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto duration-200"
            ></div>
            <div
              class="w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto shadow-lg"
            ></div>
          </div>

          <img
            class="cursor-pointer dark:bg-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg3.svg"
            alt="bell"
          />
        </div>
      </nav>
      <!-- for smaller devcies -->

      <div class="block md:hidden w-full mt-5">
        <div
          onclick="selectNew()"
          class="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full"
        >
          <div class="flex space-x-2">
            <span id="s1" class="font-semibold text-sm leading-3 hidden"
              >Selected:
            </span>
            <p
              id="textClicked"
              class="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer"
            >
              Collections
            </p>
          </div>
          <img
            id="ArrowSVG"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg4.svg"
            alt="down arrow"
            class="rotate-180 transform"
          />
        </div>
        <div class="relative">
          <ul
            id="list"
            class="hidden font-normal text-base leading-4 absolute top-2 w-full rounded shadow-md z-20"
          >
            <li
              onclick="selectedSmall()"
              class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black"
            >
              Arts
            </li>
            <li
              onclick="selectedSmall()"
              class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black"
            >
              Space
            </li>
            <li
              onclick="selectedSmall()"
              class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black"
            >
              Game
            </li>
            <li
              onclick="selectedSmall()"
              class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black"
            >
              Utility
            </li>
            <li
              onclick="selectedSmall()"
              class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black"
            >
              Cards
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

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
          <div
            class="relative group flex justify-center items-center h-full w-full"
          >
            <img
              class="object-center object-cover h-full w-full"
              src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png"
              alt="girl-image"
            />
            <button
              class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
            >
              Women
            </button>
            <div
              class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"
            ></div>
          </div>

          <div class="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
            <div
              class="relative group flex justify-center items-center h-full w-full"
            >
              <img
                class="object-center object-cover h-full w-full"
                src="https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png"
                alt="shoe-image"
              />
              <button
                class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
              >
                Shoes
              </button>
              <div
                class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"
              ></div>
            </div>
            <div
              class="relative group flex justify-center items-center h-full w-full"
            >
              <img
                class="object-center object-cover h-full w-full"
                src="https://i.ibb.co/Hd1pVxW/louis-mornaud-Ju-6-TPKXd-Bs-unsplash-1-2.png"
                alt="watch-image"
              />
              <button
                class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
              >
                Watches
              </button>
              <div
                class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"
              ></div>
            </div>
          </div>

          <div
            class="relative group justify-center items-center h-full w-full hidden lg:flex"
          >
            <img
              class="object-center object-cover h-full w-full"
              src="https://i.ibb.co/PTtRBLL/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
              alt="girl-image"
            />
            <button
              class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
            >
              Accessories
            </button>
            <div
              class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"
            ></div>
          </div>
          <div
            class="relative group flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden"
          >
            <img
              class="object-center object-cover h-full w-full hidden md:block"
              src="https://i.ibb.co/6FjW19n/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2.png"
              alt="girl-image"
            />
            <img
              class="object-center object-cover h-full w-full md:hidden"
              src="https://i.ibb.co/sQgHwHn/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
              alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
            />
            <button
              class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
            >
              Accessories
            </button>
            <div
              class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"
            ></div>
          </div>
        </div>
        <div
          class="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden"
        >
          <img
            class="object-center object-cover h-full w-full hidden md:block"
            src="https://i.ibb.co/6FjW19n/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2.png"
            alt="girl-image"
          />
          <img
            class="object-center object-cover h-full w-full sm:hidden"
            src="https://i.ibb.co/sQgHwHn/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
            alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
          />
          <button
            class="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
          >
            Accessories
          </button>
          <div
            class="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <div class="2xl:container 2xl:mx-auto md:py-12 py-9">
    <div
      class="bg-gray-50 dark:bg-gray-800 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-12 gap-14 lg:px-20 lg:py-12 py-10 md:px-12 px-4"
    >
      <!-- Delivery grid Card -->
      <div class="">
        <img
          class="dark:hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/highlight-1-svg1.svg"
          alt="delivery"
        />
        <img
          class="dark:block hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/highlight-1-svg1dark.svg"
          alt="delivery"
        />
        <h3
          class="text-xl leading-5 dark:text-white font-semibold text-gray-800 lg:mt-10 mt-8"
        >
          Delivery
        </h3>
        <p
          class="text-base leading-6 font-normal dark:text-gray-300 text-gray-600 mt-4 lg:w-full md:w-9/12 w-full"
        >
          Free worldwide delivery over orders above $100
        </p>
      </div>

      <!-- customer Grid Card -->

      <div class="">
        <img
          class="dark:hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/highlight-1-svg2.svg"
          alt="Customer Care"
        />
        <img
          class="dark:block hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/highlight-1-svg2dark.svg"
          alt="Customer Care"
        />
        <h3
          class="text-xl leading-5 dark:text-white font-semibold text-gray-800 lg:mt-10 mt-8"
        >
          Customer Care
        </h3>
        <p
          class="text-base leading-6 font-normal dark:text-gray-300 text-gray-600 mt-4 lg:w-full md:w-9/12 w-full"
        >
          Our customer care is available 24/7 at
          <span class="font-semibold cursor-pointer">+495-589-509</span> and
          <span class="font-semibold cursor-pointer"
            >customercare@gmail.com</span
          >
        </p>
      </div>

      <!-- Recycle Grid Card -->

      <div class="">
        <img
          class="dark:hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/highlight-1-svg3.svg"
          alt="Recycle"
        />
        <img
          class="dark:block hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/highlight-1-svg3dark.svg"
          alt="Recycle"
        />
        <h3
          class="text-xl leading-5 dark:text-white font-semibold text-gray-800 lg:mt-10 mt-8"
        >
          Recycle
        </h3>
        <p
          class="text-base leading-6 font-normal dark:text-gray-300 text-gray-600 mt-4 lg:w-full md:w-9/12 w-full"
        >
          All out products are 100 percent recycable
        </p>
      </div>

      <!-- Secure Payment Card -->

      <div class="">
        <img
          class="dark:hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/highlight-1-svg4.svg"
          alt="Secure Payment"
        />
        <img
          class="dark:block hidden"
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/highlight-1-svg4dark.svg"
          alt="Secure Payment"
        />
        <h3
          class="text-xl leading-5 dark:text-white font-semibold text-gray-800 lg:mt-10 mt-8"
        >
          Secure Payment
        </h3>
        <p
          class="text-base leading-6 font-normal dark:text-gray-300 text-gray-600 mt-4 lg:w-full md:w-9/12 w-full"
        >
          Transaction process has end to end encryption
        </p>
      </div>
    </div>
  </div>

  <div class="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
    <div class="text-center">
      <h2
        class="font-semibold dark:text-white lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800 md:w-full w-9/12 mx-auto"
      >
        Follow Us on Instagram
      </h2>
      <p
        class="font-normal text-base leading-6 dark:text-gray-400 text-gray-600 mt-4 lg:w-5/12 md:w-9/12 mx-auto"
      >
        Follow us on instagram @<span class="underline cursor-pointer"
          >followuspleaseee</span
        >
        and tag us to get featured on our timeline
      </p>
    </div>
    <div
      class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grap-8 md:gap-6 gap-4 mt-10"
    >
      <div class="relative group">
        <img
          src="https://i.ibb.co/QHS8Ngp/pexels-alana-sousa-3294250-1.png"
          alt="A picture of a sitting dog"
          class="lg:block hidden w-full"
        />
        <img
          src="https://i.ibb.co/mNPBgQN/pexels-alana-sousa-3294250-1-1.png"
          alt="A picture of a sitting dog"
          class="lg:hidden block w-full"
        />
        <div
          class="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"
        ></div>
        <div
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100"
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
            alt="instagram"
          />
        </div>
      </div>
      <div class="relative group">
        <img
          src="https://i.ibb.co/T8jgRy3/pexels-leah-kelley-1449667-1.png"
          alt="Smiling Girl"
          class="lg:block hidden w-full"
        />
        <img
          src="https://i.ibb.co/YD8nNMR/pexels-leah-kelley-1449667-1-1.png"
          alt="Smiling Girl"
          class="lg:hidden block w-full"
        />
        <div
          class="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"
        ></div>
        <div
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100"
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
            alt="instagram"
          />
        </div>
      </div>
      <div class="relative group">
        <img
          src="https://i.ibb.co/F3dzNWD/pexels-spencer-selover-775358-1.png"
          alt="Men Posing"
          class="lg:block hidden w-full"
        />
        <img
          src="https://i.ibb.co/myWxfSm/pexels-spencer-selover-775358-1-1.png"
          alt="Men Posing"
          class="lg:hidden block w-full"
        />
        <div
          class="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"
        ></div>
        <div
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100"
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
            alt="instagram"
          />
        </div>
      </div>
      <div class="relative group">
        <img
          src="https://i.ibb.co/DwcwgDP/pexels-chevanon-photography-1108099-1.png"
          alt="2 puppies"
          class="lg:block hidden w-full"
        />
        <img
          src="https://i.ibb.co/5cDQZ2r/pexels-chevanon-photography-1108099-1-1.png"
          alt="2 puppies"
          class="lg:hidden block w-full"
        />
        <div
          class="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"
        ></div>
        <div
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100"
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
            alt="instagram"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="mx-auto container py-16 xl:px-20 lg:px-12 sm:px-6 px-4">
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4"
    >
      <div class="flex flex-col flex-shrink-0">
        <div class="dark:text-white">
          <img
            class="dark:hidden"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/footer-I-svg1.svg"
            alt="icon"
          />
          <img
            class="hidden dark:block"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/footer-I-svg1dark.svg"
            alt="icon"
          />
        </div>
        <p class="text-sm leading-none text-gray-800 mt-4 dark:text-white">
          Copyright © 2021 Luxe
        </p>
        <p class="text-sm leading-none text-gray-800 mt-4 dark:text-white">
          All rights reserved
        </p>
        <div class="flex items-center gap-x-4 mt-12">
          <button
            aria-label="instagram"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center"
          >
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.00081 0.233398C6.68327 0.233398 6.39243 0.243215 5.48219 0.283343C4.57374 0.323644 3.95364 0.462973 3.41106 0.667403C2.84981 0.87855 2.37372 1.161 1.8994 1.62066C1.42473 2.08016 1.13317 2.54137 0.914502 3.08491C0.702944 3.61071 0.558942 4.2116 0.518053 5.09132C0.477342 5.97311 0.466675 6.25504 0.466675 8.50015C0.466675 10.7453 0.476986 11.0262 0.518231 11.9079C0.560009 12.788 0.703833 13.3887 0.914679 13.9144C1.13282 14.4581 1.42437 14.9193 1.89887 15.3788C2.37301 15.8386 2.8491 16.1218 3.40999 16.3329C3.95293 16.5373 4.57321 16.6767 5.48148 16.717C6.39171 16.7571 6.68238 16.7669 8.99974 16.7669C11.3175 16.7669 11.6074 16.7571 12.5176 16.717C13.4261 16.6767 14.0469 16.5373 14.5898 16.3329C15.1509 16.1218 15.6263 15.8386 16.1004 15.3788C16.5751 14.9193 16.8667 14.4581 17.0853 13.9145C17.2951 13.3887 17.4391 12.7878 17.4818 11.9081C17.5227 11.0263 17.5333 10.7453 17.5333 8.50015C17.5333 6.25504 17.5227 5.97328 17.4818 5.09149C17.4391 4.21143 17.2951 3.61071 17.0853 3.08508C16.8667 2.54137 16.5751 2.08016 16.1004 1.62066C15.6258 1.16082 15.1511 0.878377 14.5893 0.667403C14.0453 0.462973 13.4249 0.323644 12.5164 0.283343C11.6062 0.243215 11.3164 0.233398 8.99814 0.233398H9.00081ZM8.23525 1.72311C8.46245 1.72277 8.71597 1.72311 9.00077 1.72311C11.2792 1.72311 11.5492 1.73104 12.449 1.77065C13.281 1.8075 13.7326 1.94218 14.0334 2.05533C14.4316 2.20517 14.7155 2.38428 15.014 2.67362C15.3127 2.96295 15.4976 3.23851 15.6526 3.62429C15.7694 3.91535 15.9086 4.3528 15.9464 5.15881C15.9873 6.03026 15.9962 6.29204 15.9962 8.49823C15.9962 10.7044 15.9873 10.9662 15.9464 11.8377C15.9084 12.6437 15.7694 13.0811 15.6526 13.3722C15.4979 13.758 15.3127 14.0327 15.014 14.3218C14.7153 14.6112 14.4318 14.7903 14.0334 14.9401C13.7329 15.0538 13.281 15.1881 12.449 15.225C11.5494 15.2646 11.2792 15.2732 9.00077 15.2732C6.72217 15.2732 6.45212 15.2646 5.55256 15.225C4.72055 15.1878 4.26899 15.0531 3.96801 14.9399C3.56978 14.7901 3.28533 14.611 2.98666 14.3216C2.68799 14.0323 2.5031 13.7574 2.34808 13.3715C2.23128 13.0804 2.09208 12.643 2.05421 11.837C2.01332 10.9655 2.00514 10.7037 2.00514 8.49617C2.00514 6.2886 2.01332 6.0282 2.05421 5.15674C2.09226 4.35073 2.23128 3.91329 2.34808 3.62188C2.50275 3.2361 2.68799 2.96054 2.98666 2.67121C3.28533 2.38187 3.56978 2.20276 3.96801 2.05258C4.26881 1.93891 4.72055 1.80457 5.55256 1.76755C6.33977 1.7331 6.64484 1.72277 8.23525 1.72105V1.72311ZM13.5558 3.09574C12.9905 3.09574 12.5318 3.53956 12.5318 4.08741C12.5318 4.63508 12.9905 5.07942 13.5558 5.07942C14.1212 5.07942 14.5799 4.63508 14.5799 4.08741C14.5799 3.53974 14.1212 3.09574 13.5558 3.09574ZM9.00082 4.25481C6.58071 4.25481 4.61855 6.15564 4.61855 8.50013C4.61855 10.8446 6.58071 12.7446 9.00082 12.7446C11.4209 12.7446 13.3824 10.8446 13.3824 8.50013C13.3824 6.15564 11.4209 4.25481 9.00082 4.25481ZM9.00079 5.74454C10.5717 5.74454 11.8453 6.97818 11.8453 8.50013C11.8453 10.0219 10.5717 11.2557 9.00079 11.2557C7.42975 11.2557 6.15632 10.0219 6.15632 8.50013C6.15632 6.97818 7.42975 5.74454 9.00079 5.74454Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            aria-label="linked-in"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center"
          >
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.5333 8.4886C17.5333 9.04766 17.4746 9.60594 17.3592 10.1501C17.2467 10.6814 17.08 11.203 16.8617 11.7016C16.6483 12.1914 16.3837 12.6634 16.0745 13.1035C15.77 13.5409 15.4191 13.9512 15.0337 14.3253C14.6474 14.6977 14.2224 15.0367 13.7711 15.333C13.3152 15.6304 12.8273 15.8864 12.3215 16.094C11.806 16.3044 11.2664 16.4657 10.7184 16.5745C10.1559 16.6866 9.57755 16.7438 8.99962 16.7438C8.42126 16.7438 7.8429 16.6866 7.28121 16.5745C6.73244 16.4657 6.19283 16.3044 5.67779 16.094C5.17195 15.8864 4.68357 15.6304 4.22772 15.333C3.77645 15.0367 3.35143 14.6977 2.96599 14.3253C2.58015 13.9512 2.22928 13.5409 1.92427 13.1035C1.61675 12.6634 1.35172 12.1913 1.13755 11.7016C0.919183 11.203 0.752114 10.6814 0.639188 10.1501C0.525025 9.60594 0.466675 9.04766 0.466675 8.4886C0.466675 7.92913 0.524992 7.36965 0.639221 6.82665C0.752147 6.29538 0.919216 5.77299 1.13759 5.27519C1.35175 4.78505 1.61678 4.31265 1.9243 3.87246C2.22931 3.43473 2.58018 3.02517 2.96602 2.65069C3.35146 2.27823 3.77648 1.94007 4.22775 1.64421C4.6836 1.3455 5.17198 1.08958 5.67783 0.881567C6.19286 0.670713 6.73244 0.509099 7.28124 0.401087C7.84294 0.289844 8.4213 0.233398 8.99966 0.233398C9.57758 0.233398 10.1559 0.289844 10.7185 0.401087C11.2664 0.509131 11.806 0.670745 12.3215 0.881567C12.8273 1.08955 13.3153 1.3455 13.7711 1.64421C14.2224 1.94007 14.6475 2.27823 15.0337 2.65069C15.4191 3.02517 15.77 3.43473 16.0746 3.87246C16.3837 4.31265 16.6483 4.78508 16.8617 5.27519C17.08 5.77299 17.2467 6.29538 17.3592 6.82665C17.4746 7.36965 17.5333 7.92913 17.5333 8.4886ZM5.89026 2.11217C3.85805 3.0405 2.34131 4.85195 1.86836 7.03507C2.06048 7.03668 5.0973 7.07377 8.59622 6.17446C7.33492 4.00666 5.98735 2.23757 5.89026 2.11217ZM9.2 7.26001C5.44774 8.34669 1.84711 8.2685 1.71795 8.26369C1.71585 8.33945 1.71211 8.4128 1.71211 8.4886C1.71211 10.2996 2.41839 11.9507 3.57929 13.1991C3.57678 13.1954 5.57108 9.77282 9.50377 8.54262C9.59876 8.51199 9.69546 8.48456 9.79128 8.45797C9.60838 8.05732 9.40875 7.65584 9.2 7.26001ZM13.8124 3.1977C12.5293 2.10329 10.8447 1.43946 8.9996 1.43946C8.40748 1.43946 7.83286 1.50879 7.28242 1.63697C7.39157 1.77887 8.76042 3.53549 10.0067 5.74921C12.7565 4.75199 13.7944 3.22348 13.8124 3.1977ZM10.288 9.6261C10.2718 9.63131 10.2556 9.6358 10.2397 9.64142C5.93997 11.0914 4.53583 14.0136 4.52064 14.0455C5.75781 14.9762 7.30956 15.5377 8.99965 15.5377C10.0088 15.5377 10.9701 15.339 11.8448 14.9791C11.7368 14.3632 11.3135 12.2042 10.288 9.6261ZM13.0719 14.3349C14.7082 13.2668 15.8703 11.5706 16.1945 9.60591C16.0445 9.55916 14.0057 8.93477 11.6535 9.29958C12.6093 11.8407 12.9977 13.9101 13.0719 14.3349ZM10.5676 6.79966C10.7368 7.13585 10.9006 7.47801 11.0518 7.82188C11.1056 7.94524 11.1581 8.06618 11.2093 8.18708C13.7128 7.88233 16.1792 8.39506 16.2846 8.41599C16.2679 6.74483 15.65 5.21108 14.6275 4.01032C14.6137 4.02922 13.4449 5.66294 10.5676 6.79966Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            aria-label="twitter"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center"
          >
            <svg
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.5208 3.59864L7.55438 4.13498L6.99479 4.0693C4.95791 3.81755 3.17843 2.9638 1.66756 1.52992L0.928908 0.818458L0.73865 1.34385C0.33575 2.51503 0.593158 3.75188 1.43253 4.58375C1.8802 5.04346 1.77948 5.10914 1.00725 4.8355C0.73865 4.74793 0.503625 4.68226 0.481242 4.71509C0.4029 4.79171 0.6715 5.78776 0.884142 6.18181C1.17513 6.72909 1.76828 7.26542 2.4174 7.58284L2.96579 7.83459L2.31668 7.84554C1.68994 7.84554 1.66756 7.85648 1.73471 8.08634C1.95854 8.79781 2.84268 9.55305 3.82755 9.88142L4.52143 10.1113L3.91708 10.4615C3.02175 10.965 1.96973 11.2496 0.917717 11.2715C0.414092 11.2825 0 11.3262 0 11.3591C0 11.4685 1.36538 12.0815 2.15999 12.3223C4.54382 13.0338 7.37531 12.7273 9.50173 11.5123C11.0126 10.6476 12.5235 8.92915 13.2286 7.26542C13.6091 6.37883 13.9896 4.75888 13.9896 3.98174C13.9896 3.47824 14.0232 3.41257 14.6499 2.81056C15.0192 2.4603 15.3662 2.0772 15.4333 1.96775C15.5452 1.75978 15.534 1.75978 14.9633 1.94586C14.012 2.27422 13.8777 2.23044 14.3477 1.73789C14.6947 1.38763 15.1088 0.752784 15.1088 0.566709C15.1088 0.533872 14.9409 0.5886 14.7506 0.68711C14.5492 0.796566 14.1015 0.96075 13.7658 1.05926L13.1614 1.24534L12.613 0.884131C12.3108 0.68711 11.8856 0.468198 11.6617 0.402524C11.0909 0.249286 10.218 0.271177 9.70318 0.446307C8.30422 0.938859 7.42008 2.20855 7.5208 3.59864Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            aria-label="youtube"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center"
          >
            <svg
              width="18"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.6677 1.17143C16.4021 1.36664 16.9804 1.94183 17.1767 2.67227C17.5333 3.99611 17.5333 6.75832 17.5333 6.75832C17.5333 6.75832 17.5333 9.52043 17.1767 10.8444C16.9804 11.5748 16.4021 12.15 15.6677 12.3453C14.3369 12.7 9.00001 12.7 9.00001 12.7C9.00001 12.7 3.66309 12.7 2.33218 12.3453C1.59783 12.15 1.0195 11.5748 0.823232 10.8444C0.466675 9.52043 0.466675 6.75832 0.466675 6.75832C0.466675 6.75832 0.466675 3.99611 0.823232 2.67227C1.0195 1.94183 1.59783 1.36664 2.33218 1.17143C3.66309 0.81665 9.00001 0.81665 9.00001 0.81665C9.00001 0.81665 14.3369 0.81665 15.6677 1.17143ZM7.40002 4.43326V9.59993L11.6667 7.01669L7.40002 4.43326Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="sm:ml-0 ml-8 flex flex-col">
        <h2
          class="text-base font-semibold leading-4 text-gray-800 dark:text-white"
        >
          Company
        </h2>
        <a
          href="javascript:void(0)"
          class="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 dark:text-white cursor-pointer"
          >Blog</a
        >
        <a
          href="javascript:void(0)"
          class="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 dark:text-white cursor-pointer"
          >Pricing</a
        >
        <a
          href="javascript:void(0)"
          class="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 dark:text-white cursor-pointer"
          >About Us</a
        >
        <a
          href="javascript:void(0)"
          class="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 dark:text-white cursor-pointer"
          >Contact us</a
        >
        <a
          href="javascript:void(0)"
          class="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 dark:text-white cursor-pointer"
          >Testimonials</a
        >
      </div>
      <div class="flex flex-col">
        <h2
          class="text-base font-semibold leading-4 text-gray-800 dark:text-white"
        >
          Support
        </h2>
        <a
          href="javascript:void(0)"
          class="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 dark:text-white cursor-pointer"
          >Legal policy</a
        >
        <a
          href="javascript:void(0)"
          class="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 dark:text-white cursor-pointer"
          >Status policy</a
        >
        <a
          href="javascript:void(0)"
          class="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 dark:text-white cursor-pointer"
          >Privacy policy</a
        >
        <a
          href="javascript:void(0)"
          class="focus:outline-none focus:underline hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 dark:text-white cursor-pointer"
          >Terms of service</a
        >
      </div>
      <div class="mt-10 lg:block hidden">
        <label
          class="text-xl font-medium leading-5 text-gray-800 dark:text-white"
          >Get updates</label
        >
        <div
          class="cursor-pointer flex items-center justify-between border border-gray-800 dark:border-white mt-4"
        >
          <input
            type="text"
            class="text-base leading-4 p-4 w-full focus:outline-none text-gray-800 dark:text-white dark:placeholder-white dark:bg-gray-900 dark:border-white placeholder-gray-800"
            placeholder="Enter your email"
          />
          <button
            aria-label="send"
            class="mr-4 fill-current text-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            <svg
              class="dark:text-white dark:hover:text-gray-200"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8934 7.39673L14.8884 7.39457L1.54219 1.9166C1.42993 1.87011 1.30778 1.85187 1.18666 1.86353C1.06554 1.87519 0.949225 1.91637 0.848125 1.9834C0.741311 2.05266 0.653573 2.14711 0.592805 2.25826C0.532037 2.36941 0.500145 2.49376 0.5 2.62013V6.12357C0.50006 6.29633 0.561019 6.46366 0.67237 6.59671C0.783722 6.72976 0.938491 6.82021 1.11 6.85246L8.38906 8.18438C8.41767 8.18974 8.44348 8.20482 8.46205 8.22701C8.48062 8.2492 8.49078 8.2771 8.49078 8.30591C8.49078 8.33472 8.48062 8.36263 8.46205 8.38481C8.44348 8.407 8.41767 8.42208 8.38906 8.42744L1.11031 9.75936C0.938851 9.79153 0.784092 9.88185 0.67269 10.0148C0.561288 10.1477 0.500219 10.3149 0.5 10.4876V13.9917C0.499917 14.1124 0.530111 14.2312 0.587871 14.3374C0.645632 14.4437 0.729152 14.5341 0.830938 14.6006C0.953375 14.6811 1.09706 14.7241 1.24406 14.7243C1.34626 14.7242 1.4474 14.7039 1.54156 14.6646L14.8875 9.21787L14.8934 9.21509C15.0731 9.13869 15.2262 9.01185 15.3337 8.85025C15.4413 8.68866 15.4986 8.49941 15.4986 8.30591C15.4986 8.11241 15.4413 7.92316 15.3337 7.76157C15.2262 7.59997 15.0731 7.47313 14.8934 7.39673Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-10 lg:hidden">
      <label
        class="text-xl font-medium leading-5 text-gray-800 dark:text-white"
        >Get updates</label
      >
      <div
        class="flex items-center justify-between border border-gray-800 dark:border-white mt-4"
      >
        <input
          type="text"
          class="text-base leading-4 p-4 relative z-0 w-full focus:outline-none text-gray-800 placeholder-gray-800 dark:text-white dark:placeholder-white dark:border-white dark:bg-gray-900"
          placeholder="Enter your email"
        />
        <button
          aria-label="send"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer mr-4 cursor-pointer relative z-40"
        >
          <svg
            class="fill-current text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-200"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8934 7.39673L14.8884 7.39457L1.54219 1.9166C1.42993 1.87011 1.30778 1.85187 1.18666 1.86353C1.06554 1.87519 0.949225 1.91637 0.848125 1.9834C0.741311 2.05266 0.653573 2.14711 0.592805 2.25826C0.532037 2.36941 0.500145 2.49376 0.5 2.62013V6.12357C0.50006 6.29633 0.561019 6.46366 0.67237 6.59671C0.783722 6.72976 0.938491 6.82021 1.11 6.85246L8.38906 8.18438C8.41767 8.18974 8.44348 8.20482 8.46205 8.22701C8.48062 8.2492 8.49078 8.2771 8.49078 8.30591C8.49078 8.33472 8.48062 8.36263 8.46205 8.38481C8.44348 8.407 8.41767 8.42208 8.38906 8.42744L1.11031 9.75936C0.938851 9.79153 0.784092 9.88185 0.67269 10.0148C0.561288 10.1477 0.500219 10.3149 0.5 10.4876V13.9917C0.499917 14.1124 0.530111 14.2312 0.587871 14.3374C0.645632 14.4437 0.729152 14.5341 0.830938 14.6006C0.953375 14.6811 1.09706 14.7241 1.24406 14.7243C1.34626 14.7242 1.4474 14.7039 1.54156 14.6646L14.8875 9.21787L14.8934 9.21509C15.0731 9.13869 15.2262 9.01185 15.3337 8.85025C15.4413 8.68866 15.4986 8.49941 15.4986 8.30591C15.4986 8.11241 15.4413 7.92316 15.3337 7.76157C15.2262 7.59997 15.0731 7.47313 14.8934 7.39673Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
    `
}