import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parser';
import formatDiff from './formatters';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFileExtension = (filePath) => path.extname(filePath);
const getDataTypeFromExtension = (extension) => extension.slice(1).toLowerCase();
const getParsedFile = (filePath) => {
  const data = readFile(filePath);
  const fileExtension = getFileExtension(filePath);
  const dataType = getDataTypeFromExtension(fileExtension);
  return parseData(data, dataType);
};

const createDiff = (configBefore, configAfter) => {
  const iter = (valueBefore, valueAfter) => {
    const keys = _.union(Object.keys(valueBefore), Object.keys(valueAfter)).sort();
    const nodes = keys.map((key) => {
      if (!_.has(valueAfter, key)) {
        return { key, type: 'removed', value: valueBefore[key] };
      }
      if (!_.has(valueBefore, key)) {
        return { key, type: 'added', value: valueAfter[key] };
      }
      if (_.isObject(valueBefore[key]) && _.isObject(valueAfter[key])) {
        return { key, type: 'composite', children: iter(valueBefore[key], valueAfter[key]) };
      }
      if (valueBefore[key] === valueAfter[key]) {
        return { key, type: 'equal', value: valueBefore[key] };
      }
      return {
        key,
        type: 'changed',
        valueBefore: valueBefore[key],
        valueAfter: valueAfter[key],
      };
    });
    return nodes;
  };
  return iter(configBefore, configAfter);
};

const genDiff = (beforeFilePath, afterFilePath, formatType) => {
  const configBefore = getParsedFile(beforeFilePath);
  const configAfter = getParsedFile(afterFilePath);
  const diffData = createDiff(configBefore, configAfter);
  return formatDiff(diffData, formatType);
};

export default genDiff;
