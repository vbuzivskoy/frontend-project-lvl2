export default (obj) => {
  return Object.entries(obj).sort(([aKey], [bKey]) => {
    if (aKey > bKey) { return 1}
    if (aKey < bKey) { return -1}
    return 0;
  });
};