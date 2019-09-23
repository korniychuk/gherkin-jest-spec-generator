import * as fs from 'fs';

export class FileSystem {

  public isReadable(filePath: string): boolean {
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
    } catch (e) {
      return false;
    }

    return true;
  }

}
