export default interface IStorageProvider {
  saveFile({ file_name }: { file_name: string }): Promise<string>;
  deleteFile({ file_name }: { file_name: string }): Promise<void>;
}
