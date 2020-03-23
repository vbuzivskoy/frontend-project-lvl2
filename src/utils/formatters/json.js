import _ from 'lodash';

const jsonFormatter = (diff) => {
  const indent = '  ';
  const iter = (deepness, configValue) => {
    if (_.isObject(configValue)) {
      const diffRecords = Object.entries(configValue);
      const stringifiedDiffRecords = diffRecords
        .reduce((configDiffAccum, [currentCunfigKey, currentDiffValue]) => {
          const stringifiedCurrentDiffValue = iter(deepness + 1, currentDiffValue);
          return [
            ...configDiffAccum,
            `${indent.repeat(deepness)}"${currentCunfigKey}": ${stringifiedCurrentDiffValue}`
          ];
        }, []);
      const stringifiedDiffValue = '{\n'.concat(
        stringifiedDiffRecords.join(',\n'), 
        `\n${indent.repeat(deepness - 1)}}`
      );
      return stringifiedDiffValue;
    }
    const stringifiedConfigValue = _.isString(configValue) ? `"${configValue}"` : `${configValue}`;
    return stringifiedConfigValue;
  };

  return iter(1, diff);
};

export default jsonFormatter;
