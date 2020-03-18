import fs from 'fs';
import { genDiff, showDiff } from '../src';

describe('showdiff tests', () => {
  test('showdiff test with plain config file', () => {
    const plainDiffJSONFile = fs.readFileSync('__fixtures__/plain_diff.json', 'utf-8');
    const plainDiffTXTFile = fs.readFileSync('__fixtures__/plain_diff.txt', 'utf-8');
    expect(showDiff(JSON.parse(plainDiffJSONFile))).toEqual(plainDiffTXTFile);
  });

  test('showdiff test with complex config file', () => {
    const complexDiffJSONFile = fs.readFileSync('__fixtures__/complex_diff.json', 'utf-8');
    const complexDiffTXTFile = fs.readFileSync('__fixtures__/complex_diff.txt', 'utf-8');
    expect(showDiff(JSON.parse(complexDiffJSONFile))).toEqual(complexDiffTXTFile);
  });
});

describe('gendiff tests', () => {
  let plainDiffFile;
  let complexDiffFile;
  let plainDiffSet;
  let complexDiffSet;
  let makeDiffSet;
  let getDistBetweenKeys;

  beforeAll(() => {
    plainDiffFile = fs.readFileSync('__fixtures__/plain_diff.txt', 'utf8');
    complexDiffFile = fs.readFileSync('__fixtures__/complex_diff.txt', 'utf8');
    makeDiffSet = (rawDiff) => new Set(rawDiff.split('\n'));
    getDistBetweenKeys = (rawDiff, key1diff, key2diff) => {
      const splittedDiff = rawDiff.split('\n');
      const key1Index = splittedDiff.indexOf(key1diff);
      const key2Index = splittedDiff.indexOf(key2diff);
      return Math.abs(key1Index - key2Index);
    };

    plainDiffSet = makeDiffSet(plainDiffFile);
    complexDiffSet = makeDiffSet(complexDiffFile);
  });

  test('Plain JSON file content test', () => {
    const pathToBeforeFile = '__fixtures__/before_plain.json';
    const pathToAfterFile = '__fixtures__/after_plain.json';
    expect(makeDiffSet(showDiff(genDiff(pathToBeforeFile, pathToAfterFile)))).toEqual(plainDiffSet);
  });

  test('Plain JSON file changed value test (2 recordes must be beside)', () => {
    const pathToBeforeFile = '__fixtures__/before_plain.json';
    const pathToAfterFile = '__fixtures__/after_plain.json';
    expect(
      getDistBetweenKeys(
        showDiff(genDiff(pathToBeforeFile, pathToAfterFile)),
        '  + timeout: 20',
        '  - timeout: 50'
      )
    ).toEqual(1);
  });

  test('Plain YAML file content test', () => {
    const pathToBeforeFile = '__fixtures__/before_plain.yaml';
    const pathToAfterFile = '__fixtures__/after_plain.yaml';
    expect(makeDiffSet(showDiff(genDiff(pathToBeforeFile, pathToAfterFile)))).toEqual(plainDiffSet);
  });

  test('Plain YAML file changed value test (2 recordes must be beside)', () => {
    const pathToBeforeFile = '__fixtures__/before_plain.yaml';
    const pathToAfterFile = '__fixtures__/after_plain.yaml';
    expect(
      getDistBetweenKeys(
        showDiff(genDiff(pathToBeforeFile, pathToAfterFile)),
        '  + timeout: 20',
        '  - timeout: 50'
      )
    ).toEqual(1);
  });

  test('Plain INI file content test', () => {
    const pathToBeforeFile = '__fixtures__/before_plain.ini';
    const pathToAfterFile = '__fixtures__/after_plain.ini';
    expect(makeDiffSet(showDiff(genDiff(pathToBeforeFile, pathToAfterFile)))).toEqual(plainDiffSet);
  });

  test('Plain INI file changed value test (2 recordes must be beside)', () => {
    const pathToBeforeFile = '__fixtures__/before_plain.ini';
    const pathToAfterFile = '__fixtures__/after_plain.ini';
    expect(
      getDistBetweenKeys(
        showDiff(genDiff(pathToBeforeFile, pathToAfterFile)),
        '  + timeout: 20',
        '  - timeout: 50'
      )
    ).toEqual(1);
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
