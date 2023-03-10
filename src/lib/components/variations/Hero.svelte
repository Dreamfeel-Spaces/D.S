<script lang="ts">
	//@ts-nocheck
	export let component: any;
	const type = component.value;
	const variant = component.variant;
</script>

{#if variant === 'default'}
	<section class="mb-40">
		<div class="text-center bg-gray-50 text-gray-800 py-24 px-6">
			<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
				The best offer on the market <br /><span class="text-blue-600">for your business</span>
			</h1>
			<a
				class="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
				data-mdb-ripple="true"
				data-mdb-ripple-color="light"
				href="#!"
				role="button">Get started</a
			>
			<a
				class="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
				data-mdb-ripple="true"
				data-mdb-ripple-color="light"
				href="#!"
				role="button">Learn more</a
			>
		</div>
	</section>
{/if}

{#if variant === 'hero_section_image'}
	<div>
		<section class="mb-40">
			<div class="px-6 py-12 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
				<div class="container mx-auto xl:px-32">
					<div class="grid lg:grid-cols-2 gap-12  items-center">
						<div class="mt-12 lg:mt-0">
							<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
								The best offer <br /><span class="text-blue-600">for your business</span>
							</h1>
							<a
								class="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								href="#!"
								role="button">Get started</a
							>
							<a
								class="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								href="#!"
								role="button">Learn more</a
							>
						</div>
						<div class="mb-12 lg:mb-0">
							<img
								src="https://mdbootstrap.com/img/new/ecommerce/vertical/028.jpg"
								class="w-full rounded-lg shadow-lg"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'hero_signup_form'}
	<div>
		<section class="mb-40">
			<div class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left">
				<div class="container mx-auto xl:px-32">
					<div class="grid lg:grid-cols-2 gap-12 items-center">
						<div class="mt-12 lg:mt-0">
							<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
								The best offer <br /><span class="text-blue-600">for your business</span>
							</h1>
							<p class="text-gray-600">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium
								odio, soluta, corrupti aliquam quibusdam tempora at cupiditate quis eum maiores
								libero veritatis? Dicta facilis sint aliquid ipsum atque?
							</p>
						</div>
						<div class="mb-12 lg:mb-0">
							<div class="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
								<form>
									<div class="grid md:grid-cols-2 md:gap-6">
										<div class="mb-6">
											<input
												type="text"
												class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
												placeholder="First name"
											/>
										</div>
										<div class="mb-6">
											<input
												type="text"
												class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
												placeholder="Last name"
											/>
										</div>
									</div>
									<input
										type="email"
										class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Email address"
									/>
									<input
										type="password"
										class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Password"
									/>
									<div class="form-check flex justify-center mb-6">
										<input
											class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
											type="checkbox"
											value=""
											id="flexCheckChecked"
											checked
										/>
										<label
											class="form-check-label inline-block text-gray-800"
											for="flexCheckChecked"
										>
											Subscribe to our newsletter
										</label>
									</div>
									<button
										type="button"
										data-mdb-ripple="true"
										data-mdb-ripple-color="light"
										class="inline-block px-6 py-2.5 mb-6 w-full bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
										>Sign up</button
									>
									<div class="text-center">
										<p class="mb-6">or sign up with:</p>
									</div>
									<div class="flex justify-center">
										<a
											href="#!"
											role="button"
											class="text-blue-600 hover:text-blue-700 focus:text-blue-700 action:text-blue-800 transition duration-200 ease-in-out"
										>
											<!-- Facebook -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 320 512"
												class="w-4 h-4 mx-4"
												><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
													fill="currentColor"
													d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
												/></svg
											>
										</a>
										<a
											href="#!"
											role="button"
											class="text-blue-600 hover:text-blue-700 focus:text-blue-700 action:text-blue-800 transition duration-200 ease-in-out"
										>
											<!-- Google -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 488 512"
												class="w-4 h-4 mx-4"
												><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
													fill="currentColor"
													d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
												/></svg
											>
										</a>
										<a
											href="#!"
											role="button"
											class="text-blue-600 hover:text-blue-700 focus:text-blue-700 action:text-blue-800 transition duration-200 ease-in-out"
										>
											<!-- Twitter -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												class="w-4 h-4 mx-4"
												><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
													fill="currentColor"
													d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
												/></svg
											>
										</a>
										<a
											href="#!"
											role="button"
											class="text-blue-600 hover:text-blue-700 focus:text-blue-700 action:text-blue-800 transition duration-200 ease-in-out"
										>
											<!-- Github -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 496 512"
												class="w-4 h-4 mx-4"
												><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
													fill="currentColor"
													d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
												/></svg
											>
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'hero_background_image'}
	<div>
		<section class="mb-40">
			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
			>
				<div class="px-6 w-full flex flex-wrap items-center justify-between">
					<div class="flex items-center">
						<button
							class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContentY"
							aria-controls="navbarSupportedContentY"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								class="w-5"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								/>
							</svg>
						</button>
						<a class="navbar-brand text-blue-600" href="#!">
							<svg
								class="w-5 h-5 ml-2 lg:ml-0 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
							>
								<path
									fill="currentColor"
									d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
								/>
							</svg>
						</a>
					</div>
					<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row">
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Dashboard</a
								>
							</li>
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Team</a
								>
							</li>
							<li class="nav-item mb-2 lg:mb-0">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Projects</a
								>
							</li>
						</ul>
					</div>
					<div class="flex items-center lg:ml-auto">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
						>
							Login
						</button>
						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
						>
							Sign up for free
						</button>
					</div>
				</div>
			</nav>

			<div
				class="relative overflow-hidden bg-no-repeat bg-cover"
				style="
		  background-position: 50%;
		  background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp');
		  height: 500px;
		"
			>
				<div
					class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
					style="background-color: rgba(0, 0, 0, 0.75)"
				>
					<div class="flex justify-center items-center h-full">
						<div class="text-center text-white px-6 md:px-12">
							<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
								The best offer on the market <br /><span>for your business</span>
							</h1>
							<button
								type="button"
								class="inline-block px-7 py-3 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
							>
								Get started
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'hero_section_pattern'}
	<div>
		<section class="mb-40">
			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
			>
				<div class="px-6 w-full flex flex-wrap items-center justify-between">
					<div class="flex items-center">
						<button
							class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContentY"
							aria-controls="navbarSupportedContentY"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								class="w-5"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								/>
							</svg>
						</button>
						<a class="navbar-brand text-blue-600" href="/">
							<svg
								class="w-5 h-5 ml-2 lg:ml-0 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
							>
								<path
									fill="currentColor"
									d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
								/>
							</svg>
						</a>
					</div>
					<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row">
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Dashboard</a
								>
							</li>
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Team</a
								>
							</li>
							<li class="nav-item mb-2 lg:mb-0">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Projects</a
								>
							</li>
						</ul>
					</div>
					<div class="flex items-center lg:ml-auto">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Login</button
						>
						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Sign up for free</button
						>
					</div>
				</div>
			</nav>

			<svg
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				preserveAspectRatio="none"
				class="svg absolute hidden lg:block"
				style="height: 560px; width: 100%; z-index: -10; overflow: hidden"
			>
				<defs>
					<linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
						<stop stop-color="hsl(217, 102%, 99%)" offset="0%" />
						<stop stop-color="hsl(217,88%, 93%)" offset="100%" />
					</linearGradient>
				</defs>
				<path
					fill="url(#sw-gradient-0)"
					d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z"
				/>
			</svg>

			<div class="px-6 py-12 lg:my-12 md:px-12 text-gray-800 text-center lg:text-left">
				<div class="container mx-auto xl:px-32">
					<div class="grid lg:grid-cols-2 gap-12  items-center">
						<div class="mt-12 lg:mt-0">
							<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
								The best offer <br /><span class="text-blue-600">for your business</span>
							</h1>
							<a
								class="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								href="#!"
								role="button">Get started</a
							>
							<a
								class="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								href="#!"
								role="button">Learn more</a
							>
						</div>
						<div class="mb-12 lg:mb-0">
							<img
								src="https://mdbootstrap.com/img/new/standard/city/017.jpg"
								class="w-full rounded-lg shadow-lg"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'hero_section_card'}
	<div>
		<section class="mb-40">
			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
			>
				<div class="px-6 w-full flex flex-wrap items-center justify-between">
					<div class="flex items-center">
						<button
							class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContentY"
							aria-controls="navbarSupportedContentY"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								class="w-5"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								/>
							</svg>
						</button>
						<a class="navbar-brand text-blue-600" href="#!">
							<svg
								class="w-5 h-5 ml-2 lg:ml-0 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
							>
								<path
									fill="currentColor"
									d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
								/>
							</svg>
						</a>
					</div>
					<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row">
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Dashboard</a
								>
							</li>
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Team</a
								>
							</li>
							<li class="nav-item mb-2 lg:mb-0">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Projects</a
								>
							</li>
						</ul>
					</div>
					<div class="flex items-center lg:ml-auto">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Login</button
						>
						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Sign up for free</button
						>
					</div>
				</div>
			</nav>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				class="absolute block w-full"
				style="margin: auto; z-index: -10;"
				height="680"
				preserveAspectRatio="none"
				viewBox="0 0 1920 880"
			>
				<g transform="translate(960,440) scale(1,1) translate(-960,-440)">
					<linearGradient id="lg-0.047955344060927496" x1="0" x2="1" y1="0" y2="0">
						<stop stop-color="hsl(217, 88%, 33.7%)" offset="0" />
						<stop stop-color="hsl(217, 88%, 75.1%)" offset="1" />
					</linearGradient>
					<path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
						<animate
							attributeName="d"
							dur="33.333333333333336s"
							repeatCount="indefinite"
							keyTimes="0;0.333;0.667;1"
							calcmod="spline"
							keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
							begin="0s"
							values="M0 0L 0 804.2328934685746Q 320 597.3613372284876  640 571.0708916590191T 1280 512.0661063245175T 1920 301.8788007488083L 1920 0 Z;M0 0L 0 877.6839081951588Q 320 668.0720922803877  640 649.0018928349388T 1280 328.7087077664202T 1920 162.95038242563396L 1920 0 Z;M0 0L 0 724.9886210051687Q 320 661.4364572061575  640 623.2173947479624T 1280 359.20353038907734T 1920 135.51673041732283L 1920 0 Z;M0 0L 0 804.2328934685746Q 320 597.3613372284876  640 571.0708916590191T 1280 512.0661063245175T 1920 301.8788007488083L 1920 0 Z"
						/>
					</path>
					<path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
						<animate
							attributeName="d"
							dur="33.333333333333336s"
							repeatCount="indefinite"
							keyTimes="0;0.333;0.667;1"
							calcmod="spline"
							keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
							begin="-6.666666666666667s"
							values="M0 0L 0 765.7607191473613Q 320 641.7853945676919  640 624.2534689988059T 1280 365.27264408032966T 1920 190.38947978522663L 1920 0 Z;M0 0L 0 842.1984196370487Q 320 570.6690721707517  640 540.6844954979398T 1280 439.92879442880593T 1920 200.29713960445451L 1920 0 Z;M0 0L 0 796.6802345094818Q 320 721.9216894353016  640 696.8815669355181T 1280 373.6367381440213T 1920 196.63169821789495L 1920 0 Z;M0 0L 0 765.7607191473613Q 320 641.7853945676919  640 624.2534689988059T 1280 365.27264408032966T 1920 190.38947978522663L 1920 0 Z"
						/>
					</path>
					<path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
						<animate
							attributeName="d"
							dur="33.333333333333336s"
							repeatCount="indefinite"
							keyTimes="0;0.333;0.667;1"
							calcmod="spline"
							keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
							begin="-13.333333333333334s"
							values="M0 0L 0 801.7562714943509Q 320 634.0247183381232  640 605.7090791951217T 1280 503.9393370140325T 1920 224.7551247480177L 1920 0 Z;M0 0L 0 821.0401780336218Q 320 670.8690783540507  640 637.0744123031742T 1280 456.40745286432224T 1920 278.1294357804296L 1920 0 Z;M0 0L 0 744.0534225112256Q 320 637.6425395409125  640 593.2079605185819T 1280 457.03995196824286T 1920 254.87693899994804L 1920 0 Z;M0 0L 0 801.7562714943509Q 320 634.0247183381232  640 605.7090791951217T 1280 503.9393370140325T 1920 224.7551247480177L 1920 0 Z"
						/>
					</path>
					<path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
						<animate
							attributeName="d"
							dur="33.333333333333336s"
							repeatCount="indefinite"
							keyTimes="0;0.333;0.667;1"
							calcmod="spline"
							keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
							begin="-20s"
							values="M0 0L 0 817.8603658675457Q 320 592.9404308081629  640 559.1126621853513T 1280 428.9912604821798T 1920 209.017381620229L 1920 0 Z;M0 0L 0 802.0504889976935Q 320 561.3963273210122  640 537.6024084387631T 1280 430.41283267566695T 1920 256.1972069733954L 1920 0 Z;M0 0L 0 789.4448177495887Q 320 561.9675446430498  640 531.6192318019404T 1280 414.76018143244175T 1920 265.9163329632971L 1920 0 Z;M0 0L 0 817.8603658675457Q 320 592.9404308081629  640 559.1126621853513T 1280 428.9912604821798T 1920 209.017381620229L 1920 0 Z"
						/>
					</path>
					<path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
						<animate
							attributeName="d"
							dur="33.333333333333336s"
							repeatCount="indefinite"
							keyTimes="0;0.333;0.667;1"
							calcmod="spline"
							keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
							begin="-26.666666666666668s"
							values="M0 0L 0 844.0541574423102Q 320 623.0697081316591  640 592.8483890737847T 1280 469.85448734523794T 1920 190.81850676853674L 1920 0 Z;M0 0L 0 871.4928294956283Q 320 618.9784567388518  640 593.1183717103518T 1280 376.5051942642811T 1920 141.32293927545027L 1920 0 Z;M0 0L 0 782.0118384610068Q 320 727.3267836497654  640 694.0476176759635T 1280 518.1545471640493T 1920 276.0053882957168L 1920 0 Z;M0 0L 0 844.0541574423102Q 320 623.0697081316591  640 592.8483890737847T 1280 469.85448734523794T 1920 190.81850676853674L 1920 0 Z"
						/>
					</path>
				</g>
			</svg>

			<div class="container mx-auto px-6 md:px-12 xl:px-32">
				<div class="text-center text-gray-800">
					<div
						class="block rounded-lg shadow-lg px-6 py-12 md:py-16 md:px-12"
						style="margin-top: 180px; background-color: hsla(0, 0%, 100%, 0.8);backdrop-filter: saturate(200%) blur(25px);"
					>
						<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
							The best offer on the market <br /><span class="text-blue-600">for your business</span
							>
						</h1>
						<a
							class="inline-block px-7 py-3 mb-2 md:mb-0 mr-0 md:mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
							href="/"
							role="button">Get started</a
						>
						<a
							class="inline-block px-7 py-3 text-white font-medium text-sm leading-snug bg-transparent  uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
							href="/"
							role="button">Learn more</a
						>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'dark_hero_section'}
	<div>
		<section class="mb-40 background-radial-gradient">
			<style>
				.background-radial-gradient {
					background-color: hsl(218, 41%, 15%);
					background-image: radial-gradient(
							650px circle at 0% 0%,
							hsl(218, 41%, 35%) 15%,
							hsl(218, 41%, 30%) 35%,
							hsl(218, 41%, 20%) 75%,
							hsl(218, 41%, 19%) 80%,
							transparent 100%
						),
						radial-gradient(
							1250px circle at 100% 100%,
							hsl(218, 41%, 45%) 15%,
							hsl(218, 41%, 30%) 35%,
							hsl(218, 41%, 20%) 75%,
							hsl(218, 41%, 19%) 80%,
							transparent 100%
						);
				}
			</style>

			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
			>
				<div class="px-6 w-full flex flex-wrap items-center justify-between">
					<div class="flex items-center">
						<button
							class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContentY"
							aria-controls="navbarSupportedContentY"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								class="w-5"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								/>
							</svg>
						</button>
						<a class="navbar-brand text-blue-600" href="#!">
							<svg
								class="w-5 h-5 ml-2 lg:ml-0 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
							>
								<path
									fill="currentColor"
									d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
								/>
							</svg>
						</a>
					</div>
					<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row">
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Dashboard</a
								>
							</li>
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Team</a
								>
							</li>
							<li class="nav-item mb-2 lg:mb-0">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Projects</a
								>
							</li>
						</ul>
					</div>
					<div class="flex items-center lg:ml-auto">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Login</button
						>
						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Sign up for free</button
						>
					</div>
				</div>
			</nav>

			<div class="px-6 py-12 md:px-12 text-center lg:text-left">
				<div class="container mx-auto xl:px-32">
					<div class="grid lg:grid-cols-2 gap-12  items-center">
						<div class="mt-12 lg:mt-0">
							<h1
								class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
								style="color: hsl(218, 81%, 95%);"
							>
								The best offer <br /><span style="color: hsl(218, 81%, 75%);"
									>for your business</span
								>
							</h1>
							<a
								class="inline-block px-7 py-3 mr-2 bg-gray-200 text-gray-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								href="#!"
								role="button">Get started</a
							>
							<a
								class="inline-block px-7 py-3 bg-transparent text-white font-medium text-sm leading-snug uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								href="#!"
								role="button">Learn more</a
							>
						</div>
						<div class="mb-12 lg:mb-0">
							<img
								src="https://mdbootstrap.com/img/new/ecommerce/horizontal/048.jpg"
								class="w-full rounded-lg shadow-lg"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'dark_background_signup_form'}
	<div>
		<section class="mb-40 background-radial-gradient overflow-hidden">
			<style>
				.background-radial-gradient {
					background-color: hsl(218, 41%, 15%);
					background-image: radial-gradient(
							650px circle at 0% 0%,
							hsl(218, 41%, 35%) 15%,
							hsl(218, 41%, 30%) 35%,
							hsl(218, 41%, 20%) 75%,
							hsl(218, 41%, 19%) 80%,
							transparent 100%
						),
						radial-gradient(
							1250px circle at 100% 100%,
							hsl(218, 41%, 45%) 15%,
							hsl(218, 41%, 30%) 35%,
							hsl(218, 41%, 20%) 75%,
							hsl(218, 41%, 19%) 80%,
							transparent 100%
						);
				}
				#radius-shape-1 {
					height: 220px;
					width: 220px;
					top: -60px;
					left: -130px;
					background: radial-gradient(#44006b, #ad1fff);
					overflow: hidden;
				}
				#radius-shape-2 {
					border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
					bottom: -60px;
					right: -110px;
					width: 300px;
					height: 300px;
					background: radial-gradient(#44006b, #ad1fff);
					overflow: hidden;
				}
				.bg-glass {
					background-color: hsla(0, 0%, 100%, 0.9);
					backdrop-filter: saturate(200%) blur(25px);
				}
			</style>
			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
			>
				<div class="px-6 w-full flex flex-wrap items-center justify-between">
					<div class="flex items-center">
						<button
							class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContentY"
							aria-controls="navbarSupportedContentY"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								class="w-5"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								/>
							</svg>
						</button>
						<a class="navbar-brand text-blue-600" href="#!">
							<svg
								class="w-5 h-5 ml-2 lg:ml-0 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
							>
								<path
									fill="currentColor"
									d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
								/>
							</svg>
						</a>
					</div>
					<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row">
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Dashboard</a
								>
							</li>
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Team</a
								>
							</li>
							<li class="nav-item mb-2 lg:mb-0">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Projects</a
								>
							</li>
						</ul>
					</div>
					<div class="flex items-center lg:ml-auto">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Login</button
						>
						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Sign up for free</button
						>
					</div>
				</div>
			</nav>

			<div class="px-6 py-12 lg:py-24 md:px-12 text-center lg:text-left">
				<div class="container mx-auto xl:px-32 text-gray-800">
					<div class="grid lg:grid-cols-2 gap-12 flex items-center">
						<div class="mt-12 lg:mt-0" style="z-index: 10;">
							<h1
								class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
								style="color: hsl(218, 81%, 95%);"
							>
								The best offer <br /><span style="color: hsl(218, 81%, 75%);"
									>for your business</span
								>
							</h1>
							<p class="opacity-70" style="color: hsl(218, 81%, 85%)">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, expedita iusto
								veniam atque, magni tempora mollitia dolorum consequatur nulla, neque debitis eos
								reprehenderit quasi ab ipsum nisi dolorem modi. Quos?
							</p>
						</div>
						<div class="mb-12 lg:mb-0 relative">
							<div id="radius-shape-1" class="absolute rounded-full shadow-lg" />
							<div id="radius-shape-2" class="absolute shadow-lg" />
							<div class="block rounded-lg shadow-lg bg-glass px-6 py-12 md:px-12">
								<form>
									<div class="grid md:grid-cols-2 md:gap-6">
										<div class="mb-6">
											<input
												type="text"
												class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
												placeholder="First name"
											/>
										</div>
										<div class="mb-6">
											<input
												type="text"
												class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
												placeholder="Last name"
											/>
										</div>
									</div>
									<input
										type="email"
										class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Email address"
									/>
									<input
										type="password"
										class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Password"
									/>
									<div class="form-check flex justify-center mb-6">
										<input
											class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
											type="checkbox"
											value=""
											id="flexCheckChecked"
											checked
										/>
										<label
											class="form-check-label inline-block text-gray-800"
											for="flexCheckChecked"
										>
											Subscribe to our newsletter
										</label>
									</div>
									<button
										type="button"
										data-mdb-ripple="true"
										data-mdb-ripple-color="light"
										class="inline-block px-6 py-2.5 mb-6 w-full bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
										>Sign up</button
									>
									<div class="text-center">
										<p class="mb-6">or sign up with:</p>
									</div>
									<div class="flex justify-center">
										<a
											href="#!"
											role="button"
											class="text-blue-600 hover:text-blue-700 focus:text-blue-700 action:text-blue-800 transition duration-200 ease-in-out"
										>
											<!-- Facebook -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 320 512"
												class="w-4 h-4 mx-4"
												><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
													fill="currentColor"
													d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
												/></svg
											>
										</a>
										<a
											href="#!"
											role="button"
											class="text-blue-600 hover:text-blue-700 focus:text-blue-700 action:text-blue-800 transition duration-200 ease-in-out"
										>
											<!-- Google -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 488 512"
												class="w-4 h-4 mx-4"
												><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
													fill="currentColor"
													d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
												/></svg
											>
										</a>
										<a
											href="#!"
											role="button"
											class="text-blue-600 hover:text-blue-700 focus:text-blue-700 action:text-blue-800 transition duration-200 ease-in-out"
										>
											<!-- Twitter -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												class="w-4 h-4 mx-4"
												><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
													fill="currentColor"
													d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
												/></svg
											>
										</a>
										<a
											href="#!"
											role="button"
											class="text-blue-600 hover:text-blue-700 focus:text-blue-700 action:text-blue-800 transition duration-200 ease-in-out"
										>
											<!-- Github -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 496 512"
												class="w-4 h-4 mx-4"
												><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
													fill="currentColor"
													d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
												/></svg
											>
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'curved_bottom_background_image'}
	<div>
		<section class="mb-40 overflow-hidden">
			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
			>
				<div class="px-6 w-full flex flex-wrap items-center justify-between">
					<div class="flex items-center">
						<button
							class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContentY"
							aria-controls="navbarSupportedContentY"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								class="w-5"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								/>
							</svg>
						</button>
						<a class="navbar-brand text-blue-600" href="#!">
							<svg
								class="w-5 h-5 ml-2 lg:ml-0 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
							>
								<path
									fill="currentColor"
									d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
								/>
							</svg>
						</a>
					</div>
					<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row">
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Dashboard</a
								>
							</li>
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Team</a
								>
							</li>
							<li class="nav-item mb-2 lg:mb-0">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Projects</a
								>
							</li>
						</ul>
					</div>
					<div class="flex items-center lg:ml-auto">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Login</button
						>
						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Sign up for free</button
						>
					</div>
				</div>
			</nav>

			<div
				class="relative overflow-hidden bg-no-repeat bg-cover"
				style="background-position: 50%; background-image: url('https://mdbootstrap.com/img/new/standard/city/078.jpg');
          height: 500px;"
			>
				<div
					class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
					style="background-color: rgba(0, 0, 0, 0.75);"
				>
					<div class="flex justify-center items-center h-full">
						<div class="text-center text-white px-6 md:px-12">
							<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
								The best offer on the market <br /><span>for your business</span>
							</h1>
							<a
								class="inline-block px-7 py-3 mr-1.5 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								href="#!"
								role="button">Get started</a
							>
							<a
								class="inline-block px-7 py-3 border-2 border-transparent bg-transparent text-white font-medium text-sm leading-snug uppercase rounded-full focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								href="#!"
								role="button">Learn more</a
							>
						</div>
					</div>
				</div>
			</div>

			<div
				class="-mt-2.5 md:-mt-4 lg:-mt-6 xl:-mt-10"
				style="height: 50px; transform: scale(2); transform-origin: top center; color: #fff;"
			>
				<svg viewBox="0 0 2880 48" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M 0 48 L 1437.5 48 L 2880 48 L 2880 0 L 2160 0 C 1453.324 60.118 726.013 4.51 720 0 L 0 0 L 0 48 Z"
						fill="currentColor"
					/>
				</svg>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'background_image_with_card'}
	<div>
		<section class="mb-40">
			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
			>
				<div class="px-6 w-full flex flex-wrap items-center justify-between">
					<div class="flex items-center">
						<button
							class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContentY"
							aria-controls="navbarSupportedContentY"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								class="w-5"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								/>
							</svg>
						</button>
						<a class="navbar-brand text-blue-600" href="#!">
							<svg
								class="w-5 h-5 ml-2 lg:ml-0 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
							>
								<path
									fill="currentColor"
									d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
								/>
							</svg>
						</a>
					</div>
					<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row">
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Dashboard</a
								>
							</li>
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Team</a
								>
							</li>
							<li class="nav-item mb-2 lg:mb-0">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Projects</a
								>
							</li>
						</ul>
					</div>
					<div class="flex items-center lg:ml-auto">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Login</button
						>
						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Sign up for free</button
						>
					</div>
				</div>
			</nav>

			<div
				class="relative overflow-hidden bg-no-repeat bg-cover"
				style="background-position: 50%; background-image: url('https://mdbootstrap.com/img/new/textures/full/142.jpg'); height: 500px;"
			/>

			<div class="container mx-auto px-6 md:px-12 xl:px-32">
				<div class="text-center text-gray-800">
					<div
						class="block rounded-lg shadow-lg px-6 py-12 md:py-16 md:px-12"
						style="margin-top: -170px; background: hsla(0, 0%, 100%, 0.7); backdrop-filter: blur(30px);"
					>
						<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
							The best offer on the market <br /><span class="text-blue-600">for your business</span
							>
						</h1>
						<a
							class="inline-block px-7 py-3 mb-2 md:mb-0 mr-0 md:mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
							href="#!"
							role="button">Get started</a
						>
						<a
							class="inline-block px-7 py-3 text-white font-medium text-sm leading-snug bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
							href="#!"
							role="button">Learn more</a
						>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'hero_section_page'}
	<div>
		<section class="mb-40">
			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
			>
				<div class="px-6 w-full flex flex-wrap items-center justify-between">
					<div class="flex items-center">
						<button
							class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContentY"
							aria-controls="navbarSupportedContentY"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								class="w-5"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								/>
							</svg>
						</button>
						<a class="navbar-brand text-blue-600" href="#!">
							<svg
								class="w-5 h-5 ml-2 lg:ml-0 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
							>
								<path
									fill="currentColor"
									d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
								/>
							</svg>
						</a>
					</div>
					<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row">
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Dashboard</a
								>
							</li>
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Team</a
								>
							</li>
							<li class="nav-item mb-2 lg:mb-0">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Projects</a
								>
							</li>
						</ul>
					</div>
					<div class="flex items-center lg:ml-auto">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Login</button
						>
						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Sign up for free</button
						>
					</div>
				</div>
			</nav>

			<div class="px-6 py-12 md:px-12 text-gray-800 text-center lg:text-left">
				<div class="container mx-auto xl:px-32">
					<div class="grid lg:grid-cols-2 flex items-center">
						<div class="md:mt-12 lg:mt-0 mb-12 lg:mb-0">
							<div
								class="block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
								style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px);"
							>
								<h1 class="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-12">
									The best offer <br /><span class="text-blue-600">for your business</span>
								</h1>
								<a
									class="inline-block px-7 py-3 mb-2 md:mb-0 md:mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									href="#!"
									role="button">Get started</a
								>
								<a
									class="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									href="#!"
									role="button">Learn more</a
								>
							</div>
						</div>
						<div class="md:mb-12 lg:mb-0">
							<img
								src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
								class="w-full rounded-lg shadow-lg"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}

{#if variant === 'hero_section_video'}
	<div>
		<section class="mb-40">
			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
			>
				<div class="px-6 w-full flex flex-wrap items-center justify-between">
					<div class="flex items-center">
						<button
							class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContentY"
							aria-controls="navbarSupportedContentY"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								class="w-5"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								/>
							</svg>
						</button>
						<a class="navbar-brand text-blue-600" href="#!">
							<svg
								class="w-5 h-5 ml-2 lg:ml-0 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
							>
								<path
									fill="currentColor"
									d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
								/>
							</svg>
						</a>
					</div>
					<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row">
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Dashboard</a
								>
							</li>
							<li class="nav-item">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Team</a
								>
							</li>
							<li class="nav-item mb-2 lg:mb-0">
								<a
									class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
									href="#!"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Projects</a
								>
							</li>
						</ul>
					</div>
					<div class="flex items-center lg:ml-auto">
						<button
							type="button"
							class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Login</button
						>
						<button
							type="button"
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light">Sign up for free</button
						>
					</div>
				</div>
			</nav>

			<svg
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				preserveAspectRatio="none"
				class="svg absolute hidden lg:block"
				style="height: 560px; width: 100%; z-index: -10; overflow: hidden"
			>
				<defs>
					<linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
						<stop stop-color="hsl(217, 102%, 99%)" offset="0%" />
						<stop stop-color="hsl(217,88%, 93%)" offset="100%" />
					</linearGradient>
				</defs>
				<path
					fill="url(#sw-gradient-0)"
					d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z"
				/>
			</svg>

			<div class="px-6 py-12 lg:my-12 md:px-12 text-gray-800 text-center lg:text-left">
				<div class="container mx-auto xl:px-32">
					<div class="grid lg:grid-cols-2 gap-12  items-center">
						<div class="mt-12 lg:mt-0">
							<h1 class="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-12">
								Are you ready <br /><span class="text-blue-600">for an adventure?</span>
							</h1>
							<div class="md:flex flex-row">
								<input
									type="text"
									class="form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Enter your email"
								/>
								<button
									type="submit"
									class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light">Subscribe</button
								>
							</div>
						</div>
						<div class="mb-12 lg:mb-0">
							<div
								class="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden rounded-lg shadow-lg"
								style="padding-top: 56.25%"
							>
								<iframe
								title="Jerp"
									class="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 w-full h-full"
									src="https://www.youtube.com/embed/vlDzYIIOYmM?enablejsapi=1&amp;origin=https%3A%2F%2Fmdbootstrap.com"
									allowfullscreen=""
									data-gtm-yt-inspected-2340190_699="true"
									id="240632615"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}
