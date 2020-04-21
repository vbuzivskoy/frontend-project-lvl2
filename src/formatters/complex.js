import _ from 'lodash';

const getDiffSign = (nodeType) => {
  switch (nodeType) {
    case 'added':
      return '+';
    case 'removed':
      return '-';
    case 'equal':
      return '';
    default:
      throw new Error(`No sign for node type '${nodeType}'!`);
  }
};

const stringifyValue = (depth, indent, value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const stringifiedConfigRecords = keys.sort()
    .map((key) => (
      `${indent.repeat(depth + 1)}  ${key}: ${stringifyValue(depth + 2, indent, value[key])}`
    ));
  return [
    '{',
    ...stringifiedConfigRecords,
    `${indent.repeat(depth)}}`,
  ].join('\n');
};

const complexFormatter = (diff) => {
  const indent = '  ';
  const iter = (depth, nodes) => {
    const stringifiedDiffRecords = nodes
      .map((node) => {
        const {
          key,
          type,
          value,
          valueBefore,
          valueAfter,
          children,
        } = node;
        switch (type) {
          case 'composite': {
            const stringifiedNodeValue = iter(depth + 2, children);
            return `${indent.repeat(depth + 1)}  ${key}: ${stringifiedNodeValue}`;
          }
          case 'changed': {
            const stringifiedValueBefore = stringifyValue(depth + 2, indent, valueBefore);
            const stringifiedValueAfter = stringifyValue(depth + 2, indent, valueAfter);
            return [
              `${indent.repeat(depth + 1)}- ${key}: ${stringifiedValueBefore}`,
              `${indent.repeat(depth + 1)}+ ${key}: ${stringifiedValueAfter}`,
            ].join('\n');
          }
          case 'added':
          case 'removed':
          case 'equal': {
            const stringifiedValue = stringifyValue(depth + 2, indent, value);
            const sign = getDiffSign(type);
            return `${indent.repeat(depth + 1)}${sign.padEnd(2)}${key}: ${stringifiedValue}`;
          }
          default:
            throw new Error(`Unexpected node type ${type}!`);
        }
      });
    return [
      '{',
      ...stringifiedDiffRecords,
      `${indent.repeat(depth)}}`,
    ].join('\n');
  };
  return iter(0, diff);
};

export default complexFormatter;
