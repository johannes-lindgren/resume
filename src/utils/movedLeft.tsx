export const movedLeft = <T,>(
  arr: T[],
  where: (it: T, index: number) => boolean,
): T[] => {
  const index = arr.findIndex(where)
  if (index === -1 || index === 0) {
    return arr
  }
  return [
    ...arr.slice(0, index - 1),
    arr[index],
    arr[index - 1],
    ...arr.slice(index + 1, arr.length),
  ]
}
