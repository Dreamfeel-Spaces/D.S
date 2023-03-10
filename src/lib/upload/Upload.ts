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

	async cloudinaryUpload(){
		
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
