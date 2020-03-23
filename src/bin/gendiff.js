#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../';


const program = new Command();
program
  .version('1.1.1')
  .usage('gendiff [options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'complex')
  .action((beforeConfig, afterConfig, cmdObj) => {
    const format = cmdObj.format;
    console.log(genDiff(beforeConfig, afterConfig, format));
  });

program.parse(process.argv);
