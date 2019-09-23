import { ParserService } from './parser.service';
import { GCommonCommand, EGKey, GRawCommand } from '../models';
import { configMock } from '../__mock-data__';

describe(ParserService.name, () => {
  let s: ParserService;

  beforeEach(() => {
    s = new ParserService(configMock);
  });

  describe('SCENARIO: Single string parsing', () => {
    describe('WHEN: Valid command passed', () => {
      it('THEN: Should parse the command', () => {
        // arrange
        const data = '  '.repeat(2) + 'SCENARIO: Test scenario';
        const expected: GCommonCommand = {
          comment: 'Test scenario',
          indentationSize: 2,
          key: EGKey.Scenario,
        };

        // act
        const res = s.parse(data);

        // assert
        expect(res).toEqual(expected);
      });
    });

    describe('WHEN: Command without KEY passed', () => {
      it('THEN: Should return undefined', () => {
        // arrange
        const data = '  '.repeat(2) + ': Test scenario';

        // act
        const res = s.parse(data);

        // assert
        expect(res).toBeUndefined();
      });
    });

    describe('WHEN: Command without comment', () => {
      it('THEN: Should return undefined', () => {
        // arrange
        const data = '  '.repeat(2) + 'SCENARIO: ';
        const data2 = '  '.repeat(2) + 'SCENARIO:';

        // act
        const res = s.parse(data);
        const res2 = s.parse(data2);

        // assert
        expect(res).toBeUndefined();
        expect(res2).toBeUndefined();
      });
    });

    describe('WHEN: Command without indentation', () => {
      it('THEN: Should set indentation to 0', () => {
        // arrange
        const data = 'SCENARIO: Test scenario';
        const expected: GCommonCommand = {
          comment: 'Test scenario',
          indentationSize: 0,
          key: EGKey.Scenario,
        };

        // act
        const res = s.parse(data);

        // assert
        expect(res).toEqual(expected);
      });
    });

    describe('WHEN: Absolutely invalid row passed', () => {
      it('THEN: Should set indentation to 0', () => {
        // arrange
        const data = 'Invalid row';

        // act
        const res = s.parse(data);

        // assert
        expect(res).toBeUndefined();
      });
    });

    describe('WHEN: Not supported Gherkin command passed', () => {
      it('THEN: Should parse it without any validation', () => {
        // arrange
        const data = 'BACKGROUND: Test scenario';
        const expected: GRawCommand = {
          comment: 'Test scenario',
          indentationSize: 0,
          key: 'background',
        };

        // act
        const res = s.parse(data);

        // assert
        expect(res).toEqual(expected);
      });
    });

  });
});
