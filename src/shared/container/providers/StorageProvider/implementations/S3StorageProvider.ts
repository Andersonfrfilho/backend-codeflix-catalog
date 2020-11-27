import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import uploadConfig from '@config/upload';
import mime from 'mime';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  public async saveFile({ file_name }: { file_name: string }): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file_name);
    const ContentType = mime.getType(originalPath);
    if (!ContentType) {
      throw new Error('File not found');
    }
    const fileContent = await fs.promises.readFile(originalPath);
    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file_name,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();
    return file_name;
  }

  public async deleteFile({ file_name }: { file_name: string }): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file_name,
      })
      .promise();
  }
}
export default DiskStorageProvider;
