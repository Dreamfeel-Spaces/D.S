<script>
	import { onMount } from 'svelte';

	let editor;

	export let language = 'plaintext';
	export let code = 'Write code here';
	export let readOnly = true;
	export let disableMinimap = true;

	const loadMonacoEditor = async () => {
		const monaco = await import('monaco-editor');
		monaco.languages.registerCompletionItemProvider('javascript', {
			provideCompletionItems: (model, position) => {
				const wordInfo = model.getWordUntilPosition(position);
				const word = wordInfo.word;
				if (word === 'db') {
					const suggestions = [
						{ label: 'Item 1', kind: monaco.languages.CompletionItemKind.Text },
						{ label: 'Item 2', kind: monaco.languages.CompletionItemKind.Text },
						{ label: 'Item 3', kind: monaco.languages.CompletionItemKind.Text }
					];

					return { suggestions };
				}

				return { suggestions: [] };
			}
		});

		monaco.editor.setTheme('vs-dark');
		editor = monaco.editor.create(document.getElementById('editor'), {
			value: code,
			language,
			readOnly: readOnly,
			minimap: { enabled: !disableMinimap }
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

<div class="h-100 p-6 overflow-x-auto">
	<div id="editor" class=" h-full overflow-hidden" />
</div>
