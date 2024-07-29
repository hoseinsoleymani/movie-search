export function mergeClassNames(classNames) {
  return Object.entries(classNames)
    .reduce((result, [className, condition]) => {
      if (condition) return result.concat(' ', className);

      return result;
    }, '')
    .trimStart();
}