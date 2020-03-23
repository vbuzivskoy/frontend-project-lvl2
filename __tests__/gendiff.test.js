import fs from 'fs';
import genDiff from '../src';

describe('gendiff tests', () => {
  let getDistBetweenKeys;

  beforeAll(() => {
    getDistBetweenKeys = (rawDiff, key1diff, key2diff) => {
      const splittedDiff = rawDiff.split('\n');
      const key1Index = splittedDiff.indexOf(key1diff);
      const key2Index = splittedDiff.indexOf(key2diff);
      return Math.abs(key1Index - key2Index);
    };
  });

  describe('Complex output format tests', () => {
    let complexDiffFile;
    let format;

    beforeAll(() => {
      complexDiffFile = fs.readFileSync('__fixtures__/complex_diff.txt', 'utf8');
      format = 'complex';
    });

    test('JSON file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.json';
      const pathToAfterFile = '__fixtures__/after_complex.json';
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(complexDiffFile);
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
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(complexDiffFile);
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
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(complexDiffFile);
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
    let format;

    beforeAll(() => {
      plainDiffFile = fs.readFileSync('__fixtures__/plain_diff.txt', 'utf8');
      format = 'plain';
    });

    test('JSON file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.json';
      const pathToAfterFile = '__fixtures__/after_complex.json';
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(plainDiffFile);
    });

    test('YAML file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.yaml';
      const pathToAfterFile = '__fixtures__/after_complex.yaml';
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(plainDiffFile);
    });

    test('INI file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.ini';
      const pathToAfterFile = '__fixtures__/after_complex.ini';
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(plainDiffFile);
    });
  });

  describe('JSON output format tests', () => {
    let jsonDiffFile;
    let format;

    beforeAll(() => {
      jsonDiffFile = fs.readFileSync('__fixtures__/diff.json', 'utf8');
      format = 'json';
    });

    test('JSON file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.json';
      const pathToAfterFile = '__fixtures__/after_complex.json';
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(jsonDiffFile);
    });

    test('YAML file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.yaml';
      const pathToAfterFile = '__fixtures__/after_complex.yaml';
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(jsonDiffFile);
    });

    test('INI file content test', () => {
      const pathToBeforeFile = '__fixtures__/before_complex.ini';
      const pathToAfterFile = '__fixtures__/after_complex.ini';
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(jsonDiffFile);
    });
  });
});