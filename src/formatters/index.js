import plainFormatter from './plain';
import complexFormatter from './complex';

const getFormatter = (formatType) => {
  switch (formatType) {
    case 'plain':
      return plainFormatter;
    case 'complex':
      return complexFormatter;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error(`No formatter for '${formatType}' format type!`);
  }
};

const formatDiff = (diffData, formatType) => {
  const format = getFormatter(formatType);
  return format(diffData);
};

export default formatDiff;
