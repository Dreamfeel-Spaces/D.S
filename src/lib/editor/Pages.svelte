<script lang="ts">
	import TreeView from './Treeview.svelte';
	import { page } from '$app/stores';

	interface Page {
		path: string;
		title: string;
	}

	function buildTree(pages: Page[], path = '/'): any[] {
		const children = [];


		console.log(pages);

		return [{ label: 'Okay' }];
	}

	const tree = {
		label: 'App',
		children: buildTree($page.data.pages)
	};

	console.log(JSON.stringify(tree, null, 2));
</script>

<div class="flex justify-left">
	<TreeView {tree} />
</div>
