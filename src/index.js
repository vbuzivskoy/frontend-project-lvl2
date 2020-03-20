import _ from 'lodash';
import parser from './utils/parser';
import getFormatter from './utils/formatter';

const genDiff = (pathToBeforeFile, pathToAfterFile, format) => {
  const formatter = getFormatter(format);
  const before = parser(pathToBeforeFile);
  const after = parser(pathToAfterFile);

  const iter = (valueBefore, valueAfter) => {
    const keys = _.uniq(_.concat(Object.keys(valueBefore), Object.keys(valueAfter)));
    return keys.reduce((diffAcc, key) => {
      if (_.has(valueBefore, key)) {
        if (_.has(valueAfter, key)) {
          if (_.isObject(valueBefore[key]) && _.isObject(valueAfter[key])) {
            return {
              ...diffAcc,
              [key]: {'=': iter(valueBefore[key], valueAfter[key])},
            }
          }
          if (valueBefore[key] === valueAfter[key] ) {
            return {
              ...diffAcc,
              [key]: { '=': valueBefore[key] },
            };
          }
          return {
            ...diffAcc,
            [key]: {
              '-': valueBefore[key],
              '+': valueAfter[key],
            }
          };
        }
        return {
          ...diffAcc,
          [key]: { '-': valueBefore[key] },
        };
      }
      return {
        ...diffAcc,
        [key]: { '+': valueAfter[key] },
      };
    }, {});
  };
  const diff = iter(before, after);
  return formatter(diff);
};

export default genDiff;
