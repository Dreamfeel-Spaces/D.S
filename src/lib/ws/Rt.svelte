<!-- <script>
	function openForm() {
		document.getElementById('myForm').style.display = 'block';
	}

	function closeForm() {
		document.getElementById('myForm').style.display = 'none';
	}
</script>

<button class="open-button text-center" on:click="openForm()">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24"
		fill="currentColor"
		viewBox="0 96 960 960"
		width="24"
		><path
			d="M240 657h313v-60H240v60Zm0-130h480v-60H240v60Zm0-130h480v-60H240v60ZM80 976V236q0-23 18-41.5t42-18.5h680q23 0 41.5 18.5T880 236v520q0 23-18.5 41.5T820 816H240L80 976Zm60-145 75-75h605V236H140v595Zm0-595v595-595Z"
		/></svg
	>
	<div /></button
>

<div class="form-popup" id="myForm">
	<form action="/action_page.php" class="form-container">
		<h1>Live chat</h1>

		<small class="text-gray-600">Sorry, but we are currently offline</small>

		<hr />
		<div class="mt-9" />
		<label for="email"><b>Email</b></label>
		<input type="text" placeholder="Enter Email" name="email" required />

		<label for="email"><b>Name</b></label>
		<input type="text" placeholder="Enter Email" name="email" required />

		<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Your message</label
		>
		<textarea
			id="message"
			rows="4"
			class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Write your thoughts here..."
		/>

		<button type="submit" class="btn">Send</button>
		<button type="button" class="btn cancel" on:click="closeForm()">Close</button>
	</form>
</div>

<style>
	body {
		font-family: Arial, Helvetica, sans-serif;
	}
	* {
		box-sizing: border-box;
	}

	/* Button used to open the contact form - fixed at the bottom of the page */
	.open-button {
		background-color: #555;
		color: white;
		padding: 16px 20px;
		border: none;
		cursor: pointer;
		opacity: 0.8;
		position: fixed;
		bottom: 23px;
		right: 28px;
		width: 280px;
	}

	/* The popup form - hidden by default */
	.form-popup {
		display: none;
		position: fixed;
		bottom: 0;
		right: 15px;
		border: 3px solid #f1f1f1;
		z-index: 9;
	}

	/* Add styles to the form container */
	.form-container {
		max-width: 300px;
		padding: 10px;
		background-color: white;
	}

	/* Full-width input fields */
	.form-container input[type='text'],
	.form-container input[type='password'] {
		width: 100%;
		padding: 15px;
		margin: 5px 0 22px 0;
		border: none;
		background: #f1f1f1;
	}

	/* When the inputs get focus, do something */
	.form-container input[type='text']:focus,
	.form-container input[type='password']:focus {
		background-color: #ddd;
		outline: none;
	}

	/* Set a style for the submit/login button */
	.form-container .btn {
		background-color: #04aa6d;
		color: white;
		padding: 16px 20px;
		border: none;
		cursor: pointer;
		width: 100%;
		margin-bottom: 10px;
		opacity: 0.8;
	}

	/* Add a red background color to the cancel button */
	.form-container .cancel {
		background-color: red;
	}

	/* Add some hover effects to buttons */
	.form-container .btn:hover,
	.open-button:hover {
		opacity: 1;
	}
</style> -->
