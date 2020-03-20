import _ from 'lodash';

const stringifyValue = (value) => {
  return _.isObject(value) ? '[complex value]' : `'${value}'`;
};

const plainFormatter = (diff) => {
  const iter = (previousFullConfigKey, configValue) => {
    if (_.isObject(configValue)) {
      const configRecords = Object.entries(configValue);
      const stringifiedDiffRecords = configRecords
        .reduce((configDiffAccum, [currentConfigKey, currentConfigRecordDiffs]) => {
          const currentFullConfigKey = `${previousFullConfigKey}${currentConfigKey}`;
          let currentStringifiedDiffRecords;
          if (_.has(currentConfigRecordDiffs, '=')) {
            currentStringifiedDiffRecords = iter(`${currentFullConfigKey}.`, currentConfigRecordDiffs['=']);
          } else if (_.has(currentConfigRecordDiffs, '-') && _.has(currentConfigRecordDiffs, '+')) {
            const stringifiedOldValue = stringifyValue(currentConfigRecordDiffs['-']);
            const stringifiedNewValue = stringifyValue(currentConfigRecordDiffs['+']);
            currentStringifiedDiffRecords =
              [`Property '${currentFullConfigKey}' was changed from ${stringifiedOldValue} to ${stringifiedNewValue}`];
          } else if (_.has(currentConfigRecordDiffs, '-')) {
            currentStringifiedDiffRecords =
              [`Property '${currentFullConfigKey}' was deleted`];
          } else {
            const stringifiedNewValue = stringifyValue(currentConfigRecordDiffs['+']);
            currentStringifiedDiffRecords =
              [`Property '${currentFullConfigKey}' was added with value: ${stringifiedNewValue}`];
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