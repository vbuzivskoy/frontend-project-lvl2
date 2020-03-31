import _ from 'lodash';
import parser from './parser';
import getFormatter from './formatter';

const createNode = (key, operator, values) => {
  const node = { key, operator };
  if (operator === 'change') {
    node.valueBefore = values.valueBefore;
    node.valueAfter = values.valueAfter;
  } else {
    node.value = values;
  }
  return node;
};

const sortNodes = ({key: aKey}, {key: bKey}) => {
  if (aKey > bKey) {
    return 1;
  } else if (aKey < bKey) {
    return -1;
  }
  return 0;
}

const genDiff = (pathToBeforeFile, pathToAfterFile, format) => {
  const formatter = getFormatter(format);
  const configBefore = parser(pathToBeforeFile);
  const configAfter = parser(pathToAfterFile);

  const iter = (valueBefore, valueAfter) => {
    const keys = _.uniq(_.concat(Object.keys(valueBefore), Object.keys(valueAfter)));
    const nodes = keys.reduce((nodeAcc, key) => {
      let node;
      if (_.has(valueBefore, key)) {
        if (_.has(valueAfter, key)) {
          if (_.isObject(valueBefore[key]) && _.isObject(valueAfter[key])) {
            node = createNode(key, 'equal', iter(valueBefore[key], valueAfter[key]));
          } else if (valueBefore[key] === valueAfter[key] ) {
            node = createNode(key, 'equal', valueBefore[key]);
          } else {
            node = createNode(key, 'change', { valueBefore: valueBefore[key], valueAfter: valueAfter[key] });
          }
        } else {
          node = createNode(key, 'remove', valueBefore[key]);
        }
      } else {
        node = createNode(key, 'add', valueAfter[key]);
      }
      return [...nodeAcc, node];
    }, []);
    return nodes.sort(sortNodes);
  };
  const diff = iter(configBefore, configAfter);
  return formatter(diff);
};

export default genDiff;
