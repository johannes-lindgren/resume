export const replaced = <T,>(
  arr: T[],
  where: (it: T) => boolean,
  withItem: T,
): T[] => {
  const index = arr.findIndex(where)
  return [...arr.slice(0, index), withItem, ...arr.slice(index + 1, arr.length)]
}
