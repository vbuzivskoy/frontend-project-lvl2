import _ from 'lodash';
import yaml from 'js-yaml'
import ini from 'ini';

const iniParser = (iniFileContent) => {
  const decodedIni = ini.parse(iniFileContent);
  const iter = (configValue) => {
    if (_.isObject(configValue)) {
      const keys = Object.keys(configValue);
      return keys.reduce((acc, key) => {
        return {...acc, [key]: iter(configValue[key])}
      }, {});
    }
    if (_.isString(configValue)) {
      const number = Number(configValue);
      return isNaN(number) ? configValue : number;
    }
    return configValue;
  };
  return iter(decodedIni);
};

const getParser = (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yaml':
      return yaml.safeLoad;
    case '.ini':
      return iniParser;
    default:
      throw new Error(`No parser for '${extension}' file type!`);
  }
};

const parseConfig = (config, extension) => {
  const parse = getParser(extension);
  return parse(config);
};

export default parseConfig;