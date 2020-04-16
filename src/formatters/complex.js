import _ from 'lodash';

const getDiffSign = (operation) => {
  switch (operation) {
    case 'added':
      return '+';
    case 'removed':
      return '-';
    case 'equal':
      return '';
    default:
      throw new Error(`No sign for operation '${operation}'!`);
  }
};

const stringifyValue = (deepness, indent, value) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const stringifiedConfigRecords = keys.sort()
      .map((key) => (
        `${indent.repeat(deepness + 1)}  ${key}: ${stringifyValue(deepness + 2, indent, value[key])}`
      ));
    return [
      '{',
      ...stringifiedConfigRecords,
      `${indent.repeat(deepness)}}`,
    ].join('\n');
  }
  return value;
};

const complexFormatter = (diff) => {
  const indent = '  ';
  const iter = (deepness, nodes) => {
    const stringifiedDiffRecords = nodes
      .map((node) => {
        const {
          key,
          type,
          value,
          valueBefore,
          valueAfter,
        } = node;
        if (type === 'composite') {
          const stringifiedNodeValue = iter(deepness + 2, value);
          return `${indent.repeat(deepness + 1)}  ${key}: ${stringifiedNodeValue}`;
        }
        if (type === 'changed') {
          const stringifiedValueBefore = stringifyValue(deepness + 2, indent, valueBefore);
          const stringifiedValueAfter = stringifyValue(deepness + 2, indent, valueAfter);
          return [
            `${indent.repeat(deepness + 1)}- ${key}: ${stringifiedValueBefore}`,
            `${indent.repeat(deepness + 1)}+ ${key}: ${stringifiedValueAfter}`,
          ].join('\n');
        }
        const stringifiedValue = stringifyValue(deepness + 2, indent, value);
        const sign = getDiffSign(type);
        return `${indent.repeat(deepness + 1)}${sign.padEnd(2)}${key}: ${stringifiedValue}`;
      });
    return [
      '{',
      ...stringifiedDiffRecords,
      `${indent.repeat(deepness)}}`,
    ].join('\n');
  };
  return iter(0, diff);
};

export default complexFormatter;
