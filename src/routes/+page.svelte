<script lang="ts">
	//@ts-nocheck
	import logo from '../assets/beta-logo.png';
	export let form: any;
	import { Alert, Button, Card } from 'flowbite-svelte';

	import Cursort from './Cursort.svelte';
	import HeroCarousel from './HeroCarousel.svelte';
	import { inview } from 'svelte-inview';

	let isInView;
</script>

<!-- <Pointer /> -->

<Cursort />

{#if form?.feedbackSuccess}
	<Alert dismissable class="mx-6 mt-2">
		<div class="m4-9">Your feedback has been received, thank you.</div>
	</Alert>
{/if}

<div class="w-full">
	<div class=" relative z-0">
		<div class="flex items-center justify-center w-full h-full ">
			<div class="w-full relative flex items-center justify-center">
				<div class="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
					<div
						id="slider"
						class="h-100 grid hero-bg rounded-xl grid-cols-4 lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
					>
						<!-- {#each [1, 2, 3, 4] as category}
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
              {/each} -->
					</div>
				</div>
			</div>
		</div>
		<div
			class="absolute backdrop-blur-sm rounded-lg bg-white/30 inset-0 flex justify-center items-center z-10"
		>
			<div
				class="mt-8  relative hero rounded-lg container mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24 sm:pb-32 md:pb-48 lg:pb-56 xl:pb-64"
			>
				<img
					class="mr-2 lg:mr-12 mt-2 lg:mt-12 absolute right-0 top-36"
					src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg"
					alt="bg"
				/>
				<img
					class="ml-2 lg:ml-12 mb-2 lg:mb-12 absolute z-30 bottom-36 left-0"
					src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg"
					alt="bg"
				/>

				<div class="w-11/12 4xl:pt-96 relative sm:w-2/3 mb-5 sm:mb-10">
					<h1
						class="text-2xl 4xl:my-[48rem] backgro bg-opacity-100 dark:text-gray-900 mt-36 backdrop:blur-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center   text-gray-900 font-bold leading-tight"
					>
						Code Less, Create More
					</h1>
					<p class="text-center text-lg mt-8">
						Fueling Boundless Innovation for Entrepreneurs in the Digital Realm!
					</p>
				</div>
				<div class="flex justify-center items-center mb-10 sm:mb-20">
					<a
						href="/create"
						class="hover:text-black hover:bg-transparent lg:text-xl hover:border-black border bg-red-300 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-red-700	focus:ring-white rounded text-red-600 px-4 sm:px-8 py-1 sm:py-3 text-sm"
						>New project</a
					>
					<a
						rel="external"
						target="blank"
						href="/a/demo"
						class="hover:bg-red- hover:text-red-600 lg:text-xl  border border-red-900 hover:red-red-600 ml-3 sm:ml-6 hover:bg-transparent transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-red-700 focus:ring-white hover:bg-red-700 rounded hover:border hover:border-red-900 text-red-700 px-4 sm:px-8 py-1 sm:py-3 text-sm"
						>Live Demo</a
					>
				</div>
			</div>
		</div>
	</div>
</div>

<div
	use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
	on:change={({ detail }) => {
		isInView = detail.inView;
	}}
	class="w-full px-6"
>
	<div class="container mx-auto flex justify-center md:-mt-32 -mt-16 sm:-mt-40">
		<div class="relative sm:w-2/3 w-11/12">
			<Card
				padding="sm"
				class=" h-100 min-h-100 max-h-100 mt-2  rounded-b-3xl rounded-t-3xl "
				size="xl"
			>
				<HeroCarousel />
			</Card>
		</div>
	</div>
</div>

<div class="flex justify-center mt-20">
	<div class="inline-flex rounded-full">
		<a
			href="javascript:void(0)"
			class="border-primary bg-primary text-black hover:bg-primary hover:border-primary inline-flex items-center justify-center rounded-l-full border py-[10px] px-[12px] text-center text-base font-semibold dark:text-white transition-all hover:text-white sm:py-3 sm:px-6"
		>
			<span class="pr-2 text-green-500">
				<svg
					fill="currentColor"
					class="text-green-500"
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 96 960 960"
					width="24"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" /></svg
				>
			</span>
			Datasource
		</a>
		<a
			href="javascript:void(0)"
			class="border-light border-r hover:bg-primary hover:border-primary inline-flex items-center justify-center border-y py-[10px] px-[12px] text-center text-sm font-semibold text-black transition-all hover:text-white dark:text-white sm:py-3 sm:px-6 sm:text-base"
		>
			<span class="pr-2 text-green-500">
				<svg
					fill="currentColor"
					class="text-green-500"
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 96 960 960"
					width="24"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" /></svg
				>
			</span>
			UI Builder
		</a>
		<a
			href="javascript:void(0)"
			class="border-light hover:bg-primary hover:border-primary inline-flex items-center justify-center border-y py-[10px] px-[12px] text-center text-sm font-semibold text-black transition-all hover:text-white dark:text-white sm:py-3 sm:px-6 sm:text-base"
		>
			<span class="pr-2 text-green-500">
				<svg
					fill="currentColor"
					class="text-green-500"
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 96 960 960"
					width="24"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" /></svg
				>
			</span>
			Rest API
		</a>

		<a
			href="javascript:void(0)"
			class="border-light dark:text-white hover:bg-primary hover:border-primary inline-flex items-center justify-center rounded-r-full border py-[10px] px-[12px] text-center text-sm font-semibold text-black transition-all hover:text-white sm:py-3 sm:px-6 sm:text-base"
		>
			<span class="pr-2 text-green-500">
				<svg
					fill="currentColor"
					class="text-green-500"
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 96 960 960"
					width="24"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" /></svg
				>
			</span>
			Dashboards
		</a>
	</div>
</div>

<!-- <div class="snappy  dark:bg-black">
	<section class="bg-neutral-100 rounded-br-full rounded-bl-3xl  dark:bg-black">
		<div
			class="  max-w-screen xl:px-28 2xl:px-[13rem]  4xl:px-[20rem] 2xl:py-32   	 px-4 py-8  mx-auto "
		>
			<div class="mr-auto md:pt-9 lg:pt-2 self-center min-h-105 ">
				<h1
					class="max-w-xl  mt-9 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-700 dark:text-white"
				>
					The Ultimate No-Code Framework to Bring Your Vision to Life!
				</h1>
				
				<br />
				<div class="pt-8">
					<Button class="mr-3" size="lg" href="/early-access" gradient color="pinkToOrange">
						Early Access
						<svg
							class="w-5 h-5 ml-2 -mr-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						>
					</Button>
					<a target="blank" >
						<Button size="lg" gradient color="purpleToBlue">Live Demo</Button>
					</a>
				</div>
			</div>
			<div class="lg:mt-1 lg:col-span-5 lg:pt-1 sm:pt-28">
				<Card
					padding="sm"
					class=" h-100 min-h-100 max-h-100 mt-2  rounded-b-3xl rounded-t-3xl "
					size="xl"
				>
					<HeroCarousel />
				</Card>
			</div>
		</div>
	</section>
</div> -->
<section class="bg-white my-20 dark:bg-black">
	<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
		<div class="mx-auto max-w-screen-sm text-center">
			<h2
				class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-700 dark:text-white"
			>
				Get started for free
			</h2>
			<p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
				No credit card required.
			</p>
			<a href="/create">
				<Button size="xl" gradient color="pinkToOrange">Get started for free</Button>
			</a>
		</div>
	</div>
</section>

<div class="dark:bg-black  ">
	<div class="container dark:bg-black pb-18 px-6 -pt-20 mx-auto">
		<section class="mb-20 text-gray-800">
			<div class="dark:hidden block">
				<div
					class="relative overflow-hidden bg-no-repeat bg-cover"
					style="background-position: 50%; background-image: url('https://res.cloudinary.com/dreamnerd/image/upload/v1685514742/Screenshot_from_2023-05-31_09-31-54_jyhbk1.png'); height: 300px;"
				/>
			</div>

			<div class="dark:block hidden">
				<div
					class="relative overflow-hidden bg-no-repeat bg-cover"
					style="background-position: 50%; background-image: url('https://res.cloudinary.com/dreamnerd/image/upload/v1685514238/Screenshot_from_2023-05-31_09-22-33_zvf9ha.png'); height: 300px;"
				/>
			</div>

			<div class="container mt-20 text-gray-800 px-4 md:px-12">
				<div class="dark:bg-black mt-36" padding="xl" size="xl">
					<div class="flex flex-wrap">
						<div class="grow-0 shrink-0 basis-auto w-full xl:w-5/12 px-3 lg:px-6 mb-12 xl:mb-0">
							<form action="/feedback" method="post">
								<div class="form-group mb-6">
									<input
										required
										type="text"
										class="form-control block
                  w-full
                  px-3

                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
				  dark:bg-black
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										id="exampleInput7"
										name="name"
										placeholder="Name"
									/>
								</div>
								<div class="form-group mb-6">
									<input
										required
										name="email"
										type="email"
										class="form-control block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
				  dark:bg-black
				  focus:bg-white focus:border-blue-600 focus:outline-none"
										id="exampleInput8"
										placeholder="Email address"
									/>
								</div>
								<div class="form-group mb-6">
									<textarea
										required
										name="message"
										class="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
				  dark:bg-black
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
										id="exampleFormControlTextarea13"
										rows="3"
										placeholder="Message"
									/>
								</div>
								<div class="form-group form-check text-center mb-6">
									<input
										type="checkbox"
										class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-red-400 checked:border-pink-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
										id="exampleCheck87"
										checked
									/>
									<label class="form-check-label inline-block text-gray-800" for="exampleCheck87"
										>Send me a copy of this message</label
									>
								</div>
								<button
									type="submit"
									class="inline-flex w-full items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-900"
								>
									Send message
								</button>
							</form>
						</div>
						<div class="grow-0 shrink-0 basis-auto w-full xl:w-7/12">
							<div class="flex flex-wrap">
								<div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
									<div class="flex items-start">
										<div class="shrink-0">
											<div
												class="p-4 bg-red-400 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
											>
												<svg
													aria-hidden="true"
													focusable="false"
													data-prefix="fas"
													data-icon="headset"
													class="w-5 text-white"
													role="img"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path
														fill="currentColor"
														d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
													/>
												</svg>
											</div>
										</div>
										<div class="grow ml-6">
											<p class="font-bold mb-1">Technical support</p>
											<p class="text-gray-500">support@dreamfeel.me</p>
											<!-- <p class="text-gray-500">+1 234-567-89</p> -->
										</div>
									</div>
								</div>
								<div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
									<div class="flex items-start">
										<div class="shrink-0">
											<div
												class="p-4 bg-red-400 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
											>
												<svg
													aria-hidden="true"
													focusable="false"
													data-prefix="fas"
													data-icon="dollar-sign"
													class="w-3 text-white"
													role="img"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 288 512"
												>
													<path
														fill="currentColor"
														d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
													/>
												</svg>
											</div>
										</div>
										<div class="grow ml-6">
											<p class="font-bold mb-1">Sales questions</p>
											<p class="text-gray-500">sales@dreamfeel.me</p>
											<!-- <p class="text-gray-500">+1 234-567-89</p> -->
										</div>
									</div>
								</div>
								<div class="mb-12 md:mb-0 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
									<div class="flex align-start">
										<div class="shrink-0">
											<div
												class="p-4 bg-red-400 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
											>
												<svg
													aria-hidden="true"
													focusable="false"
													data-prefix="fas"
													data-icon="newspaper"
													class="w-5 text-white"
													role="img"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 576 512"
												>
													<path
														fill="currentColor"
														d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"
													/>
												</svg>
											</div>
										</div>
										<div class="grow ml-6">
											<p class="font-bold mb-1">Press</p>
											<p class="text-gray-500">press@dreamfeel.me</p>
											<!-- <p class="text-gray-500">+1 234-567-89</p> -->
										</div>
									</div>
								</div>
								<div class="grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
									<div class="flex align-start">
										<div class="shrink-0">
											<div
												class="p-4 bg-red-400 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
											>
												<svg
													aria-hidden="true"
													focusable="false"
													data-prefix="fas"
													data-icon="bug"
													class="w-5 text-white"
													role="img"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path
														fill="currentColor"
														d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"
													/>
												</svg>
											</div>
										</div>
										<div class="grow ml-6">
											<p class="font-bold mb-1">Bug report</p>
											<p class="text-gray-500">bugs@dreamfeel.me</p>
											<!-- <p class="text-gray-500">+1 234-567-89</p> -->
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>

<section class="bg-white dark:bg-black">
	<div class="py-8 lg:py-16 mx-20 max-w-screen-xl px-4">
		<h2
			class="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl"
		>
			Our partners
		</h2>
		<div
			class="grid  grid-cols-3 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400"
		>
			<a href="https://www.ku.ac.ke/iiuil/" class="flex justify-center items-center">
				<img
					style="height:60%"
					alt="Kenyatta University logo"
					src="https://res.cloudinary.com/dreamnerd/image/upload/v1682428867/ggjggj_u8g6r5.png"
				/>
			</a>
			<a href="https://www.microsoft.com/en-us/startups" class="flex justify-center items-center">
				<img
					src="https://res.cloudinary.com/dreamnerd/image/upload/v1687421961/MS_Startups_Celebration_Badge_Dark_cp5rxq.png"
					alt="Microsoft for startup logo"
				/>
			</a>
			<div class="flex h-full items-center">
				<a
					href="/partner"
					class="h-[4rem] flex  text-center  justify-center text-xs items-center px-3  rounded-lg  bg-gray-300 dark:bg-gray-900"
				>
					<div>
						<div class="flex mb-1 justify-center">
							<svg
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" /></svg
							>
						</div>

						<p>Become a partner</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</section>

<footer style="backdrop-filter:blur(30px)" class="p-4 md:p-8 lg:p-10   dark:bg-black">
	<div class="mx-auto max-w-screen-xl text-center">
		<a
			href="/"
			class="flex justify-center items-center mt-b text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<div class="text-center">
				<div class="flex justify-center">
					<img src={logo} loading="lazy" width="40%" alt="" />
				</div>
			</div>
		</a>

		<div class="flex justify-center items-center">
			<div class="max-w-sm flex gap-2 mt-4">
				<a target="blank" href="https://www.linkedin.com/company/dreamfeel">
					<img
						width="21"
						src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
						alt="Linkedin Logo"
					/>
				</a>
				<a target="blank" href="https://github.com/Dreamfeel-Spaces">
					<img
						width="21"
						src="https://dreamfeel.me/_app/immutable/assets/github-c5555c19.png"
						alt="Linkedin Logo"
					/>
				</a>
				<a target="blank" href="mailto:dreamfeel.spaces@gmail.com">
					<div class="-mt-1 font-extrabold text-xl">@</div>
				</a>
			</div>
		</div>

		<p
			class="flex flex-wrap justify-center items-center mb-1 mt-3 text-gray-900 dark:text-gray-400"
		>
			Chandaria BIIC-Kenyatta University
		</p>
		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
			>© {new Date().getFullYear()}
			<a href="/" class="hover:underline text-xs">Dreamfeel Spaces</a>. All Rights Reserved.</span
		>
	</div>
</footer>

<style>
	.hero-bg {
		background-color: #ffffff;
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg clip-path='url(%26quot%3b%23SvgjsClipPath2025%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsRadialGradient2026)'%3e%3c/rect%3e%3ccircle r='93.335' cx='-42.14' cy='72.73' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='93.335' cx='409.39' cy='448.57' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='93.335' cx='738.72' cy='667.58' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='86.75' cx='16.43' cy='416.66' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='124.71' cx='42.6' cy='219.28' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='59.355' cx='194.72' cy='213.66' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='57.775' cx='611.34' cy='232.73' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='175.635' cx='360.44' cy='504.72' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='154.97' cx='892.21' cy='86.43' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='121.845' cx='1063.72' cy='160.23' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='137.005' cx='1437.31' cy='495.31' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='99.37' cx='24.13' cy='266.21' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='87.815' cx='1147.53' cy='534.64' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='47.815' cx='1117.44' cy='323.62' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='182.25' cx='839.31' cy='404.95' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='171.225' cx='718.4' cy='482.81' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='81.445' cx='182.97' cy='60.94' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='126.25' cx='156.1' cy='65.36' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3ccircle r='163.435' cx='142.05' cy='232.52' stroke='%234b0707' stroke-opacity='0.25' stroke-width='2'%3e%3c/circle%3e%3c/g%3e%3cdefs%3e%3cclipPath id='SvgjsClipPath2025'%3e%3crect width='1440' height='560' x='0' y='0'%3e%3c/rect%3e%3c/clipPath%3e%3cradialGradient cx='50%25' cy='50%25' r='772.53' gradientUnits='userSpaceOnUse' id='SvgjsRadialGradient2026'%3e%3cstop stop-color='rgba(14%2c 42%2c 71%2c 0.35)' offset='0.32'%3e%3c/stop%3e%3cstop stop-color='rgba(158%2c 0%2c 42%2c 0.51)' offset='0.74'%3e%3c/stop%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e");
		background-attachment: fixed;
		background-size: cover;
	}
</style>
