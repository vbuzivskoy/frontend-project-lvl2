import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff tests', () => {
  const inputFilesEntensions = ['json', 'yaml', 'ini'];

  test.each(inputFilesEntensions)(
    '%s file content tests',
    (inputFilesEntension) => {
      const firstConfigFilePath = getFixturePath(`firstConfig.${inputFilesEntension}`);
      const secondConfigFilePath = getFixturePath(`secondConfig.${inputFilesEntension}`);

      const recievedComplexDiff = genDiff(firstConfigFilePath, secondConfigFilePath, 'complex');
      const expectedComplexDiff = readFixture(`complex_diff.txt`);
      expect(recievedComplexDiff).toEqual(expectedComplexDiff);

      const recievedPlainxDiff = genDiff(firstConfigFilePath, secondConfigFilePath, 'plain');
      const expectedPlainDiff = readFixture(`plain_diff.txt`);
      expect(recievedPlainxDiff).toEqual(expectedPlainDiff);

      const recievedJSONDiff = genDiff(firstConfigFilePath, secondConfigFilePath, 'json');
      const parsedRecievedJSONDiff = JSON.parse(recievedJSONDiff);
      const expectedJSONDiff = readFixture(`json_diff.txt`);
      const parsedExpectedJSONDiff = JSON.parse(expectedJSONDiff);
      expect(parsedRecievedJSONDiff).toEqual(parsedExpectedJSONDiff);
  });
});