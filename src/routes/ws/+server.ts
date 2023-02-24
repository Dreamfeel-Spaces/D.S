export async function GET() {
	console.log('Websocket doing its thing here');

	const response = new Response('Ws, maybe');
	return response;
}
