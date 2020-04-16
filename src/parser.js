import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const iniParser = (data) => {
  const parsedData = ini.parse(data);
  const iter = (value) => {
    if (_.isObject(value)) {
      const keys = Object.keys(value);
      return keys.reduce((acc, key) => ({ ...acc, [key]: iter(value[key]) }), {});
    }
    if (_.isString(value)) {
      const number = Number(value);
      return Number.isNaN(number) ? value : number;
    }
    return value;
  };
  return iter(parsedData);
};

const getParser = (dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse;
    case 'yaml':
      return yaml.safeLoad;
    case 'ini':
      return iniParser;
    default:
      throw new Error(`No parser for '${dataType}' file type!`);
  }
};

const parseData = (data, dataType) => {
  const parse = getParser(dataType);
  return parse(data);
};

export default parseData;
