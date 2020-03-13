import genDiff from '../src';

test('Plain JSON genDiff test', () => {
  const pathToBeforeFile = '__tests__/fixtures/before.json';
  const pathToAfterFile = '__tests__/fixtures/after.json';
  const diff = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}`;

  expect(new Set(genDiff(pathToBeforeFile, pathToAfterFile).split('\n'))).toEqual(new Set(diff.split('\n')));
  expect((() => {
    const diff = genDiff(pathToBeforeFile, pathToAfterFile).split('\n');
    const plusTimeoutKeyIndex = diff.indexOf('  + timeout: 20');
    const minusTimeoutKeyIndex = diff.indexOf('  - timeout: 50');
    return Math.abs(plusTimeoutKeyIndex - minusTimeoutKeyIndex);
  })()).toEqual(1);
});