<script>
	import { onMount } from 'svelte';

	let editor;

	export let language = 'plaintext';
	export let code = 'Write code here';

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

					console.log(suggestions);
					return { suggestions };
				}

				return { suggestions: [] };
			}
		});
	
		monaco.editor.setTheme('vs-dark');
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

<div id="editor" class="min-h-72 h-72" />
