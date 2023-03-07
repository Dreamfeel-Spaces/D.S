import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import { WebSocketServer } from 'ws';

export const websocketServer = {
	name: 'wsservrer',
	configureServer(server: any) {
		// const wss = new WebSocketServer({ port: 5174 });
		// console.log('websocket started');
		// wss.on('connection', function connection(ws: any) {
		// 	ws.on('error', console.error);

		// 	ws.on('message', function message(data: any) {
		// 		console.log('received: %s', data);
		// 	});

		// 	ws.send("ping", "ping")

		// 	ws.send('something');
		// });
	}
};

export default defineConfig({
	plugins: [sveltekit(), websocketServer],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		noExternal: ['chart.js']
	},
	optimizeDeps: {
		include: ['papaparse']
	}
});
