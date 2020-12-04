export default interface IStorageProvider {
  saveFile({ file_name }: { file_name: string }): Promise<string>;
  deleteFile({ file_name }: { file_name: string }): Promise<void>;
  listFiles({ ignore_files }: { ignore_files: string[] }): Promise<string[]>;
  deleteFiles({
    files,
  }: {
    files: string[];
  }): Promise<PromiseSettledResult<void>[]>;
  deleteTemporaryFile({ file_name }: { file_name: string }): Promise<void>;
  deleteTemporaryFiles({ file_names }: { file_names: string[] }): Promise<void>;
}
