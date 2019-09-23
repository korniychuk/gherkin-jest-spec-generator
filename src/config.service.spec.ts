import { ConfigService } from './config.service';

describe(ConfigService.name, () => {
  let service: ConfigService;

  beforeEach(() => {
    service = new ConfigService();
  });

  describe('WHEN: Instance created', () => {
    it('THEN: Default config values should be assigned', () => {
      expect(service.inputFilePath).toBe('');
      expect(service.outputFilePath).toBe('');
      expect(service.insertAAA).toBe(false);
    });
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
        process.argv.push('-i', 'an-input-file-2', '-o', 'an-output-file-2');

        // act
        service.init();

        // assert
        expect(service.inputFilePath).toBe('an-input-file-2');
        expect(service.outputFilePath).toBe('an-output-file-2');
      });
    });

  });

});
