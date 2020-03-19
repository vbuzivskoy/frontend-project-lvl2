import _ from 'lodash';
import parser from './utils/parser'

const genDiff = (pathToBeforeFile, pathToAfterFile) => {
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
  return iter(before, after);
};

const getDiffSign = (diffSign) => {
  let sign;
  switch (diffSign) {
    case '+':
      sign = '+';
      break;
    case '-':
      sign = '-';
      break;
    default:
      sign = '';
  }
  return sign;
};

const stringifyValue = (deepness, indent, value) => {
  const iter = (currentDeepness, currentValue) => {
    if (_.isObject(currentValue)) {
      const configRecords = Object.entries(currentValue);
      const stringifiedConfigRecords = configRecords
        .reduce((configRecordsAccum, [currentConfigKey, currentConfigValue]) => {
          const stringifiedCurrentConfigValue = iter(currentDeepness + 2, currentConfigValue);
          return [
            ...configRecordsAccum,
            `${indent.repeat(currentDeepness + 1)}  ${currentConfigKey}: ${_.head(stringifiedCurrentConfigValue)}`,
            ...stringifiedCurrentConfigValue.slice(1)
          ];
        }, []);
      return [
        '{',
        ...stringifiedConfigRecords,
        `${indent.repeat(currentDeepness)}}`
      ];
    }
    return [currentValue];
  }
  return iter(deepness, value);
};

const showDiff = (diff, indent = '  ') => {
  const iter = (deepness, configValue) => {
    if (_.isObject(configValue)) {
      const configRecords = Object.entries(configValue);
      const stringifiedConfigRecords = configRecords
        .reduce((configRecordAccum, [currentConfigKey, currentConfigRecordDiffs]) => {
          const currentConfigRecordDiffsEntities = Object.entries(currentConfigRecordDiffs);
          const stringifiedCurrentConfigRecordDiffs = currentConfigRecordDiffsEntities
            .reduce((configDiffAccum, [diffSign, currentConfigValue]) => {
              const sign = getDiffSign(diffSign);
              let stringifiedCurrentConfigValue;
              if (diffSign === '=') {
                stringifiedCurrentConfigValue = iter(deepness + 2, currentConfigValue);
              } else {
                stringifiedCurrentConfigValue = stringifyValue(deepness + 2, indent, currentConfigValue);
              }
              return [
                ...configDiffAccum,
                `${indent.repeat(deepness + 1)}${sign.padEnd(2)}${currentConfigKey}: ${_.head(stringifiedCurrentConfigValue)}`,
                ...stringifiedCurrentConfigValue.slice(1)
              ];
            }, []);
          return [
            ...configRecordAccum,
            ...stringifiedCurrentConfigRecordDiffs
          ];
        }, []);
      return [
        '{',
        ...stringifiedConfigRecords,
        `${indent.repeat(deepness)}}`
      ]
    }
    return [configValue];
  };
  return iter(0, diff).join('\n');
};

export { genDiff, showDiff };
