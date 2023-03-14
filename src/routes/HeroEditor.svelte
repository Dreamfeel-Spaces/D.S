<script>
	//@ts-nocheck
	import 'grapesjs/dist/css/grapes.min.css';

	import { onMount, onDestroy } from 'svelte';

	let editor;

	onMount(async () => {
		const { default: grapesjs } = await import('grapesjs');
		editor = grapesjs.init({
			container: '#gjs-hero',
			fromElement: true,
			height: '559px',
			width: 'auto',
			plugins: [],
			storageManager: false
		});
	});
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div id="gjs-hero">
	<div style="display:flex; justify-content: center; align-items:center;margin-top:4rem">
		<div>
			<h1>Create website with drag and drop components,</h1>
			<p>Get access to all your collections data</p>
		</div>
	</div>
</div>
