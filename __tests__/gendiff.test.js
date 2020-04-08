import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const normalizeDiff = (diff, ouputFormatType) => (
  ouputFormatType === 'json' ? JSON.parse(diff) : diff
);

describe('gendiff tests', () => {
  const testData = [
    ['json', 'complex'],
    ['yaml', 'complex'],
    ['ini', 'complex'],
    ['json', 'plain'],
    ['yaml', 'plain'],
    ['ini', 'plain'],
    ['json', 'json'],
    ['yaml', 'json'],
    ['ini', 'json']
  ];

  test.each(testData)(
    '%s file content test with %s output format type',
    (filesFormat, ouputFormatType) => {
      const firstConfigFilePath = getFixturePath(`firstConfig.${filesFormat}`);
      const secondConfigFilePath = getFixturePath(`secondConfig.${filesFormat}`);
      const recievedDiff = genDiff(firstConfigFilePath, secondConfigFilePath, ouputFormatType);
      const recievedDiffToTest = normalizeDiff(recievedDiff, ouputFormatType);
      const expectedDiffFilename = `${ouputFormatType}_diff.txt`;
      const expectedDiff = readFixture(expectedDiffFilename);
      const expectedDiffToTest = normalizeDiff(expectedDiff, ouputFormatType);
      expect(recievedDiffToTest).toEqual(expectedDiffToTest);
  });
});