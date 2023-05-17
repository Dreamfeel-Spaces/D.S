<script>
	import { onMount } from 'svelte';

	let editor;

	export let language = 'plaintext';
	export let code = 'Write code here';

	const loadMonacoEditor = async () => {
		const monaco = await import('monaco-editor');
		editor = monaco.editor.create(document.getElementById('editor'), {
			value: code,
			language
		});
		editor.onDidChangeModelContent(() => {
			code = editor.getValue();
		});
	};

	$: if (editor && editor.getValue() !== code) {
		editor.setValue(code);
	}

	onMount(loadMonacoEditor);
</script>

<div id="editor" class="min-h-48 h-56" />
