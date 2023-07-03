<script>
	// @ts-nocheck

	import { Button, Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	const next = $page.url.searchParams.get('next');
	import logo from '../../assets/beta-logo.png';
	import github from '../../assets/github.png';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';
	console.log($page.data.session?.user);
</script>

<svelte:head>
	<title>Accounts - Dreamfeel</title>
</svelte:head>

{#if !$page.data.session}
	<section
		class="bg-white flex justify-center pt-9 self-center lg:px-72 min-h-screen px-5 dark:bg-black"
	>
		<div>
			<Card>
				<div class="grid ">
					<div class="py-4 px-4 mx-auto max-w-screen-xl  lg:py-4 ">
						<div class="flex text-center justify-center mb-6">
							<div>
								<div class="flex justify-center">
									<img loading="lazy" width={'50%'} src={logo} alt="Dreamfeel Spaces Logo" />
								</div>
							</div>
						</div>

						<div class="px-7">
							<div>
								<Button
									outline
									on:click={() =>
										signIn('github').then(() => {
											if (next) goto(next);
										})}
									color="dark"
									class="w-full dark:bg-gray-600 dark:text-white mt-9"
								>
									<img
										class="mr-2 dark:bg-gray-100"
										loading="lazy"
										src={github}
										width="20px"
										alt="Github logo"
									/>
									<span />
									Sign in with GitHub</Button
								>

								<Button
									outline
									on:click={() =>
										signIn('google').then(() => {
											if (next) goto(next);
										})}
									color="dark"
									class="w-full gap-2 dark:bg-gray-600 dark:text-white mt-3"
								>
									<svg
										class="w-5 h-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 326667 333333"
										shape-rendering="geometricPrecision"
										text-rendering="geometricPrecision"
										image-rendering="optimizeQuality"
										fill-rule="evenodd"
										clip-rule="evenodd"
										><path
											d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
											fill="#4285f4"
										/><path
											d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
											fill="#34a853"
										/><path
											d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
											fill="#fbbc04"
										/><path
											d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
											fill="#ea4335"
										/></svg
									>
									<span />
									Sign in with Google</Button
								>
								<Button
									outline
									on:click={() =>
										signIn('').then(() => {
											if (next) goto(next);
										})}
									color="dark"
									class="w-full gap-3 dark:bg-gray-600 dark:text-white mt-3"
								>
									<span class=" font-extrabold text-xl">@</span>
									Sign in with email</Button
								>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</section>
{/if}

{#if $page.data.session}
	<div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
		<!--Main Col-->
		<div
			id="profile"
			class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
		>
			<div class="p-4 md:p-12 text-center lg:text-left">
				<!-- Image for mobile view-->
				<div
					class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
					style="background-image: url('https://source.unsplash.com/MP0IUfwrn0A')"
				/>

				<h1 class="text-3xl font-bold pt-8 lg:pt-0">
					{$page.data.session?.user?.name ?? 'Unkown user'}
				</h1>
				<div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
				<p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
					<svg
						class="h-4 fill-current text-green-700 pr-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						><path
							d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"
						/></svg
					> Role: Undefined role
				</p>
				<p
					class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"
				>
					<svg
						class="h-4 fill-current text-green-700 pr-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						><path
							d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"
						/></svg
					> Your Location - 25.0000° N, 71.0000° W
				</p>
				<p class="pt-8 text-sm">
					Totally optional short description about yourself, what you do and so on.
				</p>

				<div class="pt-4"><Button on:click={signOut}>Sign Out</Button></div>

				<!-- Use https://simpleicons.org/ to find the svg for your preferred product -->
			</div>
		</div>

		<!--Img Col-->
		<div class="w-full lg:w-2/5">
			<!-- Big profile image for side bar (desktop) -->
			<img
				alt="AlternativeI"
				src="https://cdn.wallpapersafari.com/73/1/dXiYMx.jpg"
				class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
			/>
			<!-- Image from: http://unsplash.com/photos/MP0IUfwrn0A -->
		</div>
	</div>
{/if}

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
