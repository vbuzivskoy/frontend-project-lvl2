import path from 'path';
import fs from 'fs';
import genDiff from '../src';
//import { stringify } from 'querystring';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const makeJSONOutputTest = (pathToBeforeFile, pathToAfterFile, format) => {
  const stringifiedJSON = JSON.parse(genDiff(pathToBeforeFile, pathToAfterFile, format));
  return stringifiedJSON;
};
const parseJSONfixture = (filename) => JSON.parse(readFixture(filename));

describe('gendiff tests', () => {
  const testData = [
    ['JSON', 'complex', genDiff, 'before_complex.json', 'after_complex.json', 'complex_diff.txt', readFixture],
    ['YAML', 'complex', genDiff, 'before_complex.yaml', 'after_complex.yaml', 'complex_diff.txt', readFixture],
    ['INI', 'complex', genDiff, 'before_complex.ini', 'after_complex.ini', 'complex_diff.txt', readFixture],
    ['JSON', 'plain', genDiff, 'before_complex.json', 'after_complex.json', 'plain_diff.txt', readFixture],
    ['YAML', 'plain', genDiff, 'before_complex.yaml', 'after_complex.yaml', 'plain_diff.txt', readFixture],
    ['INI', 'plain', genDiff, 'before_complex.ini', 'after_complex.ini', 'plain_diff.txt', readFixture],
    ['JSON', 'json', makeJSONOutputTest, 'before_complex.json', 'after_complex.json', 'diff.json', parseJSONfixture],
    ['YAML', 'json', makeJSONOutputTest, 'before_complex.yaml', 'after_complex.yaml', 'diff.json', parseJSONfixture],
    ['INI', 'json', makeJSONOutputTest, 'before_complex.ini', 'after_complex.ini', 'diff.json', parseJSONfixture]
  ];

  test.each(testData)(
    '%s file content test with %s output format type',
    (filesFormat, ouputFormatType, makeTest, beforeFileName, afterFileName, expectedDiffFileName, getExpectedDiff) => {
      const pathToBeforeFile = getFixturePath(beforeFileName);
      const pathToAfterFile = getFixturePath(afterFileName);
      const expectedDiff = getExpectedDiff(expectedDiffFileName);
      expect(makeTest(pathToBeforeFile, pathToAfterFile, ouputFormatType)).toEqual(expectedDiff);
  });
});