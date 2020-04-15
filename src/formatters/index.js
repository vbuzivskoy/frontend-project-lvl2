import plainFormatter from './plain';
import complexFormatter from './complex';
import jsonFormatter from './json';


const getFormatter = (formatType) => {
  switch (formatType) {
    case 'plain':
      return plainFormatter;
    case 'complex':
      return complexFormatter;
    case 'json':
      return jsonFormatter;
    default:
      throw new Error(`No formatter for '${formatType}' format type!`);
  }
};

const formatDiff = (diff, formatType) => {
  const format = getFormatter(formatType);
  return format(diff);
};

export default formatDiff;
