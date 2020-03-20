import fs from 'fs';
import genDiff from '../src';

describe('gendiff tests', () => {
  let makeDiffSet;
  let getDistBetweenKeys;

  beforeAll(() => {
    makeDiffSet = (rawDiff) => new Set(rawDiff.split('\n'));
    getDistBetweenKeys = (rawDiff, key1diff, key2diff) => {
      const splittedDiff = rawDiff.split('\n');
      const key1Index = splittedDiff.indexOf(key1diff);
      const key2Index = splittedDiff.indexOf(key2diff);
      return Math.abs(key1Index - key2Index);
    };
  });

  describe('Complex output format tests', () => {
    let complexDiffFile;
    let complexDiffSet;
    let format;

    beforeAll(() => {
      complexDiffFile = fs.readFileSync('__fixtures__/complex_diff.txt', 'utf8');
      complexDiffSet = makeDiffSet(complexDiffFile);
      format = 'complex';
    });

    test('JSON file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.json';
      const pathToAfterFile = '__fixtures__/after_complex.json';
      expect(makeDiffSet(genDiff(pathToBeforeFile, pathToAfterFile, format))).toEqual(complexDiffSet);
    });

    test('JSON file changed value test (2 recordes must be beside)', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.json';
      const pathToAfterFile = '__fixtures__/after_complex.json';
      expect(
        getDistBetweenKeys(
          genDiff(pathToBeforeFile, pathToAfterFile, format),
          '      + baz: bars',
          '      - baz: bas'
        )
      ).toEqual(1);
    });

    test('YAML file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.yaml';
      const pathToAfterFile = '__fixtures__/after_complex.yaml';
      expect(makeDiffSet(genDiff(pathToBeforeFile, pathToAfterFile, format))).toEqual(complexDiffSet);
    });

    test('YAML file changed value test (2 recordes must be beside)', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.yaml';
      const pathToAfterFile = '__fixtures__/after_complex.yaml';
      expect(
        getDistBetweenKeys(
          genDiff(pathToBeforeFile, pathToAfterFile, format),
          '      + baz: bars',
          '      - baz: bas'
        )
      ).toEqual(1);
    });

    test('INI file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.ini';
      const pathToAfterFile = '__fixtures__/after_complex.ini';
      expect(makeDiffSet(genDiff(pathToBeforeFile, pathToAfterFile, format))).toEqual(complexDiffSet);
    });

    test('INI file changed value test (2 recordes must be beside)', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.ini';
      const pathToAfterFile = '__fixtures__/after_complex.ini';
      expect(
        getDistBetweenKeys(
          genDiff(pathToBeforeFile, pathToAfterFile, format),
          '      + baz: bars',
          '      - baz: bas'
        )
      ).toEqual(1);
    });
  });

  describe('Plain output format tests', () => {
    let plainDiffFile;
    let plainDiffSet;
    let format;

    beforeAll(() => {
      plainDiffFile = fs.readFileSync('__fixtures__/plain_diff.txt', 'utf8');
      plainDiffSet = makeDiffSet(plainDiffFile);
      format = 'plain';
    });

    test('JSON file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.json';
      const pathToAfterFile = '__fixtures__/after_complex.json';
      expect(makeDiffSet(genDiff(pathToBeforeFile, pathToAfterFile, format))).toEqual(plainDiffSet);
    });

    test('YAML file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.yaml';
      const pathToAfterFile = '__fixtures__/after_complex.yaml';
      expect(makeDiffSet(genDiff(pathToBeforeFile, pathToAfterFile, format))).toEqual(plainDiffSet);
    });

    test('INI file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.ini';
      const pathToAfterFile = '__fixtures__/after_complex.ini';
      expect(makeDiffSet(genDiff(pathToBeforeFile, pathToAfterFile, format))).toEqual(plainDiffSet);
    });
  });
});