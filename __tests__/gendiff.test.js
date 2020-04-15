import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff tests', () => {
  const inputFilesEntensions = ['json', 'yaml', 'ini'];
  let expectedComplexDiff;
  let expectedPlainDiff;
  let expectedJSONDiff;
  let parsedExpectedJSONDiff;

  beforeAll(() => {
    expectedComplexDiff = readFixture('complex_diff.txt');
    expectedPlainDiff = readFixture('plain_diff.txt');
    expectedJSONDiff = readFixture('diff.json');
    parsedExpectedJSONDiff = JSON.parse(expectedJSONDiff);
  });

  test.each(inputFilesEntensions)(
    '%s file content tests',
    (inputFilesEntension) => {
      const firstConfigFilePath = getFixturePath(`firstConfig.${inputFilesEntension}`);
      const secondConfigFilePath = getFixturePath(`secondConfig.${inputFilesEntension}`);

      const recievedComplexDiff = genDiff(firstConfigFilePath, secondConfigFilePath, 'complex');
      expect(recievedComplexDiff).toEqual(expectedComplexDiff);

      const recievedPlainxDiff = genDiff(firstConfigFilePath, secondConfigFilePath, 'plain');
      expect(recievedPlainxDiff).toEqual(expectedPlainDiff);

      const recievedJSONDiff = genDiff(firstConfigFilePath, secondConfigFilePath, 'json');
      const parsedRecievedJSONDiff = JSON.parse(recievedJSONDiff);
      expect(parsedRecievedJSONDiff).toEqual(parsedExpectedJSONDiff);
    },
  );
});
