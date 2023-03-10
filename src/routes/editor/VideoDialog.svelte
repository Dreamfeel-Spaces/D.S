<script>
	import { Button, Modal, Label, Input, SidebarItem } from 'flowbite-svelte';
	let formModal = false;
</script>

<div>
	<button
		on:click={() => (formModal = true)}
		class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
	>
		<svg
			class="mr-2 -ml-1 w-5 h-5"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
			/></svg
		>
		Watch video
	</button>
	<div>
		<Modal bind:open={formModal} size="lg" autoclose={false} class="w-full text-left">
			<div
				class="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden rounded-lg shadow-lg"
				style="padding-top: 56.25%"
			>
				<!-- svelte-ignore a11y-missing-attribute -->
				<iframe
					class="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 w-full h-full"
					src="https://www.youtube.com/embed/vlDzYIIOYmM?enablejsapi=1&amp;origin=https%3A%2F%2Fmdbootstrap.com"
					allowfullscreen={true}
					data-gtm-yt-inspected-2340190_699="true"
					id="240632615"
				/>
			</div>
		</Modal>
	</div>
</div>
