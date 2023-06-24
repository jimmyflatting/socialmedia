import AWS from "aws-sdk";

const s3Client = new AWS.S3({
  accessKeyId: process.env.S3_accessKeyId,
  secretAccessKey: process.env.S3_secretAccessKey,
  region: process.env.S3_region,
});

export { s3Client };
