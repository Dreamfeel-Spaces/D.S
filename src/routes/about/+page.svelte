<script lang="ts">
	import logo from '../../assets/beta-logo.png';
</script>

<section class="dark:bg-black min-h-108 lg:px-64">
	<div class="text-center">
		<div style="align-items:center" class="flex justify-center" />
		<div class="py-8 px-8  mx-auto max-w-screen-xl lg:py-16 ">
			<h1
				class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-700 md:text-5xl lg:text-6xl dark:text-white"
			>
				About us
			</h1>

			<p
				class="mt-12 uppercase  text-justify text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
			>
				OUR MISSION
			</p>
			<p
				class="mt-4  text-justify text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
			>
				To empower digital innovation for all, faster and cheaper, creating direct opportunities for
				countless young people to thrive in the digital landscape.
			</p>
			<p
				class="mt-12 uppercase  text-justify text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
			>
				OUR VISION
			</p>
			<p
				class="mt-4 text-justify  text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
			>
				In a world transitioning towards greater generative and automated tools, Dreamfeel Spaces
				envisions itself as the unparalleled solution for effortlessly building top-tier software
				applications, minimizing the reliance on extensive coding.
			</p>
		</div>
	</div>
</section>

<footer style="backdrop-filter:blur(30px)" class="p-4 md:p-8 lg:p-10  dark:bg-black bg-gray-900">
	<div class="mx-auto max-w-screen-xl text-center">
		<a
			href="/"
			class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<div class="text-center">
				<div class="flex justify-center">
					<img src={logo} loading="lazy" width="60%" alt="" />
				</div>
			</div>
		</a>

		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
			>© {new Date().getFullYear()} <a href="/" class="hover:underline">Dreamfeel Spaces</a>. All
			Rights Reserved.</span
		>
	</div>
</footer>

<!-- <div class="container flex justify-center">
	<section class="text-gray-600 body-font">
		<div class="container px-5 py-24 mx-auto">
			<div class="flex flex-col text-center w-full mb-20">
				<h1
					class="text-4xl font-medium title-font mb-4 text-gray-900 dark:text-gray-300 tracking-widest"
				>
					Our Team
				</h1>
				<p class="lg:w-2/3 mx-auto leading-relaxed text-base">Meet our amazing team.</p>
			</div>
			<div class="flex flex-wrap -m-4">
				<div class="p-4 lg:w-1/2">
					<div
						class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"
					>
						<img
							alt="team"
							class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
							src="https://res.cloudinary.com/dreamnerd/image/upload/v1681309435/1641837261536_ark5cb.jpg"
						/>
						<div class="flex-grow sm:pl-8">
							<h2 class="title-font font-medium text-lg dark:text-gray-300 text-gray-900">
								Alex Omogi
							</h2>
							<h3 class="text-gray-500 mb-3">Co-Founder & CEO</h3>

							<span class="inline-flex"
								><a href="/" class="text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
										/></svg
									></a
								><a href="/" class="ml-2 text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
										/></svg
									></a
								><a href="/" class="ml-2 text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
										/></svg
									></a
								></span
							>
						</div>
					</div>
				</div>
				<div class="p-4 lg:w-1/2">
					<div
						class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"
					>
						<img
							alt="team"
							class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
							src="https://res.cloudinary.com/dreamnerd/image/upload/v1681309846/profile_ei7kvg.jpg"
						/>
						<div class="flex-grow sm:pl-8">
							<h2 class="title-font font-medium text-lg dark:text-gray-300 text-gray-900">
								Brian Major
							</h2>
							<h3 class="text-gray-500 mb-3">Co-Founder & Technical Lead</h3>
							<span class="inline-flex"
								><a href="/" class="text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
										/></svg
									></a
								><a href="/" class="ml-2 text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
										/></svg
									></a
								><a href="/" class="ml-2 text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
										/></svg
									></a
								></span
							>
						</div>
					</div>
				</div>

				<div class="p-4 lg:w-1/2">
					<div
						class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"
					>
						<img
							alt="team"
							class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
							src="https://res.cloudinary.com/dreamnerd/image/upload/v1681308664/IMG_20210928_161905_g993d3.jpg"
						/>
						<div class="flex-grow sm:pl-8">
							<h2 class="title-font font-medium text-lg dark:text-gray-300 text-gray-900">
								Odida Protas
							</h2>
							<h3 class="text-gray-500 mb-3">Founder & CTO</h3>
							<span class="inline-flex"
								><a href="/" class="text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
										/></svg
									></a
								><a href="/" class="ml-2 text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
										/></svg
									></a
								><a href="/" class="ml-2 text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
										/></svg
									></a
								></span
							>
						</div>
					</div>
				</div>
				<div class="p-4 lg:w-1/2">
					<div
						class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"
					>
						<img
							alt="team"
							class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
							src="https://res.cloudinary.com/dreamnerd/image/upload/v1681368128/IMG-20230413-WA0000_nxyu1y.jpg"
						/>
						<div class="flex-grow sm:pl-8">
							<h2 class="title-font font-medium text-lg dark:text-gray-300  text-gray-900">
								Tonny Namasaka
							</h2>
							<h3 class="text-gray-500 mb-3">CFO</h3>
							<span class="inline-flex"
								><a href="/" class="text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
										/></svg
									></a
								><a href="/" class="ml-2 text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
										/></svg
									></a
								><a href="/" class="ml-2 text-gray-500"
									><svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
										><path
											d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
										/></svg
									></a
								></span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div> -->
