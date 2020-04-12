import _ from 'lodash';
import getSortedEntities from '../sortentities';

const getDiffSign = (operation) => {
  switch (operation) {
    case 'add':
      return '+';
    case 'remove':
      return '-';
    case 'equal':
      return '';
    case 'composite':
      return '';
    default:
      throw new Error(`No sign for operation '${operation}'!`);
  }
};

const stringifyObjectValue = (deepness, indent, value) => {
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
    if (_.isArray(configValue)) {
      const stringifiedDiffRecords = configValue
        .reduce((configDiffAccum, node) => {
          const { key, operator, value, valueBefore, valueAfter } = node;
          if (operator === 'change') {
            const stringifiedValueBefore = iter(deepness + 2, valueBefore);
            const stringifiedValueAfter = iter(deepness + 2, valueAfter);
            return [
              ...configDiffAccum,
              `${indent.repeat(deepness + 1)}- ${key}: ${_.head(stringifiedValueBefore)}`,
              ...stringifiedValueBefore.slice(1),
              `${indent.repeat(deepness + 1)}+ ${key}: ${_.head(stringifiedValueAfter)}`,
              ...stringifiedValueAfter.slice(1)
            ];
          }
          const stringifiedValue = iter(deepness + 2, value);
          const sign = getDiffSign(operator);
          return [
            ...configDiffAccum,
            `${indent.repeat(deepness + 1)}${sign.padEnd(2)}${key}: ${_.head(stringifiedValue)}`,
            ...stringifiedValue.slice(1)
          ];
        }, []);
      return [
        '{',
        ...stringifiedDiffRecords,
        `${indent.repeat(deepness)}}`
      ]
    }
    if (_.isObject) {
      return stringifyObjectValue(deepness, indent, configValue);
    }
    return [configValue];
  };
  return iter(0, diff).join('\n');
};

export default complexFormatter;