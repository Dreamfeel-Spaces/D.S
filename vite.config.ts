import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import { Server } from 'socket.io';

export const websocketServer = {
	name: 'wsservrer',
	configureServer(server: any) {
		const io = new Server(server.httpServer);
		io.on('connect', (socket: any) => {
			socket.emit('ping', 'ping');
		});
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
