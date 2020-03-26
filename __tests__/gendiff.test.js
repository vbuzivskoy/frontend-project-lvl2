import path from 'path';
import fs from 'fs';
import genDiff from '../src';

describe('gendiff tests', () => {
  let getFixturePath;
  let readFixture;

  beforeAll(() => {
    getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
    readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  });

  describe('Complex output format tests', () => {
    let complexDiffFile;
    let format;

    beforeAll(() => {
      complexDiffFile = readFixture('complex_diff.txt');
      format = 'complex';
    });

    test('JSON file content test', () => {
      const pathToBeforeFile = getFixturePath('before_complex.json');
      const pathToAfterFile = getFixturePath('after_complex.json');
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(complexDiffFile);
    });

    test('YAML file content test', () => {
      const pathToBeforeFile = getFixturePath('before_complex.yaml');
      const pathToAfterFile = getFixturePath('after_complex.yaml');
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(complexDiffFile);
    });

    test('INI file content test', () => {
      const pathToBeforeFile = getFixturePath('before_complex.ini');
      const pathToAfterFile = getFixturePath('after_complex.ini');
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(complexDiffFile);
    });
  });

  describe('Plain output format tests', () => {
    let plainDiffFile;
    let format;

    beforeAll(() => {
      plainDiffFile = readFixture('plain_diff.txt');
      format = 'plain';
    });

    test('JSON file content test', () => {
      const pathToBeforeFile = getFixturePath('before_complex.json');
      const pathToAfterFile = getFixturePath('after_complex.json');
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(plainDiffFile);
    });

    test('YAML file content test', () => {
      const pathToBeforeFile = getFixturePath('before_complex.yaml');
      const pathToAfterFile = getFixturePath('after_complex.yaml');
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(plainDiffFile);
    });

    test('INI file content test', () => {
      const pathToBeforeFile = getFixturePath('before_complex.ini');
      const pathToAfterFile = getFixturePath('after_complex.ini');
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(plainDiffFile);
    });
  });

  describe('JSON output format tests', () => {
    let jsonDiffFile;
    let format;

    beforeAll(() => {
      jsonDiffFile = readFixture('diff.json');
      format = 'json';
    });

    test('JSON file content test', () => {
      const pathToBeforeFile = getFixturePath('before_complex.json');
      const pathToAfterFile = getFixturePath('after_complex.json');
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(jsonDiffFile);
    });

    test('YAML file content test', () => {
      const pathToBeforeFile = getFixturePath('before_complex.yaml');
      const pathToAfterFile = getFixturePath('after_complex.yaml');
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(jsonDiffFile);
    });

    test('INI file content test', () => {
      const pathToBeforeFile = getFixturePath('before_complex.ini');
      const pathToAfterFile = getFixturePath('after_complex.ini');
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(jsonDiffFile);
    });
  });
});