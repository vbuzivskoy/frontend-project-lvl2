import { genDiff , showDiff } from '../src';

let diff = genDiff('__fixtures__/before_complex.ini', '__fixtures__/after_complex.ini');
console.log(showDiff(diff, '@@'));
console.log();

diff = genDiff('__fixtures__/before_plain.ini', '__fixtures__/after_plain.ini');
console.log(showDiff(diff, '@@'));
