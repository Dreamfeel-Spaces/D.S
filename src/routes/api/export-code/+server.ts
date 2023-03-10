import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET({locals}:any) {
	// console.log(fs);


    // console.log(__dirname)
	// return new Response(dir)

	


	const dir = Math.ceil(Math.random() * 100000)

	await fs.mkdir(`temp/${dir}`);

	return new Response(`/temp/${dir}`)
}
