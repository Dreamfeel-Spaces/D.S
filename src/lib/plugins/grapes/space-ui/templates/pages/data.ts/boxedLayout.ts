export default function () {
	return `
  <div data-gjs-type="boxed-layout" class="h-full w-full absolute">
  <!-- Mobile -->
  <div id="mobile-nav" class="w-full xl:hidden h-full absolute z-40">
      <div id="spaces-id-handler-close" class="bg-gray-800 opacity-50 inset-0 fixed w-full h-full" onclick="sidebarHandler(false)"></div>
      <div class="w-64  absolute left-0 z-40 top-0 bg-white shadow flex-col justify-between transition duration-150 ease-in-out h-full">
          <div class="flex flex-col justify-between h-full">
              <div class="px-6 pt-4 overflow-y-auto">
                  <div class="flex items-center justify-between">
                      <div aria-label="Home" role="img" class="flex items-center">
                          <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg1.svg" alt="logo">
                          <p class="text-bold md:text2xl text-base pl-3 text-gray-800">The North</p>
                      </div>
                      <button id="space-cross-closer" class="hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded" onclick="sidebarHandler(false)">
                          <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg2.svg" alt="cross">
                      </button>
                  </div>
                  <ul class="f-m-m">
                      <li class="text-white pt-8">
                          <div class="flex items-center">
                              <div class="md:w-6 md:h-6 w-5 h-5">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                                      <path d="M7.16667 3H3.83333C3.3731 3 3 3.3731 3 3.83333V7.16667C3 7.6269 3.3731 8 3.83333 8H7.16667C7.6269 8 8 7.6269 8 7.16667V3.83333C8 3.3731 7.6269 3 7.16667 3Z" stroke="#667EEA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M7.16667 11.6667H3.83333C3.3731 11.6667 3 12.0398 3 12.5V15.8333C3 16.2936 3.3731 16.6667 3.83333 16.6667H7.16667C7.6269 16.6667 8 16.2936 8 15.8333V12.5C8 12.0398 7.6269 11.6667 7.16667 11.6667Z" stroke="#667EEA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M16.1667 11.6667H12.8333C12.3731 11.6667 12 12.0398 12 12.5V15.8334C12 16.2936 12.3731 16.6667 12.8333 16.6667H16.1667C16.6269 16.6667 17 16.2936 17 15.8334V12.5C17 12.0398 16.6269 11.6667 16.1667 11.6667Z" stroke="#667EEA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M16.1667 3H12.8333C12.3731 3 12 3.3731 12 3.83333V7.16667C12 7.6269 12.3731 8 12.8333 8H16.1667C16.6269 8 17 7.6269 17 7.16667V3.83333C17 3.3731 16.6269 3 16.1667 3Z" stroke="#667EEA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                              </div>
                              <a href="javascript:void(0)" class="text-indigo-500 ml-3 text-lg">Dashboard</a>
                          </div>
                      </li>
                      <li class="text-gray-700 pt-8">
                          <div class="flex items-center">
                              <div class="flex items-center">
                                  <div class="md:w-6 md:h-6 w-5 h-5">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
                                          <path
                                              d="M2.33333 4.83333H4.83333C5.05435 4.83333 5.26631 4.74554 5.42259 4.58926C5.57887 4.43298 5.66667 4.22101 5.66667 4V3.16667C5.66667 2.72464 5.84226 2.30072 6.15482 1.98816C6.46738 1.67559 6.89131 1.5 7.33333 1.5C7.77536 1.5 8.19928 1.67559 8.51184 1.98816C8.8244 2.30072 9 2.72464 9 3.16667V4C9 4.22101 9.0878 4.43298 9.24408 4.58926C9.40036 4.74554 9.61232 4.83333 9.83333 4.83333H12.3333C12.5543 4.83333 12.7663 4.92113 12.9226 5.07741C13.0789 5.23369 13.1667 5.44565 13.1667 5.66667V8.16667C13.1667 8.38768 13.2545 8.59964 13.4107 8.75592C13.567 8.9122 13.779 9 14 9H14.8333C15.2754 9 15.6993 9.17559 16.0118 9.48816C16.3244 9.80072 16.5 10.2246 16.5 10.6667C16.5 11.1087 16.3244 11.5326 16.0118 11.8452C15.6993 12.1577 15.2754 12.3333 14.8333 12.3333H14C13.779 12.3333 13.567 12.4211 13.4107 12.5774C13.2545 12.7337 13.1667 12.9457 13.1667 13.1667V15.6667C13.1667 15.8877 13.0789 16.0996 12.9226 16.2559C12.7663 16.4122 12.5543 16.5 12.3333 16.5H9.83333C9.61232 16.5 9.40036 16.4122 9.24408 16.2559C9.0878 16.0996 9 15.8877 9 15.6667V14.8333C9 14.3913 8.8244 13.9674 8.51184 13.6548C8.19928 13.3423 7.77536 13.1667 7.33333 13.1667C6.89131 13.1667 6.46738 13.3423 6.15482 13.6548C5.84226 13.9674 5.66667 14.3913 5.66667 14.8333V15.6667C5.66667 15.8877 5.57887 16.0996 5.42259 16.2559C5.26631 16.4122 5.05435 16.5 4.83333 16.5H2.33333C2.11232 16.5 1.90036 16.4122 1.74408 16.2559C1.5878 16.0996 1.5 15.8877 1.5 15.6667V13.1667C1.5 12.9457 1.5878 12.7337 1.74408 12.5774C1.90036 12.4211 2.11232 12.3333 2.33333 12.3333H3.16667C3.60869 12.3333 4.03262 12.1577 4.34518 11.8452C4.65774 11.5326 4.83333 11.1087 4.83333 10.6667C4.83333 10.2246 4.65774 9.80072 4.34518 9.48816C4.03262 9.17559 3.60869 9 3.16667 9H2.33333C2.11232 9 1.90036 8.9122 1.74408 8.75592C1.5878 8.59964 1.5 8.38768 1.5 8.16667V5.66667C1.5 5.44565 1.5878 5.23369 1.74408 5.07741C1.90036 4.92113 2.11232 4.83333 2.33333 4.83333"
                                              stroke="currentColor"
                                              stroke-width="1"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                          />
                                      </svg>
                                  </div>

                                  <a href="javascript:void(0)" class="text-gray-700 ml-3 text-lg">Products</a>
                              </div>
                              <button id="chevronup" onclick="listHandler(true)" class="ml-4 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded">
                                  <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg4.svg" alt="up">
                              </button>
                              <button id="chevrondown" onclick="listHandler(false)" class="hidden ml-4 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded ">
                                  <img class="transform rotate-180" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg4.svg" alt="down">
                              </button>
                          </div>
                          <div id="list" class="hidden">
                              <ul class="my-3">
                                  <li class="text-sm text-indigo-500 py-2 px-6"><a href="javascript:void(0)"> Best Sellers </a></li>
                                  <li class="text-sm text-gray-800 hover:text-indigo-500 py-2 px-6"><a href="javascript:void(0)"> Out of Stock</a></li>
                                  <li class="text-sm text-gray-800 hover:text-indigo-500 py-2 px-6"><a href="javascript:void(0)"> New Products</a></li>
                              </ul>
                          </div>
                      </li>
                      <li class="text-gray-800 pt-8">
                          <div class="flex items-center">
                              <div class="md:w-6 md:h-6 w-5 h-5">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                                      <path d="M6.66667 13.3333L8.33334 8.33334L13.3333 6.66667L11.6667 11.6667L6.66667 13.3333Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                              </div>
                              <a href="javascript:void(0)" class="text-gray-800 ml-3 text-lg">Performance</a>
                          </div>
                      </li>
                      <li class="text-gray-800 pt-8">
                          <div class="flex items-center">
                              <div class="flex items-center">
                                  <div class="md:w-6 md:h-6 w-5 h-5">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                                          <path d="M5.83333 6.66667L2.5 10L5.83333 13.3333" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                          <path d="M14.1667 6.66667L17.5 10L14.1667 13.3333" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                          <path d="M11.6667 3.33333L8.33333 16.6667" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                      </svg>
                                  </div>
                                  <a href="javascript:void(0)" class="text-gray-800 ml-3 text-lg">Deliverables</a>
                              </div>
                              <div>
                                  <button id="chevronup2" onclick="listHandler2(true)" class="ml-4 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded">
                                      <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg4.svg" alt="up">
                                  </button>
                                  <button id="chevrondown2" onclick="listHandler2(false)" class="hidden ml-4 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded">
                                      <img class="transform rotate-180" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg4.svg" alt="down">
                                  </button>
                              </div>
                          </div>
                          <div id="list2" class="hidden">
                              <ul class="my-3">
                                  <li class="text-sm text-indigo-500 py-2 px-6"><a href="javascript:void(0)"> Best Sellers </a></li>
                                  <li class="text-sm text-gray-800 hover:text-indigo-500 py-2 px-6"><a href="javascript:void(0)"> Out of Stock</a></li>
                                  <li class="text-sm text-gray-800 hover:text-indigo-500 py-2 px-6"><a href="javascript:void(0)"> New Products</a></li>
                              </ul>
                          </div>
                      </li>
                  </ul>
              </div>
              <div class="w-full">
                  <div class="flex justify-center mb-4 w-full px-6">
                      <div class="relative w-full">
                          <div class="text-gray-600 absolute ml-4 inset-0 m-auto w-4 h-4">
                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg3.svg" alt="search">
                          </div>
                          <input class="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500 placeholder-gray-600 bg-gray-100 pl-10 py-2" type="text" placeholder="Search" />
                      </div>
                  </div>
                  <div class="border-t border-gray-300">
                      <div class="w-full flex items-center justify-between px-6 pt-1">
                          <div class="flex items-center">
                              <img alt="display avatar" role="img" src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png" class="w-8 h-8 rounded-md" />
                              <p class="text-gray-800 text-base leading-4 ml-2">Jane Doe</p>
                          </div>
                          <ul class="flex">
                              <li class="cursor-pointer text-white pt-5 pb-3">
                                  <a href="javascript:void(0)"> 
                                      <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg5.svg" alt="message">
                                  </a>
                              </li>
                              <li class="cursor-pointer text-white pt-5 pb-3 pl-3">
                                  <a href="javascript:void(0)"> 
                                      <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg6.svg" alt="notifications">
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <!-- Mobile -->
  <nav class="w-full mx-auto bg-white shadow">
      <div class="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
          <div class="h-full flex items-center">
              <div aria-label="Home" role="img" class="mr-10 flex items-center">
                  <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg1.svg" alt="logo">
                  <h3 class="text-base text-gray-800 font-bold tracking-normal leading-tight ml-3 hidden lg:block">The North</h3>
              </div>
              <ul class="pr-12 xl:flex items-center h-full hidden">
                  <li class="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm text-indigo-700 tracking-normal border-b-2 border-indigo-700"><a href="javascript:void(0)"> Dashboard</a></li>
                  <li class="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm text-gry-800 mx-10 tracking-normal" ><a href="javascript:void(0)">Products</a></li>
                  <li class="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm text-gry-800 mr-10 tracking-normal"><a href="javascript:void(0)">Performance</a></li>
                  <li class="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm text-gray-800 tracking-normal"><a href="javascript:void(0)">Deliverables</a></li>
              </ul>
          </div>
          <div class="h-full xl:flex items-center justify-end hidden">
              <div class="w-full h-full flex items-center">
                  <div class="w-full pr-12 h-full flex items-center border-r">
                      <div class="relative w-full">
                          <div class="text-gray-600 absolute ml-3 inset-0 m-auto w-4 h-4">
                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg3.svg" alt="search">
                          </div>
                          <input class="border border-gray-100 focus:outline-none focus:border-indigo-700 w-56 rounded text-sm text-gray-500 placeholder-gray-600 bg-gray-100 pl-8 py-2" type="text" placeholder="Search" />
                      </div>
                  </div>
                  <div class="w-full h-full flex">
                      <div class="w-32 h-full flex items-center justify-center border-r cursor-pointer text-gray-600">
                          <a aria-label="show notifications" role="link" href="javascript:void(0)" class="cursor-pointer w-6 h-6 xl:w-auto xl:h-auto text-gray-600">
                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg6.svg" alt="notifications">
                          </a>
                      </div>
                      <div aria-haspopup="true" class="cursor-pointer w-full flex items-center justify-end relative" id="spaces-dropdown-handler">
                          <button aria-haspopup="true" onclick="dropdownHandler(this)" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded flex items-center" >
                              <img class="rounded-full h-10 w-10 object-cover" src="https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png" alt="avatar" />
                              <p class="text-gray-800 text-sm ml-2">Jane Doe</p>
                          </button>
                          <ul class="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-64 hidden">
                              <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                  <div class="flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" />
                                          <circle cx="12" cy="7" r="4" />
                                          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                      </svg>
                                      <a href="javascript:void(0)" class="ml-2">My Profile</a>
                                  </div>
                              </li>
                              <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-help" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                      <path stroke="none" d="M0 0h24v24H0z" />
                                      <circle cx="12" cy="12" r="9" />
                                      <line x1="12" y1="17" x2="12" y2="17.01" />
                                      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                                  </svg>
                                  <a href="javascript:void(0)" class="ml-2">Help Center</a>
                              </li>
                              <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                      <path stroke="none" d="M0 0h24v24H0z" />
                                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                      <circle cx="12" cy="12" r="3" />
                                  </svg>
                                  <a href="javascript:void(0)" class="ml-2">Account Settings</a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
          <div class="visible xl:hidden flex items-center">
              <div>
                  <button id="spaces-menu-opener" class="text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onclick="sidebarHandler(true) ">
                      <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg7.svg" alt="toggler">
                  </button>
              </div>
          </div>
      </div>
  </nav>
  <!-- Navigation ends -->
  <!-- Page title starts -->
  <div class="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
      <div>
          <h4 class="text-2xl font-bold leading-tight text-gray-800">User Profile</h4>
          <ul class="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-3">
              <li class="flex items-center mr-3 mt-3 md:mt-0">
                  <span class="mr-2">
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg8.svg" alt="Active">
                  </span>
                  <span>Active</span>
              </li>
              <li class="flex items-center mr-3 mt-3 md:mt-0">
                  <span class="mr-2">
                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg9.svg" alt="Trending">
                  </span>
                  <span> Trending</span>
              </li>
              <li class="flex items-center mt-3 md:mt-0">
                  <span class="mr-2">
                     <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg10.svg" alt="date">
                  </span>
                  <span>Started on 29 Jan 2020</span>
              </li>
          </ul>
      </div>
      <div class="mt-6 lg:mt-0">
          <button class="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">Back</button>
          <button class="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 border bg-indigo-700 rounded text-white px-8 py-2 text-sm">Edit Profile</button>
      </div>
  </div>
  <!-- Page title ends -->
  <div class="container mx-auto px-6">
      <!-- Remove class [ h-64 ] when adding a card block -->
      <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
      <div class="w-full h-64 rounded border-dashed border-2 border-gray-300">
          <!-- Place your content here -->
      </div>
  </div>
</div>


`;
}
