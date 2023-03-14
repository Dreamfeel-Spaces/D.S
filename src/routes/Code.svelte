<script>
	// @ts-nocheck
	import Prism from 'prismjs';
	export let code = `console.log('Hello world')`;
	export let language = 'javascript';
</script>

<div class="code">
	{@html Prism.highlight(code, Prism.languages[language])}
</div>

<svelte:head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<!-- fetch("http://example.com/movies.json")
  .then((response) => response.json())
  .then((data) => console.log(data)); -->

<!-- // Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
}); -->

<!-- import requests

x = requests.get('https://w3schools.com/python/demopage.htm')

print(x.text) -->

<!-- URL url = new URL("http://example.com");
HttpURLConnection con = (HttpURLConnection) url.openConnection();
con.setRequestMethod("GET"); -->
<style>
	@import 'prismjs/themes/prism.css';
	.code {
		white-space: pre-wrap;
	}
</style>
