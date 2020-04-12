import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseConfig from './parser';
import formatDiff from './formatters';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFileExtension = (filePath) => path.extname(filePath);
const getParsedFile = (filePath) => {
  const fileContent = readFile(filePath);
  const fileExtension = getFileExtension(filePath);
  return parseConfig(fileContent, fileExtension);
};

const createDiffTree = (configBefore, configAfter) => {
  const iter = (valueBefore, valueAfter) => {
    const keys = _.union(Object.keys(valueBefore), Object.keys(valueAfter)).sort();
    const nodes = keys.map((key) => {
      if (_.isObject(valueBefore[key]) && _.isObject(valueAfter[key])) {
        return { key, operator: 'composite', value: iter(valueBefore[key], valueAfter[key]) };
      }
      if (valueBefore[key] === valueAfter[key] ) {
        return {key, operator: 'equal', value: valueBefore[key] };
      }
      if (_.has(valueBefore, key) && _.has(valueAfter, key)) {
        return {
          key,
          operator: 'change',
          valueBefore: valueBefore[key],
          valueAfter: valueAfter[key]
        };
      }
      if (_.has(valueBefore, key)) {
        return { key, operator: 'remove', value: valueBefore[key] };
      }
      return { key, operator: 'add', value: valueAfter[key] };
    });
    return nodes;
  };
  return iter(configBefore, configAfter);
};

const genDiff = (beforeFilePath, afterFilePath, formatType) => {
  const configBefore = getParsedFile(beforeFilePath);
  const configAfter = getParsedFile(afterFilePath);
  const diffTree = createDiffTree(configBefore, configAfter);
  return formatDiff(diffTree, formatType);
};

export default genDiff;
