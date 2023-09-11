import { ArrayValueParser } from '../src/index.js';

describe('ArrayValueParser.ts', () => {
  describe('ArrayValueParser', () => {
    describe('parse', () => {
      it('should return value from parser', () => {
        const parser = new ArrayValueParser((value) => value, false, undefined);

        expect(parser.parse([1, 2, 3])).toStrictEqual([1, 2, 3]);
        expect(parser.parse('[3,2,1]')).toStrictEqual([3, 2, 1]);
      });

      it('should throw an error in case, array parser was unable to parse value', () => {
        const parser = new ArrayValueParser((v) => v, false, undefined);

        expect(() => parser.parse('throw')).toThrow(/Passed value does not satisfy any of known formats/);
      });

      it('should throw an error in case, wrapped parser was unable to parse value', () => {
        const parser = new ArrayValueParser((v) => {
          if (v === 'throw') {
            throw new Error('I am throwing');
          }
          return true;
        }, false, undefined);

        expect(() => parser.parse(['throw'])).toThrow('I am throwing');
      });
    });

    describe('optional', () => {
      it('should return undefined in case, passed value is undefined', () => {
        const parser = new ArrayValueParser(() => 'does not matter', false, undefined).optional();

        expect(parser.parse(undefined)).toBe(undefined);
      });

      it('should return undefined in case, passed value satisfies passed isEmpty function', () => {
        const parser = new ArrayValueParser(() => 'does not matter', false, undefined).optional(
          (v) => v === null || v === undefined,
        );

        expect(parser.parse(undefined)).toBe(undefined);
        expect(parser.parse(null)).toBe(undefined);
        expect(parser.parse(['abc'])).toStrictEqual(['does not matter']);
      });
    });

    describe('default', () => {
      it('should return undefined in case, passed value is undefined and default was not specified', () => {
        const parser = new ArrayValueParser(() => 'does not matter', false, undefined).optional(
          (v) => v === null || v === undefined,
        );

        expect(parser.parse(undefined)).toBe(undefined);
        expect(parser.parse(null)).toBe(undefined);
      });

      it('should return value from passed default function in case value is empty', () => {
        const parser = new ArrayValueParser(() => 'does not matter', false, undefined)
          .optional((v) => v === null || v === undefined)
          .default(() => ['my value']);

        expect(parser.parse(undefined)).toStrictEqual(['my value']);
        expect(parser.parse(null)).toStrictEqual(['my value']);
        expect(parser.parse(['abc'])).toStrictEqual(['does not matter']);
      });
    });
  });
});