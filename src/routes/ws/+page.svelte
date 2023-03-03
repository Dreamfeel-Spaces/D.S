<script lang="ts">
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';
	let socket: any;
	onMount(() => {
		// const ws = new WebSocket('ws://http:localhost:5173');
		// console.log(ws);
		// console.log(io);
		const sock = io('/');
		console.log(sock)
		// fetch('/api/socketio').finally(() => {
		// 	socket = sock;

		// 	sock?.on('connect', () => {
		// 		console.log('Hello');
		// 		sock.emit('hello');
		// 	});

		// 	sock?.on('hello', (data: any) => {
		// 		console.log('hello', data);
		// 	});

		// 	sock?.on('a user connected', () => {
		// 		console.log('a user connected');
		// 	});

		// 	sock?.on('disconnect', () => {
		// 		console.log('disconnect');
		// 	});
		// });
	});
</script>
