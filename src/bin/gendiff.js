#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../';


const program = new Command();
program
  .version('0.2.1')
  .usage('gendiff [options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    const beforeConfig = firstConfig;
    const afterConfig = secondConfig;
    console.log(genDiff(beforeConfig, afterConfig));
  });

program.parse(process.argv);
