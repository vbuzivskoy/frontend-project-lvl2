import _ from 'lodash';
import parser from './utils/parser'

const genDiff = (pathToBeforeFile, pathToAfterFile) => {
  const before = parser(pathToBeforeFile);
  const after = parser(pathToAfterFile);
  const keys = _.uniq(_.concat(Object.keys(before), Object.keys(after)));

  const result = keys.reduce((diffAcc, key) => {
    if (_.has(before, key)) {
      if (_.has(after, key)) {
        if (before[key] === after[key]) {
          return [...diffAcc, `    ${key}: ${before[key]}`];
        }
        return [
          ...diffAcc,
          `  - ${key}: ${before[key]}`,
          `  + ${key}: ${after[key]}`
        ];
      }
      return [...diffAcc, `  - ${key}: ${before[key]}`];
    }
    return [...diffAcc, `  + ${key}: ${after[key]}`];
  }, []);

  return `{\n${result.join('\n')}\n}`;
};


export default genDiff;