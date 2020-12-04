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

  public async listFiles({
    ignore_files,
  }: {
    ignore_files: string[];
  }): Promise<string[]> {
    const [, ...files] = await fs.promises.readdir(uploadConfig.tempFolder);
    const filters_files = files.filter(
      file_name =>
        !ignore_files.some(ignore_file_name => ignore_file_name === file_name),
    );
    return filters_files;
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

  public async deleteTemporaryFile({
    file_name,
  }: {
    file_name: string;
  }): Promise<void> {
    const filePath = path.join(uploadConfig.tempFolder, file_name);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }

  public async deleteFiles({
    files,
  }: {
    files: string[];
  }): Promise<PromiseSettledResult<void>[]> {
    const files_paths = files.map(file_name =>
      path.join(uploadConfig.uploadsFolder, file_name),
    );
    const files_exist_promise = files_paths.map(async file_path => {
      try {
        await fs.promises.stat(file_path);
        await fs.promises.unlink(file_path);
      } catch (err) {
        return err;
      }
    });

    const result = await Promise.allSettled(files_exist_promise);
    return result;
  }

  public async deleteTemporaryFiles({
    file_names,
  }: {
    file_names: string[];
  }): Promise<void> {
    const files_paths = file_names.map(file_name => {
      return path.join(uploadConfig.tempFolder, file_name);
    });
    await Promise.all(
      files_paths.map(async file_name => {
        await fs.promises.unlink(file_name);
      }),
    );
  }
}
export default DiskStorageProvider;
