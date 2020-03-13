import _ from 'lodash';
import fs from 'fs';

const genDiff = (pathToBeforeFile, pathToAfterFile) => {
  const before = JSON.parse(fs.readFileSync(pathToBeforeFile));
  const after = JSON.parse(fs.readFileSync(pathToAfterFile));
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