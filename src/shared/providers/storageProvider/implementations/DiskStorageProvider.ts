import fs from 'fs';
import path from 'path';
import uploadConfig from '@Config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    console.log(uploadConfig.tmpFolder, uploadConfig.uploadsFolder);
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    const checkFileExistis = await fs.promises.stat(filePath);

    if (checkFileExistis) {
      await fs.promises.unlink(filePath);
    }
  }
}
export default DiskStorageProvider;
