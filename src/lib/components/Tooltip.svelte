<script lang="ts">
	//@ts-nocheck

	let step = 1;

	import { page } from '$app/stores';

	function handleNextClick(nextStep: number) {
		step = nextStep;
	}

	let skipped = false;

	function handleSkip() {
		skipped = true;
	}

	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	import { browser } from '$app/environment';

	let controlsLayout = [
		// 'previousFrame',
		// 'playpause',
		// 'stop',
		// 'nextFrame',
		// 'progress',
		// 'frame',
		// 'loop',
		// 'spacer',
		// 'background',
		// 'snapshot',
		// 'zoom',
		// 'info'
	];
</script>

{#if !skipped}
	{#if step === 0}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-40">
			<div
				class="modal-content max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:50%; top:43%; z-index:23000px"
			>
				<div class="flex justify-center">
					{#if browser}
						<LottiePlayer
							src="https://assets9.lottiefiles.com/packages/lf20_1pxqjqps.json"
							autoplay={true}
							loop={true}
							controls={true}
							renderer="svg"
							background="transparent"
							height={300}
							width={300}
							{controlsLayout}
						/>
					{/if}
				</div>
				<p class="text-2xl">Welcome to your {$page.data.space?.name} console</p>
				<p class="my-3">
					This quick quide will help you get to configure and customize your Dreamfeel Spaces Admin,
					roles, Rest API, Dashboards and UI Builder.
				</p>
				<div class="flex gap-3">
					<div>
						<button on:click={handleSkip}>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(1)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if step === 1}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-10">
			<div
				class="modal-content max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:38%; top:43%; z-index:23000px"
			>
				<p class="text-2xl">Rest API</p>
				<p class="my-3">
					Manage your datasource, API permissions, 3rd party service integrations and test your rest
					API.
				</p>

				<div class="absolute top-1 -left-10 dark:text-white">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						><path
							d="M220 816V336h60v480h-60Zm520 0L394 576l346-240v480Zm-60-240Zm0 125V451L499 576l181 125Z"
						/></svg
					>
				</div>

				<div class="flex gap-3">
					<div>
						<button on:click={handleSkip}>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(2)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if step === 2}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-10">
			<div
				class="modal-content max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:38%; top:55%; z-index:23000px"
			>
				<p class="text-2xl">Dashboards</p>
				<p class="my-3">
					Add, analyze, delete and update data. Generate and visualize custom query reports, charts
					and generate custom forms.
				</p>

				<div class="absolute top-1 -left-10 dark:text-white">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						><path
							d="M220 816V336h60v480h-60Zm520 0L394 576l346-240v480Zm-60-240Zm0 125V451L499 576l181 125Z"
						/></svg
					>
				</div>

				<div class="flex gap-3">
					<div>
						<button on:click={handleSkip}>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(3)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if step === 3}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-10">
			<div
				class="modal-content ma max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:38%; top:61%; z-index:23000px"
			>
				<p class="text-2xl">UI</p>
				<p class="my-3">
					Create and manage UI Groups, versions, templates. Edit Page UI with Dreamfeel UI builder.
				</p>

				<div class="absolute top-1 -left-10 dark:text-white">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						><path
							d="M220 816V336h60v480h-60Zm520 0L394 576l346-240v480Zm-60-240Zm0 125V451L499 576l181 125Z"
						/></svg
					>
				</div>

				<div class="flex gap-3">
					<div>
						<button on:click={handleSkip}>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(4)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if step === 4}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-10">
			<div
				class="modal-content ma max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:38%; top:68%; z-index:23000px"
			>
				<p class="text-2xl">Roles</p>
				<p class="my-3">Create and manage User roles and assign permissions.</p>

				<div class="absolute top-1 -left-10 dark:text-white">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						><path
							d="M220 816V336h60v480h-60Zm520 0L394 576l346-240v480Zm-60-240Zm0 125V451L499 576l181 125Z"
						/></svg
					>
				</div>

				<div class="flex gap-3">
					<div>
						<button>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(5)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
	{#if step === 5}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-10">
			<div
				class="modal-content ma max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:38%; top:73%; z-index:23000px"
			>
				<p class="text-2xl">POS</p>
				<p class="my-3">Manage orders and sales of goods and services directly from your API.</p>

				<div class="absolute top-1 -left-10 dark:text-white">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						><path
							d="M220 816V336h60v480h-60Zm520 0L394 576l346-240v480Zm-60-240Zm0 125V451L499 576l181 125Z"
						/></svg
					>
				</div>

				<div class="flex gap-3">
					<div>
						<button on:click={handleSkip}>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(6)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
	{#if step === 6}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-10">
			<div
				class="modal-content ma max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:38%; top:82%; z-index:23000px"
			>
				<p class="text-2xl">Your profile</p>
				<p class="my-3">
					Manage your {$page.data.space?.name} account. Update your profile, contact email, passwords
					email preferences.
				</p>

				<div class="absolute  top-14 -left-10 dark:text-white">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						><path
							d="M220 816V336h60v480h-60Zm520 0L394 576l346-240v480Zm-60-240Zm0 125V451L499 576l181 125Z"
						/></svg
					>
				</div>

				<div class="flex gap-3">
					<div>
						<button on:click={handleSkip}>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(7)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
	{#if step === 7}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-10">
			<div
				class="modal-content ma max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:38%; top:82%; z-index:23000px"
			>
				<p class="text-2xl">Wallet</p>
				<p class="my-3">Easily manage your transactions, incomes and expenses.</p>
				<div class="absolute  top-16 -left-10 dark:text-white">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						><path
							d="M220 816V336h60v480h-60Zm520 0L394 576l346-240v480Zm-60-240Zm0 125V451L499 576l181 125Z"
						/></svg
					>
				</div>

				<div class="flex gap-3">
					<div>
						<button on:click={handleSkip}>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(8)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
	{#if step === 8}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-10">
			<div
				class="modal-content ma max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:38%; top:88%; z-index:23000px"
			>
				<p class="text-2xl">Preferences</p>
				<p class="my-3">Manage general application settings, domains and app secrets.</p>
				<div class="absolute  top-16 -left-10 dark:text-white">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						><path
							d="M220 816V336h60v480h-60Zm520 0L394 576l346-240v480Zm-60-240Zm0 125V451L499 576l181 125Z"
						/></svg
					>
				</div>

				<div class="flex gap-3">
					<div>
						<button on:click={handleSkip}>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(9)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if step === 9}
		<div class="backdrop-blur-sm bg-white/30 h-screen w-screen fixed z-40">
			<div
				class="modal-content max-w-md z-96 dark:bg-gray-800 dark:text-white"
				style="left:50%; top:43%; z-index:23000px"
			>
				{#if browser}
					<div class="flex justify-center">
						<LottiePlayer
							src="https://assets6.lottiefiles.com/packages/lf20_8edlac32.json"
							autoplay={true}
							loop={true}
							controls={true}
							renderer="svg"
							background="transparent"
							height={300}
							width={300}
							{controlsLayout}
						/>
					</div>
				{/if}
				<p class="text-2xl">Congrats</p>
				<p class="my-3">
					Your now setup to start creating rich custom applications with Dreamfeel Spaces
				</p>
				<div class="flex gap-3">
					<div>
						<button on:click={handleSkip}>Skip</button>
					</div>
					<div>
						<button class="bg-green-600" on:click={() => handleNextClick(10)}>Next</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
{/if}

<style>
	/* Walkthrough.css */
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999999999999;
		display: none;
	}

	.modal-content {
		position: absolute;
		transform: translate(-50%, -50%);
		padding: 20px;
		border-radius: 5px;
	}

	button {
		color: #fff;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
