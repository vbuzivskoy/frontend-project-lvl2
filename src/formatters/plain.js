import _ from 'lodash';

const stringifyValue = (value) => (
  _.isObject(value) ? '[complex value]' : `'${value}'`
);

const plainFormatter = (diff) => {
  const iter = (previousFullConfigKey, nodes) => {
    const stringifiedDiffRecords = nodes
      .filter(({ type }) => type !== 'equal')
      .map((node) => {
        const {
          key,
          type,
          value,
          valueBefore,
          valueAfter,
        } = node;
        const currentFullConfigKey = `${previousFullConfigKey}${key}`;
        if (type === 'composite') {
          return iter(`${currentFullConfigKey}.`, value);
        }
        if (type === 'changed') {
          const stringifiedValueBefore = stringifyValue(valueBefore);
          const stringifiedValueAfter = stringifyValue(valueAfter);
          return `Property '${currentFullConfigKey}' was changed from ${stringifiedValueBefore} to ${stringifiedValueAfter}`;
        }
        if (type === 'removed') {
          return `Property '${currentFullConfigKey}' was deleted`;
        }
        const stringifiedValue = stringifyValue(value);
        return `Property '${currentFullConfigKey}' was added with value: ${stringifiedValue}`;
      });
    return stringifiedDiffRecords.join('\n');
  };
  return iter('', diff);
};

export default plainFormatter;
