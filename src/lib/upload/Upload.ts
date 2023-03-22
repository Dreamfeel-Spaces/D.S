//@ts-nocheck
import { prisma } from '$lib/db/prisma';
// import { S3Client } from '@aws-sdk/client-s3';
// import {  AbortMultipartUploadCommand } from '@aws-sdk/client-s3';

export class Upload {
	private space: any;
	constructor(spaceId: string) {
		prisma.configVars
			.findMany({
				where: {
					spaceId: spaceId
				}
			})
			.then((data) => {
				this.space = data;
			});
	}

	cloudinaryUpload(files = []){
		return new Promise((resolve) => {
		let uploads: any = [];
		files.forEach((file) => {
			const data = new FormData();
			data.append('file', file.fileData);
			data.append('upload_preset', 'ml_default');
			data.append('cloud_name', 'dreamercodes');
			fetch('  https://api.cloudinary.com/v1_1/dreamercodes/image/upload', {
				method: 'post',
				body: data
			})
				.then((resp) => resp.json())
				.then((data) => {
					uploads.push({ field: file.field, url: data.url });
					if (uploads.length === files.length) {
						resolve(uploads);
					}
				})
				.catch((err) => {
					uploads.push(null);
					if (uploads.length === files.length) {
						resolve(uploads);
					}
				});
		});
	});
	}

	async s3Upload(base64Image: any, { region = 'REGION' }: any) {
		// const client = new S3Client({ region });
		// const params = {
		// 	/** input parameters */
		// };
		// const command = new AbortMultipartUploadCommand(params);

		// try {
		// 	const data = await client.send(command);
		// } catch (e) {
		// } finally {
		// }
	}
}
