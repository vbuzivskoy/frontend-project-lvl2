import path from 'path';
import fs from 'fs';
import genDiff from '../src';

describe('gendiff tests', () => {
  let getFixturePath;
  let readFixture;
  let expectedDiffFile;
  const outputFormatFiles = [
    ['complex', 'complex_diff.txt'],
    ['plain', 'plain_diff.txt'],
    ['json', 'diff.json']
  ];
  const inputFilesTable = [
    ['JSON', 'before_complex.json', 'after_complex.json'],
    ['YAML', 'before_complex.yaml', 'after_complex.yaml'],
    ['INI', 'before_complex.ini', 'after_complex.ini']
  ];

  beforeAll(() => {
    getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
    readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  });

  outputFormatFiles.forEach(([format, expectedDiffFileName]) => {
    describe(`${format} output format tests`, () => {
        beforeAll(() => {
          expectedDiffFile = readFixture(expectedDiffFileName);
        });
    
        test.each(inputFilesTable)('%s file content test', (filesFormat, beforeFileName, afterFileName) => {
          const pathToBeforeFile = getFixturePath(beforeFileName);
          const pathToAfterFile = getFixturePath(afterFileName);
          expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(expectedDiffFile);
        });
      });
  });
});