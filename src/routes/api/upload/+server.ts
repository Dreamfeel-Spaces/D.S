// import { Upload } from '$lib/upload/Upload';
import type { RequestEvent } from '../$types';

export async function POST({ request }: RequestEvent) {
	const data = JSON.parse((await (request?.body as any)?.getReader()?.read()).toString());
	const file = data?.image;

	// const uploader = new Upload('cled1sr070005ukr4t4ps3iad');

    

	console.log(file);
}
