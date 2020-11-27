import fs from 'fs';
import path from 'path';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import uploadConfig from '@config/upload';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile({ file_name }: { file_name: string }): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file_name),
      path.resolve(uploadConfig.uploadsFolder, file_name),
    );
    return file_name;
  }

  public async deleteFile({ file_name }: { file_name: string }): Promise<void> {
    const filePath = path.join(uploadConfig.uploadsFolder, file_name);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
export default DiskStorageProvider;
