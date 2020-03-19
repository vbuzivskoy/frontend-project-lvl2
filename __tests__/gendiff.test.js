import fs from 'fs';
import { genDiff, showDiff } from '../src';

describe('gendiff tests', () => {
  let complexDiffFile;
  let complexDiffSet;
  let makeDiffSet;
  let getDistBetweenKeys;

  beforeAll(() => {
    complexDiffFile = fs.readFileSync('__fixtures__/complex_diff.txt', 'utf8');
    makeDiffSet = (rawDiff) => new Set(rawDiff.split('\n'));
    getDistBetweenKeys = (rawDiff, key1diff, key2diff) => {
      const splittedDiff = rawDiff.split('\n');
      const key1Index = splittedDiff.indexOf(key1diff);
      const key2Index = splittedDiff.indexOf(key2diff);
      return Math.abs(key1Index - key2Index);
    };

    complexDiffSet = makeDiffSet(complexDiffFile);
  });

  test('Complex JSON file content test', () => {
    const pathToBeforeFile = '__fixtures__/before_complex.json';
    const pathToAfterFile = '__fixtures__/after_complex.json';
    expect(makeDiffSet(showDiff(genDiff(pathToBeforeFile, pathToAfterFile)))).toEqual(complexDiffSet);
  });

  test('Complex JSON file changed value test (2 recordes must be beside)', () => {
    const pathToBeforeFile = '__fixtures__/before_complex.json';
    const pathToAfterFile = '__fixtures__/after_complex.json';
    expect(
      getDistBetweenKeys(
        showDiff(genDiff(pathToBeforeFile, pathToAfterFile)),
        '      + baz: bars',
        '      - baz: bas'
      )
    ).toEqual(1);
  });

  test('Complex YAML file content test', () => {
    const pathToBeforeFile = '__fixtures__/before_complex.yaml';
    const pathToAfterFile = '__fixtures__/after_complex.yaml';
    expect(makeDiffSet(showDiff(genDiff(pathToBeforeFile, pathToAfterFile)))).toEqual(complexDiffSet);
  });

  test('Complex YAML file changed value test (2 recordes must be beside)', () => {
    const pathToBeforeFile = '__fixtures__/before_complex.yaml';
    const pathToAfterFile = '__fixtures__/after_complex.yaml';
    expect(
      getDistBetweenKeys(
        showDiff(genDiff(pathToBeforeFile, pathToAfterFile)),
        '      + baz: bars',
        '      - baz: bas'
      )
    ).toEqual(1);
  });

  test('Complex INI file content test', () => {
    const pathToBeforeFile = '__fixtures__/before_complex.ini';
    const pathToAfterFile = '__fixtures__/after_complex.ini';
    expect(makeDiffSet(showDiff(genDiff(pathToBeforeFile, pathToAfterFile)))).toEqual(complexDiffSet);
  });

  test('Complex INI file changed value test (2 recordes must be beside)', () => {
    const pathToBeforeFile = '__fixtures__/before_complex.ini';
    const pathToAfterFile = '__fixtures__/after_complex.ini';
    expect(
      getDistBetweenKeys(
        showDiff(genDiff(pathToBeforeFile, pathToAfterFile)),
        '      + baz: bars',
        '      - baz: bas'
      )
    ).toEqual(1);
  });
});
