import fs from 'fs';
import genDiff from '../src';

describe('gendiff tests with plain config files', () => {
  let plainDiffFile;
  let diffSet;
  let makeDiffSet;
  let getDistBetweenKeys;

  beforeAll(() => {
    plainDiffFile = fs.readFileSync('__tests__/fixtures/plain_diff.txt', 'utf8');
    makeDiffSet = (rawDiff) => new Set(rawDiff.split('\n'));
    getDistBetweenKeys = (rawDiff, key1diff, key2diff) => {
      const splittedDiff = rawDiff.split('\n');
      const plusTimeoutKeyIndex = splittedDiff.indexOf(key1diff);
      const minusTimeoutKeyIndex = splittedDiff.indexOf(key2diff);
      return Math.abs(plusTimeoutKeyIndex - minusTimeoutKeyIndex);
    };
    
    diffSet = makeDiffSet(plainDiffFile);
  });

  test('Plain JSON file test', () => {
    const pathToBeforeFile = '__tests__/fixtures/before_plain.json';
    const pathToAfterFile = '__tests__/fixtures/after_plain.json';
    expect(makeDiffSet(genDiff(pathToBeforeFile, pathToAfterFile))).toEqual(diffSet);
    expect(
      getDistBetweenKeys(
        genDiff(pathToBeforeFile, pathToAfterFile),
        '  + timeout: 20',
        '  - timeout: 50'
      )
    ).toEqual(1);
  });

  test('Plain YAML file test', () => {
    const pathToBeforeFile = '__tests__/fixtures/before_plain.yaml';
    const pathToAfterFile = '__tests__/fixtures/after_plain.yaml';
    expect(makeDiffSet(genDiff(pathToBeforeFile, pathToAfterFile))).toEqual(diffSet);
    expect(
      getDistBetweenKeys(
        genDiff(pathToBeforeFile, pathToAfterFile),
        '  + timeout: 20',
        '  - timeout: 50'
      )
    ).toEqual(1);
  });

  test('Plain INI file test', () => {
    const pathToBeforeFile = '__tests__/fixtures/before_plain.ini';
    const pathToAfterFile = '__tests__/fixtures/after_plain.ini';
    expect(makeDiffSet(genDiff(pathToBeforeFile, pathToAfterFile))).toEqual(diffSet);
    expect(
      getDistBetweenKeys(
        genDiff(pathToBeforeFile, pathToAfterFile),
        '  + timeout: 20',
        '  - timeout: 50'
      )
    ).toEqual(1);
  });
});

describe('gendiff tests with complex config files', () => {
  
});