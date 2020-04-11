import plainFormatter from './formatters/plain';
import complexFormatter from './formatters/complex';
import jsonFormatter from './formatters/json';

const getFormatter = (format) => {
  let formatter;
  switch (format) {
    case 'plain':
      formatter = plainFormatter;
      break;
    case 'complex':
      formatter = complexFormatter;
      break;
    case 'json':
      formatter = jsonFormatter;
      break;
    default:
      formatter = null;
  }
  return formatter;
};

export default getFormatter;