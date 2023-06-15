import { S3 } from '@aws-sdk/client-s3';

const s3Client = new S3({
	region: process.env.S3_region,
	credentials: {
		accessKeyId: process.env.S3_accessKeyId,
		secretAccessKey: process.env.S3_secretAccessKey,
	},
});

export { s3Client };
