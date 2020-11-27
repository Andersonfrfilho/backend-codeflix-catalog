import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile({ file_name }: { file_name: string }): Promise<string> {
    this.storage.push(file_name);
    return file_name;
  }

  public async deleteFile({ file_name }: { file_name: string }): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file_name,
    );
    this.storage.splice(findIndex, 1);
  }
}
export default DiskStorageProvider;
