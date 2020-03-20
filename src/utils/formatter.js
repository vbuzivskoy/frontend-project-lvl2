import plainFormatter from './formatters/plain';
import complexFormatter from './formatters/complex';

const getFormatter = (format) => {
  let formatter;
  switch (format) {
    case 'plain':
      formatter = plainFormatter;
      break;
    case 'complex':
      formatter = complexFormatter;
      break;
    default:
      formatter = null;
  }
  return formatter;
};

export default getFormatter;