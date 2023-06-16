<script>
	import { Heading, Input, P, A, TabItem, Tabs, Modal, Button, Label } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import feelPay from '$lib/assets/beta-logo.png';
	import CodeEditor from '$lib/components/code-editor/CodeEditor.svelte';
	import PayBtn from './PayBtn.svelte';
	import { svelteCode } from './codes';

	function sidebarHandler(flag) {
		var sideBar = document.getElementById('mobile-nav');
		var openSidebar = document.getElementById('openSideBar');
		var closeSidebar = document.getElementById('closeSideBar');
		sideBar.style.transform = 'translateX(-260px)';
		if (flag) {
			sideBar.style.transform = 'translateX(0px)';
			openSidebar.classList.add('hidden');
			closeSidebar.classList.remove('hidden');
		} else {
			sideBar.style.transform = 'translateX(-260px)';
			closeSidebar.classList.add('hidden');
			openSidebar.classList.remove('hidden');
		}
	}

	let modalOpen = false;

	let code = `
    <body>
        <div  id="feel-pay-button-container"  ></div>
        \<script  src="http://cdn.${$page.url.hostname}/packages/pay_js/0.X.X"  \>\</script\>
        <script\>
            let amount = 1;
            let currency = 'KES'
            initFeeelPay({
				CLIENT_ID: 'Your client ID',
				CLIENT_SECRET: 'Your client secret'
			}).then((dPay) => {
				dPay.Buttons();
				dPay.onApprove(() => console.log('hehe'));
				dPay.createOrder({ items: [], amount: [] });
				dPay.renderBtn('#dreamfeel-pay-button');
			});
        \</script\>
    </body>
`;

	let reactCode = `
import React from "react";

export default function DreamfeelPayButton() {
  const { loading, error } = useScript(
    "http://cdn.${$page.url.hostname}/packages/pay_js/0.X.X"
  )

  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>
  return <div id="#dreamfeel-pay-btn"  ></div>
}


export default function useScript(url) {
  return useAsync(() => {
    const script = document.createElement("script")
    script.src = url
    script.async = true

    return new Promise((resolve, reject) => {
      script.addEventListener("load", resolve)
      script.addEventListener("error", reject)
      document.body.appendChild(script)
    })
  }, [url])
}

export default function useAsync(callback, dependencies = []) {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState()
  const [value, setValue] = React.useState()

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependencies)

  React.useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
}

`;

	let svelte = svelteCode($page.url.pathname);

	let simOpen = false;
	let checkoutPrice = 1;
	let checkoutPlan = 'Nyati';
</script>

<div class="min-h-screen px-9 lg:px-36 text-white bg-black">
	<aside class="bprder-gray-100">
		<a href="/" class="p-3 flex justify-center">
			<img
				width="154"
				alt="Dreamfeel Pay Logo"
				src={'https://res.cloudinary.com/dreamnerd/image/upload/v1686721359/feel-pay_yrvuwi.png'}
			/>
		</a>
	</aside>
	<section class="">
		<div class=" mx-auto py-4 ">
			<div class="w-full space-y-4 h-screen">
				<div>
					<div class="flex">
						<Heading class="flex-1" tag="h4">Setup</Heading>
						<Button on:click={() => (simOpen = true)}>Simulate</Button>
					</div>
					<Modal bind:open={simOpen} class="w-full space-y-3">
						<div slot="header" class="text-lg">Simulate</div>
						<Label>
							Amount
							<Input bind:value={checkoutPrice} required />
						</Label>
						<Label>
							Plan
							<Input bind:value={checkoutPlan} required />
						</Label>
						<div class="text-center text-3xl">Checkout with</div>
						<PayBtn {checkoutPrice} {checkoutPlan} />
					</Modal>
				</div>
				<div class="dark:bg-gray-900 p-3 rounded-lg">
					<Tabs>
						<TabItem open title="HTML">
							<CodeEditor readOnly disableMinimap {code} language="html" />
						</TabItem>
						<TabItem title="React 16+">
							<CodeEditor code={reactCode} language="javascript" />
						</TabItem>
						<TabItem title="Svelte">
							<CodeEditor code={svelte} language="html" />
						</TabItem>
						<TabItem title="Angular">
							<CodeEditor code={reactCode} language="javascript" />
						</TabItem>
						<TabItem title="Vue.js">
							<CodeEditor code={reactCode} language="javascript" />
						</TabItem>
					</Tabs>
				</div>
			</div>
		</div>
	</section>
	<footer style="backdrop-filter:blur(30px)" class="p-4 md:p-8 lg:p-10   dark:bg-black">
		<div class="mx-auto max-w-screen-xl text-center">
			<a
				href="/"
				class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
			>
				<div class="text-center">
					<div class="flex justify-center">
						<img src={feelPay} loading="lazy" width="40%" alt="" />
					</div>
				</div>
			</a>

			<p class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
				Chandaria BIIC-Kenyatta University
			</p>

			<!-- <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
				<li>
					<a href="/" class="mr-4 hover:underline md:mr-6 ">About</a>
				</li>
				<li>
					<a href="/" class="mr-4 hover:underline md:mr-6">Premium</a>
				</li>
				<li>
					<a href="/" class="mr-4 hover:underline md:mr-6 ">Campaigns</a>
				</li>
				<li>
					<a href="/" class="mr-4 hover:underline md:mr-6">Blog</a>
				</li>
				<li>
					<a href="/" class="mr-4 hover:underline md:mr-6">Affiliate Program</a>
				</li>
				<li>
					<a href="/" class="mr-4 hover:underline md:mr-6">FAQs</a>
				</li>
				<li>
					<a href="/" class="mr-4 hover:underline md:mr-6">Contact</a>
				</li>
			</ul> -->
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
				>© {new Date().getFullYear()}
				<a href="https://dreamfeel.me" class="hover:underline">Dreamfeel Spaces</a>. All Rights
				Reserved.</span
			>
		</div>
	</footer>
</div>
