import { App } from './app';

class AppDebug extends App {
  public inputFilePath?: string;
  public outputFilePath?: string;
}

describe(App.name, () => {
  let service: AppDebug;

  beforeEach(() => {
    service = new AppDebug();
  });

  describe('SCENARIO: CLI Arguments testing', () => {
    let prevArgs: string[];

    beforeEach(() => {
      prevArgs = [ ...process.argv ];
    });

    afterEach(() => {
      process.argv = [ ...prevArgs ];
    });

    describe('WHEN: Input and Output file paths specified as CLI arguments in the long form', () => {
      it('THEN: input and output file paths should be saved in the App', () => {
        // arrange
        process.argv.push('--in', 'an-input-file', '--out', 'an-output-file');

        // act
        service.init();

        // assert
        expect(service.inputFilePath).toBe('an-input-file');
        expect(service.outputFilePath).toBe('an-output-file');
      });
    });

    describe('WHEN: Input and Output file paths specified as CLI arguments in the short form', () => {
      it('THEN: input and output file paths should be saved in the App', () => {
        // arrange
        process.argv.push('-i', 'an-input-file', '-o', 'an-output-file');

        // act
        service.init();

        // assert
        expect(service.inputFilePath).toBe('an-input-file');
        expect(service.outputFilePath).toBe('an-output-file');
      });
    });

  });
});
