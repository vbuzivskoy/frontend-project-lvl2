import _ from 'lodash';
import getSortedEntities from '../sortentities';

const getDiffSign = (diffSign) => {
  let sign;
  switch (diffSign) {
    case '+':
      sign = '+';
      break;
    case '-':
      sign = '-';
      break;
    case '=':
      sign = '';
      break;
    default:
      sign = null;
  }
  return sign;
};

const stringifyValue = (deepness, indent, value) => {
  const iter = (currentDeepness, currentValue) => {
    if (_.isObject(currentValue)) {
      const configRecords = getSortedEntities(currentValue);
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

const complexFormatter = (diff) => {
  const indent = '  ';
  const iter = (deepness, configValue) => {
    if (_.isObject(configValue)) {
      const configRecords = getSortedEntities(configValue);
      const stringifiedDiffRecords = configRecords
        .reduce((configRecordAccum, [currentConfigKey, currentConfigRecordDiffs]) => {
          const currentConfigRecordDiffsEntities = getSortedEntities(currentConfigRecordDiffs);
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
        ...stringifiedDiffRecords,
        `${indent.repeat(deepness)}}`
      ]
    }
    return [configValue];
  };
  return iter(0, diff).join('\n');
};

export default complexFormatter;