#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../';


const program = new Command();
program
  .version('1.0.0')
  .usage('gendiff [options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'complex')
  .action((beforeConfig, afterConfig, cmdObj) => {
    const fromat = cmdObj.format;
    console.log(genDiff(beforeConfig, afterConfig, fromat));
  });

program.parse(process.argv);
