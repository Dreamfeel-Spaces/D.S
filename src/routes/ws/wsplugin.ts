//@ts-nocheck

import { Server } from 'socket.io';

const WebSocketServerPlugin = {
	name: 'webSocketServerPlugin',
	configureServer(server) {
		const io = new Server(server.httpServer);

		io.on('connection', (socket) => {
			socket.emit('eventFromServer', 'Hello, World 👋');
		});
	}
};

export default WebSocketServerPlugin;
