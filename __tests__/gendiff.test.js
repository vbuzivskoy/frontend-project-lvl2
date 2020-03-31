import path from 'path';
import fs from 'fs';
import genDiff from '../src';

describe('gendiff tests', () => {
  let getFixturePath;
  let readFixture;
  let expectedDiffFile;
  let format;
  const inputFilesTable = [
    ['JSON', 'before_complex.json', 'after_complex.json'],
    ['YAML', 'before_complex.yaml', 'after_complex.yaml'],
    ['INI', 'before_complex.ini', 'after_complex.ini']
  ];

  beforeAll(() => {
    getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
    readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  });

  describe(`Complex output format tests`, () => {
    beforeAll(() => {
      format = 'complex';
      expectedDiffFile = readFixture('complex_diff.txt');
    });

    test.each(inputFilesTable)('%s file content test', (filesFormat, beforeFileName, afterFileName) => {
      const pathToBeforeFile = getFixturePath(beforeFileName);
      const pathToAfterFile = getFixturePath(afterFileName);
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(expectedDiffFile);
    });
  });

  describe(`Plain output format tests`, () => {
    beforeAll(() => {
      format = 'plain';
      expectedDiffFile = readFixture('plain_diff.txt');
    });

    test.each(inputFilesTable)('%s file content test', (filesFormat, beforeFileName, afterFileName) => {
      const pathToBeforeFile = getFixturePath(beforeFileName);
      const pathToAfterFile = getFixturePath(afterFileName);
      expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(expectedDiffFile);
    });
  });

  describe(`JSON output format tests`, () => {
    beforeAll(() => {
      format = 'json';
      expectedDiffFile = readFixture('diff.json');
    });

    test.each(inputFilesTable)('%s file content test', (filesFormat, beforeFileName, afterFileName) => {
      const pathToBeforeFile = getFixturePath(beforeFileName);
      const pathToAfterFile = getFixturePath(afterFileName);
      expect(JSON.parse(genDiff(pathToBeforeFile, pathToAfterFile, format))).toEqual(JSON.parse(expectedDiffFile));
    });
  });
});