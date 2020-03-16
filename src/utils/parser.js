import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml'

const parseFile = (filepath) => {
  const file = fs.readFileSync(filepath, 'utf8');
  const ext = path.extname(filepath);
  let parser;
  switch (ext) {
    case '.json':
      parser = JSON.parse;
      break;
    case '.yaml':
      parser = yaml.safeLoad;
      break;
    default:
      return null;
  }
  return parser(file);
};

export default parseFile;