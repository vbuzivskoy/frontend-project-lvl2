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
          child,
        } = node;
        const currentFullConfigKey = `${previousFullConfigKey}${key}`;
        switch (type) {
          case 'composite':
            return iter(`${currentFullConfigKey}.`, child);
          case 'changed': {
            const stringifiedValueBefore = stringifyValue(valueBefore);
            const stringifiedValueAfter = stringifyValue(valueAfter);
            return `Property '${currentFullConfigKey}' was changed from ${stringifiedValueBefore} to ${stringifiedValueAfter}`;
          }
          case 'removed':
            return `Property '${currentFullConfigKey}' was deleted`;
          case 'added': {
            const stringifiedValue = stringifyValue(value);
            return `Property '${currentFullConfigKey}' was added with value: ${stringifiedValue}`;
          }
          default:
            throw new Error(`Unexpected node type ${type}`);
        }
      });
    return stringifiedDiffRecords.join('\n');
  };
  return iter('', diff);
};

export default plainFormatter;
