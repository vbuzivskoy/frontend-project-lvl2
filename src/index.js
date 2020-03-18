import _ from 'lodash';
import parser from './utils/parser'

const genDiff = (pathToBeforeFile, pathToAfterFile) => {
  const before = parser(pathToBeforeFile);
  const after = parser(pathToAfterFile);
  const keys = _.uniq(_.concat(Object.keys(before), Object.keys(after)));

  return keys.reduce((diffAcc, key) => {
    if (_.has(before, key)) {
      if (_.has(after, key)) {
        if (before[key] === after[key]) {
          return {
            ...diffAcc,
            [`  ${key}`]: before[key],
          };
        }
        return {
          ...diffAcc,
          [`- ${key}`]: before[key],
          [`+ ${key}`]: after[key],
        };
      }
      return {
        ...diffAcc,
        [`- ${key}`]: before[key],
      };
    }
    return {
      ...diffAcc,
      [`+ ${key}`]: after[key],
    };
  }, {});
};

const showDiff = (diff) => {
  const reduce = (spacesAccum, configValue) => {
    const currentSpaceAccum = `  ${spacesAccum}`;
    if (_.isObject(configValue)) {
      const entries = Object.entries(configValue);
      const stringifiedEntries = entries.reduce((entriesAccum, [key, value]) => {
        const stringifiedValue = reduce(`  ${currentSpaceAccum}`, value);
        return [
          ...entriesAccum,
          `${currentSpaceAccum}${key}: ${_.head(stringifiedValue)}`,
          ...stringifiedValue.slice(1)
        ];
      }, []);
      return ['{', ...stringifiedEntries, `${spacesAccum}}`];
    }
    return [configValue];
  };
  return reduce('', diff).join('\n');
};

export { genDiff, showDiff };