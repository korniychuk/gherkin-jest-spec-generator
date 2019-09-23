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
      expect(service.insertAAA).toBe(true);
    });
  });

  describe('SCENARIO: CLI Arguments testing', () => {
    let prevArgs: string[];
    let exitSpy: jest.SpyInstance;

    beforeEach(() => {
      prevArgs = [ ...process.argv ];
      exitSpy = jest.spyOn(process, 'exit').mockImplementation();
    });

    afterEach(() => {
      process.argv = [ ...prevArgs ];
      exitSpy.mockRestore();
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

    describe('WHEN: The input argument is lost', () => {
      it('THEN: Should exit with error', () => {
        process.argv.push('-i', 'an-input-file-3');
        service.init();
        expect(exitSpy).toHaveBeenCalledWith(1);
      });
    });

    describe('WHEN: The output argument is lost', () => {
      it('THEN: Should exit with error', () => {
        process.argv.push('-o', 'an-output-file-3');
        service.init();
        expect(exitSpy).toHaveBeenCalledWith(1);
      });
    });

    describe('WHEN: The flag to disable insert AAA comments passed in the long form', () => {

      beforeEach(() => {
        process.argv.push('-i', 'an-input-file-2', '-o', 'an-output-file-2');
      });

      it('THEN: Should save the value to the service', () => {
        // arrange
        process.argv.push('--no-insert-aaa-comments');

        // act
        service.init();

        // assert
        expect(service.insertAAA).toBe(false);
      });
    });
  });

});
