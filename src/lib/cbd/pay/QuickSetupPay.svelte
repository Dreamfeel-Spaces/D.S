<script>
	import { Heading, Hr, P, TabItem, Tabs } from 'flowbite-svelte';
	import Code from '../../../routes/Code.svelte';
	import { page } from '$app/stores';
	import feelPay from '$lib/assets/beta-logo.png';
	import CodeEditor from '$lib/components/code-editor/CodeEditor.svelte';

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

	let code = `
    <body>
        <div  id="feel-pay-button-container"  ></div>
        \<script  src="http://cdn.${$page.url.hostname}/packages/pay_js/0.0.1"  \>\</script\>
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

export default function App(props){

	React.useEffect(()=>{

	}, [])

	return (<div  id="dreamfeel-pay-button" ></div>)
}

`;
</script>

<div class="h-screen flex text-white bg-black">
	<aside class="w-72 border-r bprder-gray-100">
		<a href="/" class="p-3 flex justify-center">
			<img alt="Dreamfeel Pay Logo" width="72" src={feelPay} />
		</a>
		<Hr />
		<div class="mt-2 p-4">Setup</div>
	</aside>
	<section class="flex-1 h-full px-6 overflow-auto">
		<div class=" mx-auto py-4 ">
			<div class="w-full space-y-4 h-screen">
				
				<Heading tag="h5">Setup</Heading>
				<P>Setup via CDN, No installation required.</P>
				<div class="dark:bg-gray-900 p-3 rounded-lg">
					<Tabs>
						<TabItem open title="Vanilla JS">
							<CodeEditor {code} language="html" />
						</TabItem>
						<TabItem title="React JS">
							<CodeEditor code={reactCode} language="javascript" />
						</TabItem>
					</Tabs>
				</div>
			</div>
		</div>
	</section>
</div>
