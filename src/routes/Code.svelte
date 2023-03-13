<script>
	//@ts-nocheck
	import Prism from 'prismjs';

	let code = `<div>Hello, World!</div>`;
	let language = 'html';

	let highlightedCode = Prism.highlight(code, Prism.languages[language], language);
</script>

<pre><code class={`language-${language}`} innerHTML={highlightedCode} /></pre>

<style>
	@import 'prismjs/themes/prism.css';
</style>
