import { ConfigService } from './config.service';

describe(ConfigService.name, () => {
  let service: ConfigService;

  beforeEach(() => {
    service = new ConfigService();
  });

  describe('SCENARIO: Initialization', () => {
    describe('WHEN: Instance created', () => {
      it('THEN: Default config values should be assigned', () => {
        expect(service.inputFilePath).toBe('');
      });
    });
  });
});
