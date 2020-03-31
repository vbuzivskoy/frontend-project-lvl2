import _ from 'lodash';

const stringifyValue = (value) => {
  return _.isObject(value) ? '[complex value]' : `'${value}'`;
};

const plainFormatter = (diff) => {
  const iter = (previousFullConfigKey, configValue) => {
    if (_.isArray(configValue)) {
      const stringifiedDiffRecords = configValue
        .reduce((configDiffAccum, node) => {
          const { key, operator, value, valueBefore, valueAfter } = node;
          const currentFullConfigKey = `${previousFullConfigKey}${key}`;
          let currentStringifiedDiffRecords;
          if (operator === 'equal') {
            currentStringifiedDiffRecords = iter(`${currentFullConfigKey}.`, value);
          } else if (operator === 'change') {
            const stringifiedValueBefore = stringifyValue(valueBefore);
            const stringifiedValueAfter = stringifyValue(valueAfter);
            currentStringifiedDiffRecords =
              [`Property '${currentFullConfigKey}' was changed from ${stringifiedValueBefore} to ${stringifiedValueAfter}`];
          } else if (operator === 'remove') {
            currentStringifiedDiffRecords =
              [`Property '${currentFullConfigKey}' was deleted`];
          } else {
            const stringifiedValue = stringifyValue(value);
            currentStringifiedDiffRecords =
              [`Property '${currentFullConfigKey}' was added with value: ${stringifiedValue}`];
          }
          return [
            ...configDiffAccum,
            ...currentStringifiedDiffRecords
          ];
        }, []);
      return stringifiedDiffRecords;
    }
    return [];
  };
  return iter('', diff).join('\n');
};

export default plainFormatter;