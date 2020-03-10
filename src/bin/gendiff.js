#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();
program
  .version('0.0.1')
  .usage('gendiff [options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .arguments('[firstConfig] [secondConfig]')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);