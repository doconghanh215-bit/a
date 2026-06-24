import AWS from 'aws-sdk';
import { logger } from '../utils/logger';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadToS3 = async (file: any, folder: string): Promise<string> => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET || 'music-streaming-bucket',
      Key: `${folder}/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(params).promise();
    logger.info(`File uploaded to S3: ${result.Location}`);
    return result.Location;
  } catch (error) {
    logger.error('S3 upload failed:', error);
    throw error;
  }
};

export const deleteFromS3 = async (fileUrl: string): Promise<void> => {
  try {
    const key = fileUrl.split('/').pop();
    const params = {
      Bucket: process.env.AWS_S3_BUCKET || 'music-streaming-bucket',
      Key: key || ''
    };

    await s3.deleteObject(params).promise();
    logger.info(`File deleted from S3: ${fileUrl}`);
  } catch (error) {
    logger.error('S3 delete failed:', error);
    throw error;
  }
};

export default s3;
