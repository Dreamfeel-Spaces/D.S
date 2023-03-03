<script>
	import { Alert, Input, Button } from 'flowbite-svelte';
</script>

<div class="text-center mt-9">
	<p class="text-3xl">Spaces demo</p>
</div>

<div class="px-6 lg:mx-72 mx-3 mt-3">
	<Alert>
		<div class="my-2">This is a live demo, but with file upload disabled</div>
		<div class="mb-2">Use test credentials</div>
		<ul>
			<li>Username: <b>admin@company.mail</b></li>
			<li>Password: <b>testPass123</b></li>
		</ul>
		<div class="mt-3">
			<a class="hover:underline" href="/spaces/create">Create a new space instead</a>
		</div>
	</Alert>
	<div class="mt-9">
		<form method="POST">
			<div>
				<label for="username">Username</label>
				<Input required name="username" class="mt-2" id="username" />
			</div>
			<div class="my-6">
				<label for="password">Password</label>
				<Input required type="password" class="mt-2" name="password" id="password" />
			</div>
			<Button type="submit" class="w-full">Login</Button>
		</form>
	</div>
</div>
