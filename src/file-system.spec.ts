import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { FileSystem } from './file-system';

const TMP_DIR = path.join(os.tmpdir(), 'gherkin-spec-ts-generator-' + Math.random());

describe(FileSystem.name, () => {
  let service: FileSystem;

  beforeEach(() => {
    service = new FileSystem();
    if (fs.existsSync(TMP_DIR)) {
      rimraf.sync(TMP_DIR);
    }
    fs.mkdirSync(TMP_DIR);
  });

  afterEach(() => {
    rimraf.sync(TMP_DIR);
  });


  describe('.isReadable()', () => {
    const filePath = path.join(TMP_DIR, 'scenario.txt');

    it('Should return false for an nonexistent file', () => {
      // act
      const res = service.isReadable(filePath);

      // assert
      expect(res).toBe(false);
    });

    it('Should return false for an unreadable file', () => {
      // arrange
      fs.writeFileSync(filePath, 'hello');
      fs.chmodSync(filePath, 0);

      // act
      const res = service.isReadable(filePath);

      // assert
      expect(res).toBe(false);
    });

    it('Should return true for a readable file', () => {
      // arrange
      fs.writeFileSync(filePath, 'hello');

      // act
      const res = service.isReadable(filePath);

      // assert
      expect(res).toBe(true);
    });
  });
});
